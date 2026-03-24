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
    user: "Darlene Robertson",
    email: "alma.lawson@example.com",
    time: "5:00 PM",
    name: "Cadiology",
    likes: 743,
  },
];

export default function AnimatedTabs() {
  let [activeTab, setActiveTab] = useState(tabs[0].id);

  //   here
  const [selectedRows, setSelectedRows] = useState([]);

  const allSelected =
    initialData.length > 0 && selectedRows.length === initialData.length;

  const isSelected = (id) => selectedRows.includes(id);

  const toggleRow = (id) => {
    setSelectedRows((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id],
    );
  };

  const toggleAll = (checked) => {
    if (checked) {
      setSelectedRows(initialData.map((item) => item.id));
    } else {
      setSelectedRows([]);
    }
  };

  return (
    <>
      <div className="mt-6 grid grid-cols-[300px_1fr] gap-3 min-h-screen ">
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
              {activeTab === "Profile Settings" && <>Profile Setting</>}
              {activeTab === "Security" && (
                <>
                  <div className="grid grid-cols-[600px_1fr] items-center gap-3">
                    <div className="flex items-center gap-3">
                      <h1 className="text-(--grey1) text-[18px] font-bold whitespace-nowrap">
                        Security Settings
                      </h1>
                      <Separator className="shrink" />
                    </div>
                    <div className="flex items-center justify-end gap-3">
                      <Button
                        variant="secondary"
                        className="dark:rounded-[6px]"
                      >
                        Cancel
                      </Button>
                      <Button>Update</Button>
                    </div>
                  </div>
                  <div className="grid grid-cols-[600px_1fr]">
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
                <>
                  <div>
                    <div className="w-full rounded-xl border-2 border-(--dark2) bg-(--dark4) p-4">
                      <div className="flex items-center justify-between">
                        <h1 className="text-(--grey1) text-[20px] font-bold">
                          Catergories
                        </h1>
                        <div className="flex items-center gap-3">
                          <div className="relative">
                            <Search
                              size={16}
                              className="absolute left-0 text-(--grey1) top-0 translate-x-2 translate-y-3"
                            />
                            <Input
                              className="h-10 pl-8.5"
                              placeholder="Search by source"
                            />
                          </div>
                          <Button className="h-10">Add</Button>
                        </div>
                      </div>
                      <div className="overflow-x-auto mt-5">
                        <table className="w-full min-w-190 border-separate border-spacing-0 text-sm text-white/80">
                          <thead>
                            <tr className="bg-(--dark2) rounded-[12px] overflow-hidden">
                              <th className="w-13 border-b border-white/10 px-4 py-3 text-left">
                                <Checkbox
                                  checked={allSelected}
                                  onCheckedChange={toggleAll}
                                  className="border-white/30 data-[state=checked]:border-[#7C3AED] data-[state=checked]:bg-[#7C3AED]"
                                />
                              </th>

                              <th className="min-w-35 border-b border-(--dark2) px-4 py-3 text-(--grey1) text-[14px] font-bold">
                                <div className="flex items-center gap-2">
                                  <span>Added on</span>
                                  <ArrowUpDown className="h-3.5 w-3.5 text-white/40" />
                                </div>
                              </th>

                              <th className="min-w-55 border-b border-(--dark2) px-4 py-3 text-(--grey1) text-[14px] font-bold">
                                <div className="flex items-center gap-2">
                                  <span>Name</span>
                                  <ArrowUpDown className="h-3.5 w-3.5 text-white/40" />
                                </div>
                              </th>

                              <th className="min-w-25  border-b border-(--dark2) px-4 py-3 text-(--grey1) text-[14px] font-bold">
                                <div className="flex items-center gap-2">
                                  <span>Icons</span>
                                  <ArrowUpDown className="h-3.5 w-3.5 text-white/40" />
                                </div>
                              </th>
                            </tr>
                          </thead>

                          <tbody>
                            {initialData.map((row) => {
                              const selected = isSelected(row.id);

                              return (
                                <tr
                                  key={row.id}
                                  className={`transition-colors duration-200 ${
                                    selected
                                      ? "bg-white/2.5"
                                      : "bg-transparent hover:bg-white/2.5"
                                  }`}
                                >
                                  <td className="border-b border-(--dark2) px-4 py-3">
                                    <Checkbox
                                      checked={selected}
                                      onCheckedChange={() => toggleRow(row.id)}
                                      className="border-white/30 data-[state=checked]:border-[#7C3AED] data-[state=checked]:bg-[#7C3AED]"
                                    />
                                  </td>

                                  <td className="border-b border-(--dark2) px-4 py-3">
                                    <div className="flex flex-col ">
                                      <span className="text-[14px] font-medium text-(--grey1)">
                                        {row.date}
                                      </span>
                                      <span className="mt-1 text-[12px] text-(--grey13)">
                                        {row.time}
                                      </span>
                                    </div>
                                  </td>

                                  <td className="border-b border-l border-(--dark2) px-4 py-3">
                                    <span className="text-[13px] font-medium text-(--grey13)">
                                      {row.name}
                                    </span>
                                  </td>

                                  <td className="border-b border-l border-(--dark2) px-4 py-3">
                                    <div className="flex items-center justify-between gap-4">
                                      <button
                                        type="button"
                                        className="group cursor-pointer inline-flex items-center gap-2 text-white/35 transition hover:text-white/70"
                                      >
                                        <Heart
                                          size={18}
                                          className="text-(--grey2) transition group-hover:scale-105"
                                        />
                                        {/* <span className="text-[11px]">
                                          {row.likes}
                                        </span> */}
                                      </button>

                                      <button
                                        type="button"
                                        className="inline-flex cursor-pointer items-center justify-center rounded-md p-1.5 text-red-500 transition hover:bg-red-500/10 hover:text-red-400"
                                      >
                                        <Trash2 size={18} />
                                      </button>
                                    </div>
                                  </td>
                                </tr>
                              );
                            })}
                          </tbody>
                        </table>
                      </div>
                    </div>
                    <div className="w-full mt-4 rounded-xl border-2 border-(--dark2) bg-(--dark4) p-4">
                      <div className="flex items-center justify-between">
                        <h1 className="text-(--grey1) text-[20px] font-bold">
                          Catergories
                        </h1>
                        <div className="flex items-center gap-3">
                          <div className="relative">
                            <Search
                              size={16}
                              className="absolute left-0 text-(--grey1) top-0 translate-x-2 translate-y-3"
                            />
                            <Input
                              className="h-10 pl-8.5"
                              placeholder="Search by source"
                            />
                          </div>
                          <Button className="h-10">Add</Button>
                        </div>
                      </div>
                      <div className="overflow-x-auto mt-5">
                        <table className="w-full min-w-190 border-separate border-spacing-0 text-sm text-white/80">
                          <thead>
                            <tr className="bg-(--dark2) rounded-[12px] overflow-hidden">
                              <th className="w-13 border-b border-white/10 px-4 py-3 text-left">
                                <Checkbox
                                  checked={allSelected}
                                  onCheckedChange={toggleAll}
                                  className="border-white/30 data-[state=checked]:border-[#7C3AED] data-[state=checked]:bg-[#7C3AED]"
                                />
                              </th>

                              <th className="min-w-35 border-b border-(--dark2) px-4 py-3 text-(--grey1) text-[14px] font-bold">
                                <div className="flex items-center gap-2">
                                  <span>Added on</span>
                                  <ArrowUpDown className="h-3.5 w-3.5 text-white/40" />
                                </div>
                              </th>

                              <th className="min-w-55 border-b border-(--dark2) px-4 py-3 text-(--grey1) text-[14px] font-bold">
                                <div className="flex items-center gap-2">
                                  <span>Name</span>
                                  <ArrowUpDown className="h-3.5 w-3.5 text-white/40" />
                                </div>
                              </th>

                              <th className="min-w-25  border-b border-(--dark2) px-4 py-3 text-(--grey1) text-[14px] font-bold">
                                <div className="flex items-center gap-2">
                                  <span>Icons</span>
                                  <ArrowUpDown className="h-3.5 w-3.5 text-white/40" />
                                </div>
                              </th>
                            </tr>
                          </thead>

                          <tbody>
                            {initialData.map((row) => {
                              const selected = isSelected(row.id);

                              return (
                                <tr
                                  key={row.id}
                                  className={`transition-colors duration-200 ${
                                    selected
                                      ? "bg-white/2.5"
                                      : "bg-transparent hover:bg-white/2.5"
                                  }`}
                                >
                                  <td className="border-b border-(--dark2) px-4 py-3">
                                    <Checkbox
                                      checked={selected}
                                      onCheckedChange={() => toggleRow(row.id)}
                                      className="border-white/30 data-[state=checked]:border-[#7C3AED] data-[state=checked]:bg-[#7C3AED]"
                                    />
                                  </td>

                                  <td className="border-b border-(--dark2) px-4 py-3">
                                    <div className="flex flex-col ">
                                      <span className="text-[14px] font-medium text-(--grey1)">
                                        {row.date}
                                      </span>
                                      <span className="mt-1 text-[12px] text-(--grey13)">
                                        {row.time}
                                      </span>
                                    </div>
                                  </td>

                                  <td className="border-b border-l border-(--dark2) px-4 py-3">
                                    <span className="text-[13px] font-medium text-(--grey13)">
                                      {row.name}
                                    </span>
                                  </td>

                                  <td className="border-b border-l border-(--dark2) px-4 py-3">
                                    <div className="flex items-center justify-between gap-4">
                                      <button
                                        type="button"
                                        className="group cursor-pointer inline-flex items-center gap-2 text-white/35 transition hover:text-white/70"
                                      >
                                        <Heart
                                          size={18}
                                          className="text-(--grey2) transition group-hover:scale-105"
                                        />
                                        {/* <span className="text-[11px]">
                                          {row.likes}
                                        </span> */}
                                      </button>

                                      <button
                                        type="button"
                                        className="inline-flex cursor-pointer items-center justify-center rounded-md p-1.5 text-red-500 transition hover:bg-red-500/10 hover:text-red-400"
                                      >
                                        <Trash2 size={18} />
                                      </button>
                                    </div>
                                  </td>
                                </tr>
                              );
                            })}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </>
              )}
              {activeTab === "Connections" && (
                <>
                  <div>
                    <div className="w-full rounded-xl border-2 border-(--dark2) bg-(--dark4) p-4">
                      <div className="flex items-center justify-between">
                        <h1 className="text-(--grey1) text-[20px] font-bold">
                          Catergories
                        </h1>
                        <div className="flex items-center gap-3">
                          <div className="relative">
                            <Search
                              size={16}
                              className="absolute left-0 text-(--grey1) top-0 translate-x-2 translate-y-3"
                            />
                            <Input
                              className="h-10 pl-8.5"
                              placeholder="Search by source"
                            />
                          </div>
                          <Button className="h-10">Add</Button>
                        </div>
                      </div>
                      <div className="overflow-x-auto mt-5">
                        <table className="w-full min-w-190 border-separate border-spacing-0 text-sm text-white/80">
                          <thead>
                            <tr className="bg-(--dark2) rounded-[12px] overflow-hidden">
                              <th className="w-13 border-b border-white/10 px-4 py-3 text-left">
                                <Checkbox
                                  checked={allSelected}
                                  onCheckedChange={toggleAll}
                                  className="border-white/30 data-[state=checked]:border-[#7C3AED] data-[state=checked]:bg-[#7C3AED]"
                                />
                              </th>

                              <th className="min-w-35 border-b border-(--dark2) px-4 py-3 text-(--grey1) text-[14px] font-bold">
                                <div className="flex items-center gap-2">
                                  <span>Connected on</span>
                                  <ArrowUpDown className="h-3.5 w-3.5 text-white/40" />
                                </div>
                              </th>

                              <th className="min-w-55 border-b border-(--dark2) px-4 py-3 text-(--grey1) text-[14px] font-bold">
                                <div className="flex items-center gap-2">
                                  <span>Name</span>
                                  <ArrowUpDown className="h-3.5 w-3.5 text-white/40" />
                                </div>
                              </th>

                              <th className="min-w-25  border-b border-(--dark2) px-4 py-3 text-(--grey1) text-[14px] font-bold">
                                <div className="flex items-center gap-2">
                                  <span>Subscription</span>
                                  <ArrowUpDown className="h-3.5 w-3.5 text-white/40" />
                                </div>
                              </th>
                              <th className="border-b border-(--dark2) px-4 py-3 text-(--grey1) text-[14px] font-bold"></th>
                            </tr>
                          </thead>

                          <tbody>
                            {initialData.map((row) => {
                              const selected = isSelected(row.id);

                              return (
                                <tr
                                  key={row.id}
                                  className={`transition-colors duration-200 ${
                                    selected
                                      ? "bg-white/2.5"
                                      : "bg-transparent hover:bg-white/2.5"
                                  }`}
                                >
                                  <td className="border-b border-(--dark2) px-4 py-3">
                                    <Checkbox
                                      checked={selected}
                                      onCheckedChange={() => toggleRow(row.id)}
                                      className="border-white/30 data-[state=checked]:border-[#7C3AED] data-[state=checked]:bg-[#7C3AED]"
                                    />
                                  </td>

                                  <td className="border-b border-(--dark2) px-4 py-3">
                                    <div className="flex flex-col ">
                                      <span className="text-[14px] font-medium text-(--grey1)">
                                        {row.date}
                                      </span>
                                      <span className="mt-1 text-[12px] text-(--grey13)">
                                        {row.time}
                                      </span>
                                    </div>
                                  </td>

                                  <td className=" border-b border-l border-(--dark2) px-4 py-3">
                                    <div className="flex items-center gap-3">
                                      <div className="rounded-full uppercase flex items-center justify-center text-[12px] size-8 font-medium bg-(--dark2) text-(--grey15)">
                                        {row.user[0]}{row.user[1]}
                                      </div>
                                      <div>
                                        <p className="text-[14px] font-medium text-(--grey1)">
                                          {row.user}
                                        </p>
                                        <p className="text-[12px] font-normal text-(--grey13)">
                                            {row.email}
                                        </p>
                                      </div>
                                    </div>
                                  </td>

                                  <td className="border-b border-l border-(--dark2) px-4 py-3">
                                    <span className="text-[13px] font-medium text-(--grey13)">
                                      {row.subscription
                                        ? "Paid Account"
                                        : "Free Account"}
                                    </span>
                                  </td>

                                  <td className="border-b border-l border-(--dark2) px-4 py-3">
                                    <button
                                      type="button"
                                      className="inline-flex cursor-pointer items-center justify-center rounded-md text-(--grey14) p-1.5 transition hover:bg-(--dark4) hover:text-grey-400"
                                    >
                                      {/* <Trash2 size={18} /> */}
                                      <Ellipsis size={18} />
                                    </button>
                                  </td>
                                </tr>
                              );
                            })}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </>
              )}
              {activeTab === "Integrations" && <>Integrations Setting</>}
              {activeTab === "Billing" && <>Integrations Setting</>}
              {activeTab === "Notifications" && <>Integrations Setting</>}
              {activeTab === "Earnings" && <>Integrations Setting</>}
              {activeTab === "Privacy" && <>Integrations Setting</>}
              {activeTab === "Ads" && <>Integrations Setting</>}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </>
  );
}
