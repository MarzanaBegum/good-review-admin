import React, { useState } from "react";
import useOrderQuery from "../../../api-query/useOrderQuery";
import RecentOrderTable from "../../../components/RecentOrderTable";
import DashboardLayout from "../../../components/Shared/DashboardLayout";
import TopSection from "../../../components/TopSection";
import { orderFilter } from "../../../utils/const";

const OrdersPage = () => {
  const [statusType, setStatusType] = useState("all");
  const [date, setDate] = useState("month");

  const { data, isLoading,refetch } = useOrderQuery(statusType, date);
  // console.log("data...", data);
  return (
    <>
      <DashboardLayout>
        <TopSection
          title={"Orders"}
          statusFilterOptions={orderFilter}
          statusDefaultValue={orderFilter[0]}
          statusOnChange={(e: any) => setStatusType(e.value)}
          dateOnChange={(e: any) => setDate(e.value)}
        />
        <RecentOrderTable
          orderData={data}
          isLoading={isLoading}
          isPagination={true}
          orderRefetch={refetch}
        />
      </DashboardLayout>
    </>
  );
};

export default OrdersPage;
