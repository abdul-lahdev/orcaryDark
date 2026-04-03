"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useMemo, useState } from "react";
import {
  CircleCheckBig,
  Clock,
  Flame,
  MessageCircle,
  MoreHorizontal,
  MoreVertical,
  Paperclip,
  Reply,
  SendHorizontal,
  Share2,
  ThumbsUp,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Image from "next/image";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Input } from "@/components/ui/input";
import CustomVideoPlayer from "./CustomVideoPlayer";

const tabs = [
  { id: "New", label: "New" },
  { id: "Top", label: "Top" },
  { id: "Hot", label: "Hot" },
  { id: "Closed", label: "Closed" },
];

const posts = [
  {
    id: 1,
    userName: "Mathew Hems",
    userAvatar: "/images/newsFeed/avator.png",
    time: "12 mins ago",
    images: [
      "/images/classRoom/thumbnail2.jpg",
      "/images/classRoom/thumbnail2.jpg",
      "/images/classRoom/thumbnail2.jpg",
      "/images/classRoom/thumbnail2.jpg",
    ],
    video: [],
    title: "Celebrating the fierce spirit of women's football!",
    description: `"Celebrating the fierce spirit of women's football! ⚽💪🏆 GameChangers". Witnessed an exhilarating women's football match today as these talented athletes displayed unmatched skill and determination on the field. Goals, tackles, and unforgettable moments made this game a true spectacle. #WomenInFootball #SoccerSisters #GirlPower`,
    hashtags: ["#WomenInFootball", "#SoccerSisters"],
    likes: 3,
    messages: 5,
    shares: 2,
  },
  {
    id: 2,
    userName: "Sarah Jenkins",
    userAvatar: "/images/newsFeed/avator.png",
    time: "1 hour ago",
    images: [
      "/images/classRoom/thumbnail2.jpg",
      "/images/classRoom/thumbnail2.jpg",
    ],
    title: "Team Meeting",
    description: "Great collaboration today with the design team.",
    hashtags: [],
    video: [],
    likes: 12,
    messages: 2,
    shares: 1,
  },
  {
    id: 3,
    userName: "Sarah imran",
    userAvatar: "/images/newsFeed/avator1.jpg",
    time: "1 hour ago",
    images: ["/images/classRoom/thumbnail2.jpg"],
    video: [],
    title: "Team Meeting",
    description: "Great collaboration today with the design team.",
    hashtags: ["#Design", "#TeamWork"],
    likes: 12,
    messages: 2,
    shares: 1,
  },
  {
    id: 4,
    userName: "Mohsin imran",
    userAvatar: "/images/newsFeed/avator2.jpg",
    time: "1 hour ago",
    images: [],
    video: [],
    title: "Team Meeting",
    description:
      "Witnessed an exhilarating women's football match today as these talented athletes displayed unmatched skill and determination on the field. Goals, tackles, and unforgettable moments made this game a true spectacl",
    hashtags: ["#Design", "#TeamWork"],
    likes: 12,
    messages: 2,
    shares: 1,
  },
  {
    id: 5,
    userName: "Ali imran",
    userAvatar: "https://github.com/shadcn.png",
    time: "1 hour ago",
    images: [],
    video: ["/video/backgroundVideo.mp4"],
    title: "Team Meeting",
    description:
      "Witnessed an exhilarating women's football match today as these talented athletes displayed unmatched skill and determination on the field. Goals, tackles, and unforgettable moments made this game a true spectacl",
    hashtags: ["#Design", "#TeamWork"],
    likes: 12,
    messages: 2,
    shares: 1,
  },
];

