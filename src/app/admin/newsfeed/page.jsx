import { ArrowRight, Play, Upload } from "lucide-react";
import { ChannelsAccordion } from "./_components/ChannelsAccordion";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import SocialMedia from "./_components/SocialMedia";
import QuickInfo from "./_components/QuickInfo";

export const metadata = {
  title: "NewsFeed",
};

export default function Page() {
  return (
    <>
      <div className="grid h-full grid-cols-[1fr_280px] gap-4">
        <div className="px-8 py-6 overflow-x-hidden">
          <div className="bg-(--dark5) rounded-[8px] p-4">
            <Textarea
              placeholder="Write your post here..."
              className="dark:bg-[#303036] border-none resize-none h-42.25 "
            />
            <div className="mt-5 px-10 flex justify-between items-center group cursor-pointer">
              <span className="text-(--grey9) group-hover:text-white flex items-center gap-3 transition-colors">
                <Upload
                  size={24}
                  className="text-(--grey9) group-hover:text-white transition-colors"
                />
                Upload Media
              </span>

              <Button className="h-10 px-5 dark:px-5">
                <Play /> Post
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-[1fr_362px] gap-4 mt-5">
            <div>
              <SocialMedia />
            </div>
            <div>
              <QuickInfo />
            </div>
          </div>
        </div>
        <div className="bg-(--dark4) border-l border-(--dark2) px-3 py-4">
          <div className="flex items-center gap-2">
            <ArrowRight size={24} className="text-(--grey1) cursor-pointer" />
            <h2 className="text-white text-[18px] font-normal">Channels</h2>
          </div>

          <ChannelsAccordion />
        </div>
      </div>
    </>
  );
}
