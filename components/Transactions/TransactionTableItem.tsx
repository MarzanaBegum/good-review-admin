import classNames from "classnames";
import React, { useState } from "react";
import TransactionModal from "./TransactionModal";

const TransactionTableItem = ({ item, transactionRefetch }: any) => {
    const [openModal, setOpenModal] = useState<boolean>(false);

    const handleEditModal = () => {
        setOpenModal(!openModal);
    };
    return (
        <>
            <tr className="mt-12 bg-white rounded-[15px] whitespace-nowrap text-[#031B07] text-[14px] font-medium leading-[16px] md:leading-[19.6px] 2xl:text-[16px] xl:leading-[22.4px]">
                <td className="px-6 py-4 ">
                    {item?.orders?.[0]?.userId?.firstName}{" "}
                    {item?.orders?.[0]?.userId?.lastName}
                </td>
                <td className="px-6 py-4">
                    {new Date(item.createdAt).toDateString()}
                </td>
                <td
                    className={classNames(
                        item?.status === "completed" && "text-[#17B532]",
                        item?.status === "pending" && "text-[#F1C950]",
                        item?.status === "in progress" && "text-[#5286FE]",
                        item?.status === "cancelled" && "text-[#DE2844]",
                        "px-6 py-4"
                    )}
                >
                    {item?.status}
                </td>
                <td className="px-6 py-4">
                    ${item?.amount ? item?.amount : 0}
                </td>
                <td className="px-6 py-4">
                    <img
                        onClick={handleEditModal}
                        src="/icons/three-dot.svg"
                        alt=""
                        className="w-5 h-5 cursor-pointer"
                    />
                </td>
            </tr>
            <tr>
                <td>
                    <TransactionModal
                        isOpen={openModal}
                        data={item}
                        refetch={transactionRefetch}
                        onClose={handleEditModal}
                    />
                </td>
            </tr>
        </>
    );
};

export default TransactionTableItem;
