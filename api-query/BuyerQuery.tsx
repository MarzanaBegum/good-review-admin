import { UseQueryOptions } from "react-query";
import { api } from "../api";

const BuyerQuery: (tabData?: any) => UseQueryOptions<any, any, any, any> = (
    tabData
) => ({
    queryFn: async () => {
        const { data } = await api.get(`/buyer`);
        return data;
        
    },
    select(data) {
        if(!tabData) return data;
        const filterBuyer = data?.filter((item:any) => item.buyerType === tabData);
        return filterBuyer;

    },
});

export default BuyerQuery;
