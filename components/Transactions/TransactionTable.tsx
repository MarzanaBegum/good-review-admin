import React from "react";
import Pagination from "../Shared/Pagination";
import TransactionTableItem from "./TransactionTableItem";
import LoadingAnimation from "../CustomIcons/LoadingAnimation1";

const tableHead = ["User name", "Purchase date", "Status", "Price", "View"];

function TransactionTable({
    transactionData,
    refetch,
    isLoading,
}: {
    transactionData?: any;
    refetch?: any;
    isLoading?: any;
}) {
    return (
        <>
            <Pagination
                dataArr={transactionData || []}
                itemsPerPage={10}
                className="!justify-end pb-[100px] w-[100%]"
            >
                {(currentData) => (
                    <div className="py-[30px] lg:py-[50px] w-[100%]">
                        <div className="relative overflow-x-auto style-scroll">
                            <table className="w-full text-left text-[#031B07] border-separate  border-spacing-y-3">
                                <thead className="  text-[#031B07] text-[14px] lg:text-[16px] bg-white">
                                    <tr className="whitespace-nowrap">
                                        {tableHead.map(
                                            (item: any, index: number) => (
                                                <th
                                                    key={index}
                                                    scope="col"
                                                    className="px-6 py-3"
                                                >
                                                    {item}
                                                </th>
                                            )
                                        )}
                                    </tr>
                                </thead>
                                <tbody>
                                    {currentData.length ? (
                                        currentData.map((item, i) => (
                                            <TransactionTableItem
                                                item={item}
                                                key={i}
                                                transactionRefetch={refetch}
                                            />
                                        ))
                                    ) : isLoading ? (
                                        <tr className="whitespace-nowrap text-[#031B07] text-[12px] font-medium leading-[16px] md:text-[14px] md:leading-[19.6px] xl:text-[16px] xl:leading-[22.4px]">
                                            <td className="px-6 py-4">
                                                <div className="flex gap-3 item-center">
                                                    <LoadingAnimation color="#18BA33" />
                                                    <div>Loading...</div>
                                                </div>
                                            </td>
                                        </tr>
                                    ) : (
                                        <tr className="whitespace-nowrap text-[#031B07] text-[12px] font-medium leading-[16px] md:text-[14px] md:leading-[19.6px] xl:text-[16px] xl:leading-[22.4px]">
                                            <td className="px-6 py-2">
                                                <div>No Transactions Found</div>
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}
            </Pagination>
        </>
    );
}

export default TransactionTable;
