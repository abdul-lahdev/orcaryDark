"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, ChevronUp, Eye, MoreVertical } from "lucide-react";
import { accordionData } from "@/app/data/classRoom";
import { Separator } from "@/components/ui/separator";
import {
  Play,
  Pause,
  Volume2,
  Settings,
  Maximize,
  EllipsisVertical,
} from "lucide-react";
import { useParams } from "next/navigation";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Switch } from "@/components/ui/switch";
import { ChevronRight, Check } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { liveCards } from "@/app/data/cards";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function Page() {
  const params = useParams();
  console.log("data", params?.id);

  //  const { id, isLive, thumbnail, avatar, name, docType, specialization, title, viewers, time } = liveCards;
  return (
    <>
      <div className="px-8 py-6 overflow-x-hidden">
        <CustomVideoPlayer />
        <div className="bg-(--dark5) mt-5 p-4 rounded-[8px]">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="size-15 rounded-full bg-[url(/images/classRoom/session7.jpg)] bg-cover block bg-center "></span>
              <div>
                <h2 className="text-white text-[20px] font-semibold">
                  Intro to Neuroanatomy | Neurophysiology | Neuroscience
                </h2>
                <div className="flex items-center gap-2">
                  <span className="font-normal text-[18px] text-(--grey1)">
                    Mike Millers
                  </span>
                  <span className="block size-2.5 bg-(--grey5) rounded-full"></span>
                  <span className="font-normal text-[18px] text-(--grey1)">
                    453 viewers
                  </span>
                  <span className="block size-2.5 bg-(--grey5) rounded-full"></span>
                  <span className="font-normal text-[18px] text-(--grey1)">
                    Streaming 12:10 PM
                  </span>
                </div>
              </div>
            </div>
            <div>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <EllipsisVertical
                    size={24}
                    className="text-(--grey2) cursor-pointer"
                  />
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuGroup>
                    <DropdownMenuLabel>first</DropdownMenuLabel>
                    <DropdownMenuItem>second</DropdownMenuItem>
                    <DropdownMenuItem>third</DropdownMenuItem>
                  </DropdownMenuGroup>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
          <div className="mt-5">
            <h3 className="text-[16px] font-bold text-(--grey1)">
              Description
            </h3>
            <p className="text-(--grey1) text-[16px] font-normal">
              The study of neuroanatomy, neurophysiology, and neuroscience is
              essential for understanding the structure and function of the
              brain and spinal cord, collectively known as the Central Nervous
              System (CNS). This multidisciplinary field explores how neurons,
              the building blocks of the nervous system, communicate with each
              other and with the body to generate thought, movement, and sensory
              experiences.
            </p>
          </div>
        </div>

        <div className="mt-4">
          <h1 className="text-white text-[24px] font-bold">
            More from Mike Millers
          </h1>
          <div className="mt-4 grid grid-cols-2 gap-4">
            {liveCards.map(
              (item) =>
                item.docType === "video" &&
                item.isLive && (
                  <Link
                    key={item.id}
                    href={`/admin/resources/video/${item.id}`}
                    className="w-full group cursor-pointer"
                  >
                    <div className="relative aspect-video rounded-[12px] overflow-hidden">
                      <Image
                        src={
                          item.thumbnail || "/images/classRoom/thumbnail.jpg"
                        }
                        alt="Video Thumbnail"
                        width={376}
                        height={227}
                        className="w-full h-full object-cover"
                      />

                      {item.isLive && (
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
                                src={
                                  item.avatar || "/images/classRoom/avator.png"
                                }
                                fill
                                className="object-cover"
                                alt="avatar"
                              />
                            </div>

                            <div>
                              <h4 className="text-white text-[16px] font-semibold">
                                {item.name}
                              </h4>
                              <p className="text-(--light2) text-[12px] font-normal">
                                {item.specialization}
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
                        {item.title}
                      </h3>

                      <div className="flex items-center gap-2 text-(--grey1) text-[12px]">
                        <span>{item.viewers} viewers</span>
                        <div className="size-2 bg-white rounded-full" />
                        <span>{item.time}</span>
                      </div>
                    </div>
                  </Link>
                ),
            )}
          </div>
        </div>
      </div>

      <div className="bg-(--dark4) border-l border-(--dark2) px-3 py-4">
        {/* <div className="max-h-109.75 overflow-y-scroll no-scrollbar">
        </div> */}
        <ChannelsAccordion />

        <div className="mt-5">
          <Image
            src={"/images/resource/mediaAds.png"}
            alt="Video Thumbnail"
            width={376}
            height={227}
            className="w-full h-full object-cover"
          />
          <div className="mt-3 flex items-center justify-between">
            <span className="text-[16px] font-normal text-(--blue1)">
              Carelining Glucose System.
            </span>
            <span className="text-[14px] font-normal text-(--grey1)">Ad.</span>
          </div>
        </div>
      </div>
    </>
  );
}

// Video Player

export const CustomVideoPlayer = () => {
  const videoRef = useRef(null);

  const [playing, setPlaying] = useState(false);
  const [played, setPlayed] = useState(0); // 0..1
  const [volume, setVolume] = useState(0.8);
  const [duration, setDuration] = useState(0);

  //   optionshere
  const [stableVolume, setStableVolume] = useState(true);
  const [voiceBoost, setVoiceBoost] = useState(false);
  const [ambientMode, setAmbientMode] = useState(true);
  const [annotations, setAnnotations] = useState(true);

  const [cc, setCc] = useState("off"); // "off" | "en"
  const [speed, setSpeed] = useState(1); // 0.25..2
  const [quality, setQuality] = useState("auto"); // "auto" | "1080p" | "720p" | "480p"

  //   optionshere

  const src = "/video/backgroundVideo.mp4"; // /public/video/backgroundVideo.mp4

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    v.volume = volume;
  }, [volume]);

  const togglePlay = async () => {
    const v = videoRef.current;
    if (!v) return;

    if (v.paused) {
      try {
        await v.play();
        setPlaying(true);
      } catch (e) {
        console.log("VIDEO PLAY ERROR:", e);
      }
    } else {
      v.pause();
      setPlaying(false);
    }
  };

  const onTimeUpdate = () => {
    const v = videoRef.current;
    if (!v || !v.duration) return;
    setPlayed(v.currentTime / v.duration);
  };

  const onLoadedMetadata = () => {
    const v = videoRef.current;
    if (!v) return;
    setDuration(v.duration || 0);
  };

  const handleSeekChange = (e) => {
    const v = videoRef.current;
    if (!v || !v.duration) return;

    const fraction = parseFloat(e.target.value);
    v.currentTime = fraction * v.duration;
    setPlayed(fraction);
  };

  const handleFullscreen = () => {
    const el = videoRef.current?.parentElement;
    if (!el) return;

    if (document.fullscreenElement) document.exitFullscreen?.();
    else el.requestFullscreen?.();
  };

  return (
    <div className="relative group w-full aspect-video bg-black rounded-[16px] overflow-hidden border border-white/5 shadow-2xl">
      <video
        ref={videoRef}
        src={src}
        className="absolute inset-0 w-full h-full object-cover"
        playsInline
        preload="metadata"
        onTimeUpdate={onTimeUpdate}
        onLoadedMetadata={onLoadedMetadata}
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
      />

      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6 pointer-events-none">
        <div className="relative w-full h-1.5 bg-white/20 rounded-full mb-6 overflow-hidden pointer-events-auto">
          <div
            className="absolute top-0 left-0 h-full bg-(--blue1) shadow-[0_0_10px_rgba(35,165,231,0.8)]"
            style={{ width: `${played * 100}%` }}
          />
          <input
            type="range"
            min={0}
            max={0.999999}
            step="any"
            value={played}
            onChange={handleSeekChange}
            className="absolute inset-0 w-full opacity-0 cursor-pointer"
          />
        </div>

        {/* Buttons */}
        <div className="flex items-center justify-between pointer-events-auto">
          <div className="flex items-center gap-6">
            <button
              onClick={togglePlay}
              className="text-white hover:text-(--blue1) transition-colors"
              type="button"
            >
              {playing ? (
                <Pause size={24} fill="currentColor" />
              ) : (
                <Play size={24} fill="currentColor" />
              )}
            </button>

            <div className="flex items-center gap-3">
              <Volume2 size={22} className="text-white" />
              <input
                type="range"
                min={0}
                max={1}
                step={0.01}
                value={volume}
                onChange={(e) => setVolume(parseFloat(e.target.value))}
                className="w-24 accent-white"
              />
            </div>
          </div>

          <div className="flex items-center gap-6">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button
                  className="text-white/80 hover:text-white transition-colors"
                  type="button"
                  aria-label="Settings"
                >
                  <Settings size={20} />
                </button>
              </DropdownMenuTrigger>

              <DropdownMenuContent
                align="end"
                side="top"
                sideOffset={10}
                className="w-72 rounded-2xl border border-white/10 bg-black/70 text-white shadow-2xl backdrop-blur-xl"
              >
                <DropdownMenuLabel className="text-white/70 text-xs uppercase tracking-wider">
                  Settings
                </DropdownMenuLabel>

                <DropdownMenuSeparator className="bg-white/10" />

                {/* Toggle row component pattern */}
                <div className="px-2 py-1 space-y-1">
                  <div className="flex items-center justify-between gap-3 rounded-xl px-2 py-2 hover:bg-white/5">
                    <div className="flex items-center gap-3">
                      <span className="text-sm">Stable Volume</span>
                    </div>
                    <Switch
                      checked={stableVolume}
                      onCheckedChange={setStableVolume}
                    />
                  </div>

                  <div className="flex items-center justify-between gap-3 rounded-xl px-2 py-2 hover:bg-white/5">
                    <span className="text-sm">Voice boost</span>
                    <Switch
                      checked={voiceBoost}
                      onCheckedChange={setVoiceBoost}
                    />
                  </div>

                  <div className="flex items-center justify-between gap-3 rounded-xl px-2 py-2 hover:bg-white/5">
                    <span className="text-sm">Ambient mode</span>
                    <Switch
                      checked={ambientMode}
                      onCheckedChange={setAmbientMode}
                    />
                  </div>

                  <div className="flex items-center justify-between gap-3 rounded-xl px-2 py-2 hover:bg-white/5">
                    <span className="text-sm">Annotations</span>
                    <Switch
                      checked={annotations}
                      onCheckedChange={setAnnotations}
                    />
                  </div>
                </div>

                <DropdownMenuSeparator className="bg-white/10" />

                {/* Subtitles */}
                <DropdownMenuSub>
                  <DropdownMenuSubTrigger className="rounded-xl focus:bg-white/5 data-[state=open]:bg-white/5">
                    <div className="flex w-full items-center justify-between">
                      <span className="text-sm">Subtitles/CC</span>
                      <span className="text-xs text-white/60 flex items-center gap-2">
                        {cc === "off" ? "Off" : "English"}
                        <ChevronRight size={16} className="opacity-70" />
                      </span>
                    </div>
                  </DropdownMenuSubTrigger>
                  <DropdownMenuPortal>
                    <DropdownMenuSubContent className="w-52 rounded-2xl border border-white/10 bg-black/70 text-white shadow-2xl backdrop-blur-xl">
                      <DropdownMenuItem
                        onClick={() => setCc("off")}
                        className="rounded-xl focus:bg-white/5"
                      >
                        <div className="flex w-full items-center justify-between">
                          <span>Off</span>
                          {cc === "off" && (
                            <Check size={16} className="opacity-90" />
                          )}
                        </div>
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => setCc("en")}
                        className="rounded-xl focus:bg-white/5"
                      >
                        <div className="flex w-full items-center justify-between">
                          <span>English</span>
                          {cc === "en" && (
                            <Check size={16} className="opacity-90" />
                          )}
                        </div>
                      </DropdownMenuItem>
                    </DropdownMenuSubContent>
                  </DropdownMenuPortal>
                </DropdownMenuSub>

                {/* Playback speed */}
                <DropdownMenuSub>
                  <DropdownMenuSubTrigger className="rounded-xl focus:bg-white/5 data-[state=open]:bg-white/5">
                    <div className="flex w-full items-center justify-between">
                      <span className="text-sm">Playback speed</span>
                      <span className="text-xs text-white/60 flex items-center gap-2">
                        {speed === 1 ? "Normal" : `${speed}x`}
                        <ChevronRight size={16} className="opacity-70" />
                      </span>
                    </div>
                  </DropdownMenuSubTrigger>
                  <DropdownMenuPortal>
                    <DropdownMenuSubContent className="w-52 rounded-2xl border border-white/10 bg-black/70 text-white shadow-2xl backdrop-blur-xl">
                      {[0.25, 0.5, 0.75, 1, 1.25, 1.5, 2].map((s) => (
                        <DropdownMenuItem
                          key={s}
                          onClick={() => setSpeed(s)}
                          className="rounded-xl focus:bg-white/5"
                        >
                          <div className="flex w-full items-center justify-between">
                            <span>{s === 1 ? "Normal" : `${s}x`}</span>
                            {speed === s && (
                              <Check size={16} className="opacity-90" />
                            )}
                          </div>
                        </DropdownMenuItem>
                      ))}
                    </DropdownMenuSubContent>
                  </DropdownMenuPortal>
                </DropdownMenuSub>

                {/* Quality */}
                <DropdownMenuSub>
                  <DropdownMenuSubTrigger className="rounded-xl focus:bg-white/5 data-[state=open]:bg-white/5">
                    <div className="flex w-full items-center justify-between">
                      <span className="text-sm">Quality</span>
                      <span className="text-xs text-white/60 flex items-center gap-2">
                        {quality === "auto" ? "Auto (720p)" : quality}
                        <ChevronRight size={16} className="opacity-70" />
                      </span>
                    </div>
                  </DropdownMenuSubTrigger>
                  <DropdownMenuPortal>
                    <DropdownMenuSubContent className="w-56 rounded-2xl border border-white/10 bg-black/70 text-white shadow-2xl backdrop-blur-xl">
                      {["auto", "1080p", "720p", "480p"].map((q) => (
                        <DropdownMenuItem
                          key={q}
                          onClick={() => setQuality(q)}
                          className="rounded-xl focus:bg-white/5"
                        >
                          <div className="flex w-full items-center justify-between">
                            <span>{q === "auto" ? "Auto (720p)" : q}</span>
                            {quality === q && (
                              <Check size={16} className="opacity-90" />
                            )}
                          </div>
                        </DropdownMenuItem>
                      ))}
                    </DropdownMenuSubContent>
                  </DropdownMenuPortal>
                </DropdownMenuSub>
              </DropdownMenuContent>
            </DropdownMenu>

            <button
              className="text-white/80 hover:text-white transition-colors"
              type="button"
              onClick={handleFullscreen}
            >
              <Maximize size={20} />
            </button>
          </div>
        </div>
      </div>

      {!playing && (
        <div
          onClick={togglePlay}
          className="absolute inset-0 flex items-center justify-center cursor-pointer bg-black/20"
        >
          <div className="w-20 h-20 bg-(--blue1)/90 rounded-full flex items-center justify-center shadow-2xl scale-110 transition-transform">
            <Play size={32} className="text-white ml-1" fill="currentColor" />
          </div>
        </div>
      )}
    </div>
  );
};

