import React from "react";
import { useQuery, useQueryClient } from "react-query";
import { api } from "../api";
import { filterWithDate } from "./useSupportQuery";

function useBillingQuery(status: string, date: string) {
    return useQuery(["billing-query"], {
        queryFn: async () => {
            const { data } = await api.get("/billing");
            const { data: reviewData } = await api.get("/review");
            return data.map((v: any) => {
                return {
                    ...v,
                    orders: (reviewData || []).filter(
                        (j: any) => j?.orderId?._id === v._id
                    ),
                };
            });
        },
        select: (data) => {
            let newData = filterWithDate(date, data);
            return status === "all"
                ? newData
                : newData?.filter((v: any) => v.status === status);
        },
    });
}

export const useBillingRefetch = () => {
    const queryClient = useQueryClient();
    return async () => {
        await queryClient.refetchQueries(["billing-query"]);
    };
};

export default useBillingQuery;