const initialCommentsByPost = {
  1: [
    {
      id: "c1",
      userName: "Guy's",
      userAvatar: "/images/newsFeed/comment.png",
      time: "12hr ago",
      text: "So I was in the shower last day and it just popped in my head. What does the fox say? Like really. How do they sound when they speak. I know about dogs, cats, mouse, cow, etc but fox! Never heard of it. Anyways, if any of you guys have any idea. Let me know in the comments. Thanks in advance.",
      likes: 12,
      commentCount: 3,
      replies: [
        {
          id: "r1",
          userName: "Nischal Kharel",
          userAvatar: "/images/newsFeed/comment.png",
          time: "12hr ago",
          text: "So I went to the jungle and caught a fox after seeing this post. I got the fox to talk to me and it said “Hello World!” Hope this helps. Let me know if you want me to get it to say something else.",
          likes: 12,
          commentCount: 3,
          replies: [
            {
              id: "rr1",
              userName: "Aakash Raj Dahal",
              userAvatar: "/images/newsFeed/comment.png",
              time: "06hr ago",
              text: "Get it to say some curse words... lmao",
              likes: 12,
              commentCount: 3,
              replies: [],
            },
            {
              id: "rr2",
              userName: "Nischal Kharel",
              userAvatar: "/images/newsFeed/comment.png",
              time: "05hr ago",
              text: "lol... Good Idea... “Honey get that fox outta that cage”",
              likes: 12,
              commentCount: 3,
              replies: [],
            },
          ],
        },
      ],
    },
    {
      id: "c2",
      userName: "Kishor Kumar Khadka",
      userAvatar: "/images/newsFeed/comment.png",
      time: "11hr ago",
      text: "Haha... That's funny. On a serious note though, I’ve never thought about this either. Maybe I should write a song about how foxes sound like.",
      likes: 12,
      commentCount: 3,
      replies: [],
    },
  ],
  2: [],
  3: [],
  4: [],
  5: [],
};

