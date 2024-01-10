import classNames from "classnames";
import React from "react";
import LoadingAnimation from "../CustomIcons/LoadingAnimation1";
import Pagination from "../Pagination";
import OrderTableItem from "./RecentOrderTableItem";

const tableHead = [
  "Package type",
  "Client name",
  "Location",
  "Gig url",
  "Status",
  "view",
];
const RecentOrderTable = ({
  orderData,
  isLoading,
  isPagination,
  orderRefetch,
}: {
  orderData?: any;
  isLoading?: boolean;
  isPagination?: boolean;
  orderRefetch?: any;
}) => {
  return (
    <>
      <Pagination
        dataArr={orderData || []}
        itemsPerPage={10}
        className={classNames(
          isPagination === false && "hidden",
          "!justify-end pb-[100px] w-[100%]"
        )}
      >
        {(data) => (
          <div className="py-[30px] lg:py-[50px] w-[100%]">
            <div className="relative overflow-x-auto style-scroll">
              <table className="w-full text-left text-[#031B07] border-separate  border-spacing-y-3">
                <thead className="  text-[#031B07] text-[12px] lg:text-[14px] uppercase bg-white">
                  <tr className="whitespace-nowrap">
                    {tableHead.map((item: any, index: number) => (
                      <th key={index} scope="col" className="px-6 py-3">
                        {item}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {data && data.length !== 0 ? (
                    data.map((item: any, index: number) => (
                      <OrderTableItem
                        tableData={item}
                        key={index}
                        orderRefetch={orderRefetch}
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
                        <div>No Order Found</div>
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
};

export default RecentOrderTable;
