import { MessageCircle, MoreVertical, MoveRight, Reply, Share2, ThumbsUp } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

/* ─── Mock Data ─── */
const recentPosts = [
    {
        id: 1,
        userName: "Mathew Hems",
        userAvatar: "/images/newsFeed/avator.png",
        time: "12 mins ago",
        description: `"Celebrating the fierce spirit of women's football! ⚽💪🏆 GameChangers"
Witnessed an exhilarating women's football match today as these talented athletes displayed unmatched skill and determination on the field. Goals, tackles, and unforgettable moments made this game a true spectacle. #WomenInFootball #SoccerSisters #GirlPower`,
        likes: 3,
        comments: 3,
        shares: 1,
    },
];

const peopleToFollow = [
    { id: 1, name: "Dr. Dubois", specialization: "Cardiologue", avatar: "/images/classRoom/avator.png" },
    { id: 2, name: "Dr. Dubois", specialization: "Cardiologue", avatar: "/images/classRoom/avator.png" },
    { id: 3, name: "Dr. Dubois", specialization: "Cardiologue", avatar: "/images/classRoom/avator.png" },
    { id: 4, name: "Dr. Dubois", specialization: "Cardiologue", avatar: "/images/classRoom/avator.png" },
];

const forumDiscussions = [
    {
        id: 1,
        text: "Share your best study habits or learn from others. How do you stay focused during study sessions?Share your best study habits or learn from others. How do you stay focused during study sessions?Share your best study habits or learn from others. How do you stay focused during study ses lorem ipsum is a latin word.",
        likes: 13,
        replies: 2,
    },
    {
        id: 2,
        text: "Share your best study habits or learn from others. How do you stay focused during study sessions?Share your best study habits or learn from others. How do you stay focused during study sessions?Share your best study habits or learn from others. How do you stay focused during study ses lorem ipsum is a latin word.",
        likes: 13,
        replies: 0,
    },
    {
        id: 3,
        text: "Share your best study habits or learn from others. How do you stay focused during study sessions?Share your best study habits or learn from others. How do you stay focused during study sessions?Share your best study habits or learn from others. How do you stay focused during study ses lorem ipsum is a latin word.",
        likes: 15,
        replies: 5,
    },
];

/* ─── Section Header ─── */
function SectionHeader({ title, href = "#" }) {
    return (
        <div className="flex items-center justify-between">
            <h1 className="text-[30px] font-normal text-white">{title}</h1>
            <Link
                href={href}
                className="group flex items-center gap-2 text-(--blue1) text-[15px] font-normal"
            >
                <span className="group-hover:underline">See All</span>
                <span className="transform transition-transform duration-300 group-hover:translate-x-1.5">
                    <MoveRight size={18} />
                </span>
            </Link>
        </div>
    );
}

