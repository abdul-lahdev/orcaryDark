"use client";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowUpDown, Ellipsis, Heart, Search, Trash2 } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import ContentTab from "./ContentTab";
import ConnectionTab from "./ConnectionTab";
import NotificationTab from "./NotificationTab";
import BillingTab from "./BillingTab";
import PrivacyTab from "./PrivacyTab";
import ProfileTab from "./ProfileTab";
import AdsTab from "./AdsTab";
import EarningTab from "./EarningTab";

const tabs = [
  { id: "Profile Settings", label: "Profile Settings" },
  { id: "Security", label: "Security" },
  { id: "Content", label: "Content" },
  { id: "Connections", label: "Connections" },
  { id: "Integrations", label: "Integrations" },
  { id: "Billing", label: "Billing" },
  { id: "Notifications", label: "Notifications" },
  { id: "Earnings", label: "Earnings" },
  { id: "Privacy", label: "Privacy" },
  { id: "Ads", label: "Ads" },
];
const initialData = [
  {
    id: 1,
    date: "10/12/25",
    subscription: true,
    postType: "Image",
    user: "Darlene Robertson",
    email: "alma.lawson@example.com",
    time: "12:00 PM",
    name: "Cadiology",
    likes: 743,
  },
  {
    id: 2,
    date: "10/01/25",
    subscription: true,
    postType: "Image",
    user: "Darlene Robertson",
    email: "alma.lawson@example.com",
    time: "4:00 PM",
    name: "Cadiology",
    likes: 743,
  },
  {
    id: 3,
    date: "10/12/25",
    subscription: false,
    postType: "Image",
    user: "Darlene Robertson",
    email: "alma.lawson@example.com",
    time: "1:00 PM",
    name: "Cadiology",
    likes: 743,
  },
  {
    id: 4,
    date: "10/12/25",
    subscription: true,
    postType: "Image",
    user: "Darlene Robertson",
    email: "alma.lawson@example.com",
    time: "6:00 PM",
    name: "Cadiology",
    likes: 743,
  },
  {
    id: 5,
    date: "10/12/25",
    subscription: false,
    postType: "Image",
    user: "Darlene Robertson",
    email: "alma.lawson@example.com",
    time: "3:00 PM",
    name: "Cadiology",
    likes: 743,
  },
  {
    id: 6,
    date: "10/12/25",
    subscription: true,
    postType: "Video",
    user: "Darlene Robertson",
    email: "alma.lawson@example.com",
    time: "2:00 PM",
    name: "Cadiology",
    likes: 743,
  },
  {
    id: 7,
    date: "10/12/25",
    subscription: true,
    postType: "Image",
    user: "Darlene Robertson",
    email: "alma.lawson@example.com",
    time: "12:00 PM",
    name: "Cadiology",
    likes: 743,
  },
  {
    id: 8,
    date: "10/12/25",
    subscription: true,
    postType: "Video",
    user: "Darlene Robertson",
    email: "alma.lawson@example.com",
    time: "7:00 PM",
    name: "Cadiology",
    likes: 743,
  },
  {
    id: 9,
    date: "10/12/25",
    subscription: false,
    postType: "Image",
    user: "Darlene Robertson",
    email: "alma.lawson@example.com",
    time: "5:00 PM",
    name: "Cadiology",
    likes: 743,
  },
  {
    id: 10,
    date: "10/12/25",
    subscription: true,
    postType: "Video",
    user: "Darlene Robertson",
    email: "alma.lawson@example.com",
    time: "5:00 PM",
    name: "Cadiology",
    likes: 743,
  },
];

