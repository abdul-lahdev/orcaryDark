"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Eye } from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { accordionData } from "@/app/data/classRoom";


const Accordion = ({ i, expanded, setExpanded, title, children }) => {
    const isOpen = expanded.includes(i);

    const toggle = () => {
        setExpanded((prev) =>
            prev.includes(i) ? prev.filter((x) => x !== i) : [...prev, i]
        );
    };

    return (
        <div className="border-b border-white/5 last:border-0 overflow-hidden">
            <motion.header
                initial={false}
                className="flex items-center justify-between p-4 cursor-pointer hover:bg-white/5 transition-colors"
                onClick={toggle}
            >
                <div className="flex items-center gap-2">
                    {title.toLowerCase().includes("live") && (
                        <div className="w-1.5 h-1.5 bg-red-500 rounded-full animate-pulse" />
                    )}
                    <span
                        className={`text-[13px] font-semibold uppercase tracking-wider ${isOpen ? "text-(--blue1)" : "text-(--grey1)"
                            }`}
                    >
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
                            collapsed: { opacity: 0, height: 0 },
                        }}
                        transition={{ duration: 0.35, ease: [0.04, 0.62, 0.23, 0.98] }}
                    >
                        <div className="px-2 pb-4 space-y-5">{children}</div>
                    </motion.section>
                )}
            </AnimatePresence>
        </div>
    );
};

export const ChannelsAccordion = () => {
    const [expanded, setExpanded] = useState([0, 1, 2]);

    const liveSessions = accordionData.filter(
        (item) => item.type === "liveSession" && item.isLive
    );

    const classRooms = accordionData.filter(
        (item) => item.type === "classRoom" && item.isLive
    );

    const offline = accordionData.filter((item) => !item.isLive);

    return (
        <div className="w-full bg-transparent mt-5">
            {/* 1) Live Sessions */}
            <Accordion
                i={0}
                expanded={expanded}
                setExpanded={setExpanded}
                title="Live sessions"
            >
                {liveSessions.length ? (
                    liveSessions.map((item) => <UserRow key={item.id} item={item} />)
                ) : (
                    <EmptyRow text="No live sessions" />
                )}
            </Accordion>

            {/* 2) Class Room */}
            <Accordion
                i={1}
                expanded={expanded}
                setExpanded={setExpanded}
                title="Class Room"
            >
                {classRooms.length ? (
                    classRooms.map((item) => <UserRow key={item.id} item={item} />)
                ) : (
                    <EmptyRow text="No live classrooms" />
                )}
            </Accordion>

            {/* 3) Offline */}
            <Accordion i={2} expanded={expanded} setExpanded={setExpanded} title="Offline">
                {offline.length ? (
                    offline.map((item) => <UserRow key={item.id} item={item} />)
                ) : (
                    <EmptyRow text="No offline sessions" />
                )}
            </Accordion>
        </div>
    );
};

const EmptyRow = ({ text }) => (
    <div className="px-3 py-4 text-[12px] text-(--grey1)">{text}</div>
);

// User row component
const UserRow = ({ item }) => {
    const { name, desc, isLive, views, imgUrl } = item;

    return (
        <div className="flex items-center gap-3 justify-between px-3">
            <div className="flex items-center gap-2">
                <div className="relative">
                    <span
                        className={`size-3 block border-2 rounded-full absolute bottom-0 right-0 z-10 ${isLive
                            ? "border-(--dark3) bg-(--red1)"
                            : "border-(--dark3) bg-(--dark3)"
                            }`}
                    />
                    <Avatar
                        className={`size-10 border-2 ${isLive ? "border-(--red1)" : "opacity-50 border-white/10"
                            }`}
                    >
                        <AvatarImage src={imgUrl} />
                        <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                </div>

                <div className="flex flex-col">
                    <h1 className={`text-sm font-normal ${isLive ? "text-white" : "text-(--grey1)"}`}>
                        {name}
                    </h1>
                    <p className="text-[11px] font-normal text-(--grey1)">{desc}</p>
                </div>
            </div>

            {isLive && (
                <div className="flex items-center gap-1">
                    <Eye size={15} className="text-white" />
                    <span className="text-[10px] text-white">{views}</span>
                </div>
            )}
        </div>
    );
};
