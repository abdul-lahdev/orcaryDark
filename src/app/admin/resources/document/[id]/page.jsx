"use client";

import React, { useState, } from "react";
import Image from 'next/image';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Coins, MoreVertical } from "lucide-react";


import { motion, AnimatePresence } from "framer-motion";
import { ChevronUp } from "lucide-react";
import { accordionData } from "@/app/data/classRoom";
import { Separator } from "@/components/ui/separator"
import { EllipsisVertical } from "lucide-react";
import { useParams } from "next/navigation";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";


import { liveCards } from '@/app/data/cards';
import Link from "next/link";



export default function Page() {
  const params = useParams();
  console.log("data", params?.id);





  return (
    <>
      <div className="px-8 py-6 overflow-x-hidden">
        <ResourceCard />
        <div className='bg-(--dark5) mt-5 p-4 rounded-[8px]'>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="size-15 rounded-full bg-[url(/images/classRoom/session7.jpg)] bg-cover block bg-center "></span>
              <div>
                <h2 className="text-white text-[20px] font-semibold">
                  Intro to Neuroanatomy | Neurophysiology | Neuroscience
                </h2>
                <div className='flex items-center gap-2'>
                  <span className='font-normal text-[18px] text-(--grey1)'>Mike Millers</span>
                  <span className="block size-2.5 bg-(--grey5) rounded-full"></span>
                  <span className='font-normal text-[18px] text-(--grey1)'>453 viewers</span>
                  <span className="block size-2.5 bg-(--grey5) rounded-full"></span>
                  <span className='font-normal text-[18px] text-(--grey1)'>Streaming 12:10 PM</span>
                </div>
              </div>
            </div>
            <div>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <EllipsisVertical size={24} className="text-(--grey2) cursor-pointer" />
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
            <p className='text-(--grey1) text-[16px] font-normal'>
              The study of neuroanatomy, neurophysiology, and neuroscience is essential for understanding the structure and function of the brain and spinal cord, collectively known as the Central Nervous System (CNS). This multidisciplinary field explores how neurons, the building blocks of the nervous system, communicate with each other and with the body to generate thought, movement, and sensory experiences.
            </p>
          </div>
        </div>
      </div>

      <div className="bg-(--dark4) border-l border-(--dark2) px-3 py-4">
        <ChannelsAccordion />
      </div>
    </>
  );
}

// Video Player


// Accordion

