"use client";
import React from "react";
import dynamic from "next/dynamic";

const ReactApexChart = dynamic(() => import("react-apexcharts"), {
    ssr: false,
});

const ActiveUsersChart = () => {
    const [state] = React.useState({
        series: [
            {
                name: "Active Users",
                data: [850, 410, 300, 190], // Data values screenshot ke mutabiq
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
                    horizontal: true, // Bars ko lamba (horizontal) karne ke liye
                    barHeight: "60%", // Bar ki motai
                    borderRadius: 8, // Rounded corners
                    borderRadiusApplication: "end", // Sirf right side rounded
                },
            },
            colors: ["#23A5E7"], // Orcary blue
            dataLabels: {
                enabled: false,
            },
            grid: {
                show: false, // Background lines remove kar di
            },
            xaxis: {
                categories: ["19 Jul", "15 Jul", "11 Jul", "3 Jul"], // Dates labels
                labels: {
                    style: {
                        colors: "#8E8E93",
                        fontSize: "12px",
                    },
                },
                axisBorder: { show: false },
                axisTicks: { show: false },
            },
            yaxis: {
                labels: {
                    style: {
                        colors: "#8E8E93",
                        fontSize: "12px",
                    },
                },
            },
            tooltip: {
                theme: "dark",
            },
        },
    });

    return (
        <div className="bg-(--dark3) rounded-2xl w-full">
            <h3 className="text-[18px] font-bold text-white mb-2">Active Users per Day</h3>
            <div className="h-75 w-full">
                <ReactApexChart
                    options={state.options}
                    series={state.series}
                    type="bar"
                    height="100%"
                />
            </div>
        </div>
    );
};

export default ActiveUsersChart;