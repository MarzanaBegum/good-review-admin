import React, { useMemo, useState } from "react";
import useOrderQuery from "../../../api-query/useOrderQuery";
import DashboardLayout from "../../../components/Shared/DashboardLayout";
import TopSection from "../../../components/TopSection";
import TransactionTable from "../../../components/Transactions/TransactionTable";
import { transactionFilter } from "../../../utils/const";
import useBillingQuery from "../../../api-query/useBillingQuery";

function TransactionsPage() {
    const [statusType, setStatusType] = useState("all");
    const [date, setDate] = useState("month");

    // filter by order status type
    const { data, refetch, isLoading } = useBillingQuery(statusType, date);

    return (
        <>
            <DashboardLayout>
                <TopSection
                    title={"Transactions"}
                    statusFilterOptions={transactionFilter}
                    statusDefaultValue={transactionFilter[0]}
                    statusOnChange={(e: any) => setStatusType(e.value)}
                    dateOnChange={(e: any) => setDate(e.value)}
                />
                <TransactionTable
                    transactionData={data}
                    isLoading={isLoading}
                    refetch={refetch}
                />
            </DashboardLayout>
        </>
    );
}

export default TransactionsPage;
