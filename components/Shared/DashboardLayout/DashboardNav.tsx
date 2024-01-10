import React, { useState } from "react";
import MobileDrawer from "../DashboardMoboNav";

const DashboardNav = () => {
    const [isOpen, setIsOpen] = useState(false);
    const toggleDrawer = () => {
        setIsOpen((prevState) => !prevState);
    };
    return (
        <div className="w-[100%] z-[999999] bg-white sticky top-0  lg:px-[40px] px-[16px] sm:px-[20px]">
            <div className="h-[44px] sm:h-[86px] lg:h-[96px] flex items-center justify-between">
                <img
                    src="/icons/logo-green.svg"
                    alt="logo"
                    className="w-[135px] h-[30px] lg:block cursor-pointer"
                />
                <img
                    onClick={toggleDrawer}
                    src="/icons/hamburg.svg"
                    alt=""
                    className="w-[24px] h-[24px] lg:hidden"
                />
            </div>
            <div className="lg:hidden">
                <MobileDrawer isOpen={isOpen} toggleDrawer={toggleDrawer} />
            </div>
        </div>
    );
};

export default DashboardNav;
