import classNames from "classnames";
import { AnimatePresence } from "framer-motion";
import React, { useState } from "react";
import { toast } from "react-toastify";
import { api } from "../../api";
import LoadingAnimation from "../CustomIcons/LoadingAnimation1";
import { OutSideClick } from "../Shared/OutSideClick";
import Pagination from "../Shared/Pagination";

const tableHead = ["User name", "Join Date", "Status", "Total orders", "view"];
const CustomersTable = ({ dataTable, isLoading, refetch }: any) => {
  const [isOpen, setIsOpen] = useState(false);
  const [indexNum, setIndexNum] = useState(0);

  const handleMenu = (id: string, status: any, index: any) => {
    setIndexNum(index);
    setIsOpen(!isOpen);
  };
  const hangleUpdateCustomer = async (item: any) => {
    const status = item && item.status;

    try {
      if (status === "active" || status === "inactive") {
        await api.put(`/user/${item?._id}`, {
          status: "banned",
        });
      }
      if (
        !item?.userStore?.orders ||
        (item?.userStore?.orders.length === 0 && status === "banned")
      ) {
        await api.put(`/user/${item?._id}`, {
          status: "inactive",
        });
      }
      if (item?.userStore?.orders.length !== 0 && status === "banned") {
        await api.put(`/user/${item?._id}`, {
          status: "active",
        });
      }
      refetch();
      toast.success("Customer updated successfully!");
      setIsOpen(false);
    } catch (err) {
      toast.error("Something went wrong!");
      setIsOpen(false);
    }
  };

  return (
    <>
      <Pagination
        dataArr={dataTable || []}
        itemsPerPage={7}
        className="!justify-end pb-[100px] w-[100%]"
      >
        {(data) => (
          <div className="py-[30px] modal-scroll lg:py-[50px]">
            <div className="">
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
                  {data.length > 0 ? (
                    data.map((item: any, index: number) => (
                      <tr
                        key={index}
                        className="mt-12 bg-white rounded-[15px] whitespace-nowrap text-[#031B07] text-[12px] font-medium leading-[16px] md:text-[14px] md:leading-[19.6px] xl:text-[16px] xl:leading-[22.4px]"
                      >
                        <td className="px-6 py-4">{`${item.firstName} ${item.lastName}`}</td>
                        <td className="px-6 py-4 ">{`${new Date(
                          item.createdAt
                        ).toDateString()}`}</td>

                        <td
                          className={classNames(
                            "px-6 py-4  capitalize",
                            item.status.toLowerCase() === "active" &&
                              "text-[#18BA33]",
                            item.status.toLowerCase() === "inactive" &&
                              "text-[#E08F0A]",
                            item.status.toLowerCase() === "banned" &&
                              "text-[#FF1313]"
                          )}
                        >
                          {item.status}
                        </td>
                        <td className="px-6 py-4">
                          {item.userStore?.orders
                            ? item.userStore.orders?.length
                            : 0}
                        </td>
                        <td className="relative px-6 py-4">
                          <img
                            onClick={() =>
                              handleMenu(item._id, item.status, index)
                            }
                            src="/icons/three-dot.svg"
                            alt=""
                            className="w-5 h-5 cursor-pointer"
                          />

                          <div className="absolute top-[30px] left-[-170px] z-[1]">
                            <AnimatePresence initial={false}>
                              {indexNum === index && isOpen && (
                                <OutSideClick
                                  onOutSideClick={() => setIsOpen(false)}
                                >
                                  <div
                                    className="bg-[#ffffff] w-[209px] rounded-[6px]  mt-[12px]"
                                    style={{
                                      boxShadow:
                                        "2px 2px 16px rgba(0, 0, 0, 0.08)",
                                    }}
                                  >
                                    <ul className="text-normal text-[14px] flex flex-col  leading-[22px] text-[#3B415A]">
                                      <li
                                        onClick={() =>
                                          hangleUpdateCustomer(item)
                                        }
                                        className="p-[16px] cursor-pointer transition-all duration-100 bg-[#E8FCEC]  text-[#18BA33] "
                                      >
                                        {item.status === "banned"
                                          ? "Permitted"
                                          : "Banned User"}
                                      </li>
                                    </ul>
                                  </div>
                                </OutSideClick>
                              )}
                            </AnimatePresence>
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : isLoading ? (
                    <tr className="whitespace-nowrap text-[#031B07] text-[12px] font-medium leading-[16px] md:text-[14px] md:leading-[19.6px] xl:text-[16px] xl:leading-[22.4px]">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <LoadingAnimation color="#18BA33" />
                          <div>Loading...</div>
                        </div>
                      </td>
                    </tr>
                  ) : (
                    <tr className="whitespace-nowrap text-[#031B07] text-[12px] font-medium leading-[16px] md:text-[14px] md:leading-[19.6px] xl:text-[16px] xl:leading-[22.4px]">
                      <td className="px-6 py-2">
                        <div>No Customers Found</div>
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

export default CustomersTable;
