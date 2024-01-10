import { UseQueryOptions } from "react-query";
import { api } from "../api";

const CustomersQuery: (userStatus?: any, dateFilter?: any) => UseQueryOptions<any, any, any, any> = (
    userStatus, dateFilter
) => ({
    queryFn: async () => {
        const { data } = await api.get(`/user/all`);
        return data;

    },
    select(data) {
        if (!userStatus && !dateFilter) return data;

        const nowMilis =Date.now();
        const prevMilis = getFilterMilis(dateFilter);
        const filterMilis = nowMilis - prevMilis;

        return data.filter((v: any) => {
            const dataMilis = new Date(v.createdAt).getTime();
            if (dataMilis > filterMilis) {
                if (userStatus === "all") {
                    return v;
                } else {
                    return v.status === userStatus;
                }
            }
        });
    },
});

export default CustomersQuery;



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
