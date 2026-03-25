import React from "react";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

export default function NotificationTab() {
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
            Notification Setting
          </h1>
          <Separator className="shrink border-2 border-(--grey5)" />
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
        {settings.map((item) => (
          <div key={item.id} className="flex items-center justify-between">
            {/* Text Section */}
            <div className="flex flex-col space-y-0.5">
              <label
                htmlFor={item.id}
                className="text-[16px] font-medium text-(--grey1)"
              >
                {item.title}
              </label>
              <p className="text-[12px] font-normal text-(--grey8)">{item.description}</p>
            </div>

            {/* Switch Section */}
            <Switch
              id={item.id}
              className="data-[state=checked]:bg-(--blue1) data-[state=unchecked]:bg-[#27272a]"
            />
          </div>
        ))}
      </div>
     </div>
    </>
  );
}
