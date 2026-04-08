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
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import ProfileTab from "./_components/ProfileTab";
import GeneralTab from "./_components/GeneralTab";
import TimeLineTab from "./_components/TimeLineTab";
import ThreadsTab from "./_components/ThreadsTab";
import LivesTab from "./_components/LivesTab";
import ClassroomTab from "./_components/ClassroomTab";
import ResourcesTab from "./_components/ResourcesTab";
import { Button } from "@/components/ui/button";
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
  const [isOpen, setIsOpen] = useState(false);

  // 
  const [cover, setCover] = useState(null);
  const [profile, setProfile] = useState(null);

  const handleChange = (e, type) => {
    const file = e.target.files[0];
    if (!file) return;

    const preview = URL.createObjectURL(file);

    if (type === "cover") {
      setCover({ file, preview });
    } else {
      setProfile({ file, preview });
    }
  };
  return (
    <>
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="bg-(--dark1) text-white p-0 rounded-[16px] max-w-137.5">

          <DialogHeader className="px-5 py-4 border-b border-white/5">
            <DialogTitle>Edit Images</DialogTitle>
          </DialogHeader>

          <div className="p-4 space-y-5">

            {/* COVER */}
            <div>
              <p>Upload Cover</p>
              <input type="file" onChange={(e) => handleChange(e, "cover")} />

              {cover && (
                <img src={cover.preview} className="mt-2 h-32 w-full object-cover rounded" />
              )}
            </div>

            {/* PROFILE */}
            <div>
              <p>Upload Profile</p>
              <input type="file" onChange={(e) => handleChange(e, "profile")} />

              {profile && (
                <img src={profile.preview} className="mt-2 h-20 w-20 rounded-full object-cover" />
              )}
            </div>

          </div>

          <DialogFooter className="p-3 flex gap-2">
            <DialogClose asChild>
              <Button className="w-1/2">Cancel</Button>
            </DialogClose>

            <Button
              className="w-1/2"
              onClick={() => {
                setIsOpen(false)
                console.log("cover:", cover);
                console.log("profile:", profile);
              }}
            >
              Save
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      <div className="p-8">
        {/* ─── Cover Image Section ─── */}
        <div className="relative w-[full] h-[272px] rounded-t-xl overflow-hidden">
          <Image
            src={cover?.preview || userData?.coverImage}
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
                src={profile?.preview || userData?.avatar}
                alt={userData.name}
                width={140}
                height={140}
                className="object-cover"
              />
            </div>
          </div>

          {/* Action Buttons Row */}
          <div className="flex items-center justify-end gap-3 pt-4">
            <button onClick={() => setIsOpen(true)} className="flex items-center gap-1.5 cursor-pointer px-3 py-1.5 text-[13px] font-medium text-(--grey1) rounded-md transition hover:bg-white/5">
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
    </>

  );
}