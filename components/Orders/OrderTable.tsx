import React from "react";
import Pagination from "../Shared/Pagination";

const tableHead = ["User name", "Package type", "Status", "view"];
const OrderTable = () => {
  return (
    <>
      <Pagination
        dataArr={[...Array(8)] || []}
        itemsPerPage={7}
        className="!justify-end pb-[100px] max-w-[1385px]"
      >
        {(data) => (
          <div className="py-[30px] lg:py-[50px] max-w-[1385px]">
            <div className="relative overflow-x-auto">
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
                  {data.map((item: any, index: number) => (
                    <tr
                      key={index}
                      className="mt-12 bg-white rounded-[15px] whitespace-nowrap text-[#031B07] text-[12px] font-medium leading-[16px] md:text-[14px] md:leading-[19.6px] xl:text-[16px] xl:leading-[22.4px]"
                    >
                      <td className="px-6 py-4">Md Abdur Rakib</td>
                      <td className="px-6 py-4 ">Active Client</td>

                      <td className="px-6 py-4 text-[#18BA33]">Completed</td>
                      <td className="px-6 py-4">
                        <img
                          src="/icons/three-dot.svg"
                          alt=""
                          className="w-5 h-5 cursor-pointer"
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </Pagination>
    </>
  );
};

export default OrderTable;
