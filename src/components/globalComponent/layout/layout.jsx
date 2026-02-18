// 'use client'
// import { usePathname } from 'next/navigation'
// import Header from "./header";
// import SideBar from "./sideBar";
// export default function Layout({ children }) {
//     const pathname = usePathname()
//     console.log(pathname)
//     return (

//         <>
//             <SideBar />
//             <div className="ml-70 flex flex-col bg-[#121216] min-h-screen">
//                 <Header />
//                 <div className={`${pathname === '/admin/virtual-classroom' ? 'grid grid-cols-[1fr_280px] justify-between' : 'px-8 py-6'}`} >
//                     {children}
//                 </div>

//             </div>

//         </>
//     )
// }


"use client";

import { usePathname } from "next/navigation";
import Header from "./header";
import SideBar from "./sideBar";

export default function Layout({ children }) {
    const pathname = usePathname();
    const isVC = pathname === "/admin/virtual-classroom" || pathname.startsWith("/admin/resources");

    return (
        <div className="flex min-h-screen bg-[#121216]">
            <SideBar />

            {/* main area */}
            <div className="ml-70 flex min-w-0 flex-1 flex-col">
                <Header />

                {/* content wrapper must grow */}
                <div className={`flex-1 min-h-0 ${isVC ? "" : "px-8 py-6"}`}>
                    <div className={isVC ? "grid h-full grid-cols-[1fr_280px] gap-4" : "h-full"}>
                        {children}
                    </div>
                </div>
            </div>
        </div>
    );
}
