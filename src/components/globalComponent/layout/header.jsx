"use client";
import { useTheme } from "next-themes";
import { Bell, Calendar, LogOut, Moon, Settings, User, Wallet } from "lucide-react";
import { LuChevronDown, LuUsers } from "react-icons/lu";

import { Input } from "@/components/ui/input"


import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export default function Header() {

    const { setTheme } = useTheme();


    return (
        <>
            <div className='bg-(--dark1) border-b border-white/5 p-4 flex justify-between items-center'>
                <Input className='h-9.75 rounded-[4px] w-[40%]' placeholder='Something' />
                <div className="flex items-center gap-5">
                    <div className="flex items-center gap-2">
                        <Wallet size={18} className="text-(--grey1) dark:hover:text-white" />
                        <span className="text-(--grey1) text-[12px] font-normal">$124.00</span>
                    </div>
                    <DropdownMenu onChange={(e) => console.log(e)} modal={false}> {/* modal={false} se scrollbar hide nahi hoga */}
                        <DropdownMenuTrigger className='cursor-pointer '>
                            <LuUsers size={18} className="text-(--grey1)  dark:hover:text-white" />
                        </DropdownMenuTrigger>

                        <DropdownMenuContent className="bg-(--dark1) border-(--dark2) text-white">
                            <DropdownMenuGroup>
                                <DropdownMenuItem className="gap-2 cursor-pointer focus:bg-white/5 focus:text-white">
                                    <span>Option 1</span>
                                </DropdownMenuItem>

                                <DropdownMenuItem className="gap-2 cursor-pointer focus:bg-white/5 focus:text-white">
                                    <span>Option 2</span>
                                </DropdownMenuItem>

                            </DropdownMenuGroup>
                        </DropdownMenuContent>
                    </DropdownMenu>
                    <Moon size={18} className="text-(--grey1) dark:hover:text-white" />
                    <Calendar size={18} className="text-(--grey1) dark:hover:text-white" />

                    <DropdownMenu>
                        <DropdownMenuTrigger className='cursor-pointer relative' asChild>
                            <div>
                                <span className="absolute block bg-(--red1) size-2 rounded-full right-0 top-0 translate-x-1.25 -translate-y-1.25"></span>
                                <Bell size={18} className="text-(--grey1) dark:hover:text-white" /></div>

                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                            <DropdownMenuGroup>
                                <DropdownMenuItem>Notification 1</DropdownMenuItem>
                                <DropdownMenuItem>Notification 2</DropdownMenuItem>
                                <DropdownMenuItem>Notification 3</DropdownMenuItem>
                            </DropdownMenuGroup>

                        </DropdownMenuContent>
                    </DropdownMenu>

                    <div>
                        <DropdownMenu>
                            <DropdownMenuTrigger className='cursor-pointer relative' asChild>
                                <div className="flex items-center gap-10 pl-5 border-l border-(--dark2) ml-10 ">
                                    <div className="flex items-center gap-3">
                                        <Avatar>
                                            <AvatarImage src="https://github.com/shadcn.png" />
                                            <AvatarFallback>CN</AvatarFallback>
                                        </Avatar>
                                        <div>
                                            <h1 className="text-[16px]/[20px] font-medium text-(--light1)">Mike Millers</h1>
                                            <p className='text-[12px] font-normal text-(--grey2)'>Admin Account</p>
                                        </div>

                                    </div>
                                    <span>
                                        <LuChevronDown size={18} className='text-white' />
                                    </span>
                                </div>


                            </DropdownMenuTrigger>
                            <DropdownMenuContent>
                                <DropdownMenuGroup>
                                    <DropdownMenuItem>Notification 1</DropdownMenuItem>
                                    <DropdownMenuItem>Notification 2</DropdownMenuItem>
                                    <DropdownMenuItem>Notification 3</DropdownMenuItem>
                                </DropdownMenuGroup>

                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>


                </div>


            </div>
            {/* <button onClick={() => setTheme("dark")}>Dark Mode</button> */}
            {/* <button onClick={() => setTheme("light")}>Light Mode</button> */}
        </>
    )
}