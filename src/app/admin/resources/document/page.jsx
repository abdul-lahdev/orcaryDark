"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { MoveRight } from "lucide-react";
import { MoreVertical } from 'lucide-react';
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { ChannelsAccordion } from "../_components/ChannelsAccordion";
import { liveCards } from '@/app/data/cards';





// export const metadata = {
//     title: "Virtual-Classroom",
// };


const tabs = [
    { id: "Cardiology", label: "Cardiology" },
    { id: "Dermatology", label: "Dermatology" },
    { id: "Endocrinology", label: "Endocrinology" },
    { id: "Gastroenterology", label: "Gastro" },
    { id: "Hematology", label: "Hematology" },
    { id: "Operations", label: "Operations" },
    { id: "Immunology", label: "immunology" },
    { id: "Ophthalmology", label: "ophthalmology" },

];

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




export const AnimatedTabs=()=> {



    let [activeTab, setActiveTab] = useState(tabs[0].id);

      const filteredDocument = liveCards.filter(
        (item) => item.docType === "document" && item.category === activeTab
    );



    return (
        <div className="space-y-4">
            <div className="w-full overflow-hidden">
                <div className="flex flex-row space-x-2 p-1 overflow-x-scroll no-scrollbar">
                    {tabs.map((tab) => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={`${activeTab === tab.id ? "text-white" : "text-(--grey1) hover:text-white/60"
                                } relative rounded-[12px] cursor-pointer px-4 py-2 text-sm font-medium transition focus-visible:outline-2 outline-sky-400`}
                            style={{ WebkitTapHighlightColor: "transparent" }}
                        >
                            {activeTab === tab.id && (
                                <motion.span
                                    layoutId="bubble"
                                    className="absolute rounded-[12px]  inset-0 z-10 bg-(--blue1)" // Blue background jo move karega
                                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                                />
                            )}
                            <span className="relative z-20">{tab.label}</span>
                        </button>
                    ))}
                </div>
            </div>

            <div className="min-h-75 mt-3">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={activeTab}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.3 }}
                    >

                      <div className="flex justify-between items-center mt-10">
                            <h2 className="text-white text-[24px] font-semibold">
                                Document
                            </h2>
                           

                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-4">

                            {
                                filteredDocument.length > 0 ? (
                                    filteredDocument.map((item) => (
                                        <div
                                            key={item.id}
                                            className="shadow-[0px_0px_25px_0px_#c2d4de0a] hover:bg-(--dark3) rounded-[12px] bg-transparent p-3 transition-all duration-300 hover:-translate-y-1.5 cursor-pointer"
                                        >
                                            <VideoCard item={item} />
                                        </div>
                                    ))
                                ) : (
                                    <div className="text-center text-zinc-400 py-10">
                                        No Document available in this category
                                    </div>
                                )
                            }
                        </div>

                      

                    </motion.div>
                </AnimatePresence>
            </div>
        </div>
    );
}

export const VideoCard = ({ item }) => {
    const { id, isLive, thumbnail, avatar, name, docType, specialization, title, viewers, time } = item;
    return (
        <Link href={`/admin/resources/document/${id}`} className="w-full group cursor-pointer">
            <div className="relative aspect-video rounded-[12px] overflow-hidden">
                <Image src={thumbnail || "/images/classRoom/thumbnail.jpg"} alt="Video Thumbnail" width={376} height={227} className="w-full h-full object-cover" />

                {isLive && <div className="absolute top-3 left-3 flex items-center gap-1.5 bg-(--red3) backdrop-blur-md px-2 py-1 rounded-[4px]">
                    <div className="size-2 bg-(--red2) rounded-full animate-pulse border border-white" />
                    <span className="text-white text-[12px] font-semibold uppercase">Live</span>
                </div>}

                <div className="absolute inset-0 bg-linear-to-t from-black/90 via-black/20 to-transparent flex flex-col justify-end px-4 pb-2">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            {/* Profile Image */}
                            <div className="relative w-10 h-10 overflow-hidden rounded-full">
                                <Image
                                    src={avatar || "/images/classRoom/avator.png"}
                                    fill
                                    className="object-cover"
                                    alt="avatar"
                                />
                            </div>



                            <div>
                                <h4 className="text-white text-[16px] font-semibold">{name}</h4>
                                <p className="text-(--light2) text-[12px] font-normal">{specialization}</p>
                            </div>
                        </div>

                        <button className="text-white/80 hover:text-white transition-colors">
                            <MoreVertical size={18} />
                        </button>
                    </div>
                </div>
            </div>

            <div className="px-2 py-5 space-y-2">
                <h3 className="text-(--grey1) text-[20px] font-semibold leading-snug line-clamp-2 transition-colors">
                    {title}
                </h3>

                <div className="flex items-center gap-2 text-(--grey1) text-[12px]">
                    <span>{viewers} viewers</span>
                    <div className="size-2 bg-white rounded-full" />
                    <span>{time}</span>
                </div>
            </div>
        </Link>
    );
};