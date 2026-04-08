'use client'
import { useState } from "react";
import { ChannelsAccordion } from "./_components/ChannelsAccordion";
import TopBanner from "./_components/TopBanner";
import LiveCards from "./_components/LiveCards";
import MedicalCategory from "./_components/MedicalCategory";
import RecentFeed from "./_components/RecentFeed";

// export const metadata = {
//   title: "Home",
// };

export default function Page() {
  const [notification, setNotification] = useState(false);

  return (
    <>
      <div
        className="grid h-full gap-4"
        style={{
          gridTemplateColumns: notification ? '1fr 80px' : '1fr 280px',
          transition: 'grid-template-columns 0.3s ease',
        }}
      >
        <div className="px-8 py-6 overflow-x-hidden">
          <TopBanner />
          <div className="mt-6">
            <LiveCards />
          </div>
          <div className="mt-6">
            <MedicalCategory />
          </div>
          <div className="mt-6">
            <RecentFeed />
          </div>
        </div>

        <div className="bg-(--dark4) border-l border-(--dark2) px-3 py-4 overflow-hidden">
          <ChannelsAccordion notification={notification} setNotification={setNotification} />
        </div>
      </div>
    </>
  );
}
