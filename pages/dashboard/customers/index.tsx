import React, { useState } from "react";
import { useQuery } from "react-query";
import CustomersQuery from "../../../api-query/CustomersQuery";
import CustomersTable from "../../../components/Customers/CustomersTable";
import DashboardLayout from "../../../components/Shared/DashboardLayout";
import TopSection from "../../../components/TopSection";
import { customerFilter } from "../../../utils/const";

const CustomersPage = () => {
  const [customersType, setCustomersType] = useState("all");
  const [date, setDate] = useState("month");
  // console.log(customersType, date);
  const {data, isLoading, refetch} = useQuery(["get customers"], CustomersQuery(customersType,date));
  return (
    <>
      <DashboardLayout>
        <TopSection
          title={"Customers"}
          statusFilterOptions={customerFilter}
          statusDefaultValue={customerFilter[0]}
          statusOnChange={(e:any) => setCustomersType(e.value)}
          dateOnChange={(e:any) => setDate(e.value)}
        />
        <CustomersTable dataTable={data} isLoading={isLoading} refetch={refetch}/>
      </DashboardLayout>
    </>
  );
};

export default CustomersPage;