// Accordion

const Accordion = ({ i, expanded, setExpanded, title, children }) => {
  const isOpen = expanded.includes(i);

  const toggle = () => {
    setExpanded((prev) =>
      prev.includes(i) ? prev.filter((x) => x !== i) : [...prev, i],
    );
  };

  return (
    <div className="border-b border-white/5 last:border-0 overflow-hidden">
      <motion.header
        initial={false}
        className="flex items-center justify-between p-4 pb-2 cursor-pointer hover:bg-white/5 transition-colors"
        onClick={toggle}
      >
        <div className="flex items-center gap-2">
          <span
            className={`text-[18px] font-medium uppercase tracking-wider ${
              isOpen ? "text-(--blue1)" : "text-(--grey1)"
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
          <ChevronUp size={16} className="" />
        </motion.div>
      </motion.header>
      <Separator className="mt-2 mb-3" />

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
    (item) => item.type === "liveSession" && item.isLive,
  );

  const classRooms = accordionData.filter(
    (item) => item.type === "classRoom" && item.isLive,
  );

  const offline = accordionData.filter((item) => !item.isLive);

  return (
    <div className="w-full bg-transparent mt-5">
      {/* 1) Live Sessions */}
      <Accordion
        i={0}
        expanded={expanded}
        setExpanded={setExpanded}
        title="Live Chat"
      >
        <div className="max-h-109.75 overflow-y-scroll no-scrollbar ">
          {liveSessions.length ? (
            liveSessions.map((item) => <UserRow key={item.id} item={item} />)
          ) : (
            <EmptyRow text="No live sessions" />
          )}
        </div>
        <div  className='w-full relative flex items-center'>
          <div className="size-9 rounded-full block bg-[url(/images/resource/liveChat1.png)] bg-cover bg-center absolute left-2"></div>
          <Button className='absolute right-2 h-10'>Send</Button>
          <input type="text" placeholder="What’s on your mind?" className='h-16 focus-visible:outline-none focus:border-0 pl-13 pr-21 bg-(--grey4) w-full block text-base dark:text-[#A1A1AA]' />
        </div>
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
    <div className="grid grid-cols-[32px_1fr_24px] items-start gap-3 justify-between px-3">
      <span className="size-8 rounded-full block bg-[url(/images/resource/liveChat1.png)] bg-cover bg-center"></span>
      <div>
        <h1 className="text-white font-medium text-[14px]">Kathryn Murphy</h1>
        <p className="text-[14px]/[16px] font-medium text-(--grey1)">
          the largest part, responsible for higher functions like thinking,
          memory, and voluntary movements.
        </p>
      </div>
      <span>
        <EllipsisVertical size={24} className="text-(--grey6)" />
      </span>
    </div>
  );
};
