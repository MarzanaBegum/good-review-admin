import React from "react";
import Link from "next/link";
import classNames from "classnames";
import { sideNavData } from "../../utils/const";
import { useRouter } from "next/router";
import LogoutIcon from "../CustomIcons/LogoutIcon";

const SidebarItem = () => {
    const router = useRouter();
    return (
        <>
            <div className="px-[20px] pt-[40px] flex flex-col gap-[20px]">
                <Link href="/dashboard">
                    <img
                        src="/icons/logo-green.svg"
                        alt="logo"
                        className="w-[135px] h-[30px] mb-[10px] cursor-pointer"
                    />
                </Link>
                {sideNavData.map(({ title, url, Icon }, index) => (
                    <Link
                        href={url}
                        key={index}
                        className={classNames(
                            " px-[23px] flex gap-[18px] items-center cursor-pointer text-[#626F63] font-normal 3xl:text-[18px] 3xl:leading-[28px] xl:text-[16px] xl:leading-[22px] text-[14px] leading-[19.6px] py-[10px]",
                            isRouteActive(url, router.asPath)
                                ? "bg-[#E8FCEC]  rounded-[10px] text-[#18BA33]"
                                : ""
                        )}
                    >
                        <Icon
                            width={18}
                            height={18}
                            stroke={
                                isRouteActive(url, router.asPath)
                                    ? "#18BA33"
                                    : "#626F63"
                            }
                        />
                        {title}
                    </Link>
                ))}
            </div>
        </>
    );
};

export default SidebarItem;

export function isRouteActive(url: string, path: string) {
    return url !== "/dashboard" ? path.includes(url) : path === url;
}