export default function AnimatedTabs() {
  let [activeTab, setActiveTab] = useState(tabs[0].id);

  return (
    <>
      <div className=" grid grid-cols-[300px_1fr] gap-10 min-h-screen ">
        <div className="h-full  overflow-hidden bg-(--dark5) rounded-[10px] p-3">
          <div className="flex flex-col space-y-2 items-start w-full p-1 overflow-x-scroll no-scrollbar">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`${
                  activeTab === tab.id
                    ? "text-(--grey12) font-semibold "
                    : "text-(--grey1) hover:text-white/60"
                } relative w-full text-start cursor-pointer px-4 py-2 text-sm rounded-[6px] font-medium transition focus-visible:outline-2 outline-sky-400`}
                style={{ WebkitTapHighlightColor: "transparent" }}
              >
                {activeTab === tab.id && (
                  <motion.span
                    layoutId="bubble"
                    className="absolute rounded-[6px] shadow-[0px_1px_3px_0px_#1018281A] inset-0 z-10 bg-white" // Blue background jo move karega
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  />
                )}
                <span className="relative z-20">{tab.label}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="h-full">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
            >
              {activeTab === "Profile Settings" && <ProfileTab />}
              {activeTab === "Security" && (
                <>
                  <div className="grid grid-cols-[60%_1fr] items-center gap-3">
                    <div className="flex items-center gap-3">
                      <h1 className="text-(--grey1) text-[18px] font-bold whitespace-nowrap">
                        Security Settings
                      </h1>
                      <Separator className="shrink border-2 border-(--grey5)" />
                    </div>
                    <div className="flex items-center justify-end gap-3">
                      <Button
                        variant="secondary"
                        className="dark:rounded-[6px]"
                      >
                        Cancel
                      </Button>
                      <Button className="dark:rounded-[6px] rounded-[6px]">
                        Update
                      </Button>
                    </div>
                  </div>
                  <div className="grid grid-cols-[60%_1fr]">
                    <div className="grid grid-cols-1 lg:grid-cols-1 xl:grid-cols-2 gap-5 mt-4">
                      <div className="w-full">
                        <label
                          htmlFor=""
                          className="block mb-1 text-(--grey1) text-[14px] font-medium"
                        >
                          Current Password
                        </label>
                        <Input
                          type="password"
                          className="w-full h-10 dark:bg-(--dark4) border border-(--dark3)"
                          placeholder="***********"
                        />
                      </div>
                      <div className="flex  items-end pb-3 h-full">
                        <Link
                          href=""
                          className="text-[14px] font-normal text-(--blue1) underline"
                        >
                          Forgot Password?
                        </Link>
                      </div>
                      <div className="w-full">
                        <label
                          htmlFor=""
                          className="block mb-1 text-(--grey1) text-[14px] font-medium"
                        >
                          New Password
                        </label>
                        <Input
                          type="password"
                          className="w-full h-10 dark:bg-(--dark4) border border-(--dark3)"
                          placeholder="***********"
                        />
                      </div>
                      <div className="w-full">
                        <label
                          htmlFor=""
                          className="block mb-1 text-(--grey1) text-[14px] font-medium"
                        >
                          Confirm Password
                        </label>
                        <Input
                          type="password"
                          className="w-full h-10 dark:bg-(--dark4) border border-(--dark3)"
                          placeholder="***********"
                        />
                      </div>
                    </div>
                  </div>
                </>
              )}
              {activeTab === "Content" && (
                <ContentTab initialData={initialData} />
              )}
              {activeTab === "Connections" && (
                <ConnectionTab initialData={initialData} />
              )}
              {activeTab === "Integrations" && (
                <>
                  <div className="grid grid-cols-[60%_1fr] items-center gap-3">
                    <div className="flex items-center gap-3">
                      <h1 className="text-(--grey1) text-[18px] font-bold whitespace-nowrap">
                        Withdrawal Method
                      </h1>
                      <Separator className="shrink border-2 border-(--grey5)" />
                    </div>
                    <div className="flex items-center justify-end gap-3">
                      <Button
                        variant="secondary"
                        className="dark:rounded-[6px]"
                      >
                        Cancel
                      </Button>
                      <Button className="dark:rounded-[6px] rounded-[6px]">
                        Update
                      </Button>
                    </div>
                  </div>
                  <div className="grid grid-cols-[60%_1fr]">
                    <div>
                      <div className="space-y-5 mt-4">
                        <h1 className="text-[16px] font-semibold text-(--grey1)">
                          Stripe
                        </h1>
                        <div className="w-full">
                          <label
                            htmlFor=""
                            className="block mb-1 text-(--grey1) text-[14px] font-medium"
                          >
                            Stripe Public Key
                          </label>
                          <Input
                            type="password"
                            className="w-full h-10 dark:bg-(--dark4) border border-(--dark3)"
                            placeholder="***********"
                          />
                        </div>
                        <div className="w-full">
                          <label
                            htmlFor=""
                            className="block mb-1 text-(--grey1) text-[14px] font-medium"
                          >
                            Stripe Private Key
                          </label>
                          <Input
                            type="password"
                            className="w-full h-10 dark:bg-(--dark4) border border-(--dark3)"
                            placeholder="***********"
                          />
                        </div>
                      </div>
                      <div className="space-y-5 mt-10">
                        <h1 className="text-[16px] font-semibold text-(--grey1)">
                          Sica Pay
                        </h1>
                        <div className="w-full">
                          <label
                            htmlFor=""
                            className="block mb-1 text-(--grey1) text-[14px] font-medium"
                          >
                            Sica Pay Public Key
                          </label>
                          <Input
                            type="password"
                            className="w-full h-10 dark:bg-(--dark4) border border-(--dark3)"
                            placeholder="***********"
                          />
                        </div>
                        <div className="w-full">
                          <label
                            htmlFor=""
                            className="block mb-1 text-(--grey1) text-[14px] font-medium"
                          >
                            Sica Pay Private Key
                          </label>
                          <Input
                            type="password"
                            className="w-full h-10 dark:bg-(--dark4) border border-(--dark3)"
                            placeholder="***********"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </>
              )}
              {activeTab === "Billing" && <BillingTab />}
              {activeTab === "Notifications" && <NotificationTab />}
              {activeTab === "Earnings" && <EarningTab />}
              {activeTab === "Privacy" && <PrivacyTab />}
              {activeTab === "Ads" && <AdsTab initialData={initialData} />}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </>
  );
}
