import React, { useRef, useState } from "react";
import { Plus, Trash2, SquareArrowOutUpRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const createEducationItem = () => ({
  id: crypto.randomUUID(),
});

const UploadCard = ({
  title,
  image,
  onChangeImage,
  onRemoveImage,
  inputRef,
}) => {
  const handleOpenFile = () => {
    inputRef.current?.click();
  };

  return (
    <div className="flex items-start justify-between gap-4">
      <div className="flex items-start gap-5">
        <div className="size-25 shrink-0 overflow-hidden rounded-md bg-[#E7ECF4]">
          {image ? (
            <img
              src={image}
              alt={title}
              className="h-full w-full object-cover"
            />
          ) : null}
        </div>

        <div className="flex min-h-25 flex-col justify-between">
          <div>
            <h4 className="text-[14px] font-bold text-(--grey1)">{title}</h4>
            <p className="mt-1 text-[16px] font-normal text-(--grey1)">
              This picture will be appear publicly on the platform
            </p>
          </div>

          <div className="mt-2 flex items-center gap-3">
            <button
              type="button"
              onClick={onRemoveImage}
              className="text-[11px] font-medium text-[#FF5C5C] transition hover:opacity-80"
            >
              Remove
            </button>
            <button
              type="button"
              onClick={handleOpenFile}
              className="text-[11px] font-medium text-[#8B8D98] transition hover:text-white"
            >
              Update
            </button>
          </div>
        </div>
      </div>

      <Button
        type="button"
        variant="destructive"
        onClick={handleOpenFile}
        className="h-8.5 w-fit bg-transparent px-3 text-[16px] text-white "
      >
        View Profile
        <SquareArrowOutUpRight className="ml-2 h-3.5 w-3.5" />
      </Button>

      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        onChange={onChangeImage}
        className="hidden"
      />
    </div>
  );
};

const SectionTitle = ({ title }) => {
  return (
    <div className="my-6 flex items-center gap-3">
      <h3 className="whitespace-nowrap text-[18px] font-bold text-(--grey1)">
        {title}
      </h3>
      <div className="h-px flex-1 bg-[#3A3D46]" />
    </div>
  );
};

export default function ProfileTab() {
  const [profileImage, setProfileImage] = useState(null);
  const [coverImage, setCoverImage] = useState(null);
  const [educationCards, setEducationCards] = useState([createEducationItem()]);

  const profileInputRef = useRef(null);
  const coverInputRef = useRef(null);

  const handleFileChange = (setter) => (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const imageUrl = URL.createObjectURL(file);
    setter(imageUrl);

    e.target.value = "";
  };

  const handleRemoveImage = (setter, inputRef) => () => {
    setter(null);
    if (inputRef.current) {
      inputRef.current.value = "";
    }
  };

  const handleAddEducationCard = () => {
    setEducationCards((prev) => [...prev, createEducationItem()]);
  };

  const handleDeleteEducationCard = (id) => {
    setEducationCards((prev) => prev.filter((item) => item.id !== id));
  };

  return (
    <div className="grid grid-cols-[70%_1fr]">
      <div className="">
        {/* Upload Section */}
        <div className="space-y-5">
          <UploadCard
            title="Profile Picture"
            image={profileImage}
            inputRef={profileInputRef}
            onChangeImage={handleFileChange(setProfileImage)}
            onRemoveImage={handleRemoveImage(setProfileImage, profileInputRef)}
          />

          <UploadCard
            title="Cover Picture"
            image={coverImage}
            inputRef={coverInputRef}
            onChangeImage={handleFileChange(setCoverImage)}
            onRemoveImage={handleRemoveImage(setCoverImage, coverInputRef)}
          />
        </div>

        {/* Description */}
        <div className="mt-6">
          <label className="text-(--grey1) text-[14px] font-medium">
            Profile Description
          </label>
          <Textarea
            placeholder="Type here..."
            className="min-h-27.5 mt-1 resize-none rounded-[8px] dark:border-(--dark2) dark:bg-(--dark4) text-[12px] text-[#C8CBD3] placeholder:text-[#6B7280] "
          />
        </div>

        {/* General Info */}
        <SectionTitle title="General Information" />

        <div className="grid grid-cols-1 gap-4 md:grid-cols-1 lg:grid-cols-2">
          <div className="col-span-2 md:col-span-2 lg:col-span-1">
            <label
              htmlFor=""
              className="block text-(--grey1) text-[14px] font-medium"
            >
              Full Name
            </label>
            <Input
              defaultValue="Angelina Wills"
              className="h-10 mt-1 w-full border rounded-[8px] dark:border-(--dark3) dark:bg-(--dark4) text-sm placeholder:text-[#6B7280]"
            />
          </div>
          <div className="col-span-2 md:col-span-2 lg:col-span-1">
            <label
              htmlFor=""
              className="block text-(--grey1) text-[14px] font-medium"
            >
              User Name
            </label>
            <Input
              placeholder="@angelinawills"
              className="h-10 mt-1 w-full rounded-[8px] border dark:border-(--dark3) dark:bg-(--dark4) text-sm placeholder:text-[#6B7280]"
            />
          </div>
          <div className="col-span-2 md:col-span-2 lg:col-span-1">
            <label
              htmlFor=""
              className="block text-(--grey1) text-[14px] font-medium"
            >
              Date of Birth
            </label>
            <Input
              placeholder="datehere"
              className="h-10 mt-1 w-full rounded-[8px] border dark:border-(--dark3) dark:bg-(--dark4) text-sm placeholder:text-[#6B7280]"
            />
          </div>
          <div className="col-span-2 md:col-span-2 lg:col-span-1">
            <label
              htmlFor=""
              className="block text-(--grey1) text-[14px] font-medium"
            >
              Gender
            </label>
            <Select defaultValue="female">
              <SelectTrigger className="h-10 dark:h-10 mt-1 w-full rounded-[8px] border-1 dark:border-(--dark3) dark:bg-(--dark4) text-sm text-(--grey1) ">
                <SelectValue placeholder="Select Gender" />
              </SelectTrigger>
              <SelectContent className="border-[#2B2D36] bg-[#161821] text-white">
                <SelectItem value="male">Male</SelectItem>
                <SelectItem value="female">Female</SelectItem>
                <SelectItem value="other">Other</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="col-span-2 md:col-span-2 lg:col-span-1">
            <label
              htmlFor=""
              className="block text-(--grey1) text-[14px] font-medium"
            >
              Country
            </label>
            <Select defaultValue="female">
              <SelectTrigger className="h-10 dark:h-10 mt-1 w-full rounded-[8px] border-1 dark:border-(--dark3) dark:bg-(--dark4) text-sm text-(--grey1)">
                <SelectValue placeholder="Select Gender" />
              </SelectTrigger>
              <SelectContent className="border-[#2B2D36] bg-[#161821] text-white">
                <SelectItem value="pakistan">Pakistan</SelectItem>
                <SelectItem value="uae">UAE</SelectItem>
                <SelectItem value="saudi-arabia">Saudi Arabia</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="col-span-2 md:col-span-2 lg:col-span-1">
            <label
              htmlFor=""
              className="block text-(--grey1) text-[14px] font-medium"
            >
              City/Town
            </label>
            <Select defaultValue="female">
              <SelectTrigger className="h-10 dark:h-10 mt-1 w-full rounded-[8px] border-1 dark:border-(--dark3) dark:bg-(--dark4) text-sm text-(--grey1) ">
                <SelectValue placeholder="Select Gender" />
              </SelectTrigger>
              <SelectContent className="border-[#2B2D36] bg-[#161821] text-white">
                <SelectItem value="karachi">Karachi</SelectItem>
                <SelectItem value="lahore">Lahore</SelectItem>
                <SelectItem value="islamabad">Islamabad</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="col-span-2">
            <label
              htmlFor=""
              className="block text-(--grey1) text-[14px] font-medium"
            >
              Address
            </label>
            <Input
              placeholder="Block H, Nazimabad"
              className="h-10 mt-1 w-full border rounded-[8px] dark:border-(--dark3) dark:bg-(--dark4) text-sm placeholder:text-[#6B7280]"
            />
          </div>
          <div className="col-span-2 md:col-span-2 lg:col-span-1">
            <label
              htmlFor=""
              className="block text-(--grey1) text-[14px] font-medium"
            >
              Company
            </label>
            <Input
              placeholder="Aga Khan Hospital"
              className="h-10 mt-1 w-full rounded-[8px] border dark:border-(--dark3) dark:bg-(--dark4) text-sm placeholder:text-[#6B7280]"
            />
          </div>
          <div className="col-span-2 md:col-span-2 lg:col-span-1">
            <label
              htmlFor=""
              className="block text-(--grey1) text-[14px] font-medium"
            >
              Designation
            </label>
            <Input
              placeholder="Senior Doctor"
              className="h-10 mt-1 w-full rounded-[8px] border dark:border-(--dark3) dark:bg-(--dark4) text-sm placeholder:text-[#6B7280]"
            />
          </div>
        </div>

        {/* Contact Info */}
        <SectionTitle title="Contact Information" />

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <label
              htmlFor=""
              className="block text-(--grey1) text-[14px] font-medium"
            >
              Phone number
            </label>
            <div className="flex bg-[#2B2B314D] border border-[#2B2B31] rounded-[8px] mt-1">
              <Select defaultValue="us">
                <SelectTrigger className="h-10 dark:hover:bg-transparent dark:rounded-0 rounded-0 border-none dark:bg-transparent shadow-none text-(--grey1)">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="border-[#2B2D36] bg-[#161821] text-white">
                  <SelectItem value="us">US</SelectItem>
                  <SelectItem value="pk">PK</SelectItem>
                  <SelectItem value="uk">UK</SelectItem>
                </SelectContent>
              </Select>

              <Input
                placeholder="+1 (555) 000-0000"
                className="h-10 dark:hover:bg-transparent dark:rounded-0 rounded-0 border-none dark:bg-transparent shadow-none flex-1 focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-0 "
              />
            </div>
          </div>

          <div>
            <label
              htmlFor=""
              className="block text-(--grey1) text-[14px] font-medium"
            >
              Email Address
            </label>
            <Input
              type="email"
              placeholder="angelinawills@gmail.com"
              className="h-10 mt-1 w-full rounded-[8px] border dark:border-(--dark3) dark:bg-(--dark4) text-sm placeholder:text-[#6B7280]"
            />
          </div>

          <div>
            <label
              htmlFor=""
              className="block text-(--grey1) text-[14px] font-medium"
            >
              Secondary Phone Number
            </label>
            <div className="flex bg-[#2B2B314D] border border-[#2B2B31] rounded-[8px] mt-1">
              <Select defaultValue="us">
                <SelectTrigger className="h-10 dark:hover:bg-transparent dark:rounded-0 rounded-0 border-none dark:bg-transparent shadow-none text-(--grey1)">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="border-[#2B2D36] bg-[#161821] text-white">
                  <SelectItem value="us">US</SelectItem>
                  <SelectItem value="pk">PK</SelectItem>
                  <SelectItem value="uk">UK</SelectItem>
                </SelectContent>
              </Select>

              <Input
                placeholder="+1 (555) 000-0000"
                className="h-10 dark:hover:bg-transparent dark:rounded-0 rounded-0 border-none dark:bg-transparent shadow-none flex-1 focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-0 "
              />
            </div>
          </div>

          <div>
            <label
              htmlFor=""
              className="block text-(--grey1) text-[14px] font-medium"
            >
              Website
            </label>
            <Input
              type="text"
              placeholder="angelinawills@gmail.com"
              className="h-10 mt-1 w-full rounded-[8px] border dark:border-(--dark3) dark:bg-(--dark4) text-sm placeholder:text-[#6B7280]"
            />
          </div>
        </div>

        {/* Educational */}
        <SectionTitle title="Educational Information" />

        <button
          type="button"
          onClick={handleAddEducationCard}
          className="mb-4 inline-flex items-center gap-2 text-sm font-medium text-(--blue1) transition hover:opacity-80"
        >
          <Plus className="h-4 w-4" />
          Add more
        </button>

        <div className="space-y-4">
          {educationCards.map((card) => (
            <div
              key={card.id}
              className="rounded-xl border border-(--dark3) bg-(--dark3) p-4"
            >
              <div className="mb-4 flex items-center justify-end">
                <button
                  type="button"
                  onClick={() => handleDeleteEducationCard(card.id)}
                  className="text-[#FF5C5C] transition hover:opacity-80"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="col-span-2 md:col-span-2 lg:col-span-1">
                  <label
                    htmlFor=""
                    className="block text-(--grey1) text-[14px] font-medium"
                  >
                    Level
                  </label>
                  <Select defaultValue="female">
                    <SelectTrigger className="h-10 dark:h-10 mt-1 w-full rounded-[8px] border-1 dark:border-(--dark10) border-(--dark10) dark:bg-(--dark2) bg-(--dark2) text-sm text-(--grey1) ">
                      <SelectValue placeholder="Select Gender" />
                    </SelectTrigger>
                    <SelectContent className="border-[#2B2D36] bg-[#161821] text-white">
                      <SelectItem value="high-school">High School</SelectItem>
                      <SelectItem value="bachelors">Bachelors</SelectItem>
                      <SelectItem value="masters">Masters</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="col-span-2 md:col-span-2 lg:col-span-1">
                  <label
                    htmlFor=""
                    className="block text-(--grey1) text-[14px] font-medium"
                  >
                    Major/Specialization
                  </label>
                  <Input
                    placeholder="General Science"
                    className="h-10 mt-1 w-full border rounded-[8px] dark:border-(--dark10) border-(--dark10) dark:bg-(--dark2) bg-(--dark2) text-sm placeholder:text-[#6B7280]"
                  />
                </div>
                <div className="col-span-2">
                  <label
                    htmlFor=""
                    className="block text-(--grey1) text-[14px] font-medium"
                  >
                    Institute Name
                  </label>
                  <Input
                    placeholder="Aga Khan University"
                    className="h-10 mt-1 w-full border rounded-[8px] dark:border-(--dark10) border-(--dark10) dark:bg-(--dark2) bg-(--dark2) text-sm placeholder:text-[#6B7280]"
                  />
                </div>
                <div className="col-span-2 md:col-span-2 lg:col-span-1">
                  <label
                    htmlFor=""
                    className="block text-(--grey1) text-[14px] font-medium"
                  >
                    Start Date
                  </label>
                  <Input
                    type="date"
                    className="h-10 mt-1 w-full border rounded-[8px] dark:border-(--dark10) border-(--dark10) dark:bg-(--dark2) bg-(--dark2) text-sm placeholder:text-[#6B7280]"
                  />
                </div>
                <div className="col-span-2 md:col-span-2 lg:col-span-1">
                  <label
                    htmlFor=""
                    className="block text-(--grey1) text-[14px] font-medium"
                  >
                    End Date
                  </label>
                  <Input
                    type="date"
                    className="h-10 mt-1 w-full border rounded-[8px] dark:border-(--dark10) border-(--dark10) dark:bg-(--dark2) bg-(--dark2) text-sm placeholder:text-[#6B7280]"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}