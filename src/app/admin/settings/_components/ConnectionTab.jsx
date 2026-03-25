import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { ArrowUpDown, Ellipsis, Plus, Search } from "lucide-react";

export default function ConnectionTab({ initialData }) {
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
                <Input className="h-10 pl-8.5 dark:rounded-[4px] rounded-[4px]" placeholder="Search by source" />
              </div>
              <Button className="h-10 flex items-center dark:px-5 px-5 dark:rounded-[4px] rounded-[4px]"> <Plus size={16} className="text-white" /> Add</Button>
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

                      <td className=" border-b border-l border-(--dark2) px-4 py-3">
                        <div className="flex items-center gap-3">
                          <div className="rounded-full uppercase flex items-center justify-center text-[12px] size-8 font-medium bg-(--dark2) text-(--grey15)">
                            {row.user[0]}
                            {row.user[1]}
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
                          {row.subscription ? "Paid Account" : "Free Account"}
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
  );
}
