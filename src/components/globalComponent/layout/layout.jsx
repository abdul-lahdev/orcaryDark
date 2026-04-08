// "use client";

// import { usePathname } from "next/navigation";
// import Header from "./header";
// import SideBar from "./sideBar";

// export default function Layout({ children }) {
//     const pathname = usePathname();
//     const isVirtualClassroom =
//         pathname.startsWith("/admin/virtual-classroom") ||
//         pathname === "/admin/home" || pathname === '/admin/newsfeed' || pathname === '/admin/lives';
//     const isResources = pathname.startsWith("/admin/resources");
//     const isVideoDetail = /^\/admin\/resources\/video\/[^/]+$/.test(pathname);
//     const isDocDetail = /^\/admin\/resources\/document\/[^/]+$/.test(pathname);
//     const isVC = pathname === "/admin/virtual-classroom" || pathname.startsWith("/admin/resources") || pathname === "/admin/home" || pathname === '/admin/newsfeed' || pathname === '/admin/lives';

//     console.log('/auth/login')
//     console.log(pathname)

//     const layoutClass =
//         isVirtualClassroom || isResources
//             ? isVideoDetail || isDocDetail
//                 ? "grid h-full grid-cols-[1fr_480px] gap-4"
//                 : "grid h-full grid-cols-[1fr_280px] gap-4"
//             : "h-full";

//     return (

//         <>
//             {pathname === '/auth/login' ? children : <div className="flex min-h-screen bg-[#121216]">
//                 <SideBar />

//                 {/* main area */}
//                 <div className="ml-70 flex min-w-0 flex-1 flex-col">
//                     <Header />

//                     {/* content wrapper must grow */}
//                     <div className={`flex-1 min-h-0 ${isVC ? "" : "px-8 py-6"}`}>
//                         <div className={layoutClass}>
//                             {children}
//                         </div>
//                     </div>
//                 </div>
//             </div>}
//         </>

//     );
// }

"use client";

import { usePathname } from "next/navigation";
import Header from "./header";
import SideBar from "./sideBar";

export default function Layout({ children }) {
  const pathname = usePathname();

//   const isLivesList = pathname === "/admin/lives";
//   const isLivesDetail = /^\/admin\/lives\/[^/]+$/.test(pathname);

//   const isVirtualClassroom =
//     pathname.startsWith("/admin/virtual-classroom") ||
//     pathname === "/admin/home" ||
//     pathname === "/admin/newsfeed" ||
//     pathname === "/admin/forum";

//   const isResources = pathname.startsWith("/admin/resources");

//   const isVideoDetail = /^\/admin\/resources\/video\/[^/]+$/.test(pathname);
//   const isDocDetail = /^\/admin\/resources\/document\/[^/]+$/.test(pathname);

//   const layoutClass = isLivesDetail
//     ? "grid h-full grid-cols-[1fr_480px] gap-4"
//     : isLivesList
//       ? "grid h-full grid-cols-[1fr_280px] gap-4"
//       : isVirtualClassroom || isResources
//         ? isVideoDetail || isDocDetail
//           ? "grid h-full grid-cols-[1fr_480px] gap-4"
//           : "grid h-full grid-cols-[1fr_280px] gap-4"
//         : "h-full";

  // const isVC =
  //     pathname.startsWith("/admin/virtual-classroom") ||
  //     pathname.startsWith("/admin/resources") ||
  //     pathname.startsWith("/admin/lives") ||
  //     pathname === "/admin/home" ||
  //     pathname === "/admin/newsfeed" || pathname === "/admin/forum";

  return (
    <>
      {pathname === "/auth/login" || pathname === "/auth/signup"? (
        children
      ) : (
        <div className="flex min-h-screen bg-[#121216]">
          <SideBar />

          <div className="ml-70 flex min-w-0 flex-1 flex-col">
            <Header />

            <div className="flex-1 min-h-0">
              <div>{children}</div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
