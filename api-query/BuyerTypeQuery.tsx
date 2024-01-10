import { UseQueryOptions } from "react-query";
import { api } from "../api";

const BuyerTypeQuery: (tabData?: any) => UseQueryOptions<any, any, any, any> = (
    tabData
) => ({
    queryFn: async () => {
        const { data } = await api.get(`/buyer`);
        const getBuyerType = data?.map((item:any) => item.buyerType);
        return getBuyerType;
        
    }
});

export default BuyerTypeQuery;
