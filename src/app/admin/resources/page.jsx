import { Button } from "@/components/ui/button";
import AnimatedTabs from "./_components/AnimatedTabs";
import { ArrowRight } from "lucide-react";
import { ChannelsAccordion } from "./_components/ChannelsAccordion";

export const metadata = {
    title: "Virtual-Classroom",
};

export default function Page() {
    return (
        <>
            <div className="px-8 py-6 overflow-x-hidden">
                <div className="min-h-82 rounded-3xl bg-[url(/images/dashboard/banner.png)] bg-(--blue2) bg-cover bg-center p-3 flex flex-col justify-center items-center">
                    <h1 className="text-[48px] font-normal text-transparent bg-clip-text bg-[linear-gradient(90deg,#FFFFFF_0%,#23A5E7_50%,#23A5E7_100%)]">
                        Train with the Best
                    </h1>
                    <p className="text-[20px] font-normal text-(--grey1) mt-2">
                     Join Thousands of Healthcare Professionals In Live
                    </p>

                    <div className="flex items-center gap-3 mt-8">
                        <Button className='h-12 text-[16px] font-normal'>Start Classroom</Button>
                        <Button variant="secondary" className='h-12 text-[16px] font-normal'>Become an Investor</Button>
                    </div>
                </div>

                <div className="mt-6">
                    <AnimatedTabs />
                </div>
            </div>

            <div className="bg-(--dark4) border-l border-(--dark2) px-3 py-4">

                <div className="flex items-center gap-2">
                    <ArrowRight size={24} className="text-(--grey1) cursor-pointer" />
                    <h2 className='text-white text-[18px] font-normal'>
                        Channels
                    </h2>
                </div>

                <ChannelsAccordion />

            </div>

        </>
    )
}