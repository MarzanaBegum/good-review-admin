import React from "react";

const ItemCard = ({ cardData }: any) => {
    console.log(cardData, "card DAta....")
    return (
        <div className="mt-[20px]">
            <div className="grid grid-cols-1 sm:grid-cols-2  lg:grid-cols-4 gap-[24px]">
                <div className="px-[20px] py-[10px] bg-[#E7FAF0] border sm:px-[20px] sm:py-[20px]  rounded-[10px]">
                    <div className="flex flex-col gap-[8px]">
                        <h2 className=" font-semibold text-[24px] leading-[43px] ">
                            {cardData?.revenue}
                        </h2>
                        <p className="font-semibold text-[16px] leading-[19.36px] text-[#626F63]">
                            Total Revenue
                        </p>
                    </div>
                </div>
                <div className="px-[20px] py-[10px] bg-[#ECFEFF] border sm:px-[20px] sm:py-[20px]  rounded-[10px]">
                    <div className="flex flex-col gap-[8px]">
                        <h2 className=" font-semibold text-[24px] leading-[43px] ">
                            {cardData?.orders}
                        </h2>
                        <p className="font-semibold text-[16px] leading-[19.36px] text-[#626F63]">
                            Total Orders
                        </p>
                    </div>
                </div>
                <div className="px-[20px] py-[10px] bg-[#F5F6F8] border sm:px-[20px] sm:py-[20px]  rounded-[10px]">
                    <div className="flex flex-col gap-[8px]">
                        <h2 className=" font-semibold text-[24px] leading-[43px] ">
                            {cardData?.pendingOrders}
                        </h2>
                        <p className="font-semibold text-[16px] leading-[19.36px] text-[#626F63]">
                            Pending Orders
                        </p>
                    </div>
                </div>
                <div className="px-[20px] py-[10px] bg-[#FFF8F6] border sm:px-[20px] sm:py-[20px]  rounded-[10px]">
                    <div className="flex flex-col gap-[8px]">
                        <h2 className=" font-semibold text-[24px] leading-[43px] ">
                            {cardData?.purchaser}
                        </h2>
                        <p className="font-semibold text-[16px] leading-[19.36px] text-[#626F63]">
                            Total Purchaser
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ItemCard;
