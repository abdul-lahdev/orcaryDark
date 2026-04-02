"use client";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Eye, Flame } from "lucide-react";
import { liveCards } from "@/app/data/cards";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";

const discussions = [
    {
        id:1,
        title:'Share your best study habits or learn from others. How do you stay focused during study sessions?',
        url:'#'
    },
    {
        id:2,
        title:'Seek feedback on your recent assignment. Share challenges you faced and ask for suggestions for improvement.',
        url:'#'
    },
    {
        id:3,
        title:'Recommend and discuss a book or article related to the course material. What insights did you gain?',
        url:'#'
    },

]

export default function QuickInfo() {
  const [showMore, setShowMore] = useState(false);
  return (
    <>
      <div>
        <div className="bg-(--dark5) rounded-[8px] shadow-[0px_1px_2px_0px_#0000000D] p-4">
          <h1 className="text-[16px] font-normal text-white flex items-center gap-2">
            Top discussion this week{" "}
            <Flame size={15} className="text-(--orange1)" />
          </h1>
            {discussions.map((discussion) => (
            <div key={discussion.id} className="mt-4">
              <h2 className="text-[14px] font-normal text-(--grey1) ">
                {discussion.title}
              </h2>
              <Link href={discussion.url} className="text-(--blue1) flex items-center text-[14px] mt-2 gap-2 hover:underline">
               Details <ArrowRight size={13} />
              </Link>
            </div>
          ))}
        </div>
        <div className='bg-(--dark5) rounded-[8px] shadow-[0px_1px_2px_0px_#0000000D] p-4 mt-5'>
             <h1 className="text-[16px] font-normal text-white flex items-center gap-2">
            Recommended topics
          </h1>
          <div className="mt-3 flex flex-wrap gap-2">
            <span className="bg-[#00000099] rounded-[8px] w-max h-7 flex items-center px-3 text-(--grey7) font-normal text-[14px]">Programming</span>
            <span className="bg-[#00000099] rounded-[8px] w-max h-7 flex items-center px-3 text-(--grey7) font-normal text-[14px]">Copywriting</span>
            <span className="bg-[#00000099] rounded-[8px] w-max h-7 flex items-center px-3 text-(--grey7) font-normal text-[14px]">Product design</span>
            <span className="bg-[#00000099] rounded-[8px] w-max h-7 flex items-center px-3 text-(--grey7) font-normal text-[14px]">Machine learning</span>
            <span className="bg-[#00000099] rounded-[8px] w-max h-7 flex items-center px-3 text-(--grey7) font-normal text-[14px]">Productivity</span>
          </div>

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
  );
}
