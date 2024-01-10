/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import React, { useState } from "react";
import InputPassword from "../Shared/InputPassword";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import LoadingAnimation from "../CustomIcons/LoadingAnimation1";
import { api } from "../../api";
import { useRouter } from "next/router";
import { toast } from "react-toastify";

type InputType = {
    confirm_password: string;
    password: string;
};

const schema = yup.object({
    password: yup
        .string()
        .required("Enter your password")
        .matches(
            /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
            "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and one special case Character"
        ),
    confirm_password: yup
        .string()
        .oneOf([yup.ref("password")], "Passwords does not match")
        .required("Enter your password"),
});

const PasswordForm = () => {
    const router = useRouter();
    const [error, setError] = useState("");

    const [buttonLoading, setButtonLoading] = useState(false);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<InputType>({
        resolver: yupResolver(schema),
    });

    const { token } = router.query;

    const onSubmit = async (apiData: InputType) => {
        if (buttonLoading) return;
        setError("");
        setButtonLoading(true);

        try {
            await api.put("/admin/change-password", {
                password: apiData.password,
                token,
            });
            toast.success("Password changed successfully");
            setButtonLoading(false);
            await router.push("/signin");
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
                    <div className="">
                        <InputPassword
                            {...register("password")}
                            placeholder="Enter your password"
                            label="New Password"
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
                    </div>{" "}
                    <div className="">
                        <InputPassword
                            {...register("confirm_password")}
                            placeholder="Enter your password"
                            label="Confirm Password"
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
                        "Save Changes"
                    )}
                </button>
                <div className="pt-[24px]"></div>
            </form>
            <h2 className="text-[#626F63] text-center text-[16px] font-normal leading-[146%]">
                Back to{" "}
                <Link href="/signin">
                    <span className="cursor-pointer text-[#17B532] underline decoration-[#17B532]">
                        Sign In
                    </span>
                </Link>
            </h2>
        </div>
    );
};
export default PasswordForm;
