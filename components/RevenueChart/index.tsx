import React from "react";

import dynamic from "next/dynamic";
const ReactApexChart = dynamic(() => import("react-apexcharts"), {
    ssr: false,
});

const RevenueChart = ({ chartData }: any) => {
    const state: any = {
        series: [
            {
                name: "revenue",
                data: chartData?.data,
            },
        ],
        options: {
            chart: {
                height: 242,
                type: "line",
                zoom: {
                    enabled: false,
                },
            },
            colors: ["#18BA33", "#18BA33"],
            dataLabels: {
                enabled: false,
            },
            stroke: {
                curve: "smooth",
                width: 2,
            },
            title: {
                text: "Sales Revenue",
                align: "left",
            },
            grid: {
                padding: {
                    left: -16,
                },
                row: {
                    colors: ["white", "transparent"],
                    opacity: 0.5,
                },
            },

            xaxis: {
                categories: chartData?.index,
            },
        },
    };
    return (
        <div className="bg-white px-0 lg:px-[24px] py-[16px] lg:py-[32px] rounded-[6px] border  border-[#E4E4E7] w-[100%]">
            <div id="chart">
                <ReactApexChart
                    width="100%"
                    options={state.options}
                    series={state.series}
                    type="line"
                    height={242}
                />
            </div>
        </div>
    );
};

export default RevenueChart;
