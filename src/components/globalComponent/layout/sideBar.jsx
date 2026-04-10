import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
    LayoutGrid, Home, Newspaper, Video, Layers,
    Presentation, Mail, MessageSquare, Settings, ArrowLeft,
    ChevronRight,
    CircleDollarSign
} from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area"
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";


const navItems = [
    { icon: LayoutGrid, label: "Dashboard", link: '/admin/dashboard' },
    { icon: Home, label: "Home", link: '/admin/home' }, // Example paths badal diye hain takay farq pata chale
    { icon: Newspaper, label: "Newsfeed", link: '/admin/newsfeed' },
    { icon: Video, label: "Lives", link: '/admin/lives' },
    { icon: Layers, label: "Resources", link: '/admin/resources' },
    { icon: Presentation, label: "Virtual Classroom", link: '/admin/virtual-classroom' },
    { icon: Mail, label: "Messages", link: '/admin/message' },
    { icon: MessageSquare, label: "Forum", link: '/admin/forum' },
    { icon: Settings, label: "Settings", link: '/admin/settings' },
];
export default function SideBar({ activeBar, setActiveBar }) {
    const pathname = usePathname();

    return (
        <motion.div
            layout
            transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
            className={`${activeBar ? "w-20 py-3 px-0" : "w-70 p-4"
                } h-screen bg-(--dark1) border-r border-(--dark2) flex flex-col text-(--grey1) fixed left-0 top-0 overflow-hidden transition-all duration-300 ease-in-out`}
        >
            {/* Logo Section */}
            <div
                className={`flex items-center ${activeBar ? "justify-center" : "justify-between"
                    } mb-4 px-2 transition-all duration-300 ease-in-out`}
            >
                {!activeBar && (
                    <motion.div
                        initial={{ opacity: 0, x: -8 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -8 }}
                        transition={{ duration: 0.22 }}
                    >
                      <svg width="109" height="32" viewBox="0 0 109 32" fill="none" xmlns="http://www.w3.org/2000/svg"> <g clipPath="url(#clip0_862_22257)"> <path d="M53.7345 16.1393C53.7345 17.8411 53.4239 19.3044 52.803 20.529C52.1821 21.7483 51.3308 22.6876 50.2492 23.3466C49.1729 24.0003 47.949 24.3272 46.5778 24.3272C45.2013 24.3272 43.9723 24.0003 42.8907 23.3466C41.8144 22.6876 40.9657 21.7459 40.3448 20.5212C39.7237 19.2966 39.4132 17.836 39.4132 16.1393C39.4132 14.4373 39.7237 12.9766 40.3448 11.7572C40.9657 10.5326 41.8144 9.59346 42.8907 8.93965C43.9723 8.28067 45.2013 7.95117 46.5778 7.95117C47.949 7.95117 49.1729 8.28067 50.2492 8.93965C51.3308 9.59346 52.1821 10.5326 52.803 11.7572C53.4239 12.9766 53.7345 14.4373 53.7345 16.1393ZM51.3592 16.1393C51.3592 14.842 51.1497 13.7497 50.7306 12.8624C50.3166 11.97 49.7474 11.2954 49.0228 10.8388C48.3036 10.377 47.4885 10.1461 46.5778 10.1461C45.6618 10.1461 44.8443 10.377 44.125 10.8388C43.4056 11.2954 42.8364 11.97 42.4173 12.8624C42.0033 13.7497 41.7962 14.842 41.7962 16.1393C41.7962 17.4364 42.0033 18.5312 42.4173 19.4237C42.8364 20.3111 43.4056 20.9856 44.125 21.4475C44.8443 21.9041 45.6618 22.1323 46.5778 22.1323C47.4885 22.1323 48.3036 21.9041 49.0228 21.4475C49.7474 20.9856 50.3166 20.3111 50.7306 19.4237C51.1497 18.5312 51.3592 17.4364 51.3592 16.1393ZM56.5386 24.1093V12.1542H58.7818V14.0533H58.906C59.1234 13.4099 59.5064 12.904 60.0549 12.5355C60.6086 12.1619 61.2346 11.9752 61.9332 11.9752C62.0782 11.9752 62.249 11.9803 62.4456 11.9907C62.6474 12.0011 62.8052 12.0141 62.919 12.0296V14.2557C62.8259 14.2297 62.6604 14.2012 62.4223 14.17C62.1843 14.1337 61.9462 14.1156 61.7082 14.1156C61.1597 14.1156 60.6707 14.2323 60.2411 14.4658C59.8168 14.6942 59.4804 15.0133 59.2321 15.4232C58.9837 15.8279 58.8595 16.2896 58.8595 16.8087V24.1093H56.5386ZM69.5227 24.3506C68.3687 24.3506 67.3752 24.0886 66.5421 23.5645C65.7141 23.0352 65.0776 22.3062 64.6326 21.3773C64.1875 20.4486 63.965 19.3849 63.965 18.1863C63.965 16.972 64.1928 15.9005 64.6482 14.9717C65.1035 14.0377 65.7452 13.3087 66.5732 12.7846C67.4011 12.2605 68.3766 11.9985 69.4995 11.9985C70.4051 11.9985 71.2124 12.1671 71.9213 12.5044C72.6302 12.8365 73.202 13.3035 73.6367 13.9054C74.0765 14.5073 74.3379 15.2104 74.4207 16.0146H72.1619C72.0377 15.4543 71.7531 14.9717 71.3081 14.567C70.8682 14.1623 70.2783 13.9599 69.5383 13.9599C68.8914 13.9599 68.3247 14.1311 67.8383 14.4736C67.3571 14.8109 66.9819 15.2934 66.7129 15.9213C66.4438 16.5439 66.3093 17.2808 66.3093 18.1318C66.3093 19.0035 66.4411 19.7559 66.705 20.3889C66.9689 21.022 67.3415 21.5124 67.8229 21.86C68.3093 22.2076 68.8811 22.3815 69.5383 22.3815C69.9781 22.3815 70.3766 22.301 70.7337 22.1401C71.0959 21.9741 71.3986 21.738 71.6418 21.4319C71.8903 21.1257 72.0635 20.7574 72.1619 20.3266H74.4207C74.3379 21.0997 74.0869 21.7898 73.6678 22.397C73.2487 23.0041 72.6872 23.4815 71.9834 23.8291C71.2848 24.1768 70.4645 24.3506 69.5227 24.3506ZM80.3723 24.374C79.6169 24.374 78.9337 24.2338 78.3232 23.9537C77.7126 23.6683 77.2286 23.2557 76.8716 22.7161C76.5197 22.1765 76.3438 21.5148 76.3438 20.7314C76.3438 20.0569 76.4732 19.5016 76.7319 19.0658C76.9907 18.6299 77.34 18.2847 77.7798 18.0305C78.2197 17.7763 78.7112 17.5843 79.2546 17.4546C79.798 17.3249 80.3516 17.2263 80.9157 17.1589C81.6299 17.0758 82.2094 17.0084 82.6544 16.9565C83.0995 16.8994 83.4228 16.8087 83.6247 16.684C83.8265 16.5595 83.9275 16.3571 83.9275 16.0769V16.0225C83.9275 15.3428 83.736 14.816 83.353 14.4425C82.9753 14.0689 82.4112 13.8821 81.6609 13.8821C80.8794 13.8821 80.2637 14.0559 79.8134 14.4035C79.3684 14.746 79.0605 15.1274 78.8897 15.5477L76.7085 15.0495C76.9674 14.3231 77.3451 13.7368 77.8418 13.2905C78.3438 12.8391 78.9208 12.5122 79.5729 12.3098C80.2248 12.1023 80.9106 11.9985 81.6299 11.9985C82.1059 11.9985 82.6104 12.0556 83.1435 12.1697C83.6816 12.2787 84.1835 12.4811 84.6492 12.7768C85.1202 13.0726 85.5058 13.4955 85.8058 14.0455C86.106 14.5903 86.2561 15.2987 86.2561 16.1704V24.1093H83.9895V22.4748H83.8964C83.7463 22.7759 83.5212 23.0716 83.221 23.3621C82.921 23.6527 82.5354 23.894 82.0646 24.086C81.5936 24.278 81.0295 24.374 80.3723 24.374ZM80.8769 22.506C81.5185 22.506 82.067 22.3788 82.5224 22.1246C82.983 21.8704 83.3323 21.5382 83.5703 21.1284C83.8135 20.7132 83.9352 20.2696 83.9352 19.7974V18.2563C83.8524 18.3392 83.692 18.4171 83.4539 18.4898C83.221 18.5573 82.9546 18.6169 82.6544 18.6687C82.3543 18.7155 82.0619 18.7596 81.7773 18.8011C81.4927 18.8374 81.2546 18.8686 81.0632 18.8945C80.613 18.9516 80.2015 19.0476 79.829 19.1825C79.4615 19.3174 79.1666 19.512 78.9441 19.7662C78.7268 20.0154 78.6181 20.3474 78.6181 20.7625C78.6181 21.3385 78.8303 21.7744 79.2546 22.0701C79.6789 22.3607 80.2197 22.506 80.8769 22.506ZM89.3473 24.1093V12.1542H91.5907V14.0533H91.7148C91.9321 13.4099 92.3151 12.904 92.8636 12.5355C93.4173 12.1619 94.0435 11.9752 94.7421 11.9752C94.8869 11.9752 95.0577 11.9803 95.2544 11.9907C95.4563 12.0011 95.6141 12.0141 95.7279 12.0296V14.2557C95.6348 14.2297 95.4691 14.2012 95.2311 14.17C94.993 14.1337 94.755 14.1156 94.5169 14.1156C93.9684 14.1156 93.4794 14.2323 93.0499 14.4658C92.6256 14.6942 92.2893 15.0133 92.0408 15.4232C91.7924 15.8279 91.6682 16.2896 91.6682 16.8087V24.1093H89.3473ZM99.5662 28.5925C99.2195 28.5925 98.9039 28.5641 98.6193 28.5069C98.3347 28.455 98.1225 28.3979 97.9828 28.3357L98.5416 26.4288C98.966 26.5429 99.3437 26.5922 99.6749 26.5767C100.006 26.5611 100.298 26.4366 100.552 26.2031C100.811 25.9696 101.038 25.5882 101.235 25.059L101.522 24.2649L97.16 12.1542H99.6439L102.663 21.4319H102.788L105.807 12.1542H108.299L103.385 25.7049C103.158 26.3276 102.868 26.8543 102.516 27.2849C102.164 27.7208 101.745 28.0477 101.258 28.2657C100.772 28.4835 100.208 28.5925 99.5662 28.5925Z" fill="#23A5E7"/> <mask id="mask0_862_22257" style={{maskType:'luminance'}} maskUnits="userSpaceOnUse" x="0" y="0" width="31" height="32"> <path d="M30.6016 0H0V32H30.6016V0Z" fill="white"/> </mask> <g mask="url(#mask0_862_22257)"> <path d="M3.63633 4.67888C2.65182 5.24761 2.65182 6.66941 3.63633 7.23814L11.3894 11.7169C12.374 12.2856 13.6046 11.5747 13.6046 10.4372V1.4798C13.6046 0.342347 12.374 -0.368561 11.3894 0.200163L3.63633 4.67888Z" fill="#23A5E7"/> <path d="M9.96655 14.8361C10.9511 15.4048 10.9511 16.8267 9.96656 17.3953L2.21347 21.8741C1.22894 22.4428 -0.00170898 21.7319 -0.00170898 20.5945V11.637C-0.00170898 10.4996 1.22894 9.78866 2.21347 10.3574L9.96655 14.8361Z" fill="#23A5E7"/> <path d="M3.63633 24.7424C2.65182 25.3111 2.65182 26.733 3.63633 27.3015L11.3894 31.7803C12.374 32.349 13.6046 31.6382 13.6046 30.5006V21.5433C13.6046 20.4059 12.374 19.6949 11.3894 20.2637L3.63633 24.7424Z" fill="#23A5E7"/> <path d="M26.9602 4.67888C27.9447 5.24761 27.9447 6.66941 26.9602 7.23814L19.2071 11.7169C18.2226 12.2856 16.9919 11.5747 16.9919 10.4372V1.4798C16.9919 0.342347 18.2226 -0.368561 19.2071 0.200163L26.9602 4.67888Z" fill="#23A5E7"/> <path d="M20.63 14.8361C19.6453 15.4048 19.6453 16.8267 20.6298 17.3953L28.383 21.8741C29.3675 22.4428 30.5982 21.7319 30.5982 20.5945V11.637C30.5982 10.4996 29.3675 9.78866 28.383 10.3574L20.63 14.8361Z" fill="#23A5E7"/> <path d="M26.9602 24.7424C27.9447 25.3111 27.9447 26.733 26.9602 27.3015L19.2071 31.7803C18.2226 32.349 16.9919 31.6382 16.9919 30.5006V21.5433C16.9919 20.4059 18.2226 19.6949 19.2071 20.2637L26.9602 24.7424Z" fill="#23A5E7"/> </g> </g> <defs> <clipPath id="clip0_862_22257"> <rect width="109" height="32" fill="white"/> </clipPath> </defs> </svg>
                    </motion.div>
                )}

                <motion.div
                    animate={{ rotate: activeBar ? 180 : 0 }}
                    transition={{ type: "spring", stiffness: 300, damping: 25 }}
                    className="cursor-pointer"
                >
                    <Button
                        variant="ghost"
                        size="icon"
                        className="hover:bg-white/5 transition-all duration-300 ease-in-out"
                        onClick={() => setActiveBar(!activeBar)}
                    >
                        <ArrowLeft size={20} />
                    </Button>
                </motion.div>
            </div>

            {/* Navigation Links */}
            <ScrollArea
                className={`min-h-0 transition-all duration-300 ease-in-out ${activeBar ? "px-2" : "px-3"
                    }`}
            >
                <div className="flex flex-col gap-1 py-4">
                    {navItems.map((item, index) => {
                        const isActive = pathname === item.link;

                        return (
                            <motion.div
                                key={index}
                                layout
                                transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
                            >
                                <Link
                                    href={item.link}
                                    className={`flex ${!activeBar ? "justify-start gap-3" : "justify-center gap-0"
                                        } items-center px-4 py-2 rounded-[8px] transition-all duration-300 ease-in-out group ${isActive
                                            ? "bg-(--blue1) text-white shadow-lg shadow-[#23A5E7]/20"
                                            : "hover:bg-white/5 text-(--grey1) hover:text-white"
                                        }`}
                                >
                                    <item.icon
                                        size={18}
                                        className={`shrink-0 transition-all duration-300 ease-in-out ${isActive ? "text-white" : "group-hover:text-white"
                                            }`}
                                    />

                                    <motion.span
                                        initial={false}
                                        animate={{
                                            opacity: activeBar ? 0 : 1,
                                            width: activeBar ? 0 : "auto",
                                            marginLeft: activeBar ? 0 : 0,
                                        }}
                                        transition={{ duration: 0.22, ease: "easeInOut" }}
                                        className={`overflow-hidden whitespace-nowrap text-[12px] font-normal ${activeBar ? "pointer-events-none" : ""
                                            }`}
                                    >
                                        {!activeBar && item.label}
                                    </motion.span>
                                </Link>
                            </motion.div>
                        );
                    })}
                </div>
            </ScrollArea>

            {/* Start Live Promo Card */}
            {!activeBar ? (
                <motion.div
                    initial={false}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 8 }}
                    transition={{ duration: 0.25 }}
                    className="mt-3 bg-(--dark3) rounded-2xl p-3 space-y-2"
                >
                    <div className="text-center">
                        <h4 className="text-white text-[12px] font-semibold text-(--grey1)">
                            Start Live Now!
                        </h4>
                        <p className="text-[9px] leading-tight bg(--grey1)">
                            Start your live stream or your live virtual classroom.
                        </p>
                    </div>
                    <div className="space-y-2">
                        <Button className="w-full rounded-[10px] gap-2 h-8 text-xs">
                            <Video size={16} /> Go Live
                        </Button>
                        <Button variant="outline" className="w-full h-8 text-xs">
                            Virtual Classroom
                        </Button>
                    </div>
                </motion.div>
            ) : null}

            {/* Pro Upgrade Card */}
            {!activeBar ? (
                <motion.div
                    initial={false}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 8 }}
                    transition={{ duration: 0.25 }}
                    className="mt-4 bg-white/5 rounded-2xl p-3 border border-white/5 flex items-center justify-between group cursor-pointer hover:bg-white/10 transition-all duration-300 ease-in-out"
                >
                    <div className="space-y-1">
                        <h4 className="text-white font-normal text-[12px]">
                            Want to earn money?
                        </h4>
                        <p className="text-[9px] text-(--grey1)">
                            Get pro version and start your live session today
                        </p>
                    </div>
                    <ChevronRight
                        size={18}
                        className="group-hover:translate-x-1 transition-transform duration-300 ease-in-out"
                    />
                </motion.div>
            ) : null}
        </motion.div>
    );
}