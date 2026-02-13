"use client";
import { useTheme } from "next-themes";
import { Bell, Calendar, LogOut, Settings, User, Wallet } from "lucide-react";
import { LuUsers } from "react-icons/lu";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"

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
                    <Calendar size={18} className="text-(--grey1) dark:hover:text-white" />
                    <Bell size={18} className="text-(--grey1) dark:hover:text-white" />


                </div>


            </div>
            {/* <button onClick={() => setTheme("dark")}>Dark Mode</button> */}
            {/* <button onClick={() => setTheme("light")}>Light Mode</button> */}
        </>
    )
}