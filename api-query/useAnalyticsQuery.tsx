import { useQuery, useQueryClient } from "react-query";
import { api } from "../api";
import { filterWithDate } from "./useSupportQuery";

const DASHBOARD_QUERY = "dashboard-query-key-5136";

function useAnalyticsQuery(filter?: string) {
    return useQuery([DASHBOARD_QUERY], {
        queryFn: async () => {
            const { data } = await api.get("/analytics");
            return data;
        },
        select(data) {
            let reviews: any[] = filter
                ? filterWithDate(filter, data.reviews)
                : data.reviews;

            const billing: any[] = filter
                ? filterWithDate(filter, data.billingHistory)
                : data.billingHistory;

            console.log("___reviews", reviews);

            let cardData = {
                revenue: 0,
                orders: 0,
                pendingOrders: 0,
                purchaser: 0,
            };

            let purchaser: any[] = [];

            billing.forEach((v: any) => {
                if (v.status === "completed") {
                    cardData.revenue += v.amount;
                }
            });

            reviews.forEach((v) => {
                cardData.orders += 1;
                if (!purchaser.includes(v?.buyer?._id)) {
                    cardData.purchaser += 1;
                    purchaser.push(v?.buyer?._id);
                }

                if (v.status === "pending" || v.status === "in progress") {
                    cardData.pendingOrders += 1;
                    console.log(v);
                }
            });

            let chartData: any = {
                index: [],
                data: [],
            };

            let date = new Date();
            for (let i = 0; i <= 11; i++) {
                chartData.index.push(
                    MonthArr[date.getMonth()] + " " + date.getFullYear()
                );
                let amount = 0;
                (data.billingHistory || []).forEach((v: any) => {
                    const dataDate = new Date(v.createdAt);
                    if (
                        dataDate.getMonth() === date.getMonth() &&
                        dataDate.getFullYear() === date.getFullYear()
                    ) {
                        amount += v.amount;
                    }
                });
                chartData.data.push(amount);
                date.setTime(date.getTime() - 2629800000);
            }

            return { cardData, recentOrders: reviews, chartData };
        },
    });
}

export const MonthArr = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "June",
    "July",
    "Aug",
    "Sept",
    "Oct",
    "Nov",
    "Dec",
];

export function useAnalyticsRefetch() {
    const queryClient = useQueryClient();
    queryClient.refetchQueries([DASHBOARD_QUERY]);
}

export default useAnalyticsQuery;
