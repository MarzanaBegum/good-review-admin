import React, { useEffect, useState } from "react";
import { dateFilterOptions } from "../../utils/const";
import RecentOrderTable from "../RecentOrderTable";
import RevenueChart from "../RevenueChart";
import SelectDropdown from "../SelectDropdown";
import ItemCard from "./ItemCard";
import Link from "next/link";
import useAnalyticsQuery from "../../api-query/useAnalyticsQuery";

const DashboardPage = () => {
    const [filterValue, setFilterValue] = useState("month");
    const { data: newData, isLoading, refetch } = useAnalyticsQuery(filterValue);

    return (
        <div className="py-[10px] sm:py-[20px] md:py-[30px]">
            <div className="flex justify-between">
                <h2 className="font-medium text-[28px] md:text-[32px] leading-[42px] text-[#031B07]">
                    Dashboard
                </h2>
                <SelectDropdown
                    options={dateFilterOptions}
                    defaultValue={dateFilterOptions[0]}
                    onChange={(e: any) => {
                        setFilterValue(e.value);
                    }}
                    placeholder="All orders"
                />
            </div>

            <ItemCard cardData={newData?.cardData} />
            <div className="mt-[20px]">
                <RevenueChart chartData={newData?.chartData} />
            </div>
            <div className="pt-[30px] lg:pt-[50px] flex justify-between">
                <h1 className="text-[20px] leading-[30px] font-semibold text-[#1F2937]">
                    Recent Orders
                </h1>
                <Link href="/dashboard/orders">
                    <h2 className="text-primary font-medium text-[16px] cursor-pointer">
                        See all
                    </h2>
                </Link>
            </div>
            <div>
                <RecentOrderTable
                    orderData={newData?.recentOrders}
                    isLoading={isLoading}
                    isPagination={true}
                    orderRefetch={refetch}
                />
            </div>
        </div>
    );
};

export default DashboardPage;