const Accordion = ({ i, expanded, setExpanded, title, children }) => {
  const isOpen = expanded.includes(i);

  const toggle = () => {
    setExpanded((prev) =>
      prev.includes(i) ? prev.filter((x) => x !== i) : [...prev, i]
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
            className={`text-[18px] font-medium uppercase tracking-wider ${isOpen ? "text-(--blue1)" : "text-(--grey1)"
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
      <Separator className='mt-2 mb-3' />


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
    (item) => item.type === "liveSession" && item.isLive
  );

  const classRooms = accordionData.filter(
    (item) => item.type === "classRoom" && item.isLive
  );

  const offline = accordionData.filter((item) => !item.isLive);

  return (
    <div className="w-full bg-transparent mt-5">
      {/* 1) Live Sessions */}
      <Accordion
        i={0}
        expanded={expanded}
        setExpanded={setExpanded}
        title="More Related Documents"
      >
        {liveSessions.length ? (
          liveSessions.map((item) => <UserRow key={item.id} item={item} />)
        ) : (
          <EmptyRow text="No live sessions" />
        )}
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
     <div className='mt-4 grid grid-cols-1 gap-4'>
           {
            liveCards.map((item)=>item.docType==='document'&& item.category==='Cardiology' &&(

                <Link key={item.id} href={`/admin/resources/video/${item.id}`} className="w-full group cursor-pointer">
            <div className="relative aspect-video rounded-[12px] overflow-hidden">
              <Image src={item.thumbnail || "/images/classRoom/thumbnail.jpg"} alt="Video Thumbnail" width={376} height={227} className="w-full h-full object-cover" />

              {/* {item.isLive && <div className="absolute top-3 left-3 flex items-center gap-1.5 bg-(--red3) backdrop-blur-md px-2 py-1 rounded-[4px]">
                <div className="size-2 bg-(--red2) rounded-full animate-pulse border border-white" />
                <span className="text-white text-[12px] font-semibold uppercase">Live</span>
              </div>} */}

              <div className="absolute inset-0 bg-linear-to-t from-black/90 via-black/20 to-transparent flex flex-col justify-end px-4 pb-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    {/* Profile Image */}
                    <div className="relative w-10 h-10 overflow-hidden rounded-full">
                      <Image
                        src={item.avatar || "/images/classRoom/avator.png"}
                        fill
                        className="object-cover"
                        alt="avatar"
                      />
                    </div>



                    <div>
                      <h4 className="text-white text-[16px] font-semibold">{item.name}</h4>
                      <p className="text-(--light2) text-[12px] font-normal">{item.specialization}</p>
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
            ))
           }
         
          </div>
  );
};



// Pdf


export const ResourceCard = ({ item }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [insufficientBal, setInsufficientBal] = useState(false);

  // const { thumbnail, title, price = 14 } = item;
  const price = 14;
  return (
    <>
      {/* 1. Thumbnail Card */}
      <div
        onClick={() => setIsModalOpen(true)}
        className="group relative cursor-pointer overflow-hidden rounded-[12px] border border-white/5 bg-(--dark3) p-3 transition-all hover:-translate-y-1.5 shadow-[0px_0px_25px_0px_#c2d4de0a]"
      >
        <div className="w-full max-w-100 mx-auto"> {/* Card ki width control karne ke liye */}
          <div className="relative aspect-3/4 w-full overflow-hidden rounded-[8px] border border-white/5">
            <Image
              src="/images/resource/thumbnail3.jpg"
              fill
              sizes="(max-width: 768px) 100vw, 280px"
              className="object-cover transition-transform group-hover:scale-105" // h-[400px] hata di hai
              alt='title'
            />

            {/* Overlay */}
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-[2px]">
              <Button variant="secondary" className="bg-white/10 backdrop-blur-md border-white/20 text-white hover:bg-(--blue1) hover:border-transparent transition-all">
                View Document
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Access Modal (Shadcn) */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="bg-[#2B2B31] border-white/10 text-white sm:max-w-125 md:max-w-[35%] p-5 rounded-[20px]">
          <DialogHeader>
            <DialogTitle className="text-[18px] font-semibold text-(--grey7)">{!insufficientBal ? 'Access Resource' : 'Insufficient Balance'}</DialogTitle>
          </DialogHeader>

          {!insufficientBal && <div className="flex items-center gap-6 py-3 text-start w-full md:w-[80%] mx-auto">
            <Image src='/images/resource/resource.png' width={50} height={57} alt="" />
            <p className="text-[20px] font-normal text-(--grey1)">This is a paid resource you will need $14 to access. This amount will be credited from your wallet</p>
          </div>}
          {insufficientBal && <div className="flex flex-col items-center justify-center gap-6 py-3 text-center w-full md:w-[80%] mx-auto">
            <Image src='/images/resource/insufficientBalance.png' width={175} height={173} alt="" />
            <p className="text-[20px] font-normal text-(--grey1)">Looks like you don’t have sufficient amount to join the access resource.</p>
          </div>}

          <DialogFooter className="flex gap-4 mt-4">
            <Button
              onClick={() => setIsModalOpen(false)}
              variant="secondary"
              className='h-11 w-[50%]'

            >
              Leave
            </Button>
            {!insufficientBal && <Button
              className='h-11 w-[50%]'
              onClick={() => setInsufficientBal(true)}
            >
              Access Resource
            </Button>}
            {insufficientBal && <Button
              className='h-11 w-[50%]'
              onClick={() => {
                setInsufficientBal(false);
                setIsModalOpen(false);
              }}
            >
              Deposit Amount
            </Button>}
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};