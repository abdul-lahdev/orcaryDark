'use client'
import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { MoreVertical, ExternalLink } from "lucide-react";
import { liveCards } from "@/app/data/cards";

const subTabs = [
    { id: "video", label: "Videos" },
    { id: "document", label: "Documents" },
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

export default function ResourcesTab() {
    const [activeSubTab, setActiveSubTab] = useState(subTabs[0].id);

    const videoCards = useMemo(() => liveCards.filter((c) => c.docType === "video"), []);
    const documentCards = useMemo(() => liveCards.filter((c) => c.docType === "document"), []);

    const displayCards = activeSubTab === "video" ? videoCards : documentCards;

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
                            className="relative cursor-pointer px-5 py-3 text-[13px] font-medium rounded-[8px] transition-colors"
                            style={{ WebkitTapHighlightColor: "transparent" }}
                        >
                            {activeSubTab === tab.id && (
                                <motion.span
                                    layoutId="resources-sub-tab"
                                    className="absolute inset-0 rounded-[8px] bg-(--blue1)"
                                    transition={{ type: "spring", bounce: 0.2, duration: 0.5 }}
                                />
                            )}
                            <span
                                className={`relative z-10 ${activeSubTab === tab.id
                                    ? "text-white"
                                    : "text-(--grey1)"
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
                                <ResourceCard
                                    key={card.id}
                                    card={card}
                                    isVideo={activeSubTab === "video"}
                                />
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

/* ─── Resource Card ─── */
function ResourceCard({ card, isVideo }) {
    return (
        <div>
            {/* Thumbnail area */}
            <div className="relative w-full h-[220px] rounded-xl overflow-hidden bg-[#0a0a0a]">
                <Image
                    src={card.thumbnail}
                    alt={card.title}
                    fill
                    className="object-cover"
                />

                {/* Bottom bar — avatar + name + menu */}
                <div className="absolute bottom-0 left-0 right-0 flex items-center justify-between px-4 py-3 bg-linear-to-t from-black/80 to-transparent">
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
                            <p className="text-[13px] font-semibold text-white leading-tight">
                                {card.name}
                            </p>
                            <p className="text-[11px] font-normal text-white/60">
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
            <div className="mt-8 px-1">
                <p className="text-[15px] font-medium text-(--grey1) leading-snug">
                    {card.title}
                </p>
                {isVideo ? (
                    <div className="flex items-center gap-2 mt-4">
                        <span className="text-[13px] font-normal text-(--grey1)">
                            {card.viewers} viewers
                        </span>
                        <span className="h-[7px] w-[7px] rounded-full bg-green-500" />
                        <span className="text-[13px] font-normal text-(--grey1)">
                            {card.time}
                        </span>
                    </div>
                ) : (
                    <p className="text-[13px] font-normal text-(--grey1) mt-4">
                        Uploaded by Zakir Khan
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