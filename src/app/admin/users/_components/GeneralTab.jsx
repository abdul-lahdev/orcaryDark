import {
    User,
    CalendarDays,
    Globe,
    MapPin,
    Briefcase,
    Phone,
    Mail,
    GraduationCap,
    ExternalLink,
    Building2,
} from "lucide-react";
import { Separator } from "@/components/ui/separator";

const generalData = {
    gender: "Female",
    dateOfBirth: "05/04/1996",
    country: "Karachi, Pakistan",
    livesIn: "Block H, Nazimabad Karachi",
    worksAt: "Aga Khan Hospital",
};

const contactData = {
    phone: "+92 304 2328820",
    email: "angelinawills@gmail.com",
    website: "angelinawills.com",
};

const educationData = [
    {
        type: "School",
        institution: "Karachi Grammar School",
        degree: "General Science",
        years: "2001-2010",
    },
    {
        type: "School",
        institution: "Govt. College for Women, Nazimabad",
        degree: "Pre-Engineering",
        years: "2001-2010",
    },
    {
        type: "University",
        institution: "Bahria University, Karachi Campus",
        degree: "Bachelor in Business Administration",
        years: "2001-2010",
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

export default function GeneralTab() {
    return (
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-6 mt-6">
            {/* ─── Left Column ─── */}
            <div>
                {/* General Information */}
                <h2 className="text-[18px] font-bold text-(--grey1)">
                    General Information
                </h2>
                <div className="space-y-4 mt-5">
                    <InfoItem
                        icon={<User size={24} />}
                        label="Gender"
                        value={generalData.gender}
                    />
                    <InfoItem
                        icon={<CalendarDays size={24} />}
                        label="Date of Birth"
                        value={generalData.dateOfBirth}
                    />
                    <InfoItem
                        icon={<Globe size={24} />}
                        label="Country"
                        value={generalData.country}
                    />
                    <InfoItem
                        icon={<MapPin size={24} />}
                        label="Lives in"
                        value={generalData.livesIn}
                    />
                    <InfoItem
                        icon={<Briefcase size={24} />}
                        label="Works at"
                        value={generalData.worksAt}
                    />
                </div>

                <Separator className="my-6 border border-(--dark2)" />

                {/* Contact Information */}
                <h2 className="text-[18px] font-bold text-(--grey1)">
                    Contact Information
                </h2>
                <div className="space-y-4 mt-5">
                    <InfoItem
                        icon={<Phone size={24} />}
                        label="Phone Number"
                        value={contactData.phone}
                    />
                    <InfoItem
                        icon={<Mail size={24} />}
                        label="Email Address"
                        value={contactData.email}
                    />
                    <InfoItem
                        icon={<Globe size={24} />}
                        label="Website"
                        value={contactData.website}
                    />
                </div>

                <Separator className="my-6 border border-(--dark2)" />

                {/* Educational Information */}
                <h2 className="text-[18px] font-bold text-(--grey1)">
                    Educational Information
                </h2>
                <div className="space-y-5 mt-5">
                    {educationData.map((edu, index) => (
                        <div key={index} className="flex items-start gap-3">
                            <GraduationCap
                                size={24}
                                className="text-(--grey1) mt-0.5 shrink-0"
                            />
                            <div className="flex-1 flex justify-between pt-1">
                                <div className='grid grid-cols-[200px_1fr]'>
                                    <span className="text-[13px] font-medium text-(--grey1)">
                                        {edu.type}
                                    </span>
                                    <div>
                                        <p className="text-[14px] font-normal text-white">
                                            {edu.institution}
                                        </p>
                                        <p className="text-[14px] font-medium text-(--grey1)">
                                            {edu.degree}
                                        </p>
                                    </div>
                                </div>
                                <div className="flex justify-end items-end h-full">
                                    <span className="text-[13px] font-normal text-(--grey1)">
                                        {edu.years}
                                    </span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
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

// Left column info row with icon + label + value
function InfoItem({ icon, label, value }) {
    return (
        <div className="flex items-center gap-6">
            <div className="flex items-center gap-3">
                <span className="text-(--grey6) shrink-0">{icon}</span>
                <span className="text-[16px] font-medium text-(--grey1) w-[120px] shrink-0">
                    {label}
                </span>
            </div>
            <span className="text-[16px] font-normal text-(--grey1)">{value}</span>
        </div>
    );
}

// Right sidebar row
function SidebarRow({ label, value }) {
    return (
        <div>
            <p className="text-[14px] font-medium text-(--grey1) mb-0.5">{label}</p>
            <p className="text-[16px] font-medium text-(--grey1)">{value}</p>
        </div>
    );
}