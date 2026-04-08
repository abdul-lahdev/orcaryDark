import Image from "next/image";
import { MoreVertical, ExternalLink } from "lucide-react";

const classroomData = [
    {
        id: 1,
        thumbnail: "/images/classRoom/thumbnail.jpg",
        title: "Intro to Neuroanatomy | Neurophysiology | Neuroscience | Central Nervous System",
        viewers: 453,
        streamTime: "12:10 PM",
        avatar: "/images/classRoom/avator.png",
        name: "Mathew Hems",
        specialization: "Neurology Specialist",
    },
    {
        id: 2,
        thumbnail: "/images/classRoom/thumbnail2.jpg",
        title: "Intro to Neuroanatomy | Neurophysiology | Neuroscience | Central Nervous System",
        viewers: 453,
        streamTime: "12:10 PM",
        avatar: "/images/classRoom/avator.png",
        name: "Mathew Hems",
        specialization: "Neurology Specialist",
    },
    {
        id: 3,
        thumbnail: "/images/classRoom/thumbnail.jpg",
        title: "Heart Diseases & ECG Interpretation | Advanced Cardiac Techniques",
        viewers: 312,
        streamTime: "1:00 PM",
        avatar: "/images/classRoom/avator.png",
        name: "Dr. Sarah Khan",
        specialization: "Cardiologist",
    },
    {
        id: 4,
        thumbnail: "/images/classRoom/thumbnail2.jpg",
        title: "Brain Tumor Diagnosis & Treatment | Surgical Approaches",
        viewers: 621,
        streamTime: "2:00 PM",
        avatar: "/images/classRoom/avator.png",
        name: "Dr. Maria Lopez",
        specialization: "Neurosurgeon",
    },
];

const sidebarInfo = {
    location: "Melbourne, Australia",
    locationFlag: "🌏",
    company: "Aga Khan University Hospital",
    designation: "Senior Doctor",
    email: "dr.james.smith@email.com",
    phone: "(555) 987-6543",
    website: "jayawillis.com",
};

export default function ClassroomTab() {
    return (
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-6 mt-6">
            {/* ─── Left Column — Cards ─── */}
            <div className="space-y-12">
                {classroomData.map((card) => (
                    <div key={card.id}>
                        {/* Thumbnail area */}
                        <div className="relative w-full h-[220px] rounded-xl overflow-hidden bg-[#0a0a0a]">
                            <Image
                                src={card.thumbnail}
                                alt={card.title}
                                fill
                                className="object-cover"
                            />

                            {/* Bottom bar — avatar + name + menu */}
                            <div className="absolute bottom-0 left-0 right-0 flex items-center justify-between px-4 py-3 bg-linear-to-t from-black/80 to-transparent">
                                <div className="flex items-center gap-2.5">
                                    <div className="h-[40px] w-[40px] rounded-full overflow-hidden shrink-0">
                                        <Image
                                            src={card.avatar}
                                            alt={card.name}
                                            width={40}
                                            height={40}
                                            className="object-cover"
                                        />
                                    </div>
                                    <div>
                                        <p className="text-[16px] font-semibold text-white">
                                            {card.name}
                                        </p>
                                        <p className="text-[12px] font-normal text-(--light2)">
                                            {card.specialization}
                                        </p>
                                    </div>
                                </div>
                                <button className="cursor-pointer text-white/70 hover:text-white transition">
                                    <MoreVertical size={18} />
                                </button>
                            </div>
                        </div>

                        {/* Info below card */}
                        <div className="mt-8 px-1">
                            <p className="text-[20px] font-semibold text-(--grey1)">
                                {card.title}
                            </p>
                            <div className="flex items-center gap-2 mt-4">
                                <span className="text-[16px] font-normal text-(--grey1)">
                                    {card.viewers} viewers
                                </span>
                                <span className="size-2.5 rounded-full bg-(--grey5)" />
                                <span className="text-[16px] font-normal text-(--grey1)">
                                    Streaming {card.streamTime}
                                </span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* ─── Right Column — General Information Sidebar ─── */}
            <div className="rounded-[8px] shadow-[0px_1px_2px_0px_#0000000D] bg-(--dark4) p-5 h-fit">
                <h3 className="text-[16px] font-medium text-(--grey1) mb-5">
                    General Information
                </h3>
                <div className="space-y-5">
                    <SidebarRow
                        label="Location"
                        value={
                            <span className="flex items-center gap-1.5">
                                <span>{sidebarInfo.locationFlag}</span>
                                {sidebarInfo.location}
                            </span>
                        }
                    />
                    <SidebarRow label="Company" value={sidebarInfo.company} />
                    <SidebarRow label="Designation" value={sidebarInfo.designation} />
                    <SidebarRow label="Email Address" value={sidebarInfo.email} />
                    <SidebarRow label="Phone Number" value={sidebarInfo.phone} />
                    <SidebarRow
                        label="Website"
                        value={
                            <a
                                href={`https://${sidebarInfo.website}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-1.5 text-(--blue1) hover:underline"
                            >
                                {sidebarInfo.website}
                                <ExternalLink size={13} />
                            </a>
                        }
                    />
                </div>
            </div>
        </div>
    );
}

function SidebarRow({ label, value }) {
    return (
        <div>
            <p className="text-[14px] font-medium text-(--grey1) mb-0.5">{label}</p>
            <p className="text-[16px] font-medium text-(--grey1)">{value}</p>
        </div>
    );
}