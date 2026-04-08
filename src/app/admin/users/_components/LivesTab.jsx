'use client'
import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { MoreVertical, ExternalLink } from "lucide-react";
import { liveCards } from "@/app/data/cards";

const subTabs = [
    { id: "upcoming", label: "Upcoming Lives" },
    { id: "ongoing", label: "On Going Live" },
];

const sidebarInfo = {
    location: "Melbourne, Australia",
    locationFlag: "🌏",
    company: "Aga Khan University Hospital",
    designation: "Senior Doctor",
    email: "dr.james.smith@email.com",
    phone: "(555) 987-6543",
    website: "jayawillis.com",
};

export default function LivesTab() {
    const [activeSubTab, setActiveSubTab] = useState(subTabs[0].id);

    const upcomingCards = useMemo(() => liveCards.filter((c) => !c.isLive), []);
    const ongoingCards = useMemo(() => liveCards.filter((c) => c.isLive), []);

    const displayCards = activeSubTab === "upcoming" ? upcomingCards : ongoingCards;

    return (
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-6 mt-6">
            {/* ─── Left Column ─── */}
            <div>
                {/* Sub Tabs */}
                <div className="flex items-center gap-2 mb-6">
                    {subTabs.map((tab) => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveSubTab(tab.id)}
                            className="relative cursor-pointer px-5 py-4 text-[13px] font-medium rounded-[12px] transition-colors"
                            style={{ WebkitTapHighlightColor: "transparent" }}
                        >
                            {/* Animated background */}
                            {activeSubTab === tab.id && (
                                <motion.span
                                    layoutId="lives-sub-tab"
                                    className="absolute inset-0 rounded-[12px] bg-(--blue1)"
                                    transition={{ type: "spring", bounce: 0.2, duration: 0.5 }}
                                />
                            )}
                            <span
                                className={`relative z-10 ${activeSubTab === tab.id
                                    ? "text-white"
                                    : "text-(--grey19)"
                                    }`}
                            >
                                {tab.label}
                            </span>
                        </button>
                    ))}
                </div>

                {/* Tab Content */}
                <AnimatePresence mode="wait">
                    <motion.div
                        key={activeSubTab}
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -8 }}
                        transition={{ duration: 0.2 }}
                    >
                        <div className="space-y-12">
                            {displayCards.map((card) => (
                                <LiveCard key={card.id} card={card} />
                            ))}
                        </div>
                    </motion.div>
                </AnimatePresence>
            </div>

            {/* ─── Right Column — General Information Sidebar ─── */}
            <div className="rounded-[8px] shadow-[0px_1px_2px_0px_#0000000D] bg-(--dark4) p-5 h-fit">
                <h3 className="text-[16px] font-medium text-(--grey1) mb-5">
                    General Information
                </h3>
                <div className="space-y-5">
                    <SidebarRow
                        label="Location"
                        value={
                            <span className="flex items-center gap-1.5">
                                <span>{sidebarInfo.locationFlag}</span>
                                {sidebarInfo.location}
                            </span>
                        }
                    />
                    <SidebarRow label="Company" value={sidebarInfo.company} />
                    <SidebarRow label="Designation" value={sidebarInfo.designation} />
                    <SidebarRow label="Email Address" value={sidebarInfo.email} />
                    <SidebarRow label="Phone Number" value={sidebarInfo.phone} />
                    <SidebarRow
                        label="Website"
                        value={
                            <a
                                href={`https://${sidebarInfo.website}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-1.5 text-(--blue1) hover:underline"
                            >
                                {sidebarInfo.website}
                                <ExternalLink size={13} />
                            </a>
                        }
                    />
                </div>
            </div>
        </div>
    );
}

/* ─── Unified Live Card ─── */
function LiveCard({ card }) {
    return (
        <div>
            {/* Thumbnail area */}
            <div className="relative w-full h-[220px] rounded-xl overflow-hidden bg-[#0a0a0a]">
                {card.isLive ? (
                    <>
                        {/* Actual thumbnail for live */}
                        <Image
                            src={card.thumbnail}
                            alt={card.title}
                            fill
                            className="object-cover"
                        />
                        {/* LIVE badge */}
                        <div className="absolute top-3 left-3 z-10 flex items-center gap-1.5 bg-[#CF000026] backdrop-blur-[12px] rounded-md px-2.5 py-1">
                            <span className="h-[8px] w-[8px] rounded-full bg-red-500 animate-pulse" />
                            <span className="text-[11px] font-bold text-white uppercase tracking-wide">
                                Live
                            </span>
                        </div>
                    </>
                ) : (
                    /* Scheduled overlay for upcoming */
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                        <p className="text-[14px] font-normal text-(--grey1)">Scheduled for</p>
                        <p className="text-[18px] font-semibold text-white mt-1">
                            {card.upComing}
                        </p>
                    </div>
                )}

                {/* Bottom bar — avatar + name + menu */}
                <div className="absolute bottom-0 left-0 right-0 flex items-center justify-between px-4 py-3 bg-gradient-to-t from-black/80 to-transparent">
                    <div className="flex items-center gap-2.5">
                        <div className="h-[34px] w-[34px] rounded-full overflow-hidden shrink-0">
                            <Image
                                src={card.avatar}
                                alt={card.name}
                                width={34}
                                height={34}
                                className="object-cover"
                            />
                        </div>
                        <div>
                            <p className="text-[16px] font-semibold text-white ">
                                {card.name}
                            </p>
                            <p className="text-[12px] font-normal text-(--light2)">
                                {card.specialization}
                            </p>
                        </div>
                    </div>
                    <button className="cursor-pointer text-white/70 hover:text-white transition">
                        <MoreVertical size={18} />
                    </button>
                </div>
            </div>

            {/* Info below card */}
            <div className="mt-5 px-1">
                <p className="text-[20px] font-semibold text-(--grey1)">
                    {card.title}
                </p>
                {card.isLive ? (
                    <div className="flex items-center gap-2 mt-5">
                        <span className="text-[16px] font-normal text-(--grey1)">
                            {card.viewers} viewers
                        </span>
                        <span className="h-[7px] w-[7px] rounded-full bg-(--grey5)" />
                        <span className="text-[16px] font-normal text-(--grey1)">
                            {card.time}
                        </span>
                    </div>
                ) : (
                    <p className="text-[13px] font-normal text-(--grey1) mt-5">
                        Will be live on {card.upComing}
                    </p>
                )}
            </div>
        </div>
    );
}

/* ─── Sidebar Row ─── */
function SidebarRow({ label, value }) {
    return (
        <div>
            <p className="text-[14px] font-medium text-(--grey1) mb-0.5">{label}</p>
            <p className="text-[16px] font-medium text-(--grey1)">{value}</p>
        </div>
    );
}