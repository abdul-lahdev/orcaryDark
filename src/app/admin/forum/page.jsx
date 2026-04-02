import AnimatedTabs from "./_components/AnimatedTabs";
import { ArrowRight } from "lucide-react";
import { ChannelsAccordion } from "./_components/ChannelsAccordion";

export const metadata = {
    title: "Forum",
};

export default function Page() {
    return (
        <>
            <div className="px-8 py-6 overflow-x-hidden">
                    <AnimatedTabs />
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