/* ─── Main Component ─── */
export default function RecentFeed() {
    return (
        <div className="space-y-10">
            {/* ═══════ Recent Feeds ═══════ */}
            <div>
                <SectionHeader title="Recent Feeds" href="/admin/news-feed" />
                <div className="mt-4 space-y-4">
                    {recentPosts.map((post) => (
                        <div
                            key={post.id}
                            className="rounded-[12px] bg-(--dark5) p-5"
                        >
                            {/* Header row */}
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <div className="relative h-[46px] w-[46px] rounded-full overflow-hidden shrink-0">
                                        <Image
                                            src={post.userAvatar}
                                            alt={post.userName}
                                            fill
                                            className="object-cover"
                                        />
                                    </div>
                                    <div>
                                        <h4 className="text-[15px] font-semibold text-white leading-tight">
                                            {post.userName}
                                        </h4>
                                        <span className="text-[12px] font-normal text-(--grey1)">
                                            {post.time}
                                        </span>
                                    </div>
                                </div>
                                <button className="text-(--grey1) hover:text-white transition cursor-pointer">
                                    <MoreVertical size={20} />
                                </button>
                            </div>

                            {/* Description */}
                            <p className="mt-4 text-[14px] leading-[22px] font-normal text-(--grey1) whitespace-pre-line">
                                {post.description}
                            </p>

                            {/* Stats row */}
                            <div className="mt-4 flex items-center justify-between px-1 py-3 text-[12px] text-(--grey1) border-y border-(--dark2)">
                                <div className="flex items-center gap-4">
                                    <span className="flex items-center gap-1.5 cursor-pointer hover:text-white transition-colors">
                                        <ThumbsUp size={14} className="text-blue-400" /> {post.likes}
                                    </span>
                                    <span className="flex items-center gap-1.5 cursor-pointer hover:text-white transition-colors">
                                        <MessageCircle size={14} /> {post.comments}
                                    </span>
                                </div>
                                <span className="flex items-center gap-1.5 cursor-pointer hover:text-white transition-colors">
                                    <Share2 size={14} /> {post.shares}
                                </span>
                            </div>

                            {/* Action buttons */}
                            <div className="grid grid-cols-3 pt-2">
                                <button className="flex items-center cursor-pointer justify-center gap-2 py-3 text-(--grey1) hover:text-blue-400 transition-colors">
                                    <ThumbsUp size={20} />
                                    <span className="text-[13px]">Like</span>
                                </button>
                                <button className="flex items-center cursor-pointer justify-center gap-2 py-3 text-(--grey1) hover:text-white border-x border-(--dark2) transition-colors">
                                    <MessageCircle size={20} />
                                    <span className="text-[13px]">Comment</span>
                                </button>
                                <button className="flex items-center cursor-pointer justify-center gap-2 py-3 text-(--grey1) hover:text-white transition-colors">
                                    <Share2 size={20} />
                                    <span className="text-[13px]">Share</span>
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* ═══════ People To Follow ═══════ */}
            <div>
                <SectionHeader title="People To Follow" href="/admin/users" />
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
                    {peopleToFollow.map((person) => (
                        <div
                            key={person.id}
                            className="flex flex-col items-center gap-3 rounded-[12px] border border-(--dark2) bg-(--dark5) py-5 px-4 transition-all duration-300 hover:-translate-y-1.5"
                        >
                            {/* Avatar with blue ring */}
                            <div className="relative">
                                <div className="h-[64px] w-[64px] rounded-full border-[2.5px] border-(--blue1) p-[3px]">
                                    <div className="h-full w-full rounded-full overflow-hidden">
                                        <Image
                                            src={person.avatar}
                                            alt={person.name}
                                            width={64}
                                            height={64}
                                            className="object-cover"
                                        />
                                    </div>
                                </div>
                                {/* Online dot */}
                                <span className="absolute bottom-0.5 right-0.5 h-[14px] w-[14px] rounded-full bg-green-500 border-[2.5px] border-(--dark5)" />
                            </div>
                            <div className="text-center">
                                <p className="text-[14px] font-semibold text-white">{person.name}</p>
                                <p className="text-[12px] font-normal text-(--grey1) mt-0.5">{person.specialization}</p>
                            </div>
                            <button className="w-full cursor-pointer rounded-[8px] border border-(--blue1) py-2 text-[13px] font-semibold text-(--blue1) transition hover:bg-(--blue1) hover:text-white">
                                Follow
                            </button>
                        </div>
                    ))}
                </div>
            </div>

            {/* ═══════ Top Forum Discussions ═══════ */}
            <div>
                <SectionHeader title="Top Forum Discussions" href="/admin/forum" />
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                    {forumDiscussions.map((item) => (
                        <div
                            key={item.id}
                            className="rounded-[12px] border border-(--dark2) bg-(--dark5) p-4 flex flex-col justify-between"
                        >
                            {/* Text with See More */}
                            <p className="text-[13px] leading-[20px] font-normal text-(--grey1)">
                                {item.text.length > 220
                                    ? item.text.slice(0, 220) + "..."
                                    : item.text}
                                {item.text.length > 220 && (
                                    <span className="text-white hover:underline cursor-pointer ml-1 font-medium">
                                        See More
                                    </span>
                                )}
                            </p>

                            {/* Bottom row */}
                            <div className="flex items-center justify-between mt-4 pt-3 border-t border-(--dark2) text-[12px]">
                                <div className="flex items-center gap-3">
                                    <span className="flex items-center gap-1 text-(--grey1) cursor-pointer hover:text-white transition-colors">
                                        <ThumbsUp size={13} /> {item.likes}
                                    </span>
                                    <span className="flex items-center gap-1 text-(--grey1) cursor-pointer hover:text-white transition-colors">
                                        <MessageCircle size={13} /> {item.replies > 0 ? item.replies : 3}
                                    </span>
                                </div>
                                <div className="flex items-center gap-3">
                                    {item.replies > 0 && (
                                        <span className="text-(--blue1) hover:underline cursor-pointer">
                                            Hide All Replies ({item.replies})
                                        </span>
                                    )}
                                    <span className="flex items-center gap-1 text-(--blue1) hover:underline cursor-pointer">
                                        <Reply size={13} /> Reply
                                    </span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}