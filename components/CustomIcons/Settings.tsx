import React from "react";
import CustomIcon, { IconType } from "./CustomSvgIcon";

const Settings = (props: IconType) => {
    return (
        <CustomIcon
            {...props}
            svg={({ stroke, color, width, height, className }) => (
                <svg
                    width={width}
                    height={height}
                    viewBox="0 0 16 17"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M7.85532 1.75C7.77634 1.75 7.6992 1.7738 7.63396 1.8183C7.56871 1.86281 7.5184 1.92594 7.48957 1.99946L6.9889 3.27515C6.92686 3.43321 6.81303 3.56554 6.66603 3.6505L5.00888 4.60821C4.86142 4.69343 4.68935 4.72593 4.52097 4.70035L3.16775 4.4948C3.08965 4.48312 3.00948 4.4952 2.93837 4.52957C2.86716 4.56398 2.80799 4.6191 2.76861 4.68769L2.76695 4.69058L2.303 5.49048C2.26333 5.55894 2.2452 5.63787 2.25109 5.71676C2.25698 5.7957 2.28657 5.87101 2.336 5.93284L3.19117 7.00409C3.29725 7.13698 3.35503 7.30196 3.35503 7.472V9.38514C3.35503 9.55491 3.29743 9.71966 3.19165 9.85244L2.3368 10.9256C2.28754 10.9873 2.25775 11.0629 2.25186 11.1417C2.24599 11.2202 2.26389 11.2988 2.30324 11.3671L2.76781 12.1681C2.8073 12.2365 2.86652 12.2915 2.93773 12.3257C3.00893 12.36 3.08882 12.372 3.16696 12.3602L4.52097 12.1545C4.68935 12.1289 4.86142 12.1614 5.00888 12.2466L6.66602 13.2044C6.81303 13.2893 6.92686 13.4217 6.9889 13.5797L7.48947 14.8551C7.5183 14.9287 7.56871 14.9921 7.63396 15.0366C7.6992 15.0811 7.77634 15.1049 7.85532 15.1049H8.78331C8.86228 15.1049 8.93943 15.0811 9.00467 15.0366C9.06991 14.9921 9.12023 14.9289 9.14906 14.8554L9.64973 13.5797C9.71176 13.4217 9.82559 13.2893 9.9726 13.2044L11.6297 12.2466C11.7772 12.1614 11.9493 12.1289 12.1177 12.1545L13.4717 12.3602C13.5498 12.372 13.6297 12.36 13.7009 12.3257C13.7721 12.2915 13.8313 12.2365 13.8708 12.1681L13.8717 12.1666L14.3356 11.3667C14.3753 11.2982 14.3934 11.2193 14.3875 11.1404C14.3816 11.0614 14.3521 10.9861 14.3026 10.9243L13.4475 9.85305C13.3414 9.72017 13.2836 9.55518 13.2836 9.38514V7.472C13.2836 7.3025 13.341 7.138 13.4465 7.00531L14.3021 5.9289C14.3514 5.86715 14.3809 5.79198 14.3868 5.71321C14.3926 5.63461 14.3747 5.55606 14.3354 5.48778L13.8708 4.68679C13.8313 4.61833 13.7721 4.56339 13.7009 4.52911C13.6297 4.49484 13.5498 4.48284 13.4717 4.49468L12.1177 4.70035C11.9493 4.72593 11.7772 4.69343 11.6297 4.60821L9.9726 3.6505C9.82559 3.56554 9.71176 3.43321 9.64973 3.27515L9.14916 1.99972C9.12033 1.92619 9.06991 1.86281 9.00467 1.8183C8.93943 1.7738 8.86228 1.75 8.78331 1.75H7.85532ZM6.78875 0.579104C7.10311 0.364692 7.47479 0.250003 7.85531 0.25H8.78332C9.16384 0.250003 9.53552 0.364692 9.84988 0.579104C10.1642 0.793466 10.4066 1.09755 10.5455 1.45171L10.9502 2.48301L12.1525 3.17785L13.2467 3.01165C13.6231 2.95461 14.0083 3.01239 14.3514 3.17751C14.6942 3.34248 14.9793 3.60687 15.1695 3.93622L15.1701 3.93721L15.6338 4.73667C15.8243 5.06618 15.911 5.44546 15.8826 5.82499C15.8542 6.20443 15.7122 6.56651 15.475 6.86401L14.7836 7.73377V9.1225L15.4743 9.9877C15.7124 10.2856 15.855 10.6485 15.8834 11.0288C15.9118 11.4091 15.8246 11.7891 15.6333 12.1191L15.1701 12.9176L15.1696 12.9185C14.9793 13.2479 14.6942 13.5124 14.3514 13.6773C14.0083 13.8425 13.6234 13.9003 13.247 13.8433L12.1525 13.677L10.9502 14.3718L10.5456 15.4029C10.4067 15.757 10.1642 16.0614 9.84988 16.2758C9.53552 16.4902 9.16384 16.6049 8.78332 16.6049H7.85531C7.47479 16.6049 7.10311 16.4902 6.78875 16.2758C6.47446 16.0614 6.23206 15.7573 6.09316 15.4032L5.6884 14.3718L4.48611 13.677L3.39194 13.8432C3.01548 13.9003 2.63029 13.8425 2.2872 13.6773C1.94439 13.5124 1.65926 13.2479 1.46899 12.9185L1.00484 12.1182C0.814377 11.7887 0.727668 11.4094 0.756032 11.0299C0.784384 10.6505 0.926397 10.2885 1.16355 9.99098L1.85503 9.12293V7.73465L1.16434 6.86945C0.926212 6.57155 0.783618 6.20867 0.755246 5.82836C0.726874 5.44804 0.814048 5.06802 1.00534 4.73809L1.46867 3.93925C1.65841 3.6095 1.94312 3.34456 2.28569 3.17901C2.62882 3.01319 3.01402 2.9548 3.39088 3.01149L3.39195 3.01165L4.48611 3.17785L5.6884 2.48301L6.09306 1.45196C6.23195 1.0977 6.47439 0.793518 6.78875 0.579104ZM6.17274 6.282C6.74205 5.71269 7.51419 5.39286 8.31931 5.39286C8.91972 5.39286 9.50665 5.5709 10.0059 5.90447C10.5051 6.23804 10.8942 6.71215 11.1239 7.26685C11.3537 7.82156 11.4138 8.43194 11.2967 9.02081C11.1796 9.60968 10.8904 10.1506 10.4659 10.5751C10.0413 10.9997 9.50042 11.2888 8.91155 11.406C8.32268 11.5231 7.7123 11.463 7.1576 11.2332C6.60289 11.0034 6.12878 10.6143 5.79521 10.1151C5.46164 9.6159 5.2836 9.02898 5.2836 8.42857C5.2836 7.62345 5.60343 6.8513 6.17274 6.282ZM8.31931 6.89286C7.91202 6.89286 7.5214 7.05466 7.2334 7.34266C6.9454 7.63066 6.7836 8.02128 6.7836 8.42857C6.7836 8.73231 6.87367 9.02922 7.04241 9.28177C7.21116 9.53432 7.45101 9.73115 7.73162 9.84739C8.01224 9.96362 8.32102 9.99403 8.61892 9.93478C8.91681 9.87552 9.19045 9.72926 9.40523 9.51449C9.62 9.29971 9.76626 9.02607 9.82552 8.72817C9.88478 8.43027 9.85436 8.12149 9.73813 7.84088C9.62189 7.56026 9.42506 7.32042 9.17251 7.15167C8.91996 6.98293 8.62305 6.89286 8.31931 6.89286Z"
                        fill={stroke}
                    />
                </svg>
            )}
        ></CustomIcon>
    );
};

export default Settings;
