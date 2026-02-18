"use client";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import Link from "next/link";
import { MoveRight } from "lucide-react";
import { MoreVertical } from 'lucide-react';
import Image from "next/image";

import { liveCards } from '@/app/data/cards';


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

// const liveCards = [
//     {
//         id: 1,
//         isLive: true,
//         thumbnail: "/images/classRoom/thumbnail.jpg",
//         avatar: "/images/classRoom/avator.png",
//         name: "Mathew Helms",
//         docType: 'video',
//         category: 'Cardiology',
//         specialization: "Neurology Specialist",
//         title: "Intro to Neuroanatomy | Neurophysiology | Neuroscience",
//         viewers: 453,
//         time: "Streaming 12:10 PM",
//     },
//     {
//         id: 2,
//         isLive: false,
//         thumbnail: "/images/classRoom/thumbnail2.jpg",
//         avatar: "/images/classRoom/avator.png",
//         name: "Dr. Sarah Khan",
//         docType: 'video',
//         category: 'Cardiology',
//         specialization: "Cardiologist",
//         title: "Heart Diseases & ECG Interpretation",
//         viewers: 312,
//         time: "Streaming 1:00 PM",
//     },
//     {
//         id: 3,
//         isLive: false,
//         thumbnail: "/images/classRoom/thumbnail3.jpg",
//         avatar: "/images/classRoom/avator.png",
//         name: "Dr. Ali Khan",
//         docType: 'document',
//         category: 'Cardiology',
//         specialization: "Cardiologist",
//         title: "Heart Diseases & ECG Interpretation",
//         viewers: 312,
//         time: "Streaming 1:00 PM",
//     },
// ];




export default function AnimatedTabs() {



    let [activeTab, setActiveTab] = useState(tabs[0].id);

    const filteredVideos = liveCards.filter(
        (item) => item.docType === "video" && item.category === activeTab
    );
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

                        <div className="flex justify-between items-center">
                            <h2 className="text-white text-[24px] font-semibold">
                                Video
                            </h2>
                            <Link
                                href='/'
                                className="group flex items-center gap-2 text-(--blue1) text-[15px] font-normal"
                            >
                                <span className="group-hover:underline">See All</span>

                                <span className="transform transition-transform duration-300 group-hover:translate-x-1.5">
                                    <MoveRight size={18} />
                                </span>
                            </Link>

                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-4">

                            {
                                filteredVideos.length > 0 ? (
                                    filteredVideos.map((item) => (
                                        <div
                                            key={item.id}
                                            className="shadow-[0px_0px_25px_0px_#c2d4de0a] hover:bg-(--dark3) rounded-[12px] bg-transparent p-3 transition-all duration-300 hover:-translate-y-1.5 cursor-pointer"
                                        >
                                            <VideoCard item={item} />
                                        </div>
                                    ))
                                ) : (
                                    <div className="text-center text-zinc-400 py-10">
                                        No videos available in this category
                                    </div>
                                )
                            }

                        </div>

                        <div className="flex justify-between items-center mt-10">
                            <h2 className="text-white text-[24px] font-semibold">
                                Document
                            </h2>
                            <Link
                                href='/'
                                className="group flex items-center gap-2 text-(--blue1) text-[15px] font-normal"
                            >
                                <span className="group-hover:underline">See All</span>

                                <span className="transform transition-transform duration-300 group-hover:translate-x-1.5">
                                    <MoveRight size={18} />
                                </span>
                            </Link>

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
        <Link href={`/admin/virtual-classroom/${id}`} className="w-full group cursor-pointer">
            <div className="relative aspect-video rounded-[12px] overflow-hidden border border-white/5">
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