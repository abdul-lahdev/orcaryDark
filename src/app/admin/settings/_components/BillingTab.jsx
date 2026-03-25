import React, { useMemo, useState } from "react";
import { Search, Filter, ChevronDown, ArrowUpDown, Check } from "lucide-react";

import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Separator } from "@/components/ui/separator";

const billingData = [
  {
    id: 1,
    date: "10/12/25",
    time: "12:00 PM",
    subscription: "Month - Subscription",
    status: "Paid",
  },
  {
    id: 2,
    date: "10/01/25",
    time: "4:00 PM",
    subscription: "Month - Subscription",
    status: "Paid",
  },
  {
    id: 3,
    date: "10/12/25",
    time: "1:00 PM",
    subscription: "Month - Subscription",
    status: "Paid",
  },
  {
    id: 4,
    date: "10/12/25",
    time: "6:00 PM",
    subscription: "Month - Subscription",
    status: "Paid",
  },
  {
    id: 5,
    date: "10/12/25",
    time: "3:00 PM",
    subscription: "Month - Subscription",
    status: "Paid",
  },
  {
    id: 6,
    date: "10/12/25",
    time: "2:00 PM",
    subscription: "Month - Subscription",
    status: "Paid",
  },
  {
    id: 7,
    date: "10/12/25",
    time: "12:00 PM",
    subscription: "Month - Subscription",
    status: "Paid",
  },
  {
    id: 8,
    date: "10/12/25",
    time: "7:00 PM",
    subscription: "Month - Subscription",
    status: "Paid",
  },
];

function parseDateTime(date, time) {
  const [month, day, year] = date.split("/").map(Number);
  const fullYear = year < 100 ? 2000 + year : year;

  let [timePart, modifier] = time.split(" ");
  let [hours, minutes] = timePart.split(":").map(Number);

  if (modifier === "PM" && hours !== 12) hours += 12;
  if (modifier === "AM" && hours === 12) hours = 0;

  return new Date(fullYear, month - 1, day, hours, minutes);
}

