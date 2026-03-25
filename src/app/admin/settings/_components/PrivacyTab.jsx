import React from "react";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Checkbox } from "@/components/ui/checkbox";

export default function PrivacyTab() {
  const settings = [
    {
      id: "email",
      title: "Email Notifications",
      description: "Hints",
    },
    {
      id: "in-app",
      title: "In-App notifications",
      description: "Hints",
    },
    {
      id: "security",
      title: "Security Notifications",
      description: "Hints",
    },
  ];

  return (
    <>
      <div className="grid grid-cols-[60%_1fr] items-center gap-3">
        <div className="flex items-center gap-3">
          <h1 className="text-(--grey1) text-[18px] font-bold whitespace-nowrap">
            Post Privacy
          </h1>
          <Separator className="shrink border-2 border-(--grey5) rounded-[15px]" />
        </div>
        <div className="flex items-center justify-end gap-3">
          <Button variant="secondary" className="dark:rounded-[6px]">
            Cancel
          </Button>
          <Button className="dark:rounded-[6px] rounded-[6px]">Update</Button>
        </div>
      </div>
      <div className="grid grid-cols-[60%_1fr] items-center gap-3">
        <div className="w-full space-y-6 mt-5 ">
          <div className="flex items-start gap-5">
            <Checkbox className="h-5 w-5 mt-1 rounded-[6px] border-gray-500 dark:data-[state=checked]:border-[#38bdf8] dark:data-[state=checked]:bg-[#38bdf8] data-[state=checked]:text-white data-[state=indeterminate]:border-[#38bdf8] data-[state=indeterminate]:bg-[#38bdf8] data-[state=indeterminate]:text-black" />
            <div className="flex flex-col space-y-0.5">
              <label
                htmlFor=""
                className="text-[18px] font-medium text-(--grey1)"
              >
                Public
              </label>
              <p className="text-[14px] font-normal text-(--grey8)">
                Anyone on the platform can see your posts
              </p>
            </div>
          </div>
          <div className="flex items-start gap-5">
            <Checkbox className="h-5 w-5 mt-1 rounded-[6px] border-gray-500 dark:data-[state=checked]:border-[#38bdf8] dark:data-[state=checked]:bg-[#38bdf8] data-[state=checked]:text-white data-[state=indeterminate]:border-[#38bdf8] data-[state=indeterminate]:bg-[#38bdf8] data-[state=indeterminate]:text-black" />
            <div className="flex flex-col space-y-0.5">
              <label
                htmlFor=""
                className="text-[18px] font-medium text-(--grey1)"
              >
                Followers
              </label>
              <p className="text-[14px] font-normal text-(--grey8)">
                Anyone who follows you on the platform can see your posts
              </p>
            </div>
          </div>
          <div className="flex items-start gap-5">
            <Checkbox className="h-5 w-5 mt-1 rounded-[6px] border-gray-500 dark:data-[state=checked]:border-[#38bdf8] dark:data-[state=checked]:bg-[#38bdf8] data-[state=checked]:text-white data-[state=indeterminate]:border-[#38bdf8] data-[state=indeterminate]:bg-[#38bdf8] data-[state=indeterminate]:text-black" />
            <div className="flex flex-col space-y-0.5">
              <label
                htmlFor=""
                className="text-[18px] font-medium text-(--grey1)"
              >
                Private
              </label>
              <p className="text-[14px] font-normal text-(--grey8)">
                No one except you can see your posts
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-[60%_1fr] items-center gap-3 mt-10">
        <div className="flex items-center gap-3">
          <h1 className="text-(--grey1) text-[18px] font-bold whitespace-nowrap">
            Live Stream Privacy
          </h1>
          <Separator className="shrink border-2 border-(--grey5) rounded-[15px]" />
        </div>
      </div>
      <div className="grid grid-cols-[60%_1fr] items-center gap-3">
        <div className="w-full space-y-6 mt-5 ">
          <div className="flex items-start gap-5">
            <Checkbox className="h-5 w-5 mt-1 rounded-[6px] border-gray-500 dark:data-[state=checked]:border-[#38bdf8] dark:data-[state=checked]:bg-[#38bdf8] data-[state=checked]:text-white data-[state=indeterminate]:border-[#38bdf8] data-[state=indeterminate]:bg-[#38bdf8] data-[state=indeterminate]:text-black" />
            <div className="flex flex-col space-y-0.5">
              <label
                htmlFor=""
                className="text-[18px] font-medium text-(--grey1)"
              >
                Public
              </label>
              <p className="text-[14px] font-normal text-(--grey8)">
                Anyone on the platform can see your posts
              </p>
            </div>
          </div>
          <div className="flex items-start gap-5">
            <Checkbox className="h-5 w-5 mt-1 rounded-[6px] border-gray-500 dark:data-[state=checked]:border-[#38bdf8] dark:data-[state=checked]:bg-[#38bdf8] data-[state=checked]:text-white data-[state=indeterminate]:border-[#38bdf8] data-[state=indeterminate]:bg-[#38bdf8] data-[state=indeterminate]:text-black" />
            <div className="flex flex-col space-y-0.5">
              <label
                htmlFor=""
                className="text-[18px] font-medium text-(--grey1)"
              >
                Followers
              </label>
              <p className="text-[14px] font-normal text-(--grey8)">
                Anyone who follows you on the platform can see your posts
              </p>
            </div>
          </div>
          <div className="flex items-start gap-5">
            <Checkbox className="h-5 w-5 mt-1 rounded-[6px] border-gray-500 dark:data-[state=checked]:border-[#38bdf8] dark:data-[state=checked]:bg-[#38bdf8] data-[state=checked]:text-white data-[state=indeterminate]:border-[#38bdf8] data-[state=indeterminate]:bg-[#38bdf8] data-[state=indeterminate]:text-black" />
            <div className="flex flex-col space-y-0.5">
              <label
                htmlFor=""
                className="text-[18px] font-medium text-(--grey1)"
              >
                Private
              </label>
              <p className="text-[14px] font-normal text-(--grey8)">
                No one except you can see your posts
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-[60%_1fr] items-center gap-3 mt-10">
        <div className="flex items-center gap-3">
          <h1 className="text-(--grey1) text-[18px] font-bold whitespace-nowrap">
            Resource Privacy
          </h1>
          <Separator className="shrink border-2 border-(--grey5) rounded-[15px]" />
        </div>
      </div>
      <div className="grid grid-cols-[60%_1fr] items-center gap-3">
        <div className="w-full space-y-6 mt-5 ">
          <div className="flex items-start gap-5">
            <Checkbox className="h-5 w-5 mt-1 rounded-[6px] border-gray-500 dark:data-[state=checked]:border-[#38bdf8] dark:data-[state=checked]:bg-[#38bdf8] data-[state=checked]:text-white data-[state=indeterminate]:border-[#38bdf8] data-[state=indeterminate]:bg-[#38bdf8] data-[state=indeterminate]:text-black" />
            <div className="flex flex-col space-y-0.5">
              <label
                htmlFor=""
                className="text-[18px] font-medium text-(--grey1)"
              >
                Public
              </label>
              <p className="text-[14px] font-normal text-(--grey8)">
                Anyone on the platform can see your posts
              </p>
            </div>
          </div>
          <div className="flex items-start gap-5">
            <Checkbox className="h-5 w-5 mt-1 rounded-[6px] border-gray-500 dark:data-[state=checked]:border-[#38bdf8] dark:data-[state=checked]:bg-[#38bdf8] data-[state=checked]:text-white data-[state=indeterminate]:border-[#38bdf8] data-[state=indeterminate]:bg-[#38bdf8] data-[state=indeterminate]:text-black" />
            <div className="flex flex-col space-y-0.5">
              <label
                htmlFor=""
                className="text-[18px] font-medium text-(--grey1)"
              >
                Followers
              </label>
              <p className="text-[14px] font-normal text-(--grey8)">
                Anyone who follows you on the platform can see your posts
              </p>
            </div>
          </div>
          <div className="flex items-start gap-5">
            <Checkbox className="h-5 w-5 mt-1 rounded-[6px] border-gray-500 dark:data-[state=checked]:border-[#38bdf8] dark:data-[state=checked]:bg-[#38bdf8] data-[state=checked]:text-white data-[state=indeterminate]:border-[#38bdf8] data-[state=indeterminate]:bg-[#38bdf8] data-[state=indeterminate]:text-black" />
            <div className="flex flex-col space-y-0.5">
              <label
                htmlFor=""
                className="text-[18px] font-medium text-(--grey1)"
              >
                Private
              </label>
              <p className="text-[14px] font-normal text-(--grey8)">
                No one except you can see your posts
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
