"use client";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip } from "chart.js";

ChartJS.register(ArcElement, Tooltip);

export default function ClaimsChart() {
    const data = {
        labels: ["Free", "Pro"],
        datasets: [
            {
                // Data ko image ke ratio ke mutabiq set kiya hai
                data: [65, 35],
                backgroundColor: ["#23A5E7", "#fff"],
                borderWidth: 0,
                cutout: "65%", // Andar ka circle bada karne ke liye
                borderRadius: 5,
                spacing: 5, // Slices ke darmiyan gap
            },
        ],
    };

    const options = {
        responsive: true,
        maintainAspectRatio: false, // Size control karne ke liye lazmi hai
        plugins: {
            legend: { display: false },
        }
    };

    return (
        <div className="bg-(--dark3) rounded-2xl w-full h-full flex flex-col gap-6">
            <h3 className="text-[18px] font-bold text-white mb-5">Free To Pro Ratio</h3>

            <div className="flex items-center justify-center gap-4 h-full">
                {/* Chart Container - Size control yahan se ho rha hai */}
                <div className="w-1/2 h-full">
                    <Doughnut data={data} options={options} />
                </div>

                {/* Right Side Custom Legend */}
                <div className="flex flex-col gap-4 ">
                    <div className="flex items-center gap-3">
                        <div className="w-3 h-3 rounded-sm bg-[#23A5E7]"></div>
                        <span className="text-(--grey1) text-sm font-medium">Free</span>
                    </div>
                    <div className="flex items-center gap-3">
                        <div className="w-3 h-3 rounded-sm bg-white"></div>
                        <span className="text-(--grey1) text-sm font-medium">Pro</span>
                    </div>
                </div>
            </div>
        </div>
    );
}