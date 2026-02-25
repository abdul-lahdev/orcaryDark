"use client";
import React, { useState, useEffect, useRef, useMemo, useCallback, memo } from "react";
import { Search, Plus, Trash2, Paperclip, Send, ExternalLink } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";

// --- INITIAL DUMMY DATA ---
const INITIAL_CHATS = [
  { id: 1, name: "Ella Thompson", lastMsg: "Ok, see you then.", time: "23 min", unread: 2, avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Ella" },
  { id: 2, name: "Liam Johnson", lastMsg: "Hey there! Just received the document.", time: "5 min", unread: 0, avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Liam" },
  { id: 3, name: "Ava Martinez", lastMsg: "I have a quick question...", time: "1 hour", unread: 1, avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Ava" },
];

const INITIAL_HISTORIES = {
  1: [{ id: 1, sender: "Ella", text: "Are we still meeting?", isMe: false, time: "10:00 AM" }],
  2: [
    { id: 1, sender: "Samantha", text: "Student: Thank you, Professor! I'm almost done with the project.", isMe: false, time: "10:16 AM" },
    { id: 2, sender: "You", text: "Professor: Thanks for sharing that! I'll review it today.", isMe: true, time: "11:41 AM" }
  ],
  3: [{ id: 1, sender: "Ava", text: "Can you check my last assignment?", isMe: false, time: "Yesterday" }]
};

// --- MEMOIZED COMPONENTS ---
// Inka faida ye hai ke typing ke waqt ye re-render nahi honge

const ChatItem = memo(({ chat, isActive, onClick }) => (
  <div
    onClick={() => onClick(chat)}
    className={`p-4 rounded-[8px] w-[99%] mx-auto flex gap-3 cursor-pointer transition-all duration-200 ${
      isActive ? 'bg-white text-black shadow-lg scale-[1.02]' : 'hover:bg-white/5 text-white'
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

const MessageBubble = memo(({ msg, isNewDaySeparator }) => (
  <>
    {isNewDaySeparator && (
      <div className="flex items-center gap-4 py-4">
        <Separator className="flex-1 bg-white/5" />
        <span className="text-(--grey3) text-[10px] uppercase tracking-widest">Today</span>
        <Separator className="flex-1 bg-white/5" />
      </div>
    )}
    <div className={`flex flex-col ${msg.isMe ? 'items-end' : 'items-start'}`}>
      <div className={`flex items-center gap-2 mb-1 ${msg.isMe ? 'flex-row-reverse' : 'flex-row'}`}>
        <span className="text-white text-[10px] font-semibold">{msg.sender}</span>
        <span className="text-(--grey3) text-[9px]">{msg.time}</span>
      </div>
      <div className={`max-w-[75%] p-4 rounded-2xl text-[14px] leading-relaxed shadow-sm transition-all ${
        msg.isMe ? 'bg-(--blue1) text-white rounded-tr-none' : 'bg-white text-black rounded-tl-none'
      }`}>
        {msg.text}
      </div>
    </div>
  </>
));

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
    <div className="flex h-[calc(100vh-120px)] gap-6 overflow-hidden">
      
      {/* 1. Sidebar: Chat List */}
      <div className="w-[384px] flex flex-col bg-[#2B2B31CC] rounded-[10px]">
        <div className="p-5 space-y-4">
          <div className="flex justify-between items-center text-white">
            <h2 className="text-[20px] font-semibold">Chats</h2>
            <button className="p-1 hover:bg-white/5 rounded-lg transition-colors cursor-pointer">
              <Plus size={24} className="text-(--grey1)" />
            </button>
          </div>
          <div className="relative w-full">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-(--grey3)" size={16} />
            <Input className="bg-[#2B2B31] border-none w-full pl-10 h-11 rounded-xl text-white" placeholder="Search here..." />
          </div>
        </div>

        <ScrollArea className="flex-1 px-3 h-50">
          <div className="space-y-1 pb-4 w-[95%] mx-auto">
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
      <div className="flex-1 flex flex-col bg-[#1E1E22] rounded-[24px] border border-white/5 shadow-xl overflow-hidden">
        {/* Header */}
        <div className="p-5 flex items-center justify-between border-b border-white/5">
          <div className="flex items-center gap-3">
            <Avatar className="h-10 w-10 border border-white/10">
              <AvatarImage src={activeChat.avatar} />
              <AvatarFallback>{activeChat.name[0]}</AvatarFallback>
            </Avatar>
            <span className="text-white font-semibold">{activeChat.name}</span>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" className="border-(--blue1) text-(--blue1) hover:bg-(--blue1)/10 rounded-xl h-9">
              View Profile <ExternalLink className="ml-2" size={14} />
            </Button>
            <Button variant="ghost" className="text-red-500 hover:bg-red-500/10 h-9 w-9 p-0">
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
        <form onSubmit={handleSendMessage} className="p-6 pt-2">
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
            <Button type="submit" className="bg-(--blue1) hover:bg-(--blue1)/90 text-white rounded-xl gap-2 px-6 h-12 font-bold shadow-lg">
              <Send size={18} /> Send
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}