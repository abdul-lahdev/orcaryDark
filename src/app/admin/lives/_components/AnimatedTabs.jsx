"use client";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { MoreVertical } from "lucide-react";
import { MoveRight } from "lucide-react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Lock, Upload, User, Users } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { liveCards } from "@/app/data/cards";
// import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";

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

export default function AnimatedTabs() {
  let [activeTab, setActiveTab] = useState(tabs[0].id);

  const filteredVideos = liveCards.filter(
    (item) => item.isLive === false && item.category === activeTab,
  );
  const onGoingData = liveCards.filter(
    (item) => item.isLive === true && item.category === activeTab,
  );

  const [topTabActive, setTopTabActive] = useState("session");
  function submitForm(e) {
    e.preventDefault();
  }
  const [isOpen, setIsOpen] = useState(false);
  const [visibility, setVisibility] = useState("public");
  const [thumbnail, setThumbnail] = useState("No file selected");

  return (
    <>
      <div className="min-h-82 rounded-3xl bg-[url(/images/dashboard/banner.png)] bg-(--blue2) bg-cover bg-center p-3 flex flex-col justify-center items-center">
        <h1 className="text-[48px] font-normal text-transparent bg-clip-text bg-[linear-gradient(90deg,#FFFFFF_0%,#23A5E7_50%,#23A5E7_100%)]">
          Educate Yourself With The Best
        </h1>
        <p className="text-[20px] font-normal text-(--grey1) mt-2">
          Join 1000s of students in learning medical science
        </p>

        <div className="flex items-center gap-3 mt-8">
          <Button
            className="h-12 text-[16px] font-normal"
            onClick={() => setIsOpen(true)}
          >
            Start Live / Classroom
          </Button>
          <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogContent
              className="
                              bg-(--dark1) border border-(--dark3) text-white
                              max-w-137.5 p-0 rounded-[16px]
                              max-h-[80vh] outline-none
                              flex flex-col overflow-hidden
                            "
            >
              {/* HEADER (fixed) */}
              <DialogHeader className="px-5 py-4 border-b border-white/5 bg-(--dark1)">
                <DialogTitle className="text-[20px] font-semibold text-(--grey1)">
                  Upload Resource
                </DialogTitle>
              </DialogHeader>

              {/* BODY (scrollable) */}
              <div className="flex-1 overflow-y-auto no-scrollbar px-5 py-4">
                <div className="space-y-4">
                  {/* Title */}
                  <div className="space-y-2">
                    <label className="text-(--grey1) text-[14px] font-medium">
                      Title
                    </label>
                    <Input
                      placeholder="Enter title"
                      className="block w-full h-10 mt-2"
                    />
                  </div>

                  {/* Category */}
                  <div className="space-y-3">
                    <label className="text-(--grey1) text-[14px] font-medium">
                      Category Tag
                    </label>
                    <div className="mt-2">
                      <Select>
                        <SelectTrigger className="bg-(--dark4) border border-(--dark3) h-[40px] rounded-[8px] w-full text-(--grey3)">
                          <SelectValue placeholder="Select category" />
                        </SelectTrigger>
                        <SelectContent className="bg-[#2B2B31] border-white/10 text-white">
                          <SelectItem value="cardiology">Cardiology</SelectItem>
                          <SelectItem value="neurology">Neurology</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  {/* Description */}
                  <div className="space-y-2">
                    <label className="text-(--grey1) text-[14px] font-medium">
                      Description
                    </label>
                    <Textarea
                      placeholder="Enter description"
                      className="bg-(--dark4) border border-(--dark4) min-h-30 rounded-[8px] focus-visible:ring-1 focus-visible:ring-(--blue1) resize-none text-white mt-2"
                    />
                  </div>

                  {/* Thumbnail */}
                  <div className="space-y-2">
                    <label className="text-(--grey1) text-[14px] font-medium">
                      Thumbnail
                    </label>
                    <div className="relative">
                      <input
                        type="file"
                        id="thumbnail-upload"
                        className="hidden"
                        onChange={(e) =>
                          setThumbnail(
                            e.target.files?.[0]?.name || "No file selected",
                          )
                        }
                      />

                      <label
                        htmlFor="thumbnail-upload"
                        className="flex items-center w-full h-12 bg-[#2B2B31] rounded-xl overflow-hidden cursor-pointer border border-white/5 hover:border-white/10 transition"
                      >
                        <div className="flex items-center gap-2 px-4 h-full bg-[#3A3A40] text-white/90 text-[13px] border-r border-white/5 hover:bg-[#45454C] transition-colors">
                          <Upload size={16} className="text-(--grey1)" />
                          <span>Upload thumbnail</span>
                        </div>

                        <div className="px-4 text-(--grey3) text-[13px] truncate">
                          {thumbnail}
                        </div>
                      </label>
                    </div>
                  </div>

                  {/* Paid Resource */}
                  <div className="flex items-center justify-between py-2">
                    <div className="space-y-0.5">
                      <label className="text-(--grey1) text-[14px] font-medium">
                        Paid Resource
                      </label>
                      <p className="text-[12px] text-(--grey8)">
                        You can active this if you want the viewers to pay to
                        access
                      </p>
                    </div>
                    <Switch className="data-[state=checked]:bg-(--blue1)" />
                  </div>

                  {/* Price */}
                  <div className="space-y-2">
                    <label className="text-(--grey1) text-[14px] font-medium">
                      Price
                    </label>
                    <div className="relative">
                      <span className="absolute left-4 top-1/2 -translate-y-1/3 text-(--grey3)">
                        $
                      </span>
                      <Input
                        placeholder="0.00"
                        className="bg-[#2B2B31] border-none h-10 mt-2 pl-8 focus-visible:ring-1 focus-visible:ring-(--blue1) w-full"
                      />
                    </div>
                  </div>

                  {/* Visibility */}
                  <div className="space-y-3">
                    <label className="text-(--grey1) text-[20px] font-semibold">
                      Who can see the live stream?
                    </label>
                    <div className="grid grid-cols-3 gap-4 mt-2">
                      {[
                        {
                          id: "public",
                          label: "Public",
                          icon: <User size={18} />,
                        },
                        {
                          id: "followers",
                          label: "Followers",
                          icon: <Users size={18} />,
                        },
                        {
                          id: "private",
                          label: "Private",
                          icon: <Lock size={18} />,
                        },
                      ].map((option) => (
                        <button
                          key={option.id}
                          onClick={() => setVisibility(option.id)}
                          className={`flex items-center justify-center gap-2 py-4 rounded-[6px] border transition-all cursor-pointer ${
                            visibility === option.id
                              ? "border-(--blue1) bg-(--blue3) text-(--blue1)"
                              : "border-white/5 bg-[#2B2B31] text-(--grey1) hover:bg-[#3A3A40]"
                          }`}
                          type="button"
                        >
                          {option.icon}
                          <span className="text-[12px] font-medium">
                            {option.label}
                          </span>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* FOOTER (sticky) */}
              <div className="sticky bottom-0 left-0 right-0 px-5 py-4 bg-(--dark1) border-t border-white/5">
                <div className="grid grid-cols-2 gap-3">
                  <Button
                    onClick={() => setIsOpen(false)}
                    variant="secondary"
                    className="w-full h-14.75"
                    type="button"
                  >
                    Discard
                  </Button>
                  <Button className="w-full h-14.75" type="button">
                    Upload
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
          <Dialog>
            <DialogTrigger asChild>
              <Button
                variant="secondary"
                className="h-12 text-[16px] font-normal "
              >
                Become an Investor
              </Button>
            </DialogTrigger>

            <DialogContent className="bg-(--dark1) border-2 border-(--dark3) max-w-[40%]">
              <form onSubmit={submitForm}>
                <DialogHeader>
                  <DialogTitle className="text-[20px] font-semibold text-(--grey1)">
                    Become an Inverstor
                  </DialogTitle>
                  <DialogDescription className="sr-only">ads</DialogDescription>
                  <div className="mt-3">
                    <label
                      htmlFor=""
                      className="block text-[14px] font-medium text-(--grey1)"
                    >
                      Name
                    </label>
                    <Input
                      type="text"
                      className="h-10 w-full mt-2 bg-(--dark4) border border-(--dark3)"
                      placeholder="Mohsin Khan"
                    />
                  </div>
                  <div className="mt-3">
                    <label
                      htmlFor=""
                      className="block text-[14px] font-medium text-(--grey1)"
                    >
                      Your Business Name
                    </label>
                    <Input
                      type="text"
                      className="h-10 w-full mt-2"
                      placeholder="Ching ping"
                    />
                  </div>
                  <div className="mt-3">
                    <label
                      htmlFor=""
                      className="block text-[14px] font-medium text-(--grey1)"
                    >
                      Message
                    </label>
                    <Textarea className="h-39.75 rounded-[8px] mt-2 resize-none" />
                  </div>
                </DialogHeader>
                <DialogFooter className="flex mt-10">
                  <DialogClose asChild>
                    <Button variant="outline" className="w-[50%] h-14.75">
                      Cancel
                    </Button>
                  </DialogClose>
                  <Button type="submit" className="w-[50%] h-14.75 ">
                    Send
                  </Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
        </div>
      </div>
      <div className="space-y-4 mt-6">
        <div className="w-full overflow-hidden">
          <div className="grid grid-cols-2">
            <button
              onClick={() => setTopTabActive("session")}
              className={`border-b-4 pb-3 w-full text-start pl-3 cursor-pointer hover:text-(--blue1) ${topTabActive === "session" ? "border-(--blue1) text-(--blue1)" : "border-(--dark3) text-(--grey1)"}`}
            >
              Live Sessions
            </button>
            <button
              onClick={() => setTopTabActive("classroom")}
              className={`border-b-4 pb-3 w-full text-start pl-3 cursor-pointer hover:text-(--blue1) ${topTabActive === "classroom" ? "border-(--blue1) text-(--blue1)" : "border-(--dark3) text-(--grey1)"}`}
            >
              Classroom
            </button>
          </div>

          <div className="flex flex-row space-x-2 p-1 mt-5 overflow-x-scroll no-scrollbar">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`${
                  activeTab === tab.id
                    ? "text-white"
                    : "text-(--grey1) hover:text-white/60"
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
                  {topTabActive === "classroom"
                    ? "Upcoming"
                    : "Trending Live Streams"}
                </h2>
                <Link
                  href="/admin/lives"
                  className="group flex items-center gap-2 text-(--blue1) text-[15px] font-normal"
                >
                  <span className="group-hover:underline">See All</span>

                  <span className="transform transition-transform duration-300 group-hover:translate-x-1.5">
                    <MoveRight size={18} />
                  </span>
                </Link>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-5">
                {topTabActive === "classroom" && filteredVideos.length > 0 ? (
                  filteredVideos.slice(0, 3).map((item) => (
                    <div
                      key={item.id}
                      className="shadow-[0px_0px_25px_0px_#c2d4de0a] hover:bg-(--dark3) rounded-[12px] bg-transparent p-3 transition-all duration-300 hover:-translate-y-1.5 cursor-pointer"
                    >
                      <VideoCard topTabActive={topTabActive} item={item} />
                    </div>
                  ))
                ) : topTabActive === "session" && onGoingData.length > 0 ? (
                  onGoingData.slice(0, 3).map((item) => (
                    <div
                      key={item.id}
                      className="shadow-[0px_0px_25px_0px_#c2d4de0a] hover:bg-(--dark3) rounded-[12px] bg-transparent p-3 transition-all duration-300 hover:-translate-y-1.5 cursor-pointer"
                    >
                      <VideoCard topTabActive={topTabActive} item={item} />
                    </div>
                  ))
                ) : (
                  <div className="text-center text-zinc-400 py-10">
                    No videos available in this category
                  </div>
                )}
              </div>

              <div className="flex justify-between items-center mt-10">
                <h2 className="text-white text-[24px] font-semibold">
                  {topTabActive === "session" ? "Upcoming" : "Ongoing"}
                </h2>
                <Link
                  href="/admin/lives"
                  className="group flex items-center gap-2 text-(--blue1) text-[15px] font-normal"
                >
                  <span className="group-hover:underline">See All</span>

                  <span className="transform transition-transform duration-300 group-hover:translate-x-1.5">
                    <MoveRight size={18} />
                  </span>
                </Link>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-5">
                {topTabActive === "session" && filteredVideos.length > 0 ? (
                  filteredVideos.slice(0, 3).map((item) => (
                    <div
                      key={item.id}
                      className="shadow-[0px_0px_25px_0px_#c2d4de0a] hover:bg-(--dark3) rounded-[12px] bg-transparent p-3 transition-all duration-300 hover:-translate-y-1.5 cursor-pointer"
                    >
                      <VideoCard topTabActive={topTabActive} item={item} />
                    </div>
                  ))
                ) : topTabActive === "classroom" && onGoingData.length > 0 ? (
                  onGoingData.slice(0, 3).map((item) => (
                    <div
                      key={item.id}
                      className="shadow-[0px_0px_25px_0px_#c2d4de0a] hover:bg-(--dark3) rounded-[12px] bg-transparent p-3 transition-all duration-300 hover:-translate-y-1.5 cursor-pointer"
                    >
                      <VideoCard topTabActive={topTabActive} item={item} />
                    </div>
                  ))
                ) : (
                  <div className="text-center text-zinc-400 py-10">
                    No videos available in this category
                  </div>
                )}
              </div>

              <div className="flex justify-between items-center mt-10">
                <h2 className="text-white text-[24px] font-semibold">
                  {topTabActive === "session"
                    ? "Live Stream in Your Network"
                    : "Classroom in Your Network"}
                </h2>
                <Link
                  href="/admin/lives"
                  className="group flex items-center gap-2 text-(--blue1) text-[15px] font-normal"
                >
                  <span className="group-hover:underline">See All</span>

                  <span className="transform transition-transform duration-300 group-hover:translate-x-1.5">
                    <MoveRight size={18} />
                  </span>
                </Link>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-5">
                {onGoingData.length > 0 ? (
                  onGoingData.slice(0, 3).map((item) => (
                    <div
                      key={item.id}
                      className="shadow-[0px_0px_25px_0px_#c2d4de0a] hover:bg-(--dark3) rounded-[12px] bg-transparent p-3 transition-all duration-300 hover:-translate-y-1.5 cursor-pointer"
                    >
                      <VideoCard topTabActive={topTabActive} item={item} />
                    </div>
                  ))
                ) : (
                  <div className="text-center text-zinc-400 py-10">
                    No{" "}
                    {topTabActive === "session" ? "Live Stream" : "Classroom"}{" "}
                    available in this category
                  </div>
                )}
              </div>

              <div className="flex justify-between items-center mt-10">
                <h2 className="text-white text-[24px] font-semibold">
                  {topTabActive === "session"
                    ? "All Live Streams"
                    : "Your Classrooms"}
                </h2>
                <Link
                  href="/admin/lives"
                  className="group flex items-center gap-2 text-(--blue1) text-[15px] font-normal"
                >
                  <span className="group-hover:underline">See All</span>

                  <span className="transform transition-transform duration-300 group-hover:translate-x-1.5">
                    <MoveRight size={18} />
                  </span>
                </Link>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-4">
                {onGoingData.length > 0 ? (
                  onGoingData.slice(0, 3).map((item) => (
                    <div
                      key={item.id}
                      className="shadow-[0px_0px_25px_0px_#c2d4de0a] hover:bg-(--dark3) rounded-[12px] bg-transparent p-3 transition-all duration-300 hover:-translate-y-1.5 cursor-pointer"
                    >
                      <VideoCard topTabActive={topTabActive} item={item} />
                    </div>
                  ))
                ) : (
                  <div className="text-center text-zinc-400 py-10">
                    No{" "}
                    {topTabActive === "session" ? "Live Streams" : "Classrooms"}{" "}
                    available in this category
                  </div>
                )}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </>
  );
}

export const VideoCard = ({ item,topTabActive }) => {
  const {
    id,
    isLive,
    thumbnail,
    avatar,
    name,
    docType,
    specialization,
    title,
    viewers,
    time,
    upComing,
  } = item;
  console.log('topTabActive',topTabActive)
  return (
    <Link
      href={`${topTabActive === "session" ? "/admin/lives/1" : "/"}`}
      className="w-full group cursor-pointer"
    >
      <div className="relative aspect-video rounded-[12px] overflow-hidden">
        {isLive ? (
          <Image
            src={thumbnail || "/images/classRoom/thumbnail.jpg"}
            alt="Video Thumbnail"
            width={376}
            height={227}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="h-full flex items-center justify-center text-(--grey1) text-[20px] font-medium ">
            Scheduled for <br /> {upComing}
          </div>
        )}

        {isLive && (
          <div className="absolute top-3 left-3 flex items-center gap-1.5 bg-(--red3) backdrop-blur-md px-2 py-1 rounded-[4px]">
            <div className="size-2 bg-(--red2) rounded-full animate-pulse border border-white" />
            <span className="text-white text-[12px] font-semibold uppercase">
              Live
            </span>
          </div>
        )}

        <div className="absolute inset-0 bg-linear-to-t from-black/90 via-black/20 to-transparent flex flex-col justify-end px-4 pb-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              {/* Profile Image */}
              <div className="relative w-10 h-10 overflow-hidden rounded-full">
                <Image
                  src={avatar || "/images/classRoom/avator.png"}
                  fill
                  sizes="40px" // Yeh line add karein
                  className="object-cover"
                  alt="avatar"
                />
              </div>

              <div>
                <h4 className="text-white text-[16px] font-semibold">{name}</h4>
                <p className="text-(--light2) text-[12px] font-normal">
                  {specialization}
                </p>
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

        {isLive ? (
          <div className="flex items-center gap-2 text-(--grey1) text-[12px]">
            <span>{viewers} viewers</span>
            <div className="size-2 bg-white rounded-full" />
            <span>{time}</span>
          </div>
        ) : (
          <p className="text-(--grey1) text-[16px] font-normal">
            Will be live on {upComing}
          </p>
        )}
      </div>
    </Link>
  );
};
