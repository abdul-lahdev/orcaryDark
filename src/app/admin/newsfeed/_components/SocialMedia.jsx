"use client";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { CircleCheckBig, Clock, Ellipsis, Flame, MessageCircle, MessageSquare, MoreHorizontal, MoreVertical, MoveRight, Paperclip, SendHorizontal, Share2, Share2Icon, ThumbsUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Image from "next/image";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel"
import { Input } from "@/components/ui/input";
import CustomVideoPlayer from "./CustomVideoPlayer";


const tabs = [
    { id: "New", label: "New" },
    { id: "Hot", label: "Hot" },
    { id: "Oldest", label: "Oldest" },
];
const posts = [
    {
        id: 1,
        userName: "Mathew Hems",
        userAvatar: "/images/newsFeed/avator.png",
        time: "12 mins ago",
        images: [
            '/images/classRoom/thumbnail2.jpg',
            '/images/classRoom/thumbnail2.jpg',
            '/images/classRoom/thumbnail2.jpg',
            '/images/classRoom/thumbnail2.jpg'
        ],
        video: [],
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
        userAvatar: "/images/newsFeed/avator.png",
        time: "1 hour ago",
        images: [
            '/images/classRoom/thumbnail2.jpg',
            '/images/classRoom/thumbnail2.jpg',
        ],
        title: "Team Meeting",
        description: "Great collaboration today with the design team.",
        hashtags: [],
        video: [],
        likes: 12,
        messages: 2,
        shares: 1
    },
    {
        id: 3,
        userName: "Sarah imran",
        userAvatar: "/images/newsFeed/avator1.jpg",
        time: "1 hour ago",
        images: [
            '/images/classRoom/thumbnail2.jpg',
        ],
        video: [],
        title: "Team Meeting",
        description: "Great collaboration today with the design team.",
        hashtags: ["#Design", "#TeamWork"],
        likes: 12,
        messages: 2,
        shares: 1
    },
    // avator2.jpg
    {
        id: 4,
        userName: "Mohsin imran",
        userAvatar: "/images/newsFeed/avator2.jpg",
        time: "1 hour ago",
        images: [],
        video: [],
        title: "Team Meeting",
        description: "Witnessed an exhilarating women's football match today as these talented athletes displayed unmatched skill and determination on the field. Goals, tackles, and unforgettable moments made this game a true spectacl",
        hashtags: ["#Design", "#TeamWork"],
        likes: 12,
        messages: 2,
        shares: 1
    },
    {
        id: 5,
        userName: "Ali imran",
        userAvatar: "https://github.com/shadcn.png",
        time: "1 hour ago",
        images: [],
        video: ['/video/backgroundVideo.mp4'],
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
    const { id, images, userName, video, userAvatar, time, title, description, hashtags, likes, messages, shares } = item;
    const [showComment, setShowComment] = useState(false)
    const [currId, setCurrId] = useState(null)

    const value = 'hello World';
    const [isOpen, setIsOpen] = useState(false)

    const renderImages = () => {
        const count = images?.length || 0;
        if (count === 1) {
            return (
                <div className="relative w-full h-135 overflow-hidden rounded-sm">
                    <Image onClick={() => {
                        setCurrId(id)
                        setIsOpen(true)
                    }} loading="eager" src={images[0]} alt="post" fill className="object-cover" />
                </div>
            );
        }
        if (count === 2) {
            return (
                <div className="grid grid-cols-2 gap-2 h-135">
                    {images.map((img, idx) => (
                        <div key={idx} className="relative overflow-hidden h-full rounded-sm">
                            <Image onClick={() => {
                                setCurrId(id)
                                setIsOpen(true)
                            }} loading="eager" src={img} alt="post" fill className="object-cover" />
                        </div>
                    ))}
                </div>
            );
        }
        if (count === 3) {
            return (
                <div className="grid grid-cols-2 gap-2 h-172.5">
                    <div className="relative overflow-hidden h-full rounded-sm col-span-2">
                        <Image onClick={() => {
                            setCurrId(id)
                            setIsOpen(true)
                        }} loading="eager" src={images[0]} alt="post" fill className="object-cover" />
                    </div>
                    <div className="relative overflow-hidden h-full rounded-sm">
                        <Image onClick={() => {
                            setCurrId(id)
                            setIsOpen(true)
                        }} loading="eager" src={images[1]} alt="post" fill className="object-cover" />
                    </div>
                    <div className="relative overflow-hidden h-full rounded-sm">
                        <Image onClick={() => {
                            setCurrId(id)
                            setIsOpen(true)
                        }} loading="eager" src={images[2]} alt="post" fill className="object-cover" />
                    </div>
                </div>
            );
        }
        if (count >= 4) {
            return (
                <div className="grid grid-cols-2 gap-2 h-172.5">
                    {images.slice(0, 3).map((img, idx) => (
                        <div key={idx} className="relative overflow-hidden h-full rounded-sm">
                            <Image onClick={() => {
                                setCurrId(id)
                                setIsOpen(true)
                            }} loading="eager" src={img} alt="post" fill className="object-cover" />
                        </div>
                    ))}
                    <div className="relative overflow-hidden h-full rounded-sm group/seeMore cursor-pointer">
                        <Image onClick={() => {
                            setCurrId(id)
                            setIsOpen(true)
                        }} loading="eager" src={images[3]} alt="post" fill className="object-cover" />
                        <div onClick={() => {
                            setCurrId(id)
                            setIsOpen(true)
                        }} className="absolute inset-0 bg-black/60 flex items-center justify-center backdrop-blur-[2px] group-hover/seeMore:bg-black/40 transition-all">
                            <span className="text-white font-bold text-xl tracking-wide">
                                {count > 4 ? `+${count - 3} More` : "See More"}
                            </span>
                        </div>
                    </div>
                </div>
            );
        }
    };
    const renderMedia = () => {
        // Assuming 'media' is an array of video URLs or objects
        const count = video?.length || 0;

        // Shared click handler to reduce repetition
        const handleOpen = () => {
            setCurrId(id);
            setIsOpen(true);
        };

        if (count === 0) return null;

        if (count === 1) {
            return (
                <div className="relative w-full  overflow-hidden rounded-sm">
                    <CustomVideoPlayer
                        src={video[0]}
                        onClick={() => console.log('hello World')}
                        className="w-full h-full object-cover"
                    />
                </div>
            );
        }

        if (count === 2) {
            return (
                <div className="grid grid-cols-2 gap-2 ">
                    {video.slice(0, 2).map((vid, idx) => (
                        <div key={idx} className="relative overflow-hidden h-full rounded-sm" onClick={() => { setCurrId(id); setIsOpen(true) }} >
                            <CustomVideoPlayer
                                src={video}

                                className="w-full h-full object-cover"
                            />
                        </div>
                    ))}
                </div>
            );
        }

        if (count === 3) {
            return (
                <div className="grid grid-cols-2 gap-2 ">
                    <div className="relative overflow-hidden h-full rounded-sm col-span-2 " onClick={() => {
                        setCurrId(id)
                        setIsOpen(true)
                    }}>
                        <CustomVideoPlayer src={video[0]} className="w-full h-full object-cover" />
                    </div>
                    <div className="relative overflow-hidden h-full rounded-sm" onClick={() => { setCurrId(id); setIsOpen(true) }} >
                        <CustomVideoPlayer src={video[1]} className="w-full h-full object-cover" />
                    </div>
                    <div className="relative overflow-hidden h-full rounded-sm" onClick={() => { setCurrId(id); setIsOpen(true) }} >
                        <CustomVideoPlayer src={video[2]} className="w-full h-full object-cover" />
                    </div>
                </div>
            );
        }

        if (count >= 4) {
            return (
                <div className="grid grid-cols-2 grid-rows-2 gap-2 ">
                    {/* Render first 3 videos */}
                    {media.slice(0, 3).map((vid, idx) => (
                        <div key={idx} className="relative overflow-hidden h-full rounded-sm">
                            <CustomVideoPlayer src={vid} className="w-full h-full object-cover" />
                        </div>
                    ))}

                    {/* The 4th "See More" slot */}
                    <div className="relative overflow-hidden h-full rounded-sm group/seeMore cursor-pointer">
                        <CustomVideoPlayer src={video[3]} className="w-full h-full object-cover" />
                        <div
                            className="absolute inset-0 bg-black/60 flex flex-col items-center justify-center backdrop-blur-[2px] group-hover/seeMore:bg-black/40 transition-all z-10"
                        >
                            <span className="text-white font-bold text-xl tracking-wide">
                                {count > 4 ? `+${count - 3} More Videos` : "Watch All"}
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
                {video.length === 0 ? <div className="relative">
                    {renderImages()}
                    {images.length === 0 ? <div className="p-4 pb-0 flex items-center justify-between w-full">
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
                    </div> : <div className="p-4 flex items-center justify-between absolute bottom-0 bg-linear-to-t from-black to-transparent w-full">
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
                </div> : <div className='relative'>
                    <div>
                        {renderMedia()}
                        <div className="p-4 pb-0 flex items-center justify-between w-full">
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
                        </div>
                    </div>
                </div>}
                <div className="p-5 pb-0">
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
                        <Button onClick={() => setShowComment(!showComment)} variant="ghost" className="rounded-none h-14 gap-2 text-(--grey1) hover:text-white border-x border-(--dark2) hover:bg-white/5">
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


            <Dialog open={isOpen} onOpenChange={setIsOpen}>
                <DialogContent className='w-[85%] [&>button]:hidden p-2 bg-(--dark3) rounded-[24px] h-[85vh] overflow-y-scroll no-scrollbar'>
                    <DialogHeader>
                        <DialogTitle className='sr-only'>Are you absolutely sure?</DialogTitle>
                        <DialogDescription className='sr-only'>
                            This action cannot be undone. This will permanently delete your account
                            and remove your data from our servers.
                        </DialogDescription>
                        {
                            posts.filter((item) => item.id === currId).map((item) => (
                                <div key={item.id} className='grid grid-cols-[2fr_1fr] h-full gap-3 '>
                                    <div className="rounded-[12px] overflow-hidden">
                                        {item.images.length ? <div>
                                            {item.images.length === 1 ? <Image
                                                src={item.images[0]}
                                                width={500}
                                                height={500}
                                                alt="Picture of the author"
                                                className='w-full'
                                            /> :
                                                <Carousel className="w-full h-full">
                                                    <CarouselPrevious className='left-0 z-10' />
                                                    <CarouselContent className='h-full'>

                                                        {item.images.map((img, index) => (
                                                            <CarouselItem key={index} className='h-full'>
                                                                <Image
                                                                    // Sahi tarika: Direct variable ya simple fallback
                                                                    src={img || '/placeholder.jpg'}
                                                                    width={500}
                                                                    height={500}
                                                                    alt={`Post image ${index + 1}`}
                                                                    className='w-full h-full object-cover' // Contain use karein taake image kate nahi
                                                                />
                                                            </CarouselItem>
                                                        ))}
                                                    </CarouselContent>
                                                    <CarouselNext className='right-0 z-10' />
                                                </Carousel>
                                            }
                                        </div> : <div className="h-full">
                                            {item.video.length === 1 ? <CustomVideoPlayer
                                                src={video[0]}
                                                onClick={() => console.log('hello World')}
                                                className="w-full h-full object-cover"
                                            /> :
                                                <Carousel className="w-full h-full">
                                                    <CarouselPrevious className='left-0 z-10' />
                                                    <CarouselContent className='h-full'>

                                                        {item.video.map((img, index) => (
                                                            <CarouselItem key={index} className='h-full'>
                                                                <CustomVideoPlayer
                                                                    src={video[0]}
                                                                    onClick={() => console.log('hello World')}
                                                                    className="w-full h-full object-cover"
                                                                />
                                                            </CarouselItem>
                                                        ))}
                                                    </CarouselContent>
                                                    <CarouselNext className='right-0 z-10' />
                                                </Carousel>
                                            }
                                        </div>}

                                    </div>
                                    <div className=''>
                                        <div className="w-full text-white rounded-xl overflow-hidden ">
                                            <div className="relative">
                                                <div className="p-4 pb-0 flex items-center justify-between w-full">
                                                    <div className="grid grid-cols-[40px_1fr] items-center gap-3">
                                                        <Avatar className="h-10 w-10">
                                                            <AvatarImage className='object-cover' src={item.userAvatar} />
                                                            <AvatarFallback>{userName?.[0] || "U"}</AvatarFallback>
                                                        </Avatar>
                                                        <div>
                                                            <h4 className="text-[14px] font-semibold leading-tight">{item.userName}</h4>
                                                            <span className="text-[12px] text-gray-400">{item.time}</span>
                                                        </div>
                                                    </div>
                                                    <Button variant="ghost" size="icon" className="text-gray-400 hover:bg-white/5 h-8 w-8">
                                                        <MoreVertical size={25} />
                                                    </Button>
                                                </div>
                                            </div>
                                            <div className="px-2 pt-3 pb-0">
                                                <div className="space-y-3 mb-5">
                                                    {/* {title && <p className="text-[14px] leading-relaxed italic text-[gray-200]">{title}</p>} */}
                                                    <p className="text-[16px] font-normal text-(--grey1)">
                                                        {item.description}
                                                    </p>
                                                    {item.hashtags && <div className="flex gap-2">
                                                        {item.hashtags?.map((tag, i) => (
                                                            <span key={i} className="text-blue-400 text-[12px] hover:underline cursor-pointer">{item.tag}</span>
                                                        ))}
                                                    </div>}
                                                </div>
                                                <div className="px-4 py-5 flex justify-between text-(--grey1) text-[12px] border-y border-(--dark2)">
                                                    <div className="flex items-center gap-4">
                                                        <span className="flex items-center gap-1.5 hover:text-white cursor-pointer transition-colors">
                                                            <ThumbsUp size={14} className="text-blue-400" /> {item.likes}
                                                        </span>
                                                        <span className="flex items-center gap-1.5 hover:text-white cursor-pointer transition-colors">
                                                            <MessageCircle size={14} /> {item.messages}
                                                        </span>
                                                    </div>
                                                    <span className="flex items-center gap-1.5 hover:text-white cursor-pointer transition-colors">
                                                        <Share2 size={14} /> {item.shares}
                                                    </span>
                                                </div>
                                                <div className="grid grid-cols-3 pt-5 ">
                                                    <Button variant="ghost" className="rounded-none h-14 gap-2 text-(--grey1) hover:text-blue-400 hover:bg-white/5">
                                                        <ThumbsUp size={24} className='text-(--grey1)' /> <span className="text-[13px] text-(--grey1)">Like</span>
                                                    </Button>
                                                    <Button variant="ghost" className="rounded-none h-14 gap-2 text-(--grey1) hover:text-white border-x border-(--dark2) hover:bg-white/5">
                                                        <MessageCircle size={24} className='text-(--grey1)' /> <span className="text-[13px] text-(--grey1)">Comment</span>
                                                    </Button>
                                                    <Button variant="ghost" className="rounded-none h-14 gap-2 text-(--grey1) hover:text-white hover:bg-white/5">
                                                        <Share2 size={24} className='text-(--grey1)' /> <span className="text-[13px] text-(--grey1)">Share</span>
                                                    </Button>
                                                </div>
                                                <div className="bg-(--dark1) p-4 rounded-[4px]">
                                                    <div className='bg-(--dark2) px-3 py-2 rounded-[8px] flex items-center justify-between'>
                                                        <div className="grid grid-cols-[40px_1fr] w-full items-center gap-3">
                                                            <Avatar className="h-10 w-10 border border-white/10">
                                                                <AvatarImage className='object-cover' src={item.userAvatar} />
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
                                                            <Avatar className="size-8">
                                                                <AvatarImage src='/images/newsFeed/comment.png' />
                                                                <AvatarFallback>{userName?.[0] || "U"}</AvatarFallback>
                                                            </Avatar>
                                                            <p className="border-none resize-none text-[16px] font-normal w-full text-(--grey2) ">What does the fox say?</p>
                                                            {/* <textarea name="" id="" placeholder="What does the fox say?" className="h-8 border-none px-3 resize-none text-[16px] font-normal w-full text-(--grey2) "></textarea> */}
                                                        </div>
                                                        <div className="flex items-center gap-3">
                                                            <span className='text-[12px] font-normal text-(--grey11) whitespace-nowrap'>12hr ago</span>
                                                            <Ellipsis size={16} className='text-(--grey10)' />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))
                        }
                    </DialogHeader>
                </DialogContent>
            </Dialog>

        </div>
    );
};