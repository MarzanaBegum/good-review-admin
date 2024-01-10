import React from "react";
import CustomIcon, { IconType } from "./CustomSvgIcon";

const Logout = (props: IconType) => {
    return (
        <CustomIcon
            {...props}
            svg={({ stroke, color, width, height, className }) => (
                <svg
                    width={width}
                    height={height}
                    viewBox="0 0 20 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        d="M13.125 7.5V4.375C13.125 3.87772 12.9275 3.40081 12.5758 3.04917C12.2242 2.69754 11.7473 2.5 11.25 2.5H6.25C5.75272 2.5 5.27581 2.69754 4.92417 3.04917C4.57254 3.40081 4.375 3.87772 4.375 4.375V15.625C4.375 16.1223 4.57254 16.5992 4.92417 16.9508C5.27581 17.3025 5.75272 17.5 6.25 17.5H11.25C11.7473 17.5 12.2242 17.3025 12.5758 16.9508C12.9275 16.5992 13.125 16.1223 13.125 15.625V12.5M10 7.5L7.5 10M7.5 10L10 12.5M7.5 10H18.125"
                        stroke={stroke}
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                </svg>
            )}
        ></CustomIcon>
    );
};

export default Logout;
