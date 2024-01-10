/* eslint-disable react/jsx-no-undef */
import classNames from "classnames";
import React, { useMemo, useState } from "react";
import { toast } from "react-toastify";
import { api } from "../../api";
import { transactionStatus } from "../../utils/const";
import LoadingAnimation from "../CustomIcons/LoadingAnimation1";
import SelectDropdown from "../SelectDropdown";
import OverflowModal from "../Shared/OverFlowModal";

type ModalProps = {
    isOpen: boolean;
    onClose: () => void;
    data: any;
    refetch?: any;
};

function TransactionModal({ isOpen, onClose, data, refetch }: ModalProps) {
    const [loading, setLoading] = useState(false);
    const [statusType, setStatusType] = useState("");

    const handleStatusChange = async () => {
        setLoading(true);
        try {
            await api.put(`/billing/${data._id}/status`, {
                status: statusType,
            });
            setLoading(false);
            refetch();
            toast.success(`Status updated successfully`);
            onClose();
        } catch (err) {
            setLoading(false);
            toast.error("Something went wrong");
        }
    };

    const newData2 = useMemo(() => {
        let dataArr = data.orders || [];
        let dataObj: any = {};
        for (let i = 0; i < dataArr.length; i++) {
            let data = dataArr[i];
            let type = data.packageType + data.serviceType;
            dataObj[type] = dataObj[type] ? dataObj[type].concat(data) : [data];
        }
        return dataObj;
    }, [data]);

    return (
        <OverflowModal
            isOpen={isOpen}
            onRequestClose={onClose}
            className="w-[calc(100vw-40px)] max-w-[600px] bg-white px-[16px] py-[30px] sm:p-[40px] rounded-[10px]"
        >
            <div>
                <h2 className="mb-[18px] text-center text-[24px] leading-[30px] font-medium text-[#1F2937]">
                    Transaction Details
                </h2>
                <div className="flex flex-col gap-[15px]">
                    <div className="flex gap-[10px] justify-between">
                        <div className="w-[50%]">
                            <label className="text-[16px] text-[#031B07] font-bold leading-[23.36px] block">
                                User Name
                            </label>
                            <p className="pt-2 font-medium text-[#1F2937] leading-[22px] text-[17px]">
                                {data?.orders?.[0]?.userId?.firstName}{" "}
                                {data?.orders?.[0]?.userId?.lastName}
                            </p>
                        </div>
                        <div className="w-[50%]">
                            <label className="text-[16px] text-[#031B07] font-bold leading-[23.36px] block">
                                Email
                            </label>
                            <p className="pt-2 font-medium text-[#1F2937] leading-[22px] text-[17px]">
                                {data?.orders?.[0]?.userId?.email}
                            </p>
                        </div>
                    </div>
                    {/* <div className="font-bold text-center">Order Summary</div> */}
                    <div>
                        <div className="flex gap-[10px] text-sm justify-between">
                            <div className="w-[50%]">
                                <label className="text-[16px] text-[#031B07] font-bold  leading-[23.36px] block">
                                    Package Type
                                </label>
                            </div>
                            <div className="w-[50%]">
                                <label className="text-[16px] text-[#031B07] font-bold leading-[23.36px] block">
                                    Count
                                </label>
                            </div>
                        </div>
                        <div>
                            {Object.values(newData2).map(
                                (v: any, i: number) => (
                                    <div
                                        key={"some_" + i}
                                        className="flex gap-[10px]"
                                    >
                                        <div className="w-[50%]">
                                            <p className="pt-2 font-medium text-[#1F2937] leading-[22px] text-[17px]">
                                                {v?.[0].packageType}
                                            </p>
                                        </div>
                                        <div className="w-[50%]">
                                            <p className="pt-2 font-medium text-[#1F2937] leading-[22px] text-[17px]">
                                                x {v?.length}
                                            </p>
                                        </div>
                                    </div>
                                )
                            )}
                        </div>
                    </div>

                    <div className="flex gap-[10px] justify-between">
                        <div className="w-[50%]">
                            <label className="text-[16px] text-[#031B07] font-bold leading-[23.36px] block">
                                Total Price
                            </label>
                            <p className="pt-2 font-medium text-[#1F2937] leading-[22px] text-[17px]">
                                ${data?.amount}
                            </p>
                        </div>
                        <div className="w-[50%]">
                            <label className="text-[16px] text-[#031B07] font-bold leading-[23.36px] block">
                                Transaction Id
                            </label>
                            <p className="pt-2 font-medium text-[#1F2937] leading-[22px] text-[17px]">
                                {data?.trxId}
                            </p>
                        </div>
                    </div>
                    <div className="flex gap-[10px] justify-between">
                        <div className="w-[50%]">
                            <label className="text-[16px] text-[#031B07] font-bold  leading-[23.36px] block">
                                Purchase date
                            </label>
                            <p className="pt-2 font-medium text-[#1F2937] leading-[22px] text-[17px]">
                                {new Date(data.createdAt).toDateString()}
                            </p>
                        </div>
                        <div className="w-[50%]">
                            <label className="text-[16px] text-[#031B07] font-bold leading-[23.36px] block">
                                Status
                            </label>
                            {data?.status === "completed" ||
                            data?.status === "cancelled" ? (
                                <p
                                    className={classNames(
                                        data?.status === "completed" &&
                                            "text-[#17B532]",
                                        data?.status === "pending" &&
                                            "text-[#F1C950]",
                                        data?.status === "in progress" &&
                                            "text-[#5286FE]",
                                        data?.status === "cancelled" &&
                                            "text-[#DE2844]",
                                        "pt-2 font-medium text-[#1F2937] leading-[22px] text-[17px]"
                                    )}
                                >
                                    {data?.status}
                                </p>
                            ) : (
                                <SelectDropdown
                                    options={transactionStatus}
                                    defaultValue={{
                                        label:
                                            data.status
                                                .charAt(0)
                                                .toUpperCase() +
                                            data.status.slice(1),
                                        value: data.status,
                                    }}
                                    onChange={(e: any) => {
                                        setStatusType(e.value);
                                    }}
                                    placeholder="Select status"
                                    className="text-[#031B07] pt-2 font-semibold text-[16px] leading-[19.36px]"
                                />
                            )}
                        </div>
                    </div>
                    <div
                        onClick={handleStatusChange}
                        className={classNames(
                            data?.status === "completed" ||
                                data?.status === "cancelled"
                                ? "hidden"
                                : "flex justify-center"
                        )}
                    >
                        <button className="w-[172px] h-[40px] bg-primary hover:bg-[#14a02b] transition-all duration-200 rounded-[10px] text-[white] font-medium text-[14px] leading-[19px] mt-[10px] ">
                            {loading ? (
                                <span className="flex items-center justify-center">
                                    <LoadingAnimation color="white" />
                                </span>
                            ) : (
                                "Update status"
                            )}
                        </button>
                    </div>
                </div>
            </div>
        </OverflowModal>
    );
}

export default TransactionModal;