const makeId = () =>
  `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;

const getRelativeTime = () => "Just now";

const countAllReplies = (comment) => {
  if (!comment.replies?.length) return 0;
  return comment.replies.reduce(
    (total, reply) => total + 1 + countAllReplies(reply),
    0
  );
};

const countAllCommentsForPost = (comments = []) => {
  return comments.reduce(
    (total, comment) => total + 1 + countAllReplies(comment),
    0
  );
};

const addReplyToTree = (comments, targetId, replyPayload) => {
  return comments.map((comment) => {
    if (comment.id === targetId) {
      return {
        ...comment,
        replies: [...(comment.replies || []), replyPayload],
      };
    }

    if (comment.replies?.length) {
      return {
        ...comment,
        replies: addReplyToTree(comment.replies, targetId, replyPayload),
      };
    }

    return comment;
  });
};

export default function SocialMedia() {
  const [activeTab, setActiveTab] = useState(tabs[0].id);

  return (
    <div className="space-y-4">
      <div className="w-full overflow-hidden">
        <div className="flex items-center justify-between">
          <h1 className="text-white text-[24px] font-bold">Cardiology</h1>

          <div className="flex flex-row space-x-2 p-1 overflow-x-scroll no-scrollbar justify-end">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`${
                  activeTab === tab.id
                    ? "text-white"
                    : "text-(--grey1) hover:text-white/60"
                } relative rounded-[12px] cursor-pointer p-4 text-sm font-medium transition focus-visible:outline-2 outline-sky-400`}
                style={{ WebkitTapHighlightColor: "transparent" }}
              >
                {activeTab === tab.id && (
                  <motion.span
                    layoutId="bubble"
                    className="absolute rounded-[12px] inset-0 z-10 bg-(--blue1)"
                    transition={{
                      type: "spring",
                      bounce: 0.2,
                      duration: 0.6,
                    }}
                  />
                )}
                <span className="relative z-20 flex items-center gap-2">
                  {tab.label === "New" ? (
                    <Clock size={15} />
                  ) : tab.label === "Hot" ? (
                    <Flame size={15} />
                  ) : (
                    <CircleCheckBig size={15} />
                  )}
                  {tab.label}
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="min-h-75 mt-3">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
          >
            <div>
              {posts.map((item) => (
                <div
                  key={item.id}
                  className="bg-(--dark5) rounded-[12px] p-3 mt-5"
                >
                  <VideoCard item={item} />
                </div>
              ))}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}

function CommentItem({
  comment,
  level = 0,
  collapsedReplies,
  onToggleReplies,
  activeReplyBox,
  onOpenReplyBox,
  replyValues,
  onReplyInputChange,
  onSendReply,
}) {
  const hasReplies = comment.replies?.length > 0;
  const isCollapsed = !!collapsedReplies[comment.id];
  const replyValue = replyValues[comment.id] || "";
  const isReplyBoxOpen = activeReplyBox === comment.id;

  return (
    <div className={`${level > 0 ? "rounded-[10px] bg-white/5 px-4 py-3" : ""}`}>
      <div className="flex items-start gap-3">
        <Avatar className="h-8 w-8 shrink-0 border border-white/10">
          <AvatarImage src={comment.userAvatar} />
          <AvatarFallback>{comment.userName?.[0] || "U"}</AvatarFallback>
        </Avatar>

        <div className="min-w-0 flex-1">
          <div className="flex items-start justify-between gap-3">
            <div className="min-w-0">
              <h4
                className={`text-[14px] font-medium ${
                  level === 2 ? "text-[#1d9bf0]" : "text-(--grey1)"
                }`}
              >
                {comment.userName}
              </h4>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <span className="text-[12px] text-(--grey11) whitespace-nowrap">
                {comment.time}
              </span>
              <MoreHorizontal size={16} className="text-(--grey10)" />
            </div>
          </div>

          <p className="mt-2 text-[14px] leading-[22px] text-(--grey2)">
            {comment.text}
          </p>

          <div className="mt-3 flex items-center justify-between gap-3">
            <div className="flex items-center gap-4 text-[12px] text-(--grey11)">
              <button
                type="button"
                className="flex items-center gap-1.5 text-[#22c55e] hover:opacity-80"
              >
                <ThumbsUp size={14} fill="currentColor" /> {comment.likes}
              </button>

              <button
                type="button"
                className="flex items-center gap-1.5 hover:text-white"
              >
                <MessageCircle size={14} /> {comment.commentCount}
              </button>
            </div>

            <div className="flex items-center gap-4 text-[12px]">
              {hasReplies && (
                <button
                  type="button"
                  onClick={() => onToggleReplies(comment.id)}
                  className="text-[#1d9bf0] hover:opacity-80"
                >
                  {isCollapsed
                    ? `Show Replies (${comment.replies.length})`
                    : `Hide All Replies (${comment.replies.length})`}
                </button>
              )}

              <button
                type="button"
                onClick={() => onOpenReplyBox(comment.id)}
                className="flex items-center gap-1 text-[#1d9bf0] hover:opacity-80"
              >
                <Reply size={14} /> Reply
              </button>
            </div>
          </div>

          {isReplyBoxOpen && (
            <div className="mt-4 rounded-[12px] bg-white/6 p-2">
              <div className="flex items-center gap-3">
                <Avatar className="h-8 w-8 shrink-0 border border-white/10">
                  <AvatarImage src="/images/newsFeed/comment.png" />
                  <AvatarFallback>Y</AvatarFallback>
                </Avatar>

                <div className="flex min-w-0 flex-1 items-center rounded-[10px] bg-white/6 ">
                  <Input
                    value={replyValue}
                    onChange={(e) =>
                      onReplyInputChange(comment.id, e.target.value)
                    }
                    placeholder="Write a reply..."
                    className="border-0 bg-transparent w-full px-0 text-[14px] text-white placeholder:text-(--grey11) focus-visible:ring-0 focus-visible:ring-offset-0"
                  />
                </div>

                <Button
                  type="button"
                  onClick={() => onSendReply(comment.id)}
                  className="h-10 rounded-[10px] bg-[#1d9bf0] px-5 text-white hover:bg-[#1686d9]"
                >
                  <SendHorizontal size={16} />
                  Reply
                </Button>
              </div>
            </div>
          )}

          {hasReplies && !isCollapsed && (
            <div
              className={`mt-4 ${
                level === 0 ? "border-l-2 border-[#1d9bf0] pl-4 space-y-4" : "space-y-3"
              }`}
            >
              {comment.replies.map((reply) => (
                <CommentItem
                  key={reply.id}
                  comment={reply}
                  level={level + 1}
                  collapsedReplies={collapsedReplies}
                  onToggleReplies={onToggleReplies}
                  activeReplyBox={activeReplyBox}
                  onOpenReplyBox={onOpenReplyBox}
                  replyValues={replyValues}
                  onReplyInputChange={onReplyInputChange}
                  onSendReply={onSendReply}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export const VideoCard = ({ item }) => {
  const {
    id,
    images,
    userName,
    video,
    userAvatar,
    time,
    description,
    hashtags,
    likes,
    shares,
  } = item;

  const [showComment, setShowComment] = useState(false);
  const [currId, setCurrId] = useState(null);
  const [isOpen, setIsOpen] = useState(false);

  const [comments, setComments] = useState(initialCommentsByPost[id] || []);
  const [newComment, setNewComment] = useState("");
  const [replyValues, setReplyValues] = useState({});
  const [activeReplyBox, setActiveReplyBox] = useState(null);
  const [collapsedReplies, setCollapsedReplies] = useState({});

  const totalMessages = useMemo(
    () => countAllCommentsForPost(comments),
    [comments]
  );

  const handleToggleReplies = (commentId) => {
    setCollapsedReplies((prev) => ({
      ...prev,
      [commentId]: !prev[commentId],
    }));
  };

  const handleOpenReplyBox = (commentId) => {
    setActiveReplyBox((prev) => (prev === commentId ? null : commentId));
  };

  const handleReplyInputChange = (commentId, value) => {
    setReplyValues((prev) => ({
      ...prev,
      [commentId]: value,
    }));
  };

  const handleSendComment = () => {
    const value = newComment.trim();
    if (!value) return;

    const payload = {
      id: makeId(),
      userName: userName || "You",
      userAvatar: userAvatar || "/images/newsFeed/comment.png",
      time: getRelativeTime(),
      text: value,
      likes: 0,
      commentCount: 0,
      replies: [],
    };

    setComments((prev) => [...prev, payload]);
    setNewComment("");
    setShowComment(true);
  };

  const handleSendReply = (commentId) => {
    const value = (replyValues[commentId] || "").trim();
    if (!value) return;

    const payload = {
      id: makeId(),
      userName: userName || "You",
      userAvatar: userAvatar || "/images/newsFeed/comment.png",
      time: getRelativeTime(),
      text: value,
      likes: 0,
      commentCount: 0,
      replies: [],
    };

    setComments((prev) => addReplyToTree(prev, commentId, payload));
    setReplyValues((prev) => ({
      ...prev,
      [commentId]: "",
    }));
    setActiveReplyBox(null);
    setCollapsedReplies((prev) => ({
      ...prev,
      [commentId]: false,
    }));
  };

  const renderImages = () => {
    const count = images?.length || 0;

    if (count === 1) {
      return (
        <div className="relative w-full h-135 overflow-hidden rounded-sm">
          <Image
            onClick={() => {
              setCurrId(id);
              setIsOpen(true);
            }}
            loading="eager"
            src={images[0]}
            alt="post"
            fill
            sizes="100vw"
            className="object-cover cursor-pointer"
          />
        </div>
      );
    }

    if (count === 2) {
      return (
        <div className="grid grid-cols-2 gap-2 h-135">
          {images.map((img, idx) => (
            <div key={idx} className="relative overflow-hidden h-full rounded-sm">
              <Image
                onClick={() => {
                  setCurrId(id);
                  setIsOpen(true);
                }}
                loading="eager"
                src={img}
                alt="post"
                fill
                sizes="50vw"
                className="object-cover cursor-pointer"
              />
            </div>
          ))}
        </div>
      );
    }

    if (count === 3) {
      return (
        <div className="grid grid-cols-2 gap-2 h-172.5">
          <div className="relative overflow-hidden h-full rounded-sm col-span-2">
            <Image
              onClick={() => {
                setCurrId(id);
                setIsOpen(true);
              }}
              loading="eager"
              src={images[0]}
              alt="post"
              fill
              sizes="100vw"
              className="object-cover cursor-pointer"
            />
          </div>
          <div className="relative overflow-hidden h-full rounded-sm">
            <Image
              onClick={() => {
                setCurrId(id);
                setIsOpen(true);
              }}
              loading="eager"
              src={images[1]}
              alt="post"
              fill
              sizes="50vw"
              className="object-cover cursor-pointer"
            />
          </div>
          <div className="relative overflow-hidden h-full rounded-sm">
            <Image
              onClick={() => {
                setCurrId(id);
                setIsOpen(true);
              }}
              loading="eager"
              src={images[2]}
              alt="post"
              fill
              sizes="50vw"
              className="object-cover cursor-pointer"
            />
          </div>
        </div>
      );
    }

    if (count >= 4) {
      return (
        <div className="grid grid-cols-2 gap-2 h-172.5">
          {images.slice(0, 3).map((img, idx) => (
            <div key={idx} className="relative overflow-hidden h-full rounded-sm">
              <Image
                onClick={() => {
                  setCurrId(id);
                  setIsOpen(true);
                }}
                loading="eager"
                src={img}
                alt="post"
                fill
                sizes="50vw"
                className="object-cover cursor-pointer"
              />
            </div>
          ))}

          <div className="relative overflow-hidden h-full rounded-sm group/seeMore cursor-pointer">
            <Image
              onClick={() => {
                setCurrId(id);
                setIsOpen(true);
              }}
              loading="eager"
              src={images[3]}
              alt="post"
              fill
              sizes="50vw"
              className="object-cover"
            />
            <div
              onClick={() => {
                setCurrId(id);
                setIsOpen(true);
              }}
              className="absolute inset-0 bg-black/60 flex items-center justify-center backdrop-blur-[2px] group-hover/seeMore:bg-black/40 transition-all"
            >
              <span className="text-white font-bold text-xl tracking-wide">
                {count > 4 ? `+${count - 3} More` : "See More"}
              </span>
            </div>
          </div>
        </div>
      );
    }

    return null;
  };

  const renderMedia = () => {
    const count = video?.length || 0;

    if (count === 0) return null;

    if (count === 1) {
      return (
        <div className="relative w-full overflow-hidden rounded-sm">
          <CustomVideoPlayer
            src={video[0]}
            onClick={() => console.log("hello World")}
            className="w-full h-full object-cover"
          />
        </div>
      );
    }

    if (count === 2) {
      return (
        <div className="grid grid-cols-2 gap-2">
          {video.slice(0, 2).map((vid, idx) => (
            <div
              key={idx}
              className="relative overflow-hidden h-full rounded-sm"
              onClick={() => {
                setCurrId(id);
                setIsOpen(true);
              }}
            >
              <CustomVideoPlayer
                src={vid}
                className="w-full h-full object-cover"
              />
            </div>
          ))}
        </div>
      );
    }

    if (count === 3) {
      return (
        <div className="grid grid-cols-2 gap-2">
          <div
            className="relative overflow-hidden h-full rounded-sm col-span-2"
            onClick={() => {
              setCurrId(id);
              setIsOpen(true);
            }}
          >
            <CustomVideoPlayer
              src={video[0]}
              className="w-full h-full object-cover"
            />
          </div>
          <div
            className="relative overflow-hidden h-full rounded-sm"
            onClick={() => {
              setCurrId(id);
              setIsOpen(true);
            }}
          >
            <CustomVideoPlayer
              src={video[1]}
              className="w-full h-full object-cover"
            />
          </div>
          <div
            className="relative overflow-hidden h-full rounded-sm"
            onClick={() => {
              setCurrId(id);
              setIsOpen(true);
            }}
          >
            <CustomVideoPlayer
              src={video[2]}
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      );
    }

    if (count >= 4) {
      return (
        <div className="grid grid-cols-2 grid-rows-2 gap-2">
          {video.slice(0, 3).map((vid, idx) => (
            <div key={idx} className="relative overflow-hidden h-full rounded-sm">
              <CustomVideoPlayer
                src={vid}
                className="w-full h-full object-cover"
              />
            </div>
          ))}

          <div className="relative overflow-hidden h-full rounded-sm group/seeMore cursor-pointer">
            <CustomVideoPlayer
              src={video[3]}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/60 flex flex-col items-center justify-center backdrop-blur-[2px] group-hover/seeMore:bg-black/40 transition-all z-10">
              <span className="text-white font-bold text-xl tracking-wide">
                {count > 4 ? `+${count - 3} More Videos` : "Watch All"}
              </span>
            </div>
          </div>
        </div>
      );
    }

    return null;
  };

  return (
    <div className="w-full group">
      <div className="w-full text-white rounded-xl overflow-hidden">
        {video.length === 0 ? (
          <div className="relative">
            {renderImages()}

            {images.length === 0 ? (
              <div className="p-4 pb-0 flex items-center justify-between w-full">
                <div className="flex items-center gap-3">
                  <Avatar className="h-10 w-10 border border-white/10">
                    <AvatarImage src={userAvatar} />
                    <AvatarFallback>{userName?.[0] || "U"}</AvatarFallback>
                  </Avatar>
                  <div>
                    <h4 className="text-[14px] font-semibold leading-tight">
                      {userName}
                    </h4>
                    <span className="text-[12px] text-gray-400">{time}</span>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-gray-400 hover:bg-white/5 h-8 w-8"
                >
                  <MoreVertical size={25} />
                </Button>
              </div>
            ) : (
              <div className="p-4 flex items-center justify-between absolute bottom-0 bg-linear-to-t from-black to-transparent w-full">
                <div className="flex items-center gap-3">
                  <Avatar className="h-10 w-10 border border-white/10">
                    <AvatarImage src={userAvatar} />
                    <AvatarFallback>{userName?.[0] || "U"}</AvatarFallback>
                  </Avatar>
                  <div>
                    <h4 className="text-[14px] font-semibold leading-tight">
                      {userName}
                    </h4>
                    <span className="text-[12px] text-gray-400">{time}</span>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-gray-400 hover:bg-white/5 h-8 w-8"
                >
                  <MoreVertical size={25} />
                </Button>
              </div>
            )}
          </div>
        ) : (
          <div className="relative">
            <div>
              {renderMedia()}
              <div className="p-4 pb-0 flex items-center justify-between w-full">
                <div className="flex items-center gap-3">
                  <Avatar className="h-10 w-10 border border-white/10">
                    <AvatarImage src={userAvatar} />
                    <AvatarFallback>{userName?.[0] || "U"}</AvatarFallback>
                  </Avatar>
                  <div>
                    <h4 className="text-[14px] font-semibold leading-tight">
                      {userName}
                    </h4>
                    <span className="text-[12px] text-gray-400">{time}</span>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-gray-400 hover:bg-white/5 h-8 w-8"
                >
                  <MoreVertical size={25} />
                </Button>
              </div>
            </div>
          </div>
        )}

        <div className="py-5 pb-0">
          <div className="space-y-3 mb-5">
            <p className="text-[16px] font-normal text-(--grey1)">
              {description}
            </p>

            {hashtags && (
              <div className="flex gap-2 flex-wrap">
                {hashtags?.map((tag, i) => (
                  <span
                    key={i}
                    className="text-blue-400 text-[12px] hover:underline cursor-pointer"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </div>

          <div className="px-4 py-5 flex justify-between text-(--grey1) text-[12px] border-y border-(--dark2)">
            <div className="flex items-center gap-4">
              <span className="flex items-center gap-1.5 hover:text-white cursor-pointer transition-colors">
                <ThumbsUp size={14} className="text-blue-400" /> {likes}
              </span>
              <span className="flex items-center gap-1.5 hover:text-white cursor-pointer transition-colors">
                <MessageCircle size={14} /> {totalMessages}
              </span>
            </div>

            <span className="flex items-center gap-1.5 hover:text-white cursor-pointer transition-colors">
              <Share2 size={14} /> {shares}
            </span>
          </div>

          <div className="grid grid-cols-3 pt-5">
            <Button
              variant="ghost"
              className="rounded-none h-14 gap-2 text-(--grey1) hover:text-blue-400 hover:bg-white/5"
            >
              <ThumbsUp size={24} className="text-(--grey1)" />
              <span className="text-[13px] text-(--grey1)">Like</span>
            </Button>

            <Button
              onClick={() => setShowComment(!showComment)}
              variant="ghost"
              className="rounded-none h-14 gap-2 text-(--grey1) hover:text-white border-x border-(--dark2) hover:bg-white/5"
            >
              <MessageCircle size={24} className="text-(--grey1)" />
              <span className="text-[13px] text-(--grey1)">Comment</span>
            </Button>

            <Button
              variant="ghost"
              className="rounded-none h-14 gap-2 text-(--grey1) hover:text-white hover:bg-white/5"
            >
              <Share2 size={24} className="text-(--grey1)" />
              <span className="text-[13px] text-(--grey1)">Share</span>
            </Button>
          </div>

          <AnimatePresence initial={false}>
            {showComment && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.25 }}
                className="overflow-hidden"
              >
                <div className="mt-2 rounded-[12px] bg-[#11141c] px-4 py-4">
                  <div className="space-y-6">
                    {comments.length > 0 ? (
                      comments.map((comment) => (
                        <CommentItem
                          key={comment.id}
                          comment={comment}
                          collapsedReplies={collapsedReplies}
                          onToggleReplies={handleToggleReplies}
                          activeReplyBox={activeReplyBox}
                          onOpenReplyBox={handleOpenReplyBox}
                          replyValues={replyValues}
                          onReplyInputChange={handleReplyInputChange}
                          onSendReply={handleSendReply}
                        />
                      ))
                    ) : (
                      <div className="text-center text-sm text-(--grey11) py-4">
                        No comments yet.
                      </div>
                    )}
                  </div>

                  <div className="mt-6 rounded-[12px] bg-white/6 p-2">
                    <div className="flex items-center gap-3">
                      <Avatar className="h-9 w-9 shrink-0 border border-white/10">
                        <AvatarImage src={userAvatar} />
                        <AvatarFallback>{userName?.[0] || "U"}</AvatarFallback>
                      </Avatar>

                      <div className="flex min-w-0 flex-1 items-center rounded-[10px] bg-white/6 px-3">
                        <Input
                          value={newComment}
                          onChange={(e) => setNewComment(e.target.value)}
                          onKeyDown={(e) => {
                            if (e.key === "Enter") handleSendComment();
                          }}
                          placeholder="What’s on your mind?"
                          className="border-0 bg-transparent w-full px-0 text-[14px] text-white placeholder:text-(--grey11) focus-visible:ring-0 focus-visible:ring-offset-0"
                        />

                        <button
                          type="button"
                          className="shrink-0 text-(--grey11) hover:text-white"
                        >
                          <Paperclip size={18} />
                        </button>
                      </div>

                      <Button
                        onClick={handleSendComment}
                        className="h-10 rounded-[10px] bg-[#1d9bf0] px-5 text-white hover:bg-[#1686d9]"
                      >
                        <SendHorizontal size={16} />
                        Reply
                      </Button>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="w-[85%] [&>button]:hidden p-2 bg-(--dark3) rounded-[24px] h-[85vh] overflow-y-scroll no-scrollbar">
          <DialogHeader>
            <DialogTitle className="sr-only">
              Media Preview
            </DialogTitle>
            <DialogDescription className="sr-only">
              Preview of selected media post
            </DialogDescription>

            {posts
              .filter((post) => post.id === currId)
              .map((dialogItem) => (
                <div
                  key={dialogItem.id}
                  className="grid grid-cols-[2fr_1fr] h-full gap-3"
                >
                  <div className="rounded-[12px] overflow-hidden">
                    {dialogItem.images.length ? (
                      <div>
                        {dialogItem.images.length === 1 ? (
                          <Image
                            src={dialogItem.images[0]}
                            width={500}
                            height={500}
                            alt="post"
                            className="w-full"
                          />
                        ) : (
                          <Carousel className="w-full h-full">
                            <CarouselPrevious className="left-0 z-10" />
                            <CarouselContent className="h-full">
                              {dialogItem.images.map((img, index) => (
                                <CarouselItem key={index} className="h-full">
                                  <Image
                                    src={img || "/placeholder.jpg"}
                                    width={500}
                                    height={500}
                                    alt={`Post image ${index + 1}`}
                                    className="w-full h-full object-cover"
                                  />
                                </CarouselItem>
                              ))}
                            </CarouselContent>
                            <CarouselNext className="right-0 z-10" />
                          </Carousel>
                        )}
                      </div>
                    ) : (
                      <div className="h-full">
                        {dialogItem.video.length === 1 ? (
                          <CustomVideoPlayer
                            src={dialogItem.video[0]}
                            onClick={() => console.log("hello World")}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <Carousel className="w-full h-full">
                            <CarouselPrevious className="left-0 z-10" />
                            <CarouselContent className="h-full">
                              {dialogItem.video.map((vid, index) => (
                                <CarouselItem key={index} className="h-full">
                                  <CustomVideoPlayer
                                    src={vid}
                                    onClick={() => console.log("hello World")}
                                    className="w-full h-full object-cover"
                                  />
                                </CarouselItem>
                              ))}
                            </CarouselContent>
                            <CarouselNext className="right-0 z-10" />
                          </Carousel>
                        )}
                      </div>
                    )}
                  </div>

                  <div>
                    <div className="w-full text-white rounded-xl overflow-hidden">
                      <div className="relative">
                        <div className="p-4 pb-0 flex items-center justify-between w-full">
                          <div className="grid grid-cols-[40px_1fr] items-center gap-3">
                            <Avatar className="h-10 w-10">
                              <AvatarImage
                                className="object-cover"
                                src={dialogItem.userAvatar}
                              />
                              <AvatarFallback>
                                {dialogItem.userName?.[0] || "U"}
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <h4 className="text-[14px] font-semibold leading-tight">
                                {dialogItem.userName}
                              </h4>
                              <span className="text-[12px] text-gray-400">
                                {dialogItem.time}
                              </span>
                            </div>
                          </div>

                          <Button
                            variant="ghost"
                            size="icon"
                            className="text-gray-400 hover:bg-white/5 h-8 w-8"
                          >
                            <MoreVertical size={25} />
                          </Button>
                        </div>
                      </div>

                      <div className="px-2 pt-3 pb-0">
                        <div className="space-y-3 mb-5">
                          <p className="text-[16px] font-normal text-(--grey1)">
                            {dialogItem.description}
                          </p>

                          {dialogItem.hashtags && (
                            <div className="flex gap-2 flex-wrap">
                              {dialogItem.hashtags?.map((tag, i) => (
                                <span
                                  key={i}
                                  className="text-blue-400 text-[12px] hover:underline cursor-pointer"
                                >
                                  {tag}
                                </span>
                              ))}
                            </div>
                          )}
                        </div>

                        <div className="px-4 py-5 flex justify-between text-(--grey1) text-[12px] border-y border-(--dark2)">
                          <div className="flex items-center gap-4">
                            <span className="flex items-center gap-1.5 hover:text-white cursor-pointer transition-colors">
                              <ThumbsUp size={14} className="text-blue-400" />{" "}
                              {dialogItem.likes}
                            </span>
                            <span className="flex items-center gap-1.5 hover:text-white cursor-pointer transition-colors">
                              <MessageCircle size={14} /> {totalMessages}
                            </span>
                          </div>

                          <span className="flex items-center gap-1.5 hover:text-white cursor-pointer transition-colors">
                            <Share2 size={14} /> {dialogItem.shares}
                          </span>
                        </div>

                        <div className="grid grid-cols-3 pt-5">
                          <Button
                            variant="ghost"
                            className="rounded-none h-14 gap-2 text-(--grey1) hover:text-blue-400 hover:bg-white/5"
                          >
                            <ThumbsUp size={24} className="text-(--grey1)" />
                            <span className="text-[13px] text-(--grey1)">
                              Like
                            </span>
                          </Button>

                          <Button
                            onClick={() => setShowComment((prev) => !prev)}
                            variant="ghost"
                            className="rounded-none h-14 gap-2 text-(--grey1) hover:text-white border-x border-(--dark2) hover:bg-white/5"
                          >
                            <MessageCircle
                              size={24}
                              className="text-(--grey1)"
                            />
                            <span className="text-[13px] text-(--grey1)">
                              Comment
                            </span>
                          </Button>

                          <Button
                            variant="ghost"
                            className="rounded-none h-14 gap-2 text-(--grey1) hover:text-white hover:bg-white/5"
                          >
                            <Share2 size={24} className="text-(--grey1)" />
                            <span className="text-[13px] text-(--grey1)">
                              Share
                            </span>
                          </Button>
                        </div>

                        <AnimatePresence initial={false}>
                          {showComment && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: "auto", opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.25 }}
                              className="overflow-hidden"
                            >
                              <div className="mt-2 rounded-[12px] bg-[#11141c] px-4 py-4">
                                <div className="space-y-6">
                                  {comments.length > 0 ? (
                                    comments.map((comment) => (
                                      <CommentItem
                                        key={comment.id}
                                        comment={comment}
                                        collapsedReplies={collapsedReplies}
                                        onToggleReplies={handleToggleReplies}
                                        activeReplyBox={activeReplyBox}
                                        onOpenReplyBox={handleOpenReplyBox}
                                        replyValues={replyValues}
                                        onReplyInputChange={
                                          handleReplyInputChange
                                        }
                                        onSendReply={handleSendReply}
                                      />
                                    ))
                                  ) : (
                                    <div className="text-center text-sm text-(--grey11) py-4">
                                      No comments yet.
                                    </div>
                                  )}
                                </div>

                                <div className="mt-6 rounded-[12px] bg-white/6 p-2">
                                  <div className="flex items-center gap-3">
                                    <Avatar className="h-9 w-9 shrink-0 border border-white/10">
                                      <AvatarImage src={dialogItem.userAvatar} />
                                      <AvatarFallback>
                                        {dialogItem.userName?.[0] || "U"}
                                      </AvatarFallback>
                                    </Avatar>

                                    <div className="flex min-w-0 w-full items-center rounded-[10px] bg-white/6 px-3">
                                      <Input
                                        value={newComment}
                                        onChange={(e) =>
                                          setNewComment(e.target.value)
                                        }
                                        onKeyDown={(e) => {
                                          if (e.key === "Enter")
                                            handleSendComment();
                                        }}
                                        placeholder="What’s on your mind?"
                                        className="border-0 dark:w-full w-full bg-transparent px-0 text-[14px] text-white placeholder:text-(--grey11) focus-visible:ring-0 focus-visible:ring-offset-0"
                                      />

                                      <button className="shrink-0 text-(--grey11) hover:text-white">
                                        <Paperclip size={18} />
                                      </button>
                                    </div>

                                    <Button
                                      onClick={handleSendComment}
                                      className="h-10 rounded-[10px] bg-[#1d9bf0] px-5 text-white hover:bg-[#1686d9]"
                                    >
                                      <SendHorizontal size={16} />
                                      Reply
                                    </Button>
                                  </div>
                                </div>
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
};