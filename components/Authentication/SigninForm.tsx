/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import React, { useState } from "react";
import InputField from "../Shared/InputField";
import InputPassword from "../Shared/InputPassword";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { setCookie } from "cookies-next";
import LoadingAnimation from "../CustomIcons/LoadingAnimation1";
import { api } from "../../api";
import { useRouter } from "next/router";
import { toast } from "react-toastify";

type InputType = {
    email: string;
    password: string;
};

const schema = yup.object({
    email: yup.string().email().required("Enter your email address"),
    password: yup.string().required("Enter your password"),
});

const SigninForm = () => {
    const router = useRouter();
    const [error, setError] = useState("");
    const [remember, setRemember] = useState(true);
    const [buttonLoading, setButtonLoading] = useState(false);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<InputType>({
        resolver: yupResolver(schema),
    });

    const onSubmit = async (signinData: InputType) => {
        if (buttonLoading) return;
        setError("");
        setButtonLoading(true);

        try {
            const {
                data: { token },
            } = await api.post("/admin/signin", signinData);

            const expires = remember
                ? new Date(Date.now() + 87400e6)
                : undefined;

            setCookie("admin-auth", token, { expires });

            await router.push("/dashboard");
            toast.success("Admin signin successfully");

            setButtonLoading(false);
        } catch (err: any) {
            const errMessage = err.response
                ? err.response.data.message
                : err.message;
            setError(errMessage);
            setButtonLoading(false);
        }
    };

    return (
        <div className="signin-form w-full">
            {error && (
                <div className="w-[100%] mb-2 mt-[10px] flex items-center pl-[15px] pr-[14px] rounded-[4px] min-h-[48px] bg-[#FFE5E7]">
                    <img
                        src="/icons/alert-icon.svg"
                        alt="alert icon"
                        className="w-[18.33px] h-[18.33px] mr-[9px]"
                    />
                    <h3 className="text-[13px] font-normal leading-[18px] text-[#252C48]">
                        {error}
                    </h3>
                </div>
            )}
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="flex flex-col gap-[16px] w-full">
                    <div>
                        <InputField
                            {...register("email")}
                            placeholder="Enter your email"
                            label="Email"
                            className={`${
                                errors.email
                                    ? "!border-red-500 text-error"
                                    : "focus:border-[#17B532]"
                            }`}
                        />
                        {errors.email && (
                            <p className="mt-2 text-sm text-red-500 first-letter:capitalize">
                                {errors.email?.message?.toString()}
                            </p>
                        )}
                    </div>
                    <div className="">
                        <InputPassword
                            {...register("password")}
                            placeholder="Enter your password"
                            label="Password"
                            className={`${
                                errors.password
                                    ? "!border-red-500 text-error"
                                    : "focus:border-[#17B532]"
                            }`}
                        />
                        {errors.password && (
                            <p className="mt-2 text-sm text-red-500 first-letter:capitalize">
                                {errors.password?.message?.toString()}
                            </p>
                        )}
                    </div>
                </div>
                <div className="pt-[16px]"></div>
                <div className="flex items-center justify-between">
                    <CheckRemember
                        remember={remember}
                        setRemember={setRemember}
                    />
                    <Link href="/change-password">
                        <h3 className=" text-[#17B532] text-[14px] font-medium">
                            Change password?
                        </h3>
                    </Link>
                </div>
                <div className="pt-[24px]"></div>
                <button
                    type="submit"
                    className="w-[100%] h-[48px] text-[16px] sm:text-[18px] font-medium text-[#FFFFFF] hover:bg-[#14a02b] transition-all duration-200 bg-[#17B532] cursor-pointer rounded-[10px]"
                >
                    {buttonLoading ? (
                        <span className="flex items-center justify-center">
                            <LoadingAnimation color="white" />
                        </span>
                    ) : (
                        "Sign In"
                    )}
                </button>
                <div className="pt-[24px]"></div>
            </form>
            <h2 className="text-[#626F63] text-center text-[16px] font-normal leading-[146%]">
                Don’t have an account?{" "}
                <Link href="/">
                    <span className="cursor-pointer text-[#17B532] underline decoration-[#17B532]">
                        No Chance
                    </span>
                </Link>
            </h2>
        </div>
    );
};
export default SigninForm;

type RCTYPE = {
    remember: boolean;
    setRemember: React.Dispatch<React.SetStateAction<boolean>>;
};
const CheckRemember = ({ remember, setRemember }: RCTYPE) => {
    return (
        <div
            onClick={() => setRemember(!remember)}
            className="flex items-center gap-[10px] cursor-pointer"
        >
            <div
                className={`w-[14px] h-[14px] border rounded-sm border-[#D0D5DD] flex justify-center items-center ${
                    remember && "!border-[#17B532] bg-[#17B532]"
                }`}
            >
                {remember && <div className="text-[10px] text-white">✓</div>}
            </div>
            <div className="text-[#344054] text-[14px] font-normal leading-[21px]">
                Remember me
            </div>
        </div>
    );
};
