"use client";
import * as React from "react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Eye, Radio } from "lucide-react"; // Icons ke liye

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
//Accordion Datra
const accordionData = [
    {
        id: 1,
        name: 'Dr. Marie Dubois',
        desc: 'International Cardiology',
        isLive: false,
        type: 'liveSession',
        views: '1.2k',
        imgUrl: '/images/classRoom/session1.jpg'
    },
    {
        id: 2,
        name: 'Pr. Sophie Laurent',
        desc: 'Neurosurgery',
        isLive: true,
        type: 'liveSession',
        views: '1.3k',
        imgUrl: '/images/classRoom/session2.jpg'
    },
    {
        id: 3,
        name: 'Dr. Ahmed Hassan',
        desc: 'Immunotherapy',
        isLive: true,
        type: 'liveSession',
        views: '1.1k',
        imgUrl: '/images/classRoom/session3.jpg'
    },
    {
        id: 4,
        name: 'Dr. Hamza Hassan',
        desc: 'Immunotherapy',
        isLive: true,
        type: 'classRoom',
        views: '1.2k',
        imgUrl: '/images/classRoom/session4.jpg'
    },
    {
        id: 5,
        name: 'Dr. Mohsin Hassan',
        desc: 'Neurosurgery',
        isLive: false,
        type: 'classRoom',
        views: '1.4k',
        imgUrl: '/images/classRoom/session5.jpg'
    },
    {
        id: 6,
        name: 'Dr. Ovais Khan',
        desc: 'Neurosurgery',
        isLive: false,
        type: 'classRoom',
        views: '1.4k',
        imgUrl: '/images/classRoom/session6.jpg'
    },
    {
        id: 7,
        name: 'Dr. Emma Wilson',
        desc: 'Cosmetic Dermatology',
        isLive: true,
        type: 'classRoom',
        views: '1.4k',
        imgUrl: '/images/classRoom/session7.jpg'
    },
    {
        id: 8,
        name: 'Dr. Jean Martin',
        desc: 'Pediatrics',
        isLive: false,
        type: 'classRoom',
        views: '1.4k',
        imgUrl: '/images/classRoom/session1.jpg'
    },
    {
        id: 9,
        name: 'Dr. Chen Wei',
        desc: 'Radiology',
        isLive: false,
        type: 'classRoom',
        views: '1.4k',
        imgUrl: '/images/classRoom/session1.jpg'
    },
]

const Accordion = ({ i, expanded, setExpanded, title, children }) => {
    const isOpen = i === expanded;

    return (
        <div className="border-b border-white/5 last:border-0 overflow-hidden">
            <motion.header
                initial={false}
                className="flex items-center justify-between p-4 cursor-pointer hover:bg-white/5 transition-colors"
                onClick={() => setExpanded(isOpen ? false : i)}
            >
                <div className="flex items-center gap-2">
                    {/* Live indicator dot agar section 'Live' hai */}
                    {title.toLowerCase().includes("live") && (
                        <div className="w-1.5 h-1.5 bg-red-500 rounded-full animate-pulse" />
                    )}
                    <span className={`text-[13px] font-semibold uppercase tracking-wider ${isOpen ? 'text-(--blue1)' : 'text-(--grey1)'}`}>
                        {title}
                    </span>
                </div>

                <motion.div
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                    className="text-(--grey1)"
                >
                    <ChevronDown size={16} />
                </motion.div>
            </motion.header>

            <AnimatePresence initial={false}>
                {isOpen && (
                    <motion.section
                        key="content"
                        initial="collapsed"
                        animate="open"
                        exit="collapsed"
                        variants={{
                            open: { opacity: 1, height: "auto" },
                            collapsed: { opacity: 0, height: 0 }
                        }}
                        transition={{ duration: 0.4, ease: [0.04, 0.62, 0.23, 0.98] }}
                    >
                        <div className="px-2 pb-4 space-y-5">
                            {children}
                        </div>
                    </motion.section>
                )}
            </AnimatePresence>
        </div>
    );
};

export const ChannelsAccordion = () => {
    const [expanded, setExpanded] = useState(0);


    return (
        <div className="w-full bg-transparent mt-5">
            {/* 1. Live Sessions Section */}
            <Accordion
                i={0}
                expanded={expanded}
                setExpanded={setExpanded}
                title="Live sessions"
            >
                {/* <UserRow name="Dr. Marie Dubois" desc="International Cardiology" isLive={false} /> */}
                {
                    accordionData.map((item) => item.type === 'liveSession' && item.isLive && (
                        <UserRow key={item.id} imgUrl={item.imgUrl} views={item.views} name={item.name} desc={item.desc} isLive={item.isLive} />

                    ))
                }
            </Accordion>

            {/* 2. Class Room Section */}
            <Accordion
                i={1}
                expanded={expanded}
                setExpanded={setExpanded}
                title="Class Room"
            >
                {
                    accordionData.map((item) => item.type === 'classRoom' && item.isLive && (
                        <UserRow key={item.id} imgUrl={item.imgUrl} views={item.views} name={item.name} desc={item.desc} isLive={item.isLive} />

                    ))
                }
            </Accordion>
            <Accordion
                i={2}
                expanded={expanded}
                setExpanded={setExpanded}
                title="Offline"
            >
                {
                    accordionData.map((item) => !item.isLive && (
                        <UserRow key={item.id} imgUrl={item.imgUrl} views={item.views} name={item.name} desc={item.desc} isLive={item.isLive} />

                    ))
                }
            </Accordion>
        </div>
    );
};

// Ek chota helper component user rows ke liye
const UserRow = ({ name, desc, isLive, views, imgUrl }) => (
    // <div className="flex items-center justify-between p-2 rounded-xl hover:bg-white/5 cursor-pointer group">
    //     <div className="flex items-center gap-3">
    //         <div className="relative w-9 h-9 rounded-full bg-white/10 overflow-hidden border border-white/10">
    //             <div className="w-full h-full bg-slate-700" /> {/* Avatar Placeholder */}
    //             {isLive && (
    //                 <div className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 border-2 border-[#121216] rounded-full" />
    //             )}
    //         </div>
    //         <div>
    //             <h4 className="text-white text-[13px] font-medium leading-tight group-hover:text-(--blue1) transition-colors">{name}</h4>
    //             <p className="text-(--grey1) text-[11px]">{desc}</p>
    //         </div>
    //     </div>
    //     {isLive && <span className="text-(--grey1) text-[10px] font-mono">1.3k</span>}
    // </div>

    <div className="flex items-center gap-3 justify-between">
        <div className="flex items-center gap-2">
            <div className="relative">
                <span className={`size-3 block border-2 rounded-full absolute bottom-0 right-0 z-10 ${isLive ? 'border-(--dark3) bg-(--red1)' : 'border-(--dark3) bg-(--dark3)'}`}></span>
                <Avatar className={`size-10 border-2 ${isLive ? 'border-(--red1)' : 'opacity-50'}`}>
                    <AvatarImage src={imgUrl} />
                    <AvatarFallback>CN</AvatarFallback>
                </Avatar>
            </div>
            <div className="flex flex-col">
                <h1 className={`text-sm font-normal ${isLive ? 'text-white' : 'text-(--grey1)'} `}>
                    {name}
                </h1>
                <p className="text-[11px] font-normal text-(--grey1)">{desc}</p>
            </div>
        </div>
        {isLive && <div className="flex items-center gap-1">
            <Eye size={15} className="text-white" />
            <span className="text-[10px] text-white">{views}</span>
        </div>}


    </div>

);