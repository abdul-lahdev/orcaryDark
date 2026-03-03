'use client'
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Eye } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { liveCards } from '@/app/data/cards';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";


export default function QuickInfo() {
    const [showMore, setShowMore] = useState(false)
    return (
        <>
            <div className="pt-5">
                <div className="flex items-center gap-5 overflow-hidden">
                    <h1 className="text-(--grey1) text-[18px] font-bold whitespace-nowrap">
                        Quick Info
                    </h1>
                    <Separator className='h-0.5 bg-(--grey5)' />
                </div>

                <div className="mt-5">
                    {
                        liveCards.filter((item) => item.isLive === true).slice(0, 2).map((item) => (
                            <div key={item.id} className='bg-(--dark5) p-3 mt-5 rounded-[8px]'>
                                <QuickCards item={item} />
                            </div>
                        ))
                    }

                </div>
                <div className="mt-5 bg-(--dark5) rounded-[8px] p-6">

                    <h1 className='text-[16px] font-normal text-(--grey7)'>People to follow</h1>
                    {liveCards.slice(0, showMore ? liveCards.length : 3).map((item) => (
                        <div key={item.id} className='flex items-center justify-between w-full mt-5'>
                            <div className='grid grid-cols-[40px_1fr] items-center w-full gap-3'>
                                <Avatar className="size-10">
                                    <AvatarImage className='object-cover' src={`${item.avatar}`} />
                                    <AvatarFallback> {item.name?.[0] || "U"} </AvatarFallback>
                                    {/* <AvatarFallback>{userName?.[0] || "U"}</AvatarFallback> */}
                                </Avatar>
                                <div>
                                    <h1 className="text-(--grey7) text-[16px] font-normal">{item.name}</h1>
                                    <p className='text-(--grey11) text-[12px] font-normal'>{item.category}</p>
                                </div>
                            </div>
                            <Button variant="destructive">Follow</Button>
                        </div>
                    ))}
                    <span className='text-[14px] font-normal text-(--blue1) mt-5 block hover:underline cursor-pointer' onClick={() => setShowMore(!showMore)} >{!showMore ? 'See more suggestions' : 'Show less'}</span>
                </div>

            </div>

        </>
    )
}


export const QuickCards = ({ item }) => {
    const { id, isLive, thumbnail, avatar, name, docType, specialization, title, viewers, time } = item;
    return (
        // /admin/resources/${docType === 'video' ? 'video' : 'document'}/${id}
        <Link href={`/admin/newsfeed`} className="w-full group cursor-pointer ">
            <div className="relative aspect-video rounded-[12px] overflow-hidden">
                <Image src={thumbnail || "/images/classRoom/thumbnail.jpg"} alt="Video Thumbnail" width={376} height={227} className="w-full h-full object-cover" />

                {isLive && <div className="absolute top-3 left-3 px-3 flex items-center gap-1.5 bg-(--red5) px-2 py-1 rounded-[99px]">
                    <div className="size-2 bg-white rounded-full animate-pulse" />
                    <span className="text-white text-[12px] font-semibold uppercase">Live</span>
                </div>}

                <div className="absolute inset-0 bg-linear-to-t from-black/90 via-black/20 to-transparent flex flex-col justify-end px-4 pb-2">
                    <div className="flex items-center justify-end">
                        <span className="px-2 h-6 rounded-[10px] px-2 bg-(--dark9) flex items-center justify-center gap-2">
                            <Eye size={12} />
                            <span className="text-[12px] font-normal text-white">1,234</span>
                        </span>
                    </div>
                </div>
            </div>

            <div className="px-2 py-5 space-y-2 grid grid-cols-[40px_1fr] gap-3">
                <Avatar className="size-10">
                    <AvatarImage className='object-cover' src={`${avatar}`} />
                    <AvatarFallback> {name?.[0] || "U"} </AvatarFallback>
                    {/* <AvatarFallback>{userName?.[0] || "U"}</AvatarFallback> */}
                </Avatar>
                <div>
                    <h1 className="text-[16px] font-normal text-(--blue1)">
                        {title}
                    </h1>
                    <h2 className='text-[14px] font-normal text-(--grey1)'>
                        {name}
                    </h2>
                    <p className='text-[11px] font-normal text-(--grey1)'>{specialization}</p>
                </div>


            </div>
        </Link>
    );
};