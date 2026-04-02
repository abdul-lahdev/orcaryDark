"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Upload, X, ImageIcon, Video } from "lucide-react";

export default function UploadMediaDialog() {
  const [open, setOpen] = useState(false);
  const [caption, setCaption] = useState("");
  const [files, setFiles] = useState([]);
  const fileInputRef = useRef(null);

  const handlePickFiles = () => {
    fileInputRef.current?.click();
  };

  const handleFilesChange = (e) => {
    const selectedFiles = Array.from(e.target.files || []);

    if (!selectedFiles.length) return;

    const mappedFiles = selectedFiles.map((file) => ({
      id: `${file.name}-${file.size}-${file.lastModified}-${Math.random()}`,
      file,
      url: URL.createObjectURL(file),
      type: file.type.startsWith("video") ? "video" : "image",
      extension: file.name.split(".").pop()?.toLowerCase() || "",
    }));

    setFiles((prev) => [...prev, ...mappedFiles]);

    // same file dobara select ho sake
    e.target.value = "";
  };

  const removeFile = (id) => {
    setFiles((prev) => {
      const target = prev.find((item) => item.id === id);
      if (target?.url) URL.revokeObjectURL(target.url);
      return prev.filter((item) => item.id !== id);
    });
  };

  const resetDialog = () => {
    files.forEach((item) => {
      if (item.url) URL.revokeObjectURL(item.url);
    });
    setFiles([]);
    setCaption("");
  };

  useEffect(() => {
    if (!open) {
      resetDialog();
    }

    return () => {
      files.forEach((item) => {
        if (item.url) URL.revokeObjectURL(item.url);
      });
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <button
          type="button"
          className="text-(--grey1) group-hover:text-white flex items-center gap-3 transition-colors cursor-pointer"
        >
          <Upload
            size={24}
            className="text-(--grey1) group-hover:text-white transition-colors"
          />
          Upload Media
        </button>
      </DialogTrigger>

      <DialogContent
        className="
          bg-(--dark1) border border-(--dark3) text-white
          max-w-[60%] p-0 rounded-[16px]
          max-h-[85vh] outline-none
          flex flex-col overflow-hidden
        "
      >
        <DialogHeader className="px-5 py-4 border-b border-white/5 bg-(--dark1)">
          <DialogTitle className="text-[20px] font-semibold text-(--grey1)">
            Upload Resource
          </DialogTitle>
          <DialogDescription className="sr-only">
            Upload images or videos and preview them in carousel.
          </DialogDescription>
        </DialogHeader>

        <div className="flex-1 overflow-y-auto">
          <div className="p-5">
            {/* user info */}
            <div className="flex items-center gap-3">
              <div className="size-10 rounded-full bg-[url(/images/classRoom/avator.png)] bg-cover bg-center"></div>
              <div>
                <h1 className="text-(--grey1) text-[16px] font-bold">
                  Tom Hardy
                </h1>
                <p className="text-(--grey14) text-[14px] font-normal">You</p>
              </div>
            </div>

            {/* upload area */}
            <div className="mt-5">
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*,video/*"
                multiple
                className="hidden"
                onChange={handleFilesChange}
              />

              {files.length === 0 ? (
                <button
                  type="button"
                  onClick={handlePickFiles}
                  className="
                    w-full min-h-[230px] rounded-[18px]
                    border border-dashed border-white/10
                    bg-white/[0.02] hover:bg-white/[0.04]
                    transition-colors
                    flex flex-col items-center justify-center gap-3
                  "
                >
                  <div className="size-14 rounded-full bg-white/5 flex items-center justify-center">
                    <Upload className="size-6 text-(--grey1)" />
                  </div>
                  <div className="text-center">
                    <h3 className="text-(--grey1) text-[16px] font-semibold">
                      Upload images or videos
                    </h3>
                    <p className="text-(--grey14) text-[14px] mt-1">
                      Click to select media from your device
                    </p>
                  </div>
                </button>
              ) : (
                <div className="rounded-[18px] border border-white/5 bg-white/[0.02] p-3">
                  <Carousel
                    opts={{
                      align: "start",
                      dragFree: true,
                    }}
                    className="w-full"
                  >
                    <CarouselContent className="-ml-3">
                      {files.map((item) => (
                        <CarouselItem
                          key={item.id}
                          className="pl-3 basis-[180px] md:basis-[190px] lg:basis-[205px]"
                        >
                          <div className="relative h-[150px] overflow-hidden rounded-[14px] border border-white/5 bg-black/20">
                            <button
                              type="button"
                              onClick={() => removeFile(item.id)}
                              className="
                                absolute right-2 top-2 z-20
                                size-7 rounded-full bg-white text-black
                                flex items-center justify-center
                                hover:scale-105 transition-transform
                              "
                            >
                              <X className="size-4" />
                            </button>

                            {item.type === "image" ? (
                              <Image
                                src={item.url}
                                alt={item.file.name}
                                fill
                                className="object-cover"
                              />
                            ) : (
                              <video
                                src={item.url}
                                className="h-full w-full object-cover"
                                controls={false}
                                muted
                                playsInline
                              />
                            )}

                            <div className="absolute inset-x-0 bottom-0 z-10 flex items-center justify-between p-2">
                              <span className="rounded-[6px] bg-white px-2 py-1 text-[11px] font-medium text-black">
                                .{item.extension || (item.type === "video" ? "mp4" : "jpg")}
                              </span>

                              <span className="rounded-[6px] bg-black/50 px-2 py-1 text-[11px] text-white backdrop-blur-sm">
                                {item.type === "video" ? (
                                  <span className="flex items-center gap-1">
                                    <Video className="size-3.5" />
                                    video
                                  </span>
                                ) : (
                                  <span className="flex items-center gap-1">
                                    <ImageIcon className="size-3.5" />
                                    image
                                  </span>
                                )}
                              </span>
                            </div>
                          </div>
                        </CarouselItem>
                      ))}
                    </CarouselContent>

                    {files.length > 4 && (
                      <>
                        <CarouselPrevious className="left-2 border-white/10 bg-black/40 text-white hover:bg-black/60" />
                        <CarouselNext className="right-2 border-white/10 bg-black/40 text-white hover:bg-black/60" />
                      </>
                    )}
                  </Carousel>

                  <div className="mt-3 flex justify-start">
                    <Button
                      type="button"
                      onClick={handlePickFiles}
                      variant="outline"
                      className="border-white/10 bg-transparent text-(--grey1) hover:bg-white/5 hover:text-white"
                    >
                      <Upload className="mr-2 size-4" />
                      Add More
                    </Button>
                  </div>
                </div>
              )}
            </div>

            {/* caption */}
            <div className="mt-5">
              <Textarea
                value={caption}
                onChange={(e) => setCaption(e.target.value)}
                placeholder="demo text...."
                className="
                  min-h-[100px] resize-none
                  border border-white/5 bg-transparent
                  text-white placeholder:text-(--grey14)
                  focus-visible:ring-0 focus-visible:ring-offset-0
                "
              />
            </div>
          </div>
        </div>

        {/* footer */}
        <div className="border-t border-white/5 px-5 py-4 flex items-center justify-end gap-3">
          <button
            type="button"
            onClick={handlePickFiles}
            className="text-(--grey1) hover:text-white flex items-center gap-2 transition-colors"
          >
            <Upload className="size-5" />
            Upload Media
          </button>

          <Button
            type="button"
            className="bg-[#2196F3] hover:bg-[#1a86dc] text-white rounded-[10px] px-6"
          >
            Post
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}