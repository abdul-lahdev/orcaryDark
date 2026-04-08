'use client'
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { Separator } from "@/components/ui/separator";
import {
    Pencil,
    Share2,
    UserPlus,
    ShieldOff,
    Trash2,
} from "lucide-react";
import ProfileTab from "../_components/ProfileTab";
import GeneralTab from "../_components/GeneralTab";
import TimeLineTab from "../_components/TimeLineTab";
import ThreadsTab from "../_components/ThreadsTab";
import LivesTab from "../_components/LivesTab";
import ClassroomTab from "../_components/ClassroomTab";
import ResourcesTab from "../_components/ResourcesTab";
const tabs = [
    { id: "profile", label: "Profile" },
    { id: "general", label: "General" },
    { id: "timeline", label: "Timeline" },
    { id: "threads", label: "Threads" },
    { id: "lives", label: "Lives" },
    { id: "classroom", label: "Classroom" },
    { id: "resources", label: "Resources" },
];

const userData = {
    name: "Jaya Willis",
    username: "@angelinawills",
    followers: "1.4K",
    coverImage: "/images/classRoom/thumbnail2.jpg",
    avatar: "/images/newsFeed/avator.png",
    profileDescription: `With years of expertise in dermatology, this skin specialist is dedicated to diagnosing and treating a wide range of skin, hair, and nail conditions. From common concerns like acne, eczema, and psoriasis to advanced cosmetic treatments, their approach is rooted in providing personalized care tailored to each patient's unique needs.

With years of expertise in dermatology, this skin specialist is dedicated to diagnosing and treating a wide range of skin, hair, and nail conditions. From common concerns like acne, eczema, and psoriasis to advanced cosmetic treatments, their approach is rooted in providing personalized care tailored to each patient's unique needs.`,
    generalInfo: {
        location: "Melbourne, Australia",
        locationFlag: "🌏",
        company: "Aga Khan University Hospital",
        designation: "Senior Doctor",
        email: "dr.james.smith@email.com",
        phone: "(555) 987-6543",
        website: "jayawillis.com",
    },
};

export default function Page() {
    const [activeTab, setActiveTab] = useState(tabs[0].id);

    return (
        <div className="p-8">
            {/* ─── Cover Image Section ─── */}
            <div className="relative w-[full] h-[272px] rounded-t-xl overflow-hidden">
                <Image
                    src={userData.coverImage}
                    alt="Cover"
                    fill
                    className="object-cover"
                    priority
                />
                {/* Share button */}
                <button className="absolute top-4 right-4 z-10 flex h-9 w-9 cursor-pointer items-center justify-center rounded-full bg-black/50 text-white backdrop-blur-sm transition hover:bg-black/70">
                    <Share2 size={16} />
                </button>
            </div>

            {/* ─── Profile Info Section ─── */}
            <div className="relative w-[85%] mx-auto pb-4">
                {/* Avatar */}
                <div className="absolute -top-20 left-0">
                    <div className="h-[140px] w-[140px] rounded-full border-4 border-(--dark1) overflow-hidden bg-(--dark2)">
                        <Image
                            src={userData.avatar}
                            alt={userData.name}
                            width={140}
                            height={140}
                            className="object-cover"
                        />
                    </div>
                </div>

                {/* Action Buttons Row */}
                <div className="flex items-center justify-end gap-3 pt-4">
                    <button className="flex items-center gap-1.5 cursor-pointer px-3 py-1.5 text-[13px] font-medium text-(--grey1) rounded-md transition hover:bg-white/5">
                        <Pencil size={14} />
                        Edit
                    </button>
                    <button className="flex items-center gap-1.5 cursor-pointer px-3 py-1.5 text-[13px] font-medium text-(--grey1) rounded-md transition hover:bg-white/5">
                        <ShieldOff size={14} />
                        Deactivate
                    </button>
                    <button className="flex items-center gap-1.5 cursor-pointer px-3 py-1.5 text-[13px] font-medium text-(--red1) rounded-md transition hover:bg-red-500/10">
                        <Trash2 size={14} />
                        Delete
                    </button>
                    <button className="flex items-center gap-1.5 cursor-pointer rounded-md bg-(--blue1) px-4 py-1.5 text-[13px] font-semibold text-white transition hover:bg-(--blue1)/90">
                        <UserPlus size={14} />
                        Follow
                    </button>
                </div>

                {/* Name + Username Row */}
                <div className="flex items-end justify-between mt-4">
                    <div>
                        <h1 className="text-[24px] font-bold text-white">{userData.name}</h1>
                    </div>
                    <div className="flex items-center gap-2 text-[13px] text-(--grey1)">
                        <span>{userData.username}</span>
                        <span className="text-white/30">•</span>
                        <span>{userData.followers} Followers</span>
                    </div>
                </div>
            </div>

            {/* ─── Tabs Section ─── */}
            <div className="w-[85%] mx-auto mt-2">
                <div className="relative flex items-center gap-0 border-b border-(--dark2)">
                    {tabs.map((tab) => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={`relative cursor-pointer px-5 py-3 text-[14px] font-medium transition-colors ${activeTab === tab.id
                                ? "text-(--blue1)"
                                : "text-(--grey1) hover:text-white/70"
                                }`}
                            style={{ WebkitTapHighlightColor: "transparent" }}
                        >
                            {tab.label}
                            {activeTab === tab.id && (
                                <motion.div
                                    layoutId="user-tab-underline"
                                    className="absolute bottom-0 left-0 right-0 h-[2px] bg-(--blue1)"
                                    transition={{ type: "spring", bounce: 0.2, duration: 0.5 }}
                                />
                            )}
                        </button>
                    ))}
                </div>
            </div>

            {/* ─── Tab Content ─── */}
            <div className="w-[85%] mx-auto">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={activeTab}
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -8 }}
                        transition={{ duration: 0.25 }}
                    >
                        {activeTab === "profile" && <ProfileTab userData={userData} />}
                        {activeTab === "general" && <GeneralTab />}
                        {activeTab === "timeline" && <TimeLineTab />}
                        {activeTab === "threads" && <ThreadsTab />}
                        {activeTab === "lives" && <LivesTab />}
                        {activeTab === "classroom" && <ClassroomTab />}
                        {activeTab === "resources" && <ResourcesTab />}
                    </motion.div>
                </AnimatePresence>
            </div>

            {/* Bottom separator */}
            <div className="px-20 mt-10">
                <Separator className="border border-(--dark2)" />
            </div>
        </div>
    );
}