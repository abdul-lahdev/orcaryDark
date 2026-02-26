import { liveCards } from '@/app/data/cards';
import { MoreVertical, MoveRight } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

export default function LiveCards() {

    return (
        <>

            <div className='pl-4 flex items-center justify-between '>
                <div className='flex items-center gap-3'>
                    <span className='animate-ping bg-(--red5)  block size-2 rounded-full'></span>
                    <span className='text-[30px] font-normal text-white'>
                        Live Now
                    </span>
                </div>
                <Link
                    href='/admin/virtual-classroom'
                    className="group flex items-center gap-2 text-(--blue1) text-[15px] font-normal"
                >
                    <span className="group-hover:underline">See All</span>

                    <span className="transform transition-transform duration-300 group-hover:translate-x-1.5">
                        <MoveRight size={18} />
                    </span>
                </Link>
            </div>
            <div className='grid grid-cols-1 md:grid-cols-3 gap-8 mt-4'>

                {
                    liveCards.filter((item) => item.isLive === true).slice(0, 3).map((item) => (
                        <div key={item.id} className='hover:bg-(--dark3) rounded-[12px] bg-transparent p-3 transition-all duration-300 hover:-translate-y-1.5 cursor-pointer'>
                            <div className="w-full group cursor-pointer">
                                <div className="relative aspect-video rounded-[12px] overflow-hidden">
                                    {
                                        item.isLive ? <Image src={item.thumbnail || "/images/classRoom/thumbnail.jpg"} alt="Video Thumbnail" width={376} height={227} className="w-full h-full object-cover" /> : <div className='h-full flex items-center justify-center text-(--grey1) text-[20px] font-medium '>Scheduled for <br /> {item.upComing}</div>}


                                    {item.isLive && <div className="absolute top-3 left-3 flex items-center gap-1.5 bg-(--red3) backdrop-blur-md px-2 py-1 rounded-[4px]">
                                        <div className="size-2 bg-(--red2) rounded-full animate-pulse border border-white" />
                                        <span className="text-white text-[12px] font-semibold uppercase">Live</span>
                                    </div>}

                                    <div className="absolute inset-0 bg-linear-to-t from-black/90 via-black/20 to-transparent flex flex-col justify-end px-4 pb-2">
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center gap-3">
                                                {/* Profile Image */}
                                                <div className="relative w-10 h-10 overflow-hidden rounded-full">
                                                    <Image
                                                        src={item.avatar || "/images/classRoom/avator.png"}
                                                        fill
                                                        sizes="40px" // Yeh line add karein
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

                                    {item.isLive ? <div className="flex items-center gap-2 text-(--grey1) text-[12px]">
                                        <span>{item.viewers} viewers</span>
                                        <div className="size-2 bg-white rounded-full" />
                                        <span>{item.time}</span>
                                    </div> : <p className="text-(--grey1) text-[16px] font-normal">Will be live on {item.upComing}</p>}
                                </div>
                            </div>
                        </div>
                    ))
                }

            </div>


        </>
    )
}