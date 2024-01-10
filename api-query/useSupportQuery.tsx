import { useQuery, useQueryClient } from "react-query";
import { api } from "../api";

const SUPPORT_QUERY_KEY = ["support-query-key"];

export type SupportFilter = {
    status: "all";
    date: "month";
};

function useSupportQuery(filter?: SupportFilter) {
    console.log(filter);
    return useQuery<SupportData[]>(SUPPORT_QUERY_KEY, {
        queryFn: async () => {
            const { data } = await api.get("/ticket");
            return data;
        },
        select: (data) => {
            if (!filter) return data;
            let newData = filterWithDate(filter.date, data);
            newData =
                filter.status === "all"
                    ? newData
                    : newData.filter((v) => v.status === filter.status);
            return newData;
        },
    });
}

export function filterWithDate<T>(date: string, data: T[]): T[] {
    const nowMilis = Date.now();
    const prevMilis = getFilterMilis(date);
    const filterMilis = nowMilis - prevMilis;

    return data.filter((v: any) => {
        const dataMilis = new Date(v.createdAt).getTime();
        if (dataMilis > filterMilis) {
            return v;
        }
    });
}

const getFilterMilis = (filter: string): number => {
    switch (filter) {
        case "month":
            return 2592000000;
        case "hour":
            return 3600000;
        case "week":
            return 604800000;
        case "year":
            return 31536000000;
        case "day":
            return 86400000;
        default:
            return 0;
    }
};

export function useSupportRefetch() {
    const queryClient = useQueryClient();
    return async () => {
        await queryClient.refetchQueries(SUPPORT_QUERY_KEY);
    };
}

export interface UserId {
    _id: string;
    firstName: string;
    lastName: string;
    email: string;
}

export interface Chat {
    type: string;
    text: string;
}

export interface SupportData {
    _id: string;
    userId: UserId;
    subject: string;
    relatedOrder: string;
    status: string;
    ticketNo: number;
    chats: Chat[];
    files: string[];
    createdAt: Date;
    updatedAt: Date;
    __v: number;
}

export default useSupportQuery;
