"use client";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import Link from "next/link";
import { CircleCheckBig, Clock, Ellipsis, Flame, MessageCircle, MessageSquare, MoreVertical, MoveRight, Paperclip, SendHorizontal, Share2, Share2Icon, ThumbsUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Image from "next/image";


const tabs = [
    { id: "New", label: "New" },
    { id: "Hot", label: "Hot" },
    { id: "Oldest", label: "Oldest" },
];
const posts = [
    {
        id: 1,
        userName: "Mathew Hems",
        userAvatar: "https://github.com/shadcn.png",
        time: "12 mins ago",
        images: [
            '/images/classRoom/thumbnail2.jpg',
            '/images/classRoom/thumbnail2.jpg',
            '/images/classRoom/thumbnail2.jpg',
            '/images/classRoom/thumbnail2.jpg'
        ],
        title: "Celebrating the fierce spirit of women's football!",
        description: `"Celebrating the fierce spirit of women's football! ⚽💪🏆 GameChangers". Witnessed an exhilarating women's football match today as these talented athletes displayed unmatched skill and determination on the field. Goals, tackles, and unforgettable moments made this game a true spectacle. #WomenInFootball #SoccerSisters #GirlPower`,
        hashtags: ["#WomenInFootball", "#SoccerSisters"],
        likes: 3,
        messages: 5,
        shares: 2
    },
    {
        id: 2,
        userName: "Sarah Jenkins",
        userAvatar: "https://github.com/shadcn.png",
        time: "1 hour ago",
        images: [
            '/images/classRoom/thumbnail2.jpg',
            '/images/classRoom/thumbnail2.jpg',
        ],
        title: "Team Meeting",
        description: "Great collaboration today with the design team.",
        hashtags: [],
        likes: 12,
        messages: 2,
        shares: 1
    },
    {
        id: 3,
        userName: "Sarah imran",
        userAvatar: "https://github.com/shadcn.png",
        time: "1 hour ago",
        images: [
            '/images/classRoom/thumbnail2.jpg',
        ],
        title: "Team Meeting",
        description: "Great collaboration today with the design team.",
        hashtags: ["#Design", "#TeamWork"],
        likes: 12,
        messages: 2,
        shares: 1
    },
        {
        id: 4,
        userName: "Sarah imran",
        userAvatar: "https://github.com/shadcn.png",
        time: "1 hour ago",
        images: [],
        title: "Team Meeting",
        description: "Witnessed an exhilarating women's football match today as these talented athletes displayed unmatched skill and determination on the field. Goals, tackles, and unforgettable moments made this game a true spectacl",
        hashtags: ["#Design", "#TeamWork"],
        likes: 12,
        messages: 2,
        shares: 1
    }
];


export default function SocialMedia() {



    let [activeTab, setActiveTab] = useState(tabs[0].id);




    return (

        <>



            <div className="space-y-4">
                <div className="w-full overflow-hidden">
                    <div className="flex items-center justify-between">
                        <h1 className="text-white text-[24px] font-bold">Cardiology</h1>
                        <div className="flex flex-row space-x-2 p-1 overflow-x-scroll no-scrollbar justify-end">
                            {tabs.map((tab) => (
                                <button
                                    key={tab.id}
                                    onClick={() => setActiveTab(tab.id)}
                                    className={`${activeTab === tab.id ? "text-white" : "text-(--grey1) hover:text-white/60"
                                        } relative rounded-[12px] cursor-pointer p-4 text-sm font-medium transition focus-visible:outline-2 outline-sky-400`}
                                    style={{ WebkitTapHighlightColor: "transparent" }}
                                >
                                    {activeTab === tab.id && (
                                        <motion.span
                                            layoutId="bubble"
                                            className="absolute rounded-[12px]  inset-0 z-10 bg-(--blue1)" // Blue background jo move karega
                                            transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                                        />
                                    )}
                                    <span className="relative z-20 flex items-center gap-2">{tab.label === 'New' ? <Clock size={15} /> : tab.label === 'Hot' ? <Flame size={15} /> : <CircleCheckBig size={15} />} {tab.label}</span>
                                </button>
                            ))}
                        </div>
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

                            {/* <div className="flex justify-between items-center">
                                <h2 className="text-white text-[24px] font-semibold">
                                    Video
                                </h2>
                                <Link
                                    href='/admin/resources/video'
                                    className="group flex items-center gap-2 text-(--blue1) text-[15px] font-normal"
                                >
                                    <span className="group-hover:underline">See All</span>

                                    <span className="transform transition-transform duration-300 group-hover:translate-x-1.5">
                                        <MoveRight size={18} />
                                    </span>
                                </Link>

                            </div> */}


                            <div >
                                {
                                    posts.map((item) => (
                                        <div
                                            key={item.id}
                                            className="bg-(--dark5)  rounded-[12px] p-3  mt-5"
                                        >
                                            <VideoCard item={item} />
                                        </div>
                                    ))
                                }
                            </div>

                        </motion.div>
                    </AnimatePresence>
                </div>
            </div>
        </>

    );
}

export const VideoCard = ({ item }) => {
    // Destructuring from item (Matches your object keys)
    const { images, userName, userAvatar, time, title, description, hashtags, likes, messages, shares } = item;

    const [showComment, setShowComment] = useState(false)

    const renderImages = () => {
        const count = images?.length || 0;

      

        if (count === 1) {
            return (
                <div className="relative w-full h-172.5 overflow-hidden rounded-sm">
                    <Image loading="eager" src={images[0]} alt="post" fill className="object-cover" />
                </div>
            );
        }

        if (count === 2) {
            return (
                <div className="grid grid-cols-2 gap-2 h-172.5">
                    {images.map((img, idx) => (
                        <div key={idx} className="relative overflow-hidden h-full rounded-sm">
                            <Image loading="eager" src={img} alt="post" fill className="object-cover" />
                        </div>
                    ))}
                </div>
            );
        }

        if (count === 3) {
            return (
                <div className="grid grid-cols-2 gap-2 h-172.5">
                    <div className="relative overflow-hidden h-full rounded-sm">
                        <Image loading="eager" src={images[0]} alt="post" fill className="object-cover" />
                    </div>
                    <div className="grid grid-rows-2 gap-2 h-full">
                        <div className="relative overflow-hidden h-full rounded-sm">
                            <Image loading="eager" src={images[1]} alt="post" fill className="object-cover" />
                        </div>
                        <div className="relative overflow-hidden h-full rounded-sm">
                            <Image loading="eager" src={images[2]} alt="post" fill className="object-cover" />
                        </div>
                    </div>
                </div>
            );
        }

        if (count >= 4) {
            return (
                <div className="grid grid-cols-2 gap-2 h-172.5">
                    {images.slice(0, 3).map((img, idx) => (
                        <div key={idx} className="relative overflow-hidden h-full rounded-sm">
                            <Image loading="eager" src={img} alt="post" fill className="object-cover" />
                        </div>
                    ))}
                    <div className="relative overflow-hidden h-full rounded-sm group/seeMore cursor-pointer">
                        <Image loading="eager" src={images[3]} alt="post" fill className="object-cover" />
                        <div className="absolute inset-0 bg-black/60 flex items-center justify-center backdrop-blur-[2px] group-hover/seeMore:bg-black/40 transition-all">
                            <span className="text-white font-bold text-xl tracking-wide">
                                {count > 4 ? `+${count - 3} More` : "See More"}
                            </span>
                        </div>
                    </div>
                </div>
            );
        }
    };

    return (
        <div className="w-full group ">
            <div className="w-full text-white rounded-xl overflow-hidden ">
                <div className="relative">
                    {renderImages()}
                  {images.length===0?<span>Hello</span>: <div className="p-4 flex items-center justify-between absolute bottom-0 bg-linear-to-t from-black to-transparent w-full">
                        <div className="flex items-center gap-3">
                            <Avatar className="h-10 w-10 border border-white/10">
                                <AvatarImage src={userAvatar} />
                                <AvatarFallback>{userName?.[0] || "U"}</AvatarFallback>
                            </Avatar>
                            <div>
                                <h4 className="text-[14px] font-semibold leading-tight">{userName}</h4>
                                <span className="text-[12px] text-gray-400">{time}</span>
                            </div>
                        </div>
                        <Button variant="ghost" size="icon" className="text-gray-400 hover:bg-white/5 h-8 w-8">
                            <MoreVertical size={25} />
                        </Button>
                    </div>}
                </div>
                <div className="p-5">
                    <div className="space-y-3 mb-5">
                        {/* {title && <p className="text-[14px] leading-relaxed italic text-[gray-200]">{title}</p>} */}
                        <p className="text-[16px] font-normal text-(--grey1)">{description}</p>
                        {hashtags && <div className="flex gap-2">
                            {hashtags?.map((tag, i) => (
                                <span key={i} className="text-blue-400 text-[12px] hover:underline cursor-pointer">{tag}</span>
                            ))}
                        </div>}
                    </div>
                    <div className="px-4 py-5 flex justify-between text-(--grey1) text-[12px] border-y border-(--dark2)">
                        <div className="flex items-center gap-4">
                            <span className="flex items-center gap-1.5 hover:text-white cursor-pointer transition-colors">
                                <ThumbsUp size={14} className="text-blue-400" /> {likes}
                            </span>
                            <span className="flex items-center gap-1.5 hover:text-white cursor-pointer transition-colors">
                                <MessageCircle size={14} /> {messages}
                            </span>
                        </div>
                        <span className="flex items-center gap-1.5 hover:text-white cursor-pointer transition-colors">
                            <Share2 size={14} /> {shares}
                        </span>
                    </div>
                    <div className="grid grid-cols-3 pt-5 ">
                        <Button variant="ghost" className="rounded-none h-14 gap-2 text-(--grey1) hover:text-blue-400 hover:bg-white/5">
                            <ThumbsUp size={24} className='text-(--grey1)' /> <span className="text-[13px] text-(--grey1)">Like</span>
                        </Button>
                        <Button onClick={()=>setShowComment(!showComment)} variant="ghost" className="rounded-none h-14 gap-2 text-(--grey1) hover:text-white border-x border-(--dark2) hover:bg-white/5">
                            <MessageCircle size={24} className='text-(--grey1)' /> <span className="text-[13px] text-(--grey1)">Comment</span>
                        </Button>
                        <Button variant="ghost" className="rounded-none h-14 gap-2 text-(--grey1) hover:text-white hover:bg-white/5">
                            <Share2 size={24} className='text-(--grey1)' /> <span className="text-[13px] text-(--grey1)">Share</span>
                        </Button>
                    </div>
                   {showComment && <div className="bg-(--dark1) p-4 rounded-[4px]">
                        <div className='bg-(--dark2) px-3 py-2 rounded-[8px] flex items-center justify-between'>
                            <div className="grid grid-cols-[40px_1fr] w-full items-center gap-3">
                                <Avatar className="h-10 w-10 border border-white/10">
                                    <AvatarImage src={userAvatar} />
                                    <AvatarFallback>{userName?.[0] || "U"}</AvatarFallback>
                                </Avatar>
                                <textarea name="" id="" placeholder="What's on you mind" className="h-8 border-none px-3 resize-none text-[16px] font-normal w-full text-(--grey2) "></textarea>
                            </div>
                            <div className="flex items-center gap-3">
                                <Paperclip size={24} className="cursor-pointer text-(--grey1)" />
                                <Button><SendHorizontal /> Send</Button>
                            </div>
                        </div>
                        <div className="flex items-center mt-6">
                            <div className="grid grid-cols-[32px_1fr] w-full items-center gap-3">
                                <Avatar className="size-8 border border-white/10">
                                    <AvatarImage src={userAvatar} />
                                    <AvatarFallback>{userName?.[0] || "U"}</AvatarFallback>
                                </Avatar>
                                <textarea name="" id="" placeholder="What does the fox say?" className="h-8 border-none px-3 resize-none text-[16px] font-normal w-full text-(--grey2) "></textarea>
                            </div>
                            <div className="flex items-center gap-3">
                                <span className='text-[12px] font-normal text-(--grey11) whitespace-nowrap'>12hr ago</span>
                                <Ellipsis size={16} className='text-(--grey10)' />
                            </div>
                        </div>
                    </div>}
                </div>


            </div>
        </div>
    );
};