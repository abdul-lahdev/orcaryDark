"use client";
import React, { useState, useEffect, useRef, useMemo, useCallback, memo } from "react";
import { Search, Plus, Trash2, Paperclip, Send, ExternalLink } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

// --- INITIAL DUMMY DATA ---
const INITIAL_CHATS = [
  { id: 1, name: "Ella Thompson", lastMsg: "Ok, see you then.", time: "23 min", isActive: true, unread: 2, avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Ella" },
  { id: 2, name: "Liam Johnson", lastMsg: "Hey there! Just received the document.", time: "5 min", isActive: false, unread: 0, avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Liam" },
  { id: 3, name: "Ava Martinez", lastMsg: "I have a quick question...", time: "1 hour", isActive: true, unread: 1, avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Ava" },
];

const INITIAL_HISTORIES = {
  1: [
    {
      id: 1,
      sender: "Ella",
      text: "Are we still meeting?",
      isMe: false,
      time: "10:00 AM",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Ella"
    }
  ],
  2: [
    {
      id: 1,
      sender: "Samantha",
      text: "Student: Thank you, Professor! I'm almost done with the project.",
      isMe: false,
      time: "10:16 AM",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Samantha"
    },
    {
      id: 2,
      sender: "You",
      text: "Professor: Thanks for sharing that! I'll review it today.",
      isMe: true,
      time: "11:41 AM",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Hamdan" // Aapka avatar
    }
  ],
  3: [
    {
      id: 1,
      sender: "Ava",
      text: "Can you check my last assignment?",
      isMe: false,
      time: "Yesterday",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Ava"
    }
  ]
};

// --- MEMOIZED COMPONENTS ---
// Inka faida ye hai ke typing ke waqt ye re-render nahi honge

// --- MEMOIZED COMPONENTS WITH DISPLAY NAMES ---

const ChatItem = memo(({ chat, isActive, onClick }) => (
  <div
    onClick={() => onClick(chat)}
    className={`p-4 rounded-[8px] w-[99%] mx-auto flex gap-3 cursor-pointer transition-all duration-200 ${isActive ? 'bg-white text-black shadow-lg scale-[1.02]' : 'hover:bg-white/5 text-white'
      }`}
  >
    <div className="relative">
      <Avatar className="size-10 border-2 border-(--grey5)">
        <AvatarImage src={chat.avatar} />
        <AvatarFallback>{chat.name[0]}</AvatarFallback>
      </Avatar>
    </div>
    <div className="flex-1 min-w-0">
      <div className="flex justify-between items-start mb-1 relative">
        <h4 className={`font-medium text-[16px]/[24px] truncate ${isActive ? 'text-(--dark3)' : 'text-white'}`}>
          {chat.name}
        </h4>
        {chat.unread > 0 && !isActive && (
          <div className="absolute right-0 translate-y-5.5 -translate-x-2 size-5 bg-(--blue1) rounded-full text-white text-[12px] font-medium flex items-center justify-center">
            {chat.unread}
          </div>
        )}
        <span className={`text-[12px] font-normal ${isActive ? 'text-(--dark3)' : 'text-(--dark6)'}`}>
          {chat.time}
        </span>
      </div>
      <p className={`text-[12px] truncate ${isActive ? 'text-(--dark3) font-medium' : 'text-(--grey1)'}`}>
        {chat.lastMsg}
      </p>
    </div>
  </div>
));
ChatItem.displayName = "ChatItem";

const MessageBubble = memo(({ msg, isNewDaySeparator }) => (
  <>
    {isNewDaySeparator && (
      <div className="flex items-center gap-4 py-4">
        <Separator className="flex-1 bg-white/5" />
        <span className="text-(--grey3) text-[10px] uppercase tracking-widest">Today</span>
        <Separator className="flex-1 bg-white/5" />
      </div>
    )}
    <div className={`flex gap-3 mb-6 ${msg.isMe ? 'flex-row-reverse' : 'flex-row'}`}>
      <div
        style={{
          backgroundImage: `url(${msg.avatar || 'https://api.dicebear.com/7.x/avataaars/svg?seed=default'})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
        className='size-10 rounded-full shrink-0 border-2 border-black'>
      </div>

      <div className={`flex flex-col ${msg.isMe ? 'items-end' : 'items-start'} max-w-[80%]`}>
        <div className={`flex items-center gap-2 justify-between w-full mb-1 ${msg.isMe ? 'flex-row-reverse' : 'flex-row'}`}>
          <span className="text-(--grey1) text-[14px] font-medium">
            {msg.isMe ? 'You' : msg.sender}
          </span>
          <span className="text-(--grey1) text-[12px] font-normal">{msg.time}</span>
        </div>
        <div className={`p-4 rounded-2xl text-[15px] leading-relaxed shadow-sm transition-all ${msg.isMe
          ? 'bg-(--blue1) text-white rounded-tr-none'
          : 'bg-(--light1) border-(--light1) text-(--dark7) rounded-tl-none'
          }`}>
          {msg.text}
        </div>
      </div>
    </div>
  </>
));
MessageBubble.displayName = "MessageBubble";
// --- MAIN PAGE COMPONENT ---
export default function ChatPage() {
  const [chats, setChats] = useState(INITIAL_CHATS);
  const [activeChat, setActiveChat] = useState(INITIAL_CHATS[1]);
  const [input, setInput] = useState("");
  const [chatHistories, setChatHistories] = useState(INITIAL_HISTORIES);

  const scrollRef = useRef(null);

  // Memoize active messages to stop recalculation on typing
  const activeMessages = useMemo(() =>
    chatHistories[activeChat.id] || [],
    [chatHistories, activeChat.id]
  );

  // Callback to prevent ChatItem re-renders
  const handleChatSelect = useCallback((chat) => {
    setActiveChat(chat);
  }, []);

  // Auto-scroll logic fix for Radix UI
  useEffect(() => {
    const viewport = scrollRef.current?.querySelector('[data-radix-scroll-area-viewport]');
    if (viewport) {
      viewport.scrollTo({ top: viewport.scrollHeight, behavior: 'smooth' });
    }
  }, [activeMessages]);

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const textToSend = input;
    const newMessage = {
      id: Date.now(),
      sender: "You",
      text: textToSend,
      isMe: true,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setChatHistories(prev => ({
      ...prev,
      [activeChat.id]: [...(prev[activeChat.id] || []), newMessage]
    }));

    setChats(prev => prev.map(c =>
      c.id === activeChat.id ? { ...c, lastMsg: textToSend, time: "Now", unread: 0 } : c
    ));

    setInput("");
  };

  return (
    <div className="flex h-[calc(100vh-120px)] gap-3 overflow-hidden">

      {/* 1. Sidebar: Chat List */}
      <div className="w-[384px] flex flex-col bg-[#2B2B31CC] rounded-[10px]">
        <div className="p-5 space-y-4">
          <div className="flex justify-between items-center text-white">
            <h2 className="text-[20px] font-semibold">Chats</h2>
            <Dialog>
              <DialogTrigger asChild>
                <button className="p-1 hover:bg-white/5 rounded-lg transition-colors cursor-pointer">
                  <Plus size={24} className="text-(--grey1)" />
                </button>
              </DialogTrigger>
              <DialogContent className='w-[80%] md:w-[80%] lg:w-[30%] bg-(--dark8) border border-(--dark3) shadow-[0px_8px_8px_-4px_#10182808]'>
                <DialogHeader>
                  <DialogTitle className='text-[18px] font-semibold text-(--grey7)' >Create New Message</DialogTitle>
                  <DialogDescription className='sr-only'>
                    ss
                  </DialogDescription>
                  <div>
                    <label htmlFor="" className="text-[14px] block mb-2 mt-5 font-medium text-(--grey1)">
                      Search User
                    </label>
                    <Select >
                      <SelectTrigger className="w-full border-(--dark2) bg-(--dark4)">
                        <SelectValue placeholder="Theme" />
                      </SelectTrigger>
                      <SelectContent className='bg-[#1C1C21] border-[#303036]'>
                        <SelectGroup>
                          <SelectItem className='dark:hover:bg-(--dark3) dark:hover:text-(--blue1)' value="pheonixBaker">Phoenix Baker (@phoenixbaker)</SelectItem>
                          <SelectItem value="tomHardy">Tom Hardy (@Tommy_1)</SelectItem>
                          <SelectItem value="lanaSteiner">Lana Steiner (@lanasteiner)</SelectItem>
                          <SelectItem value="demiWilkinson">Demi Wilkinson (@demiwilkinson)</SelectItem>
                          <SelectItem value="candiceWu">Candice Wu (@candicewu)</SelectItem>
                          <SelectItem value="nataliCraig">Natali Craig (@natalicraig)</SelectItem>
                          <SelectItem value="drewCano">Drew Cano (@drewcano)</SelectItem>
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </div>
                </DialogHeader>
                <DialogFooter className='mt-6 grid grid-cols-2 gap-2'>
                  <DialogClose asChild>
                    <Button variant="secondary" className='bg-transparent w-full h-11'>Cancel</Button>
                  </DialogClose>
                  <Button type="submit" className='w-full  h-11'>Create</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>

          </div>
          <div className="relative w-full">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-(--grey3)" size={16} />
            <Input className="bg-[#2B2B31] border-none w-full pl-10 h-11 rounded-xl text-white" placeholder="Search here..." />
          </div>
        </div>

        <ScrollArea className="flex-1 px-3 h-50">
          <div className="space-y-1 pb-4 w-87.5 mx-auto">
            {chats.map((chat) => (
              <ChatItem
                key={chat.id}
                chat={chat}
                isActive={activeChat.id === chat.id}
                onClick={handleChatSelect}
              />
            ))}
          </div>
        </ScrollArea>
      </div>

      {/* 2. Main Chat Window */}
      <div className="flex-1 flex flex-col bg-transparent rounded-[24px]overflow-hidden">
        {/* Header */}
        <div className="p-5 flex items-center justify-between border-b-2 border-(--dark2)">
          <div className="flex items-center gap-3">
            <Avatar className="size-12">
              <AvatarImage src={activeChat.avatar} />
              <AvatarFallback>{activeChat.name[0]}</AvatarFallback>
            </Avatar>
            <span className="text-[20px] text-white font-semibold">{activeChat.name}</span>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="destructive" className='h-9 flex items-center' >
              View Profile <ExternalLink className="ml-2" size={14} />
            </Button>
            <Button variant="ghost" className="text-(--red4) hover:bg-red-500/10 h-9 w-9 p-0">
              <Trash2 size={20} />
            </Button>
          </div>
        </div>

        {/* Message Area */}
        <ScrollArea ref={scrollRef} className="flex-1 p-6 h-50">
          <div className="space-y-6">
            {activeMessages.map((msg, idx) => (
              <MessageBubble
                key={msg.id}
                msg={msg}
                isNewDaySeparator={idx === 2}
              />
            ))}

          </div>
        </ScrollArea>

        {/* Input Bar - Memoization makes this typing buttery smooth */}
        <form onSubmit={handleSendMessage} className="p-6 pt-5 border-t-2 border-(--dark2)">
          <div className="bg-[#2B2B31] rounded-2xl flex items-center p-2 gap-2 h-16 shadow-inner">
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type a message..."
              className="bg-transparent border-none focus-visible:ring-0 text-white placeholder:text-(--grey3) flex-1 ml-2"
            />
            <button type="button" className="p-2 text-(--grey1) hover:text-white transition-colors">
              <Paperclip size={20} />
            </button>
            <Button type="submit" className=" text-white h-10 rounded-xl gap-2 px-6 font-bold shadow-lg">
              <Send size={18} /> Send
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}