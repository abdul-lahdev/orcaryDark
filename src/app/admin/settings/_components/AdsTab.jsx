import { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  ArrowUpDown,
  Check,
  ChevronDown,
  Filter,
  Plus,
  Search,
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
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandItem,
} from "@/components/ui/command";

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

const categoryOptions = [
  { label: "Radiology", value: "Radiology" },
  { label: "Dermatology", value: "Dermatology" },
  { label: "Pediatrics", value: "Pediatrics" },
  { label: "Oncology", value: "Oncology" },
  { label: "Neurology", value: "Neurology" },
];

const placementOptions = [
  { label: "Live, Classroom", value: "liveClassroom" },
  { label: "Resource, Feed", value: "resourceFeed" },
  { label: "Forum, live", value: "forumLive" },
  { label: "Classroom, Resource", value: "classroomResource" },
  { label: "Feed, forum", value: "feedForum" },
];
export default function AdsTab() {
  const [tableData, setTableData] = useState(initialAdsData);
  const [selectedRows, setSelectedRows] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filters, setFilters] = useState({
    categories: [],
    placements: [],
  });

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

  const [isOpen, setIsOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState("heart");
  const [selectedTags, setSelectedTags] = useState(["heart"]);
  const [placementValue, setPlacementValue] = useState("heart");
  const [openTags, setOpenTags] = useState(false);

  const toggleTag = (value) => {
    setSelectedTags((prev) =>
      prev.includes(value)
        ? prev.filter((item) => item !== value)
        : [...prev, value]
    );
  };

  const selectedTagLabels = categoryOptions
    .filter((item) => selectedTags.includes(item.value))
    .map((item) => item.label);

  return (
    <>
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
              Upload Ad
            </DialogTitle>
          </DialogHeader>

          <div className="px-4 space-y-5">
            <div>
              <label
                htmlFor="title"
                className="text-(--grey1) text-[14px] font-medium"
              >
                Title
              </label>
              <Input
                id="title"
                className="block h-11 w-full mt-1 dark:rounded-[8px]"
              />
            </div>

            <div>
              <label
                htmlFor="brand-name"
                className="text-(--grey1) text-[14px] font-medium"
              >
                Brand Name
              </label>
              <Input
                id="brand-name"
                className="block h-11 w-full mt-1 dark:rounded-[8px]"
              />
            </div>

            <div>
              <label
                htmlFor=""
                className="text-(--grey1) text-[14px] font-medium"
              >
                Category Tag
              </label>

              <Popover open={openTags} onOpenChange={setOpenTags}>
                <PopoverTrigger asChild>
                  <button
                    type="button"
                    className="w-full bg-[#1c1c21] border border-[#27272a] text-[#a1a1aa] hover:bg-[#27272a] cursor-pointer dark:rounded-[8px] h-11 mt-1 px-3 flex items-center justify-between"
                  >
                    <div className="flex items-center gap-2 overflow-hidden">
                      {selectedTagLabels.length > 0 ? (
                        <div className="flex items-center gap-2 flex-wrap overflow-hidden">
                          {selectedTagLabels.map((label) => (
                            <span
                              key={label}
                              className="inline-flex items-center rounded-md border border-[#27272a] bg-[#27272a] px-2 py-0.5 text-[12px] text-white"
                            >
                              {label}
                            </span>
                          ))}
                        </div>
                      ) : (
                        <span className="text-[#a1a1aa]">
                          Select category tags
                        </span>
                      )}
                    </div>

                    <ChevronDown className="h-4 w-4 shrink-0 text-[#a1a1aa]" />
                  </button>
                </PopoverTrigger>

                <PopoverContent
                  align="start"
                  className="w-[var(--radix-popover-trigger-width)] p-0 z-[999] bg-[#1c1c21] border-[#27272a] text-white"
                >
                  <Command className="bg-[#1c1c21]">
                    <CommandEmpty className="py-3 text-sm text-[#a1a1aa]">
                      No tag found.
                    </CommandEmpty>

                    <CommandGroup>
                      {categoryOptions.map((option) => {
                        const isSelected = selectedTags.includes(option.value);

                        return (
                          <CommandItem
                            key={option.value}
                            onSelect={() => toggleTag(option.value)}
                            className="cursor-pointer focus:bg-[#27272a] text-white flex items-center justify-between"
                          >
                            <div className="flex items-center gap-3">
                              <Checkbox
                                checked={isSelected}
                                className="border-[#3f3f46] data-[state=checked]:bg-white data-[state=checked]:text-black"
                              />
                              <span>{option.label}</span>
                            </div>

                            {isSelected && <Check className="h-4 w-4" />}
                          </CommandItem>
                        );
                      })}
                    </CommandGroup>
                  </Command>
                </PopoverContent>
              </Popover>
            </div>

            <div>
              <label
                htmlFor=""
                className="text-(--grey1) text-[14px] font-medium"
              >
                Placement
              </label>

              <Select value={placementValue} onValueChange={setPlacementValue}>
                <SelectTrigger className="w-full bg-[#1c1c21] border-[#27272a] text-[#a1a1aa] hover:bg-[#27272a] cursor-pointer dark:rounded-[8px] dark:h-11 mt-1">
                  <div className="flex items-center gap-3">
                    <SelectValue placeholder="Select placement" />
                  </div>
                </SelectTrigger>

                <SelectContent
                  position="popper"
                  className="z-[999] bg-[#1c1c21] border-[#27272a] text-white"
                >
                  {placementOptions.map((option) => (
                    <SelectItem
                      key={option.value}
                      value={option.value}
                      className="cursor-pointer focus:bg-[#27272a]"
                    >
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
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
      <div>
        <div className="mt-4 w-full rounded-xl border-2 border-(--dark2) bg-(--dark4) p-4">
          <div className="flex items-center justify-between">
            <h1 className="text-(--grey1) text-[20px] font-bold">Ads</h1>

            <div className="flex items-center gap-3">
              {/* <DropdownMenu>
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
              </DropdownMenu> */}

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
              <Button
                onClick={() => setIsOpen(true)}
                className="h-10 flex items-center dark:px-5 px-5 dark:rounded-[4px] rounded-[4px]"
              >
                {" "}
                <Plus size={16} className="text-white" /> Add
              </Button>
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

                  <th className="min-w-35 border-b border-(--dark2) px-4 py-3 text-left text-(--grey1) text-[14px] font-bold">
                    <div className="flex items-center gap-2">
                      <span>Added on</span>
                      <ArrowUpDown className="h-3.5 w-3.5 text-white/40" />
                    </div>
                  </th>

                  <th className="min-w-65 border-b border-(--dark2) px-4 py-3 text-left text-(--grey1) text-[14px] font-bold">
                    <div className="flex items-center gap-2">
                      <span>Name</span>
                      <ArrowUpDown className="h-3.5 w-3.5 text-white/40" />
                    </div>
                  </th>

                  <th className="min-w-35 border-b border-(--dark2) px-4 py-3 text-left text-(--grey1) text-[14px] font-bold">
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
                  </th>

                  <th className="min-w-40 border-b border-(--dark2) px-4 py-3 text-left text-(--grey1) text-[14px] font-bold">
                    <div className="flex items-center gap-2">
                      <span>Placement</span>
                      <ArrowUpDown className="h-3.5 w-3.5 text-white/40" />
                    </div>
                  </th>

                  <th className="min-w-35 border-b border-(--dark2) px-4 py-3 text-left text-(--grey1) text-[14px] font-bold">
                    <div className="flex items-center gap-2">
                      <span>Category</span>
                      <ArrowUpDown className="h-3.5 w-3.5 text-white/40" />
                    </div>
                  </th>

                  <th className="min-w-22 border-b border-(--dark2) px-4 py-3 text-left text-(--grey1) text-[14px] font-bold">
                    <div className="flex items-center gap-2">
                      <span>Activity</span>
                      <ArrowUpDown className="h-3.5 w-3.5 text-white/40" />
                    </div>
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
                        <div className="flex items-center gap-3">
                          {row.image ? (
                            <div
                              className="size-[34px] shrink-0 rounded-[4px] bg-cover bg-center"
                              style={{ backgroundImage: `url(${row.image})` }}
                            />
                          ) : (
                            <div className="flex size-[34px] shrink-0 items-center justify-center rounded-[4px] bg-(--dark2) text-[11px] font-medium text-(--grey13)">
                              n/a
                            </div>
                          )}

                          <div className="flex flex-col">
                            <span className="text-[13px] font-medium text-(--grey1)">
                              {row.title}
                            </span>
                          </div>
                        </div>
                      </td>

                      <td className="border-b border-(--dark2) px-4 py-3">
                        <span className="text-[13px] font-medium text-(--grey1)">
                          {row.brandName}
                        </span>
                      </td>

                      <td className="border-b border-(--dark2) px-4 py-3">
                        <span className="text-[13px] font-medium text-(--grey1)">
                          {row.clicks}
                        </span>
                      </td>

                      <td className="border-b border-(--dark2) px-4 py-3">
                        <span className="text-[13px] font-medium text-(--grey1)">
                          {row.placement}
                        </span>
                      </td>

                      <td className="border-b border-(--dark2) px-4 py-3">
                        <span className="text-[13px] font-medium text-(--grey1)">
                          {row.category}
                        </span>
                      </td>

                      <td className="border-b border-l border-(--dark2) px-4 py-3">
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
                    <td
                      colSpan={8}
                      className="border-b border-(--dark2) px-4 py-8 text-center text-(--grey13)"
                    >
                      No data found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}
