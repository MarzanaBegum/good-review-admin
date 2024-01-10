/* eslint-disable @next/next/no-img-element */
import React from "react";
import SigninForm from "../../components/Authentication/SigninForm";

const SigninPage = () => {
    return (
        <div className="relative flex items-center h-screen w-[100%]">
            <div className="fixed z-10 top-5 left-5 sm:left-10 sm:top-10 lg:left-20">
                <img src="/icons/logo-green.svg" className="w-[160px]" alt="" />
            </div>

            <div className="w-[50%] h-[100%] relative hidden 2xl:flex">
                <img
                    src="/images/admin-auth.jpg"
                    alt="image"
                    className="w-[100%] h-[100%] absolute top-0 left-0 object-cover"
                />
            </div>
            <div className="w-[100%] 2xl:w-[50%] h-[100%] modal-scroll flex items-center justify-center">
                <div className="w-full px-5 md:w-[60%] max-w-[450px]">
                    <h2 className="text-[32px] mb-[16px] sm:text-[40px] text-center font-semibold text-[#031B07]">
                        Admin
                    </h2>
                    <h3 className="text-[16px] mb-[24px] sm:mb-[40px] leading-[146%] text-center font-normal text-[#667085]">
                        Manage your business with GoodReviews
                    </h3>
                    <SigninForm />
                </div>
            </div>
        </div>
    );
};
export default SigninPage;
