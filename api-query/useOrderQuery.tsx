import { api } from "../api";
import { useQuery } from "react-query";
import { getFilterMilis } from "./recentOrderQuery";

const ORDER_KEY = "order-key";

const useOrderQuery = (status?: any, date?: any) =>
  useQuery([ORDER_KEY], {
    queryFn: async () => {
      const { data } = await api.get("/review");
      return data;
    },
    select(data) {
      if (!status && !date) return data;

      const nowMilis = Date.now();
      const prevMilis = getFilterMilis(date);
      const filterMilis = nowMilis - prevMilis;

      return data.filter((v: any) => {
        const dataMilis = new Date(v.createdAt).getTime();
        if (dataMilis > filterMilis) {
          if (status === "all") {
            return v;
          } else {
            return v.status === status;
          }
        }
      });
    },
  });

export default useOrderQuery;
