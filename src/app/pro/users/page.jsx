'use client'
import { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import {
  ArrowUpDown,
  ChevronDown,
  Filter,
  Pencil,
  Search,
  SquareArrowOutUpRight,
  Trash2,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";

const initialAdsData = [
  {
    id: 1,
    date: "10/12/25",
    time: "12:00 PM",
    image: "/images/resource/liveChat1.png",
    title: "Heart Condition",
    brandName: "MediCare",
    clicks: 145,
    placement: "live, Classroom",
    category: "Radiology",
  },
  {
    id: 2,
    date: "10/01/25",
    time: "4:00 PM",
    image: "/images/resource/liveChat2.png",
    title: "No caption added",
    brandName: "HealthPlus",
    clicks: 298,
    placement: "Resource, Feed",
    category: "Radiology",
  },
  {
    id: 3,
    date: "10/12/25",
    time: "1:00 PM",
    image: null,
    title: "Post Caption",
    brandName: "WellnessPro",
    clicks: 512,
    placement: "forum, live",
    category: "Radiology",
  },
  {
    id: 4,
    date: "10/12/25",
    time: "6:00 PM",
    image: "/images/resource/liveChat1.png",
    title: "Post Caption",
    brandName: "PharmaTech",
    clicks: 723,
    placement: "Classroom, Resource",
    category: "Dermatology",
  },
  {
    id: 5,
    date: "10/12/25",
    time: "3:00 PM",
    image: "/images/resource/liveChat1.png",
    title: "Post Caption",
    brandName: "LifeGuard",
    clicks: 334,
    placement: "Feed, forum",
    category: "Pediatrics",
  },
  {
    id: 6,
    date: "10/12/25",
    time: "2:00 PM",
    image: "/images/resource/liveChat1.png",
    title: "Post Caption",
    brandName: "CureAll",
    clicks: 481,
    placement: "live, Resource",
    category: "Oncology",
  },
  {
    id: 7,
    date: "10/12/25",
    time: "12:00 PM",
    image: "/images/resource/liveChat1.png",
    title: "Post Caption",
    brandName: "MedEquip",
    clicks: 219,
    placement: "Classroom, Feed",
    category: "Neurology",
  },
  {
    id: 8,
    date: "10/12/25",
    time: "7:00 PM",
    image: "/images/resource/liveChat1.png",
    title: "Post Caption",
    brandName: "DoctorAid",
    clicks: 876,
    placement: "forum, live",
    category: "Cardiology",
  },
  {
    id: 9,
    date: "10/12/25",
    time: "5:00 PM",
    image: "/images/resource/liveChat1.png",
    title: "Post Caption",
    brandName: "CareConnect",
    clicks: 654,
    placement: "Resource, Classroom",
    category: "Ophthalmology",
  },
  {
    id: 10,
    date: "10/12/25",
    time: "5:00 PM",
    image: "/images/resource/liveChat1.png",
    title: "Post Caption",
    brandName: "NutriHealth",
    clicks: 337,
    placement: "Feed, forum",
    category: "Gastroenterology",
  },
];

export default function Page() {

  const [tableData, setTableData] = useState(initialAdsData);
  const [selectedRows, setSelectedRows] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filters, setFilters] = useState({
    categories: [],
    placements: [],
  });
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [editingRow, setEditingRow] = useState(null);

  const handleEditRow = (row) => {
    setEditingRow({ ...row });
    setEditDialogOpen(true);
  };

  const handleSaveEdit = () => {
    if (!editingRow) return;
    setTableData((prev) =>
      prev.map((row) => (row.id === editingRow.id ? { ...editingRow } : row))
    );
    setEditDialogOpen(false);
    setEditingRow(null);
  };

  const uniqueCategories = useMemo(() => {
    return [...new Set(initialAdsData.map((item) => item.category))];
  }, []);

  const uniquePlacements = useMemo(() => {
    const placements = initialAdsData.flatMap((item) =>
      item.placement.split(",").map((placement) => placement.trim())
    );
    return [...new Set(placements)];
  }, []);

  const filteredData = useMemo(() => {
    const normalizedSearch = searchTerm.trim().toLowerCase();

    return tableData.filter((row) => {
      const placementItems = row.placement
        .split(",")
        .map((item) => item.trim().toLowerCase());

      const searchMatch =
        normalizedSearch === "" ||
        row.title.toLowerCase().includes(normalizedSearch) ||
        row.brandName.toLowerCase().includes(normalizedSearch) ||
        row.category.toLowerCase().includes(normalizedSearch) ||
        row.placement.toLowerCase().includes(normalizedSearch) ||
        row.date.toLowerCase().includes(normalizedSearch) ||
        row.time.toLowerCase().includes(normalizedSearch) ||
        String(row.clicks).includes(normalizedSearch);

      const categoryMatch =
        filters.categories.length === 0 ||
        filters.categories.includes(row.category);

      const placementMatch =
        filters.placements.length === 0 ||
        filters.placements.some((placement) =>
          placementItems.includes(placement.toLowerCase())
        );

      return searchMatch && categoryMatch && placementMatch;
    });
  }, [tableData, searchTerm, filters]);

  const allSelected =
    filteredData.length > 0 &&
    filteredData.every((item) => selectedRows.includes(item.id));

  const isSelected = (id) => selectedRows.includes(id);

  const toggleRow = (id) => {
    setSelectedRows((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const toggleAll = (checked) => {
    const visibleIds = filteredData.map((item) => item.id);

    if (checked) {
      setSelectedRows((prev) => [...new Set([...prev, ...visibleIds])]);
    } else {
      setSelectedRows((prev) => prev.filter((id) => !visibleIds.includes(id)));
    }
  };

  const handleDeleteRow = (id) => {
    setTableData((prev) => prev.filter((row) => row.id !== id));
    setSelectedRows((prev) => prev.filter((item) => item !== id));
  };

  const toggleCategoryFilter = (value) => {
    setFilters((prev) => ({
      ...prev,
      categories: prev.categories.includes(value)
        ? prev.categories.filter((item) => item !== value)
        : [...prev.categories, value],
    }));
  };

  const togglePlacementFilter = (value) => {
    setFilters((prev) => ({
      ...prev,
      placements: prev.placements.includes(value)
        ? prev.placements.filter((item) => item !== value)
        : [...prev.placements, value],
    }));
  };

  return (
    <>
      <div className="px-8 py-6">
        <div className="mt-5 w-full rounded-xl border-2 border-(--dark2) bg-(--dark4) p-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-(--grey1) text-[20px] font-bold">Users</h1>
              <p className='text-white'>
                Have a check on your billing history.
              </p>
            </div>


            <div className="flex items-center gap-3">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button className="h-10 flex items-center gap-2 rounded-[4px] border-none px-4 py-2 text-(--grey1) dark:rounded-[4px] dark:bg-(--dark2) dark:hover:bg-(--dark3)">
                    <Filter className="h-4 w-4" />
                    <span>Filters</span>
                    <ChevronDown className="h-4 w-4 opacity-50" />
                  </Button>
                </DropdownMenuTrigger>

                <DropdownMenuContent
                  align="start"
                  className="max-h-96 w-60 overflow-y-auto border-[#27272a] bg-[#18181b] text-white"
                >
                  <DropdownMenuLabel>Category Filter</DropdownMenuLabel>
                  <DropdownMenuSeparator className="bg-[#27272a]" />

                  {uniqueCategories.map((category) => (
                    <DropdownMenuCheckboxItem
                      key={category}
                      checked={filters.categories.includes(category)}
                      onCheckedChange={() => toggleCategoryFilter(category)}
                      className="cursor-pointer focus:bg-[#27272a] focus:text-white"
                    >
                      {category}
                    </DropdownMenuCheckboxItem>
                  ))}

                  <DropdownMenuSeparator className="bg-[#27272a]" />
                  <DropdownMenuLabel>Placement Filter</DropdownMenuLabel>
                  <DropdownMenuSeparator className="bg-[#27272a]" />

                  {uniquePlacements.map((placement) => (
                    <DropdownMenuCheckboxItem
                      key={placement}
                      checked={filters.placements.includes(placement)}
                      onCheckedChange={() => togglePlacementFilter(placement)}
                      className="cursor-pointer focus:bg-[#27272a] focus:text-white"
                    >
                      {placement}
                    </DropdownMenuCheckboxItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>

              <div className="relative">
                <Search
                  size={16}
                  className="absolute left-0 top-0 translate-x-2 translate-y-3 text-(--grey1)"
                />
                <Input
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="h-10 rounded-[4px] pl-8.5 dark:rounded-[4px]"
                  placeholder="Search by source"
                />
              </div>
            </div>
          </div>

          <div className="mt-5 overflow-x-auto">
            <table className="w-full min-w-[1180px] border-separate border-spacing-0 text-sm text-white/80">
              <thead>
                <tr className="overflow-hidden rounded-[12px] bg-(--dark2)">
                  <th className="w-13 border-b border-white/10 px-4 py-3 text-left">
                    <Checkbox
                      checked={allSelected}
                      onCheckedChange={toggleAll}
                      className="h-4.5 w-4.5 rounded-[2px] border-gray-500 data-[state=checked]:border-[#38bdf8] data-[state=checked]:bg-[#38bdf8] data-[state=checked]:text-black data-[state=indeterminate]:border-[#38bdf8] data-[state=indeterminate]:bg-[#38bdf8] data-[state=indeterminate]:text-black"
                    />
                  </th>

                  <th className="min-w-65 border-b border-(--dark2) px-4 py-3 text-left text-(--grey1) text-[14px] font-bold">
                    <div className="flex items-center gap-2">
                      <span>Name</span>
                      <ArrowUpDown className="h-3.5 w-3.5 text-white/40" />
                    </div>
                  </th>
                  <th className="min-w-35 border-b border-(--dark2) px-4 py-3 text-left text-(--grey1) text-[14px] font-bold">
                    <div className="flex items-center gap-2">
                      <span>Connected on</span>
                      <ArrowUpDown className="h-3.5 w-3.5 text-white/40" />
                    </div>
                  </th>



                  {/* <th className="min-w-35 border-b border-(--dark2) px-4 py-3 text-left text-(--grey1) text-[14px] font-bold">
                    <div className="flex items-center gap-2">
                      <span>Brand Name</span>
                      <ArrowUpDown className="h-3.5 w-3.5 text-white/40" />
                    </div>
                  </th>

                  <th className="min-w-35 border-b border-(--dark2) px-4 py-3 text-left text-(--grey1) text-[14px] font-bold">
                    <div className="flex items-center gap-2">
                      <span>Number of Clicks</span>
                      <ArrowUpDown className="h-3.5 w-3.5 text-white/40" />
                    </div>
                  </th> */}

                  <th className="min-w-35 border-b border-(--dark2) px-4 py-3 text-left text-(--grey1) text-[14px] font-bold">
                    <div className="flex items-center gap-2">
                      <span>End Date</span>
                      <ArrowUpDown className="h-3.5 w-3.5 text-white/40" />
                    </div>
                  </th>
                  <th className="min-w-40 border-b border-(--dark2) px-4 py-3 text-left text-(--grey1) text-[14px] font-bold">
                    <div className="flex items-center gap-2">
                      <span>Subscription</span>
                      <ArrowUpDown className="h-3.5 w-3.5 text-white/40" />
                    </div>
                  </th>

                  <th className="min-w-22 border-b border-(--dark2) px-4 py-3 text-left text-(--grey1) text-[14px] font-bold">
                    {/* <div className="flex items-center gap-2"> */}
                    {/* <span>Activity</span> */}
                    {/* <ArrowUpDown className="h-3.5 w-3.5 text-white/40" /> */}
                    {/* </div> */}
                  </th>
                </tr>
              </thead>

              <tbody>
                {filteredData.map((row) => {
                  const selected = isSelected(row.id);

                  return (
                    <tr
                      key={row.id}
                      className={`transition-colors duration-200 ${selected
                        ? "bg-white/2.5"
                        : "bg-transparent hover:bg-white/2.5"
                        }`}
                    >
                      <td className="border-b border-(--dark2) px-4 py-3">
                        <Checkbox
                          checked={selected}
                          onCheckedChange={() => toggleRow(row.id)}
                          className="h-4.5 w-4.5 rounded-[2px] border-gray-500 data-[state=checked]:border-[#38bdf8] data-[state=checked]:bg-[#38bdf8] data-[state=checked]:text-black data-[state=indeterminate]:border-[#38bdf8] data-[state=indeterminate]:bg-[#38bdf8] data-[state=indeterminate]:text-black"
                        />
                      </td>
                      <td className="border-b border-l border-(--dark2) px-4 py-3">
                        <div className="flex items-center justify-between">
                          <div className="flex items-start gap-3">
                            {row.image ? (
                              <div
                                className="size-15 shrink-0 rounded-[4px] bg-cover bg-center"
                                style={{ backgroundImage: `url(${row.image})` }}
                              />
                            ) : (
                              <div className="flex size-15 shrink-0 items-center justify-center rounded-[4px] bg-(--dark2) text-[11px] font-medium text-(--grey13)">
                                n/a
                              </div>
                            )}

                            <div className="flex flex-col">
                              <span className="text-[12px] font-normal text-(--grey13)">
                                {row.title}
                              </span>
                            </div>
                          </div>
                          <Link href='/admin/users/12'>
                            <SquareArrowOutUpRight
                              size={20}
                              className="text-(--grey15)"
                            /></Link>
                        </div>
                      </td>

                      <td className="border-b border-l border-(--dark2) px-4 py-3">
                        <div className="flex flex-col">
                          <span className="text-[14px] font-medium text-(--grey1)">
                            {row.date}
                          </span>
                          <span className="mt-1 text-[12px] text-(--grey13)">
                            {row.time}
                          </span>
                        </div>
                      </td>



                      {/* <td className="border-b border-(--dark2) px-4 py-3">
                        <span className="text-[13px] font-medium text-(--grey1)">
                          {row.brandName}
                        </span>
                      </td>

                      <td className="border-b border-(--dark2) px-4 py-3">
                        <span className="text-[13px] font-medium text-(--grey1)">
                          {row.clicks}
                        </span>
                      </td> */}
                      <td className="border-b border-(--dark2) px-4 py-3">
                        <div className="flex flex-col">
                          <span className="text-[14px] font-medium text-(--grey1)">
                            {row.date}
                          </span>
                          <span className="mt-1 text-[12px] text-(--grey13)">
                            {row.time}
                          </span>
                        </div>
                      </td>
                      <td className="border-b border-l border-(--dark2) px-4 py-3">
                        <div className='flex items-center justify-between'>
                          <span className="text-[13px] font-medium text-(--grey1)">
                            Month - Subscription
                          </span>
                          <span className="h-[28px] py-1 px-3 rounded-[160px] border bg-[#00A63E26] text-[14px] font-bold text-[#00A63E] border border-[#00A63E]">Paid</span>
                          {/* <span className="h-[28px] py-1 px-3 rounded-[160px] border text-(--blue1) text-[14px] font-bold border border-[#23A5E7]">Free</span> */}
                        </div>
                      </td>

                      <td className="border-b border-l border-(--dark2) px-4 py-3">
                        <button
                          type="button"
                          onClick={() => handleEditRow(row)}
                          className="inline-flex cursor-pointer items-center justify-center rounded-md p-1.5 text-white-500 transition hover:bg-white-500/10 hover:text-white-400"
                        >
                          <Pencil size={18} />
                        </button>
                        <button
                          type="button"
                          onClick={() => handleDeleteRow(row.id)}
                          className="inline-flex cursor-pointer items-center justify-center rounded-md p-1.5 text-red-500 transition hover:bg-red-500/10 hover:text-red-400"
                        >
                          <Trash2 size={18} />
                        </button>
                      </td>
                    </tr>
                  );
                })}

                {filteredData.length === 0 && (
                  <tr>
                    <td colSpan={8}>
                      <div className="flex mt-10 pb-10 flex-col items-center justify-center">
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
                            d="M61.9312 35.1996C62.9759 31.506 66.3719 28.7996 70.4 28.7996H102.856C100.15 30.4299 97.8172 32.6159 96.015 35.1996H61.9312ZM94.1556 38.3996H47.2C41.8981 38.3996 37.6 42.6977 37.6 47.9996V107.2H87.2H88C88.8836 107.2 89.6 107.916 89.6 108.8V117.2C89.6 124.048 95.1517 129.6 102 129.6C108.848 129.6 114.4 124.048 114.4 117.2V70.3996C102.029 70.3996 92 60.3708 92 47.9996C92 44.5641 92.7734 41.3092 94.1556 38.3996ZM117.6 70.1728V115.067C122.14 114.305 125.6 110.356 125.6 105.6V67.4029C123.183 68.8013 120.48 69.7609 117.6 70.1728ZM128.8 65.1584V105.6C128.8 112.14 123.894 117.535 117.561 118.305C116.994 126.405 110.244 132.8 102 132.8C101.86 132.8 101.721 132.798 101.582 132.794L101.6 132.8H44C35.1634 132.8 28 125.636 28 116.8V113.6C28 110.065 30.8654 107.2 34.4 107.2V47.9996C34.4 40.9304 40.1308 35.1996 47.2 35.1996H58.64C59.7519 29.7222 64.5945 25.5996 70.4 25.5996H112.8V25.6559C113.328 25.6186 113.862 25.5996 114.4 25.5996C126.771 25.5996 136.8 35.6284 136.8 47.9996C136.8 54.8875 133.691 61.0493 128.8 65.1584ZM19.2 122.8C19.2 122.137 19.7373 121.6 20.4 121.6C21.0627 121.6 21.6 122.137 21.6 122.8V123.2C21.6 132.036 28.7634 139.2 37.6 139.2H41.28C41.8986 139.2 42.4 139.701 42.4 140.32C42.4 140.938 41.8986 141.44 41.28 141.44H37.6C26.9791 141.44 19.2 133.786 19.2 123.2V122.8ZM20.4 118.4C17.9699 118.4 16 120.37 16 122.8V123.2C16 135.588 25.2459 144.64 37.6 144.64H41.28C43.6659 144.64 45.6 142.705 45.6 140.32C45.6 137.934 43.6659 136 41.28 136H37.6C30.5308 136 24.8 130.269 24.8 123.2V122.8C24.8 120.37 22.8301 118.4 20.4 118.4ZM45.6 80.7996C45.6 78.5905 47.3909 76.7996 49.6 76.7996H73.6C75.8091 76.7996 77.6 78.5905 77.6 80.7996C77.6 83.0087 75.8091 84.7996 73.6 84.7996H49.6C47.3909 84.7996 45.6 83.0087 45.6 80.7996ZM49.6 79.9996C49.1582 79.9996 48.8 80.3578 48.8 80.7996C48.8 81.2414 49.1582 81.5996 49.6 81.5996H73.6C74.0418 81.5996 74.4 81.2414 74.4 80.7996C74.4 80.3578 74.0418 79.9996 73.6 79.9996H49.6ZM59.1266 70.6512C59.2484 70.773 59.4406 70.834 59.7031 70.834C59.9281 70.834 60.0922 70.773 60.1953 70.6512C60.3078 70.5293 60.3641 70.3371 60.3641 70.0746V68.9355C61.2359 68.8418 62.0281 68.5934 62.7406 68.1902C63.4531 67.7777 64.025 67.1777 64.4562 66.3902C64.8969 65.5934 65.1172 64.609 65.1172 63.4371C65.1172 62.4246 64.8875 61.5902 64.4281 60.934C63.9687 60.2684 63.4344 59.7574 62.825 59.4012C62.2156 59.0449 61.3953 58.6418 60.3641 58.1918V54.3949C60.8328 54.4137 61.2266 54.4652 61.5453 54.5496C61.8734 54.634 62.2062 54.7418 62.5437 54.873C62.7781 54.9668 62.9328 55.0137 63.0078 55.0137C63.1953 55.0137 63.3922 54.8824 63.5984 54.6199C63.8141 54.3574 63.9969 54.0527 64.1469 53.7059C64.2969 53.3496 64.3719 53.059 64.3719 52.834C64.3719 52.5809 64.1984 52.3277 63.8516 52.0746C63.5141 51.8215 63.0359 51.6059 62.4172 51.4277C61.8078 51.2496 61.1234 51.1465 60.3641 51.1184V50.3449C60.3641 50.073 60.3078 49.8809 60.1953 49.7684C60.0828 49.6559 59.8906 49.5996 59.6187 49.5996C59.3937 49.5996 59.225 49.6605 59.1125 49.7824C59 49.8949 58.9437 50.0824 58.9437 50.3449V51.1324C58.0344 51.2355 57.2 51.484 56.4406 51.8777C55.6906 52.2715 55.0859 52.834 54.6266 53.5652C54.1766 54.2871 53.9516 55.173 53.9516 56.223C53.9516 57.3293 54.1906 58.2293 54.6687 58.923C55.1562 59.6074 55.7234 60.1277 56.3703 60.484C57.0266 60.8309 57.8844 61.2012 58.9437 61.5949V65.7152C58.3625 65.7152 57.8281 65.6355 57.3406 65.4762C56.8625 65.3168 56.3703 65.1105 55.8641 64.8574C55.5078 64.6699 55.2734 64.5762 55.1609 64.5762C54.9922 64.5762 54.7812 64.7074 54.5281 64.9699C54.275 65.223 54.0547 65.5277 53.8672 65.884C53.6891 66.2402 53.6 66.5402 53.6 66.784C53.6 67.0746 53.8109 67.384 54.2328 67.7121C54.6641 68.0402 55.2828 68.3262 56.0891 68.5699C56.9047 68.8043 57.8562 68.9402 58.9437 68.9777V70.0746C58.9437 70.3371 59.0047 70.5293 59.1266 70.6512ZM57.9312 55.098C58.1187 54.8449 58.4562 54.6574 58.9437 54.5355V57.5449C58.5219 57.3012 58.1984 57.048 57.9734 56.7855C57.7578 56.523 57.65 56.2137 57.65 55.8574C57.65 55.5949 57.7437 55.3418 57.9312 55.098ZM61.1516 64.8574C60.9547 65.1105 60.6922 65.3027 60.3641 65.434V62.2699C61.0859 62.6824 61.4469 63.2262 61.4469 63.9012C61.4469 64.2855 61.3484 64.6043 61.1516 64.8574ZM45.6 93.5996C45.6 91.3905 47.3909 89.5996 49.6 89.5996H97.6C99.8091 89.5996 101.6 91.3905 101.6 93.5996C101.6 95.8087 99.8091 97.5996 97.6 97.5996H49.6C47.3909 97.5996 45.6 95.8087 45.6 93.5996ZM49.6 92.7996C49.1582 92.7996 48.8 93.1578 48.8 93.5996C48.8 94.0414 49.1582 94.3996 49.6 94.3996H97.6C98.0418 94.3996 98.4 94.0414 98.4 93.5996C98.4 93.1578 98.0418 92.7996 97.6 92.7996H49.6ZM95.2 47.9996C95.2 37.3957 103.796 28.7996 114.4 28.7996C125.004 28.7996 133.6 37.3957 133.6 47.9996C133.6 58.6035 125.004 67.1996 114.4 67.1996C103.796 67.1996 95.2 58.6035 95.2 47.9996ZM110.4 37.5996C110.4 35.3905 112.191 33.5996 114.4 33.5996C116.609 33.5996 118.4 35.3905 118.4 37.5996V47.1996C118.4 49.4087 116.609 51.1996 114.4 51.1996C112.191 51.1996 110.4 49.4087 110.4 47.1996V37.5996ZM114.4 36.7996C113.958 36.7996 113.6 37.1578 113.6 37.5996V47.1996C113.6 47.6414 113.958 47.9996 114.4 47.9996C114.842 47.9996 115.2 47.6414 115.2 47.1996V37.5996C115.2 37.1578 114.842 36.7996 114.4 36.7996ZM114.4 62.3996C112.191 62.3996 110.4 60.6087 110.4 58.3996C110.4 56.1905 112.191 54.3996 114.4 54.3996C116.609 54.3996 118.4 56.1905 118.4 58.3996C118.4 60.6087 116.609 62.3996 114.4 62.3996ZM113.6 58.3996C113.6 58.8414 113.958 59.1996 114.4 59.1996C114.842 59.1996 115.2 58.8414 115.2 58.3996C115.2 57.9578 114.842 57.5996 114.4 57.5996C113.958 57.5996 113.6 57.9578 113.6 58.3996Z"
                            fill="#7C7B91"
                          />{" "}
                        </svg>
                        <div className="mt-6">
                          <h1 className="text-center text-[20px] font-semibold text-(--grey1)">
                            No Lives Listed Yet
                          </h1>
                          <p className="text-center text-(--grey18) text-[14px] font-normal">
                            Once you upload a live session then it will appear
                            here
                          </p>
                        </div>
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Edit User Modal */}
      <Dialog open={editDialogOpen} onOpenChange={(open) => {
        setEditDialogOpen(open);
        if (!open) setEditingRow(null);
      }}>
        <DialogContent className="max-w-lg border-[#27272a] bg-[#18181b] text-white">
          <DialogHeader>
            <DialogTitle className="text-white">Edit User</DialogTitle>
            <DialogDescription className="text-[#a1a1aa]">
              Update the user details below and click save.
            </DialogDescription>
          </DialogHeader>

          {editingRow && (
            <div className="grid gap-4 py-2">
              {/* Title */}
              <div className="grid gap-2">
                <label className="text-sm font-medium text-[#a1a1aa]">Name / Title</label>
                <Input
                  value={editingRow.title}
                  onChange={(e) => setEditingRow({ ...editingRow, title: e.target.value })}
                  className="border-[#27272a] bg-[#27272a] text-white placeholder:text-[#71717a]"
                />
              </div>

              {/* Brand Name */}
              <div className="grid gap-2">
                <label className="text-sm font-medium text-[#a1a1aa]">Brand Name</label>
                <Input
                  value={editingRow.brandName}
                  onChange={(e) => setEditingRow({ ...editingRow, brandName: e.target.value })}
                  className="border-[#27272a] bg-[#27272a] text-white placeholder:text-[#71717a]"
                />
              </div>

              {/* Date & Time */}
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <label className="text-sm font-medium text-[#a1a1aa]">Date</label>
                  <Input
                    value={editingRow.date}
                    onChange={(e) => setEditingRow({ ...editingRow, date: e.target.value })}
                    className="border-[#27272a] bg-[#27272a] text-white placeholder:text-[#71717a]"
                    placeholder="MM/DD/YY"
                  />
                </div>
                <div className="grid gap-2">
                  <label className="text-sm font-medium text-[#a1a1aa]">Time</label>
                  <Input
                    value={editingRow.time}
                    onChange={(e) => setEditingRow({ ...editingRow, time: e.target.value })}
                    className="border-[#27272a] bg-[#27272a] text-white placeholder:text-[#71717a]"
                    placeholder="12:00 PM"
                  />
                </div>
              </div>

              {/* Category */}
              <div className="grid gap-2">
                <label className="text-sm font-medium text-[#a1a1aa]">Category</label>
                <Select
                  value={editingRow.category}
                  onValueChange={(value) => setEditingRow({ ...editingRow, category: value })}
                >
                  <SelectTrigger className="w-full border-[#27272a] bg-[#27272a] text-white">
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent className="border-[#27272a] bg-[#18181b] text-white">
                    {uniqueCategories.map((cat) => (
                      <SelectItem
                        key={cat}
                        value={cat}
                        className="cursor-pointer focus:bg-[#27272a] focus:text-white"
                      >
                        {cat}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Placement */}
              <div className="grid gap-2">
                <label className="text-sm font-medium text-[#a1a1aa]">Placement</label>
                <Input
                  value={editingRow.placement}
                  onChange={(e) => setEditingRow({ ...editingRow, placement: e.target.value })}
                  className="border-[#27272a] bg-[#27272a] text-white placeholder:text-[#71717a]"
                  placeholder="e.g. live, Classroom"
                />
              </div>
            </div>
          )}

          <DialogFooter className="grid grid-cols-2 gap-3">
            <Button
              variant="outline"
              onClick={() => { setEditDialogOpen(false); setEditingRow(null); }}
              className="border-[#27272a] bg-transparent text-white hover:bg-[#27272a] hover:text-white"
            >
              Cancel
            </Button>
            <Button
              onClick={handleSaveEdit}
              className="bg-[#38bdf8] text-black hover:bg-[#38bdf8]/90"
            >
              Save Changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
