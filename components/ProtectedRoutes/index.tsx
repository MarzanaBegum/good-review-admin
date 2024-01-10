import { deleteCookie, getCookie } from "cookies-next";
import { AppContext } from "next/app";
import { decryptData } from "../../utils/hashdata";
import { ReactNode, useEffect, useState } from "react";
import { useAtom } from "jotai";
import { ADMIN_STATE } from "../../state";
import { useRouter } from "next/router";
import { api } from "../../api";
import LoadingAnimation from "../CustomIcons/LoadingAnimation1";

const AuthRouteRegex = /\/signin|\/change-password|\/change-password\/(.*)?/g;

const ProtectedRoutes = async ({ ctx: { req, res, pathname } }: AppContext) => {
    const serverClientRedirect = async (redirect?: string) => {
        if (res) {
            res.writeHead(302, {
                Location: redirect || "/signin",
                "Content-Type": "text/html; charset=utf-8",
            });
            res.end();
        } else {
            if (typeof window !== "undefined") {
                (window as Window).location = redirect || "/signin";
                await new Promise((resolve) => {});
            }
        }
    };

    try {
        const isValid = decryptData(
            `${getCookie("admin-auth", {
                req,
                res,
            })}`
        );
        if (!isValid) throw new Error();

        const isMatch = pathname.match(AuthRouteRegex);
        if (isMatch || pathname === "/")
            await serverClientRedirect("/dashboard");

        return {
            id: isValid.id,
        };
    } catch (err) {
        const isMatch = pathname.match(AuthRouteRegex);
        if (pathname === "/" || !isMatch) await serverClientRedirect("/signin");
        return {};
    }
};

type PRPType = {
    children: ReactNode;
    id?: string;
};

export const ProtectedRoutesProvider = ({ children, id }: PRPType) => {
    const [admin, setAdmin] = useAtom(ADMIN_STATE);
    const [loading, setLoading] = useState(true);
    const router = useRouter();
    useEffect(() => {
        setLoading(true);
        (async () => {
            try {
                if (!id) throw new Error();
                const { data } = await api.get(`/admin/${id}`);
                setAdmin(data);
                setLoading(false);
            } catch (err: any) {
                const errMessage = err.response
                    ? err.response.data.message
                    : err.message;
                if (errMessage === "Admin not found") {
                    deleteCookie("admin-auth");
                    await router.push("/signin");
                }
                setLoading(false);
                setAdmin(undefined);
            }
        })();
    }, [id]);

    return loading ? (
        <div className="flex items-center justify-center w-screen h-screen">
            <LoadingAnimation className="w-[60px] h-[60px]" color="#18BA33" />
        </div>
    ) : (
        <>{children}</>
    );
};

export default ProtectedRoutes;
