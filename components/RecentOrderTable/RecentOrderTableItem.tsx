import classNames from "classnames";
import React, { useState } from "react";
import OrderDetailsModal from "../Modal/OrderDetailModal";

const OrderTableItem = ({ tableData, orderRefetch }: any) => {
    const [orderModal, setOrderModal] = useState<boolean>(false);
    return (
        <>
            <tr
                key={tableData._id}
                className="mt-12 bg-white rounded-[15px] whitespace-nowrap text-[#031B07] text-[12px] font-medium leading-[16px] md:text-[14px] md:leading-[19.6px] xl:text-[16px] xl:leading-[22.4px]"
            >
                <td className="px-6 py-4 ">{tableData.packageType}</td>
                <td className="px-6 py-4">
                    {tableData.buyer ? tableData.buyer?.name : "-"}
                </td>
                <td className="px-6 py-4">
                    {tableData.buyer?.address ? tableData.buyer?.address : "-"}
                </td>
                <td className="px-6 py-4 text-[#5286FE]">{tableData.gigUrl}</td>
                <td
                    className={classNames(
                        tableData.status === "completed" && "text-[#18BA33]",
                        tableData.status === "pending" && "text-[#E08F0A]",
                        tableData.status === "in progress" && "text-[#5286FE]",
                        tableData.status === "cancelled" && "text-[#DE2844]",
                        "px-6 py-4"
                    )}
                >
                    {tableData.status}
                </td>
                <td className="px-6 py-4 ">
                    <img
                        onClick={() => setOrderModal(!orderModal)}
                        src="/icons/three-dot-line.svg"
                        alt=""
                        className="ml-4 cursor-pointer"
                    />
                </td>
            </tr>
            <tr>
                <td>
                    <OrderDetailsModal
                        isOpen={orderModal}
                        data={tableData}
                        handleModal={() => setOrderModal(!orderModal)}
                        orderRefetch={orderRefetch}
                    />
                </td>
            </tr>
        </>
    );
};

export default OrderTableItem;
