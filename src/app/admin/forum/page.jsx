'use client'
import { useState } from "react";
import AnimatedTabs from "./_components/AnimatedTabs";
import { ChannelsAccordion } from "./_components/ChannelsAccordion";

// export const metadata = {
//   title: "Forum",
// };

export default function Page() {
  const [notification, setNotification] = useState(false);
  
  return (
    <>
      <div className={`grid h-full ${!notification?'grid-cols-[1fr_280px]':'grid-cols-[1fr_80px]'} gap-4`}>
        <div className="px-8 py-6 overflow-x-hidden">
          <AnimatedTabs />
        </div>

        <div className="bg-(--dark4) border-l border-(--dark2) px-3 py-4">
         

          <ChannelsAccordion notification={notification} setNotification={setNotification} />
        </div>
      </div>
    </>
  );
}
