"use client";
import React from "react";
import dynamic from "next/dynamic";

const ReactApexChart = dynamic(() => import("react-apexcharts"), {
    ssr: false,
});

const SubscriptionChart = () => {
    const dataValues = [850, 980, 750, 900, 750, 950, 860, 900];

    const [state] = React.useState({
        series: [
            {
                name: "Subscriptions",
                data: dataValues,
            },
        ],

        options: {
            chart: {
                type: "bar",
                toolbar: { show: false },
                background: "transparent",
            },

            plotOptions: {
                bar: {
                    horizontal: false,
                    columnWidth: "55%", // Bars ko thoda patla kiya hai screenshot ki tarah
                    borderRadius: 8,
                    borderRadiusApplication: "end", // Sirf top par rounded corners
                },
            },

            colors: ["#23A5E7"],

            dataLabels: {
                enabled: false, // Screenshot mein bars ke andar labels nahi hain
            },

            stroke: {
                show: false,
            },

            xaxis: {
                categories: ["3 Jul", "7 Jul", "11 Jul", "15 Jul", "19 Jul", "23 Jul", "27 Jul", "31 Jul"],
                labels: {
                    style: {
                        colors: "#8E8E93", // Softer grey for dates
                        fontSize: "12px",
                    },
                },
                axisBorder: { show: false },
                axisTicks: { show: false },
            },

            yaxis: {
                min: 0,
                max: 1000,
                tickAmount: 5,
                labels: {
                    style: {
                        colors: "#8E8E93",
                        fontSize: "12px",
                    },
                },
            },

            // YAHAN SE LINES REMOVE HONGI
            grid: {
                show: false, // Poora grid hide kar diya
                padding: {
                    left: 0,
                    right: 0
                }
            },

            tooltip: {
                theme: "dark",
                y: {
                    formatter: (val) => `${val}`,
                },
            },
        },
    });

    return (
        <div className="w-full bg-transparent pb-4">
            <h3 className="text-[18px] font-bold text-white  mb-2">Subscriptions per Month</h3>
            <div className="relative">
                <span className="absolute -rotate-90 left-0 -translate-x-9 top-[50%] text-(--grey1) text-[12px] font-medium">Amount ($000)</span>
                <ReactApexChart
                    options={state.options}
                    series={state.series}
                    type="bar"
                    height={350}
                    className='pl-2'
                />
            </div>
        </div>
    );
};

export default SubscriptionChart;