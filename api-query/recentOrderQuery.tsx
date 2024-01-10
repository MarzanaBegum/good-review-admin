import { UseQueryOptions } from "react-query";
import { api } from "../api";

const recentReviewQuery: (
  filterData?: any
) => UseQueryOptions<any, any, any, any> = (filterData) => ({
  queryFn: async () => {
    const { data } = await api.get("/review");
    return data;
  },
  select(data) {
    if (!filterData) return data;

    const nowMilis = Date.now();
    const prevMilis = getFilterMilis(filterData);
    const filterMilis = nowMilis - prevMilis;

    return data.filter((v: any) => {
      const dataMilis = new Date(v.createdAt).getTime();
      if (dataMilis > filterMilis) {
        return v;
      }
    });
  },
});

export const getFilterMilis = (filter: string): number => {
  switch (filter) {
    case "month":
      return 2.628e9;
    case "hour":
      return 3.6e6;
    case "week":
      return 6.048e8;
    case "year":
      return 3.154e10;
    case "day":
      return 8.64e7;
    default:
      return 0;
  }
};
export default recentReviewQuery;
