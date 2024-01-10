import React from "react";
import CustomIcon, { IconType } from "./CustomSvgIcon";

const DeleteIcon = (props: IconType) => {
    return (
        <CustomIcon
            {...props}
            svg={({ stroke, color, width, height, className }) => (
                <svg
                    width={width}
                    height={height}
                    viewBox="0 0 18 22"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        d="M11.74 7.99954L11.394 16.9995M6.606 16.9995L6.26 7.99954M16.228 4.78954C16.57 4.84154 16.91 4.89654 17.25 4.95554M16.228 4.79054L15.16 18.6725C15.1164 19.2378 14.8611 19.7657 14.445 20.1508C14.029 20.5359 13.4829 20.7497 12.916 20.7495H5.084C4.5171 20.7497 3.97102 20.5359 3.55498 20.1508C3.13894 19.7657 2.88359 19.2378 2.84 18.6725L1.772 4.78954M16.228 4.78954C15.0739 4.61506 13.9138 4.48264 12.75 4.39254M0.75 4.95454C1.09 4.89554 1.43 4.84054 1.772 4.78954M1.772 4.78954C2.92613 4.61506 4.08623 4.48264 5.25 4.39254M12.75 4.39254V3.47654C12.75 2.29654 11.84 1.31254 10.66 1.27554C9.55362 1.24018 8.44638 1.24018 7.34 1.27554C6.16 1.31254 5.25 2.29754 5.25 3.47654V4.39254M12.75 4.39254C10.2537 4.19962 7.74628 4.19962 5.25 4.39254"
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

export default DeleteIcon;