export default function BillingTab() {
  const [selectedAccount, setSelectedAccount] = useState("free");
  const [search, setSearch] = useState("");
  const [selectedRows, setSelectedRows] = useState([]);
  const [statusFilter, setStatusFilter] = useState({
    paid: true,
    unpaid: false,
    pending: false,
  });
  const [sortOrder, setSortOrder] = useState("desc");

  const filteredData = useMemo(() => {
    const enabledStatuses = Object.entries(statusFilter)
      .filter(([, value]) => value)
      .map(([key]) => key.toLowerCase());

    const searched = billingData.filter((item) => {
      const matchesSearch =
        item.subscription.toLowerCase().includes(search.toLowerCase()) ||
        item.date.toLowerCase().includes(search.toLowerCase()) ||
        item.time.toLowerCase().includes(search.toLowerCase()) ||
        item.status.toLowerCase().includes(search.toLowerCase());

      const matchesStatus =
        enabledStatuses.length === 0
          ? true
          : enabledStatuses.includes(item.status.toLowerCase());

      return matchesSearch && matchesStatus;
    });

    return [...searched].sort((a, b) => {
      const aDate = parseDateTime(a.date, a.time);
      const bDate = parseDateTime(b.date, b.time);

      return sortOrder === "asc" ? aDate - bDate : bDate - aDate;
    });
  }, [search, statusFilter, sortOrder]);

  const visibleRowIds = filteredData.map((item) => item.id);

  const allVisibleSelected =
    visibleRowIds.length > 0 &&
    visibleRowIds.every((id) => selectedRows.includes(id));

  const isIndeterminate =
    selectedRows.some((id) => visibleRowIds.includes(id)) &&
    !allVisibleSelected;

  const handleSelectAll = (checked) => {
    if (checked) {
      setSelectedRows((prev) => {
        const merged = new Set([...prev, ...visibleRowIds]);
        return [...merged];
      });
    } else {
      setSelectedRows((prev) =>
        prev.filter((id) => !visibleRowIds.includes(id)),
      );
    }
  };

  const handleSelectRow = (id, checked) => {
    setSelectedRows((prev) =>
      checked
        ? [...new Set([...prev, id])]
        : prev.filter((item) => item !== id),
    );
  };

  const renderStatusBadge = (status) => {
    const base =
      "inline-flex min-w-[72px] items-center justify-center rounded-full border px-3 py-1 text-xs font-semibold";

    switch (status.toLowerCase()) {
      case "paid":
        return (
          <span
            className={`${base} border-[#00A63E] bg-[#00A63E26] text-[#00A63E]`}
          >
            {status}
          </span>
        );
      case "pending":
        return (
          <span
            className={`${base} border-yellow-500/40 bg-yellow-500/10 text-yellow-400`}
          >
            {status}
          </span>
        );
      case "unpaid":
        return (
          <span
            className={`${base} border-red-500/40 bg-red-500/10 text-red-400`}
          >
            {status}
          </span>
        );
      default:
        return (
          <span
            className={`${base} border-zinc-500/40 bg-zinc-500/10 text-zinc-300`}
          >
            {status}
          </span>
        );
    }
  };

  return (
    <>
      <div className="grid grid-cols-[80%_1fr] items-center gap-3">
        <div className="flex items-center gap-3">
          <h1 className="text-(--grey1) text-[18px] font-bold whitespace-nowrap">
            Account Subscription
          </h1>
          <Separator className="shrink border-2 border-(--grey5)" />
        </div>
      </div>
      <div className="grid grid-cols-[80%_1fr] mt-5">
        <div>
          {/* Top Section */}
          <div className="mb-8 grid grid-cols-1 gap-4 lg:mb-10 lg:grid-cols-2 lg:gap-6">
            <div
              role="button"
              tabIndex={0}
              onClick={() => setSelectedAccount("free")}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  setSelectedAccount("free");
                }
              }}
              className={`rounded-[12px] py-4 border text-left transition-all cursor-pointer ${
                selectedAccount === "free"
                  ? "border-white text-(--dark5) bg-white shadow-[0_0_0_1px_rgba(56,189,248,0.15)]"
                  : "border-(--dark2) bg-(--dark3) opacity-75 hover:opacity-100"
              }`}
            >
              <div
                className={`mb-4 flex items-start justify-between gap-3 border-b ${selectedAccount === "free" ? "border-(--grey17)" : "border-(--dark2)"}  px-5 pb-3`}
              >
                <h3 className="text-[16px] font-semibold">Free Account</h3>

                <Checkbox
                  checked={selectedAccount === "free"}
                  onCheckedChange={() => setSelectedAccount("free")}
                  className="h-5 w-5 rounded-[6px] border-(--grey16) data-[state=checked]:border-(--grey16)] data-[state=checked]:bg-[#38bdf8] data-[state=checked]:text-black"
                />
              </div>

              <div className="mb-2 flex items-end gap-2 px-5">
                <span className="text-[30px] font-semibold">$0</span>
                <span
                  className={`${selectedAccount === "free" ? "text-(--dark5)" : "text-(--grey1)"}  text-[14px] pb-1 font-normal`}
                >
                  per month
                </span>
              </div>

              <p
                className={`${selectedAccount === "free" ? "text-(--dark5)" : "text-(--grey1)"} text-[14px] font-normal px-5`}
              >
                Includes free live streams, and content sharing
              </p>
            </div>

            <div
              trole="button"
              onClick={() => setSelectedAccount("pro")}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  setSelectedAccount("pro");
                }
              }}
              className={`rounded-[12px] py-4 border text-left transition-all cursor-pointer  ${
                selectedAccount === "pro"
                  ? "border-white bg-white text-(--dark5) shadow-[0_0_0_1px_rgba(56,189,248,0.15)]"
                  : "border-(--dark2) bg-(--dark3) opacity-75 hover:opacity-100"
              }`}
            >
              <div
                className={`mb-4 flex items-start justify-between gap-3 border-b ${selectedAccount === "pro" ? "border-(--grey17)" : "border-(--dark2)"}  px-5 pb-3`}
              >
                <h3 className="text-[16px] font-semibold">Pro Account</h3>

                <Checkbox
                  checked={selectedAccount === "pro"}
                  onCheckedChange={() => setSelectedAccount("pro")}
                  className="h-5 w-5 rounded-[6px] border-(--grey16) data-[state=checked]:border-(--grey16)] data-[state=checked]:bg-[#38bdf8] data-[state=checked]:text-black"
                />
              </div>

              <div className="mb-2 flex items-end gap-2 px-5">
                <span className="text-[30px] font-semibold">$5</span>
                <span
                  className={`${selectedAccount === "pro" ? "text-(--dark5)" : "text-(--grey1)"}  text-[14px] pb-1 font-normal`}
                >
                  per month
                </span>
              </div>

              <p
                className={`${selectedAccount === "pro" ? "text-(--dark5)" : "text-(--grey1)"} text-[14px] font-normal px-5`}
              >
                Includes up to paid promotions and paid content offers.
              </p>
            </div>
          </div>

          {/* Billing Section */}
          <div className="rounded-[12px] border border-(--dark2) bg-(--dark4) p-4 sm:p-5 lg:p-6">
            <div className="mb-6 flex flex-col gap-4 lg:mb-8 lg:flex-row lg:items-center lg:justify-between">
              <div>
                <h2 className="text-(--grey1) text-[20px] font-bold">
                  Billing History
                </h2>
                <p className="mt-1 text-[16px] font-normal text-(--grey3)">
                  Have a check on your billing history.
                </p>
              </div>

              <div className="flex w-full flex-col gap-3 sm:flex-row lg:w-auto">
                {/* Filter Dropdown */}
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <button className="h-11 flex cursor-pointer rounded-[4px] items-center gap-3 justify-between border-(--dark2) bg-(--dark2) px-4 text-gray-300 hover:bg-[#323239] hover:text-white">
                      <span className="flex items-center gap-2">
                        <Filter size={16} />
                        Filters
                      </span>
                      <ChevronDown size={14} />
                    </button>
                  </DropdownMenuTrigger>

                  <DropdownMenuContent
                    align="end"
                    className="w-48 border-[#27272a] bg-[#18181b] text-white"
                  >
                    <DropdownMenuCheckboxItem
                      checked={statusFilter.paid}
                      onCheckedChange={(checked) =>
                        setStatusFilter((prev) => ({
                          ...prev,
                          paid: !!checked,
                        }))
                      }
                      className="cursor-pointer focus:bg-[#27272a] focus:text-white"
                    >
                      Paid
                    </DropdownMenuCheckboxItem>

                    <DropdownMenuCheckboxItem
                      checked={statusFilter.pending}
                      onCheckedChange={(checked) =>
                        setStatusFilter((prev) => ({
                          ...prev,
                          pending: !!checked,
                        }))
                      }
                      className="cursor-pointer focus:bg-[#27272a] focus:text-white"
                    >
                      Pending
                    </DropdownMenuCheckboxItem>

                    <DropdownMenuCheckboxItem
                      checked={statusFilter.unpaid}
                      onCheckedChange={(checked) =>
                        setStatusFilter((prev) => ({
                          ...prev,
                          unpaid: !!checked,
                        }))
                      }
                      className="cursor-pointer focus:bg-[#27272a] focus:text-white"
                    >
                      Unpaid
                    </DropdownMenuCheckboxItem>
                  </DropdownMenuContent>
                </DropdownMenu>

                {/* Search */}
                <div className="relative w-full ">
                  <Search
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500"
                    size={16}
                  />
                  <Input
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Search billing history"
                    className="h-11 bg-(--dark3) pl-10 dark:rounded-[4px] rounded-[4px]"
                  />
                </div>
              </div>
            </div>

            {/* Table */}
            <div className="overflow-hidden rounded-[4px] border border-[#27272a]">
              <div className="w-full overflow-x-auto">
                {billingData.length === 0 ? (
                  <div>
                    <svg
                      width="160"
                      height="160"
                      viewBox="0 0 160 160"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      {" "}
                      <ellipse
                        opacity="0.1"
                        cx="80"
                        cy="155.2"
                        rx="80"
                        ry="4.8"
                        fill="#7C7B91"
                      />{" "}
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M61.9312 35.2001C62.9759 31.5065 66.3719 28.8001 70.4 28.8001H102.856C100.15 30.4304 97.8172 32.6164 96.015 35.2001H61.9312ZM94.1556 38.4001H47.2C41.8981 38.4001 37.6 42.6982 37.6 48.0001V107.2H87.2H88C88.8836 107.2 89.6 107.916 89.6 108.8V117.2C89.6 124.048 95.1517 129.6 102 129.6C108.848 129.6 114.4 124.048 114.4 117.2V70.4001C102.029 70.4001 92 60.3713 92 48.0001C92 44.5646 92.7734 41.3097 94.1556 38.4001ZM117.6 70.1733V115.067C122.14 114.306 125.6 110.357 125.6 105.6V67.4034C123.183 68.8018 120.48 69.7613 117.6 70.1733ZM128.8 65.1589V105.6C128.8 112.141 123.894 117.536 117.561 118.306C116.994 126.405 110.244 132.8 102 132.8C101.86 132.8 101.721 132.798 101.582 132.795L101.6 132.8H44C35.1634 132.8 28 125.637 28 116.8V113.6C28 110.065 30.8654 107.2 34.4 107.2V48.0001C34.4 40.9309 40.1308 35.2001 47.2 35.2001H58.64C59.7519 29.7227 64.5945 25.6001 70.4 25.6001H112.8V25.6564C113.328 25.6191 113.862 25.6001 114.4 25.6001C126.771 25.6001 136.8 35.6289 136.8 48.0001C136.8 54.888 133.691 61.0498 128.8 65.1589ZM19.2 122.8C19.2 122.137 19.7373 121.6 20.4 121.6C21.0627 121.6 21.6 122.137 21.6 122.8V123.2C21.6 132.037 28.7634 139.2 37.6 139.2H41.28C41.8986 139.2 42.4 139.702 42.4 140.32C42.4 140.939 41.8986 141.44 41.28 141.44H37.6C26.9791 141.44 19.2 133.787 19.2 123.2V122.8ZM20.4 118.4C17.9699 118.4 16 120.37 16 122.8V123.2C16 135.588 25.2459 144.64 37.6 144.64H41.28C43.6659 144.64 45.6 142.706 45.6 140.32C45.6 137.934 43.6659 136 41.28 136H37.6C30.5308 136 24.8 130.269 24.8 123.2V122.8C24.8 120.37 22.8301 118.4 20.4 118.4ZM45.6 80.8001C45.6 78.591 47.3909 76.8001 49.6 76.8001H73.6C75.8091 76.8001 77.6 78.591 77.6 80.8001C77.6 83.0092 75.8091 84.8001 73.6 84.8001H49.6C47.3909 84.8001 45.6 83.0092 45.6 80.8001ZM49.6 80.0001C49.1582 80.0001 48.8 80.3583 48.8 80.8001C48.8 81.2419 49.1582 81.6001 49.6 81.6001H73.6C74.0418 81.6001 74.4 81.2419 74.4 80.8001C74.4 80.3583 74.0418 80.0001 73.6 80.0001H49.6ZM59.1266 70.6517C59.2484 70.7735 59.4406 70.8345 59.7031 70.8345C59.9281 70.8345 60.0922 70.7735 60.1953 70.6517C60.3078 70.5298 60.3641 70.3376 60.3641 70.0751V68.936C61.2359 68.8423 62.0281 68.5938 62.7406 68.1907C63.4531 67.7782 64.025 67.1782 64.4562 66.3907C64.8969 65.5938 65.1172 64.6095 65.1172 63.4376C65.1172 62.4251 64.8875 61.5907 64.4281 60.9345C63.9687 60.2688 63.4344 59.7579 62.825 59.4017C62.2156 59.0454 61.3953 58.6423 60.3641 58.1923V54.3954C60.8328 54.4142 61.2266 54.4657 61.5453 54.5501C61.8734 54.6345 62.2062 54.7423 62.5437 54.8735C62.7781 54.9673 62.9328 55.0142 63.0078 55.0142C63.1953 55.0142 63.3922 54.8829 63.5984 54.6204C63.8141 54.3579 63.9969 54.0532 64.1469 53.7063C64.2969 53.3501 64.3719 53.0595 64.3719 52.8345C64.3719 52.5813 64.1984 52.3282 63.8516 52.0751C63.5141 51.822 63.0359 51.6063 62.4172 51.4282C61.8078 51.2501 61.1234 51.147 60.3641 51.1188V50.3454C60.3641 50.0735 60.3078 49.8813 60.1953 49.7688C60.0828 49.6563 59.8906 49.6001 59.6187 49.6001C59.3937 49.6001 59.225 49.661 59.1125 49.7829C59 49.8954 58.9437 50.0829 58.9437 50.3454V51.1329C58.0344 51.236 57.2 51.4845 56.4406 51.8782C55.6906 52.272 55.0859 52.8345 54.6266 53.5657C54.1766 54.2876 53.9516 55.1735 53.9516 56.2235C53.9516 57.3298 54.1906 58.2298 54.6687 58.9235C55.1562 59.6079 55.7234 60.1282 56.3703 60.4845C57.0266 60.8313 57.8844 61.2017 58.9437 61.5954V65.7157C58.3625 65.7157 57.8281 65.636 57.3406 65.4767C56.8625 65.3173 56.3703 65.111 55.8641 64.8579C55.5078 64.6704 55.2734 64.5767 55.1609 64.5767C54.9922 64.5767 54.7812 64.7079 54.5281 64.9704C54.275 65.2235 54.0547 65.5282 53.8672 65.8845C53.6891 66.2407 53.6 66.5407 53.6 66.7845C53.6 67.0751 53.8109 67.3845 54.2328 67.7126C54.6641 68.0407 55.2828 68.3267 56.0891 68.5704C56.9047 68.8048 57.8562 68.9407 58.9437 68.9782V70.0751C58.9437 70.3376 59.0047 70.5298 59.1266 70.6517ZM57.9312 55.0985C58.1187 54.8454 58.4562 54.6579 58.9437 54.536V57.5454C58.5219 57.3017 58.1984 57.0485 57.9734 56.786C57.7578 56.5235 57.65 56.2142 57.65 55.8579C57.65 55.5954 57.7437 55.3423 57.9312 55.0985ZM61.1516 64.8579C60.9547 65.111 60.6922 65.3032 60.3641 65.4345V62.2704C61.0859 62.6829 61.4469 63.2267 61.4469 63.9017C61.4469 64.286 61.3484 64.6048 61.1516 64.8579ZM45.6 93.6001C45.6 91.391 47.3909 89.6001 49.6 89.6001H97.6C99.8091 89.6001 101.6 91.391 101.6 93.6001C101.6 95.8092 99.8091 97.6001 97.6 97.6001H49.6C47.3909 97.6001 45.6 95.8092 45.6 93.6001ZM49.6 92.8001C49.1582 92.8001 48.8 93.1583 48.8 93.6001C48.8 94.0419 49.1582 94.4001 49.6 94.4001H97.6C98.0418 94.4001 98.4 94.0419 98.4 93.6001C98.4 93.1583 98.0418 92.8001 97.6 92.8001H49.6ZM95.2 48.0001C95.2 37.3962 103.796 28.8001 114.4 28.8001C125.004 28.8001 133.6 37.3962 133.6 48.0001C133.6 58.604 125.004 67.2001 114.4 67.2001C103.796 67.2001 95.2 58.604 95.2 48.0001ZM110.4 37.6001C110.4 35.391 112.191 33.6001 114.4 33.6001C116.609 33.6001 118.4 35.391 118.4 37.6001V47.2001C118.4 49.4092 116.609 51.2001 114.4 51.2001C112.191 51.2001 110.4 49.4092 110.4 47.2001V37.6001ZM114.4 36.8001C113.958 36.8001 113.6 37.1583 113.6 37.6001V47.2001C113.6 47.6419 113.958 48.0001 114.4 48.0001C114.842 48.0001 115.2 47.6419 115.2 47.2001V37.6001C115.2 37.1583 114.842 36.8001 114.4 36.8001ZM114.4 62.4001C112.191 62.4001 110.4 60.6092 110.4 58.4001C110.4 56.191 112.191 54.4001 114.4 54.4001C116.609 54.4001 118.4 56.191 118.4 58.4001C118.4 60.6092 116.609 62.4001 114.4 62.4001ZM113.6 58.4001C113.6 58.8419 113.958 59.2001 114.4 59.2001C114.842 59.2001 115.2 58.8419 115.2 58.4001C115.2 57.9583 114.842 57.6001 114.4 57.6001C113.958 57.6001 113.6 57.9583 113.6 58.4001Z"
                        fill="#7C7B91"
                      />{" "}
                    </svg>
                    <h1 className="text-[20px] font-semibold text-(--grey1)">
                      You don’t have any bills
                    </h1>
                    <p className="text-(--grey18) text-[14px] font-normal">
                      Once upgraded, your billing history will appear here
                    </p>
                  </div>
                ) : (
                  <Table className="min-w-[700px]">
                    <TableHeader className="bg-[#27272a]/50">
                      <TableRow className="border-b border-[#27272a] hover:bg-transparent">
                        <TableHead className="w-[56px]">
                          <Checkbox
                            checked={
                              allVisibleSelected
                                ? true
                                : isIndeterminate
                                  ? "indeterminate"
                                  : false
                            }
                            onCheckedChange={handleSelectAll}
                            className="h-4.5 w-4.5 rounded-[2px] border-gray-500 data-[state=checked]:border-[#38bdf8] data-[state=checked]:bg-[#38bdf8] data-[state=checked]:text-black data-[state=indeterminate]:border-[#38bdf8] data-[state=indeterminate]:bg-[#38bdf8] data-[state=indeterminate]:text-black"
                          />
                        </TableHead>

                        <TableHead className="text-(--grey1) font-bold text-[14px] py-4">
                          <button
                            type="button"
                            onClick={() =>
                              setSortOrder((prev) =>
                                prev === "asc" ? "desc" : "asc",
                              )
                            }
                            className="flex items-center gap-2 font-medium text-gray-400 transition hover:text-white"
                          >
                            Connected on
                            <ArrowUpDown size={14} />
                          </button>
                        </TableHead>

                        <TableHead className="text-(--grey1) font-bold text-[14px]">
                          Subscription
                        </TableHead>

                        <TableHead className="text-(--grey1) font-bold text-[14px]">
                          Status
                        </TableHead>
                      </TableRow>
                    </TableHeader>

                    <TableBody>
                      {filteredData.length > 0 ? (
                        filteredData.map((row) => {
                          const isChecked = selectedRows.includes(row.id);

                          return (
                            <TableRow
                              key={row.id}
                              className="border-b border-[#27272a] transition hover:bg-white/5"
                            >
                              <TableCell>
                                <Checkbox
                                  checked={isChecked}
                                  onCheckedChange={(checked) =>
                                    handleSelectRow(row.id, checked)
                                  }
                                  className="h-4.5 w-4.5 rounded-[2px] border-gray-500 data-[state=checked]:border-[#38bdf8] data-[state=checked]:bg-[#38bdf8] data-[state=checked]:text-black"
                                />
                              </TableCell>

                              <TableCell>
                                <div className="flex flex-col">
                                  <span className="text-[14px] font-medium text-(--grey1)">
                                    {row.date}
                                  </span>
                                  <span className="text-[12px] font-normal text-(--grey13)">
                                    {row.time}
                                  </span>
                                </div>
                              </TableCell>

                              <TableCell className="text-[14px] font-medium text-(--grey1)">
                                {row.subscription}
                              </TableCell>

                              <TableCell>
                                {renderStatusBadge(row.status)}
                              </TableCell>
                            </TableRow>
                          );
                        })
                      ) : (
                        <TableRow className="border-b border-[#27272a]">
                          <TableCell
                            colSpan={4}
                            className="py-10 text-center text-sm text-gray-400"
                          >
                            No billing records found.
                          </TableCell>
                        </TableRow>
                      )}
                    </TableBody>
                  </Table>
                )}
              </div>
            </div>

            {/* Bottom helper row */}
            {/* <div className="mt-4 flex flex-col gap-2 text-sm text-gray-400 sm:flex-row sm:items-center sm:justify-between">
              <p>
                Selected rows:{" "}
                <span className="font-semibold text-white">
                  {selectedRows.length}
                </span>
              </p>
              <p>
                Total records:{" "}
                <span className="font-semibold text-white">
                  {filteredData.length}
                </span>
              </p>
            </div> */}
          </div>
        </div>
      </div>
    </>
  );
}
