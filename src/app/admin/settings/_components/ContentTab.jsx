import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import {
  ArrowUpDown,
  ChevronDown,
  Filter,
  Heart,
  MessageCircle,
  Plus,
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
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function ContentTab({ initialData }) {
  const [selectedRows, setSelectedRows] = useState([]);

  const allSelected =
    initialData.length > 0 && selectedRows.length === initialData.length;

  const isSelected = (id) => selectedRows.includes(id);

  const [isOpen, setIsOpen] = useState(false);

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

  // filter
  const [filters, setFilters] = useState({
    active: false,
    pending: false,
    completed: false,
  });

  const handleFilterChange = (key) => {
    setFilters((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const [selectedValue, setSelectedValue] = useState("heart");

  return (
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
                  className="h-10 pl-8.5 dark:rounded-[4px] rounded-[4px]"
                  placeholder="Search by source"
                />
              </div>
              <Button
                onClick={() => setIsOpen(true)}
                className="h-10 flex items-center dark:px-5 px-5 dark:rounded-[4px] rounded-[4px]"
              >
                {" "}
                <Plus size={16} className="text-white" /> Add
              </Button>
            </div>
            <Dialog open={isOpen} onOpenChange={setIsOpen}>
              <DialogContent
                className="
                                          bg-(--dark1) border border-(--dark3) text-white
                                          max-w-137.5 p-0 rounded-[16px]
                                          max-h-[80vh] outline-none
                                          flex flex-col overflow-hidden
                                        "
              >
                {/* HEADER (fixed) */}
                <DialogHeader className="px-5 py-4 border-b border-white/5 bg-(--dark1)">
                  <DialogTitle className="text-[20px] font-semibold text-(--grey1)">
                    Content Category
                  </DialogTitle>
                  <p className="text-(--grey1) text-[16px] font-normal">
                    Create a category to sort your content
                  </p>
                </DialogHeader>

                <div className="px-4">
                  <div className="grid grid-cols-[2fr_1fr] gap-3">
                    <div>
                      <label
                        htmlFor=""
                        className="text-(--grey1) text-[14px] font-medium"
                      >
                        Name
                      </label>
                      <Input className="block h-11 w-full mt-1 dark:rounded-[8px]" />
                    </div>
                    <div>
                      <label
                        htmlFor=""
                        className="text-(--grey1) text-[14px] font-medium"
                      >
                        Icon
                      </label>
                      <Select
                        value={selectedValue}
                        onValueChange={setSelectedValue}
                      >
                        <SelectTrigger className="w-full bg-[#1c1c21] border-[#27272a] text-[#a1a1aa] hover:bg-[#27272a] cursor-pointer dark:rounded-[8px] dark:h-11 mt-1">
                          <div className="flex items-center gap-3">
                            {selectedValue === "heart" ? (
                              <Heart />
                            ) : (
                               <Heart />
                            )}
                            <SelectValue />
                          </div>
                        </SelectTrigger>

                        <SelectContent
                          position="popper"
                          className="z-[999] bg-[#1c1c21] border-[#27272a] text-white"
                        >
                          <SelectItem
                            value="heart"
                            className="cursor-pointer focus:bg-[#27272a]"
                          >
                            Heart
                          </SelectItem>
                          <SelectItem
                            value="health"
                            className="cursor-pointer focus:bg-[#27272a]"
                          >
                            Health Check
                          </SelectItem>
                          <SelectItem
                            value="favorites"
                            className="cursor-pointer focus:bg-[#27272a]"
                          >
                            Favorites
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>
                <DialogFooter className="flex p-3">
                  <DialogClose asChild>
                    <Button variant="outline" className="w-[50%] h-11">
                      Cancel
                    </Button>
                  </DialogClose>
                  <Button type="submit" className="w-[50%] h-11 ">
                    Create
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
          <div className="overflow-x-auto mt-5">
            <table className="w-full min-w-190 border-separate border-spacing-0 text-sm text-white/80">
              <thead>
                <tr className="bg-(--dark2) rounded-[12px] overflow-hidden">
                  <th className="w-13 border-b border-white/10 px-4 py-3 text-left">
                    <Checkbox
                      checked={allSelected}
                      onCheckedChange={toggleAll}
                      className="h-4.5 w-4.5 rounded-[2px] border-gray-500 data-[state=checked]:border-[#38bdf8] data-[state=checked]:bg-[#38bdf8] data-[state=checked]:text-black data-[state=indeterminate]:border-[#38bdf8] data-[state=indeterminate]:bg-[#38bdf8] data-[state=indeterminate]:text-black"
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
                          className="h-4.5 w-4.5 rounded-[2px] border-gray-500 data-[state=checked]:border-[#38bdf8] data-[state=checked]:bg-[#38bdf8] data-[state=checked]:text-black data-[state=indeterminate]:border-[#38bdf8] data-[state=indeterminate]:bg-[#38bdf8] data-[state=indeterminate]:text-black"
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
            <h1 className="text-(--grey1) text-[20px] font-bold">Newsfeed</h1>
            <div className="flex items-center gap-3">
              <DropdownMenu>
                {/* Trigger Button */}
                <DropdownMenuTrigger asChild>
                  <Button className="h-10 flex items-center gap-2 px-4 py-2 dark:bg-(--dark2) dark:hover:bg-(--dark3) text-(--grey1) border-none rounded-[4px] dark:rounded-[4px]">
                    <Filter className="w-4 h-4" />
                    <span>Filters</span>
                    <ChevronDown className="w-4 h-4 opacity-50" />
                  </Button>
                </DropdownMenuTrigger>

                {/* Dropdown Content */}
                <DropdownMenuContent
                  align="start"
                  className="w-56 bg-[#18181b] text-white border-[#27272a]"
                >
                  <DropdownMenuLabel>Status Filter</DropdownMenuLabel>
                  <DropdownMenuSeparator className="bg-[#27272a]" />

                  <DropdownMenuCheckboxItem
                    checked={filters.active}
                    onCheckedChange={() => handleFilterChange("active")}
                    className="focus:bg-[#27272a] focus:text-white cursor-pointer"
                  >
                    Active
                  </DropdownMenuCheckboxItem>

                  <DropdownMenuCheckboxItem
                    checked={filters.pending}
                    onCheckedChange={() => handleFilterChange("pending")}
                    className="focus:bg-[#27272a] focus:text-white cursor-pointer"
                  >
                    Pending
                  </DropdownMenuCheckboxItem>

                  <DropdownMenuCheckboxItem
                    checked={filters.completed}
                    onCheckedChange={() => handleFilterChange("completed")}
                    className="focus:bg-[#27272a] focus:text-white cursor-pointer"
                  >
                    Completed
                  </DropdownMenuCheckboxItem>
                </DropdownMenuContent>
              </DropdownMenu>
              <div className="relative">
                <Search
                  size={16}
                  className="absolute left-0 text-(--grey1) top-0 translate-x-2 translate-y-3"
                />
                <Input
                  className="h-10 pl-8.5 dark:rounded-[4px] rounded-[4px]"
                  placeholder="Search by source"
                />
              </div>
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
                      className="h-4.5 w-4.5 rounded-[2px] border-gray-500 data-[state=checked]:border-[#38bdf8] data-[state=checked]:bg-[#38bdf8] data-[state=checked]:text-black data-[state=indeterminate]:border-[#38bdf8] data-[state=indeterminate]:bg-[#38bdf8] data-[state=indeterminate]:text-black"
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
                      <span>Post Type</span>
                      <ArrowUpDown className="h-3.5 w-3.5 text-white/40" />
                    </div>
                  </th>
                  <th className="min-w-25  border-b border-(--dark2) px-4 py-3 text-(--grey1) text-[14px] font-bold">
                    <div className="flex items-center gap-2">
                      <span>Activity</span>
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
                          className="h-4.5 w-4.5 rounded-[2px] border-gray-500 data-[state=checked]:border-[#38bdf8] data-[state=checked]:bg-[#38bdf8] data-[state=checked]:text-black data-[state=indeterminate]:border-[#38bdf8] data-[state=indeterminate]:bg-[#38bdf8] data-[state=indeterminate]:text-black"
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
                        <div className="flex items-center justify-between">
                          <div className="flex  gap-3">
                            <div className="size-[60px] rounded-[4px] bg-cover bg-center bg-[url(/images/resource/liveChat1.png)]"></div>
                            <span className="text-[13px] font-medium text-(--grey13)">
                              {row.name}
                            </span>
                          </div>
                          <SquareArrowOutUpRight
                            size={20}
                            className="text-(--grey15)"
                          />
                        </div>
                      </td>

                      <td className="border-b border-l border-(--dark2) px-4 py-3">
                        <span className="text-[13px] font-medium text-(--grey13)">
                          {row.postType}
                        </span>
                      </td>

                      <td className="border-b border-l border-(--dark2) px-4 py-3">
                        <div className="flex items-center justify-between gap-4">
                          <div className="flex items-center gap-15">
                            <button
                              type="button"
                              className="group cursor-pointer inline-flex items-center gap-2 text-white/35 transition hover:text-white/70"
                            >
                              <Heart
                                size={18}
                                className="text-(--grey2) transition group-hover:scale-105"
                              />
                            </button>
                            <button
                              type="button"
                              className="group cursor-pointer inline-flex items-center gap-2 text-white/35 transition hover:text-white/70"
                            >
                              <MessageCircle
                                size={18}
                                className="text-(--grey2) transition group-hover:scale-105"
                              />
                            </button>
                          </div>

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
  );
}
