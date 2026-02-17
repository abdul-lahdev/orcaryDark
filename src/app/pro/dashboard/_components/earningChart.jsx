"use client";
import React from "react";
import dynamic from "next/dynamic";

// ApexCharts ko dynamic load karna zaroori hai Next.js mein
const ReactApexChart = dynamic(() => import("react-apexcharts"), {
    ssr: false,
});

const EarningsChart = () => {
    // Data values jo wave pattern banayenge
    const dataValues = [450, 430, 520, 510, 460, 480, 550, 530, 490, 600, 570, 620, 590, 720, 680, 670, 720, 750, 830, 680, 780, 740, 710, 770, 710, 730, 790, 750, 850, 780, 820, 880];

    const chartOptions = {
        chart: {
            type: "area",
            height: 350,
            toolbar: { show: false },
            background: "transparent",
            zoom: { enabled: false },
        },
        colors: ["#23A5E7"], // Aapka primary blue color
        dataLabels: { enabled: false },
        stroke: {
            curve: "smooth", // Isse wavy line banti hai
            width: 3,
        },
        fill: {
            type: "gradient",
            gradient: {
                shadeIntensity: 1,
                opacityFrom: 0.3, // Neeche se halka transparent gradient
                opacityTo: 0,
                stops: [0, 90, 100],
            },
        },
        grid: {
            show: false, // Lines remove kar di screenshot ki tarah
        },
        xaxis: {
            categories: [
                "3 Jul", "", "", "7 Jul", "", "", "11 Jul", "", "", "15 Jul", "", "",
                "19 Jul", "", "", "23 Jul", "", "", "27 Jul", "", "", "31 Jul"
            ],
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
            min: 0,
            max: 1000,
            tickAmount: 5,
            labels: {
                style: {
                    colors: "#8E8E93",
                    fontSize: "12px",
                },
                formatter: (val) => val === 0 ? "0" : `${val}`,
            },
        },
        tooltip: {
            theme: "dark",
            x: { show: true },
        },
    };

    const chartSeries = [
        {
            name: "Earnings",
            data: dataValues,
        },
    ];

    return (
        <div className="bg-(--dark3) rounded-2xl w-full">
            <h3 className="text-[18px] font-bold text-white  mb-2">Earnings per Month</h3>
            <div className="h-75 w-full relative">
                <span className="absolute -rotate-90 left-0 -translate-x-9 top-[50%] text-(--grey1) text-[12px] font-medium">Amount ($000)</span>

                <ReactApexChart
                    options={chartOptions}
                    series={chartSeries}
                    type="area"
                    height="100%"
                    className='pl-2'
                />
            </div>
        </div>
    );
};

export default EarningsChart;