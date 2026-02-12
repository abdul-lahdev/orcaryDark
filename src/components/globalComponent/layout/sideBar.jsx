import { Button } from "@/components/ui/button";
import {
    LayoutGrid, Home, Newspaper, Video, Layers,
    Presentation, Mail, MessageSquare, Settings, ArrowLeft,
    ChevronRight
} from "lucide-react";
import Link from "next/link";
const navItems = [
    { icon: LayoutGrid, label: "Dashboard", active: true },
    { icon: Home, label: "Home" },
    { icon: Newspaper, label: "Newsfeed" },
    { icon: Video, label: "Lives" },
    { icon: Layers, label: "Resources" },
    { icon: Presentation, label: "Virtual Classroom" },
    { icon: Mail, label: "Messages" },
    { icon: MessageSquare, label: "Forum" },
    { icon: Settings, label: "Settings" },
];
export default function SideBar() {
    return (
        <div className="w-70 h-screen bg-[#121216] border-r border-white/5 flex flex-col p-4 text-[#A1A1AA] absolute left-0 top-0">
            {/* Logo Section */}
            <div className="flex items-center justify-between mb-8 px-2">
                <div className="flex items-center gap-2">
                    <div className="bg-[#23A5E7] p-1.5 rounded-lg text-white">
                        <Video size={20} fill="currentColor" />
                    </div>
                    <span className="text-xl font-bold text-[#23A5E7]">Orcary</span>
                </div>
                <Button variant="ghost" size="icon" className="hover:bg-white/5">
                    <ArrowLeft size={20} />
                </Button>
            </div>

            {/* Navigation Links */}
            <nav className="flex-1 space-y-1 overflow-y-auto custom-scrollbar">
                {navItems.map((item, index) => (
                    <Link
                        key={index}
                        href="#"
                        className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all group ${item.active
                            ? "bg-[#23A5E7] text-white shadow-lg shadow-[#23A5E7]/20"
                            : "hover:bg-white/5 hover:text-white"
                            }`}
                    >
                        <item.icon size={22} className={item.active ? "text-white" : "group-hover:text-white"} />
                        <span className="font-medium">{item.label}</span>
                    </Link>
                ))}
            </nav>

            {/* Start Live Promo Card */}
            <div className="mt-6 bg-white/5 rounded-2xl p-5 border border-white/5 space-y-4">
                <div className="text-center space-y-1">
                    <h4 className="text-white font-bold text-sm">Start Live Now!</h4>
                    <p className="text-[11px] leading-tight opacity-70">
                        Start your live stream or your live virtual classroom.
                    </p>
                </div>
                <div className="space-y-2">
                    <Button className="w-full bg-[#23A5E7] hover:bg-[#1e8ec7] rounded-xl h-10 gap-2 text-xs">
                        <Video size={16} /> Go Live
                    </Button>
                    <Button variant="outline" className="w-full bg-[#1A1A1E] border-white/5 hover:bg-white/5 rounded-xl h-10 text-xs text-white">
                        Virtual Classroom
                    </Button>
                </div>
            </div>

            {/* Pro Upgrade Card */}
            <div className="mt-4 bg-white/5 rounded-2xl p-4 border border-white/5 flex items-center justify-between group cursor-pointer hover:bg-white/10 transition-all">
                <div className="space-y-1">
                    <h4 className="text-white font-bold text-xs">Want to earn money?</h4>
                    <p className="text-[10px] opacity-60">Get pro version and start your live session today</p>
                </div>
                <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </div>
        </div>
    );
}