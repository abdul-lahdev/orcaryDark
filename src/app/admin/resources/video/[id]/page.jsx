"use client";
import React, { useState, useRef, useEffect } from "react";
import dynamic from "next/dynamic";
import { Play, Pause, Volume2, Settings, Maximize } from "lucide-react";
import { useParams } from "next/navigation";
import {
  DropdownMenu,
  DropdownMenuContent,
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


export default function Page() {
  const params = useParams();
  console.log("data", params?.id);

  return (
    <>
      <div className="px-8 py-6 overflow-x-hidden">
        <CustomVideoPlayer />
        <div className='bg-(--dark5) mt-5 p-4 rounded-[8px]'>
            <div>
                sad
            </div>
        </div>
      </div>

      <div className="bg-(--dark4) border-l border-(--dark2) px-3 py-4">
        Right
      </div>
    </>
  );
}

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
        <Switch checked={stableVolume} onCheckedChange={setStableVolume} />
      </div>

      <div className="flex items-center justify-between gap-3 rounded-xl px-2 py-2 hover:bg-white/5">
        <span className="text-sm">Voice boost</span>
        <Switch checked={voiceBoost} onCheckedChange={setVoiceBoost} />
      </div>

      <div className="flex items-center justify-between gap-3 rounded-xl px-2 py-2 hover:bg-white/5">
        <span className="text-sm">Ambient mode</span>
        <Switch checked={ambientMode} onCheckedChange={setAmbientMode} />
      </div>

      <div className="flex items-center justify-between gap-3 rounded-xl px-2 py-2 hover:bg-white/5">
        <span className="text-sm">Annotations</span>
        <Switch checked={annotations} onCheckedChange={setAnnotations} />
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
              {cc === "off" && <Check size={16} className="opacity-90" />}
            </div>
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => setCc("en")}
            className="rounded-xl focus:bg-white/5"
          >
            <div className="flex w-full items-center justify-between">
              <span>English</span>
              {cc === "en" && <Check size={16} className="opacity-90" />}
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
                {speed === s && <Check size={16} className="opacity-90" />}
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
                {quality === q && <Check size={16} className="opacity-90" />}
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