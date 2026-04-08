
import { useState } from "react";
import {
    ExternalLink,
    MapPin,
    Building2,
    Briefcase,
    Mail,
    Phone,
    Globe,
} from "lucide-react";
// Profile Tab
export default function ProfileTab({ userData }) {
    const [expanded, setExpanded] = useState(false);
    const description = userData.profileDescription;
    const shortDescription = description.slice(0, 380);
    const isLong = description.length > 380;

    return (
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-6 mt-6">
            {/* Left — Profile Description */}
            <div>
                <h2 className="text-[16px] font-medium text-(--grey1) mb-4">
                    Profile Description
                </h2>
                <p className="text-[16px] leading-[1.8] font-normal text-(--grey1) whitespace-pre-line">
                    {expanded || !isLong ? description : `${shortDescription}...`}
                </p>
                {isLong && (
                    <button
                        onClick={() => setExpanded(!expanded)}
                        className="mt-3 text-[14px] font-medium text-(--blue1) cursor-pointer hover:underline"
                    >
                        {expanded ? "Show less" : "Read more"}
                    </button>
                )}
            </div>

            {/* Right — General Information Card */}
            <div className="rounded-[8px] shadow-[0px_1px_2px_0px_#0000000D] bg-(--dark4) p-5">
                <h3 className="text-[16px] font-medium text-(--grey1) mb-5">
                    General Information
                </h3>

                <div className="space-y-5">
                    <InfoRow
                        icon={<MapPin size={15} className="text-(--grey1)" />}
                        label="Location"
                        value={
                            <span className="flex items-center gap-1.5">
                                <span>{userData.generalInfo.locationFlag}</span>
                                {userData.generalInfo.location}
                            </span>
                        }
                    />
                    <InfoRow
                        icon={<Building2 size={15} className="text-(--grey1)" />}
                        label="Company"
                        value={userData.generalInfo.company}
                    />
                    <InfoRow
                        icon={<Briefcase size={15} className="text-(--grey1)" />}
                        label="Designation"
                        value={userData.generalInfo.designation}
                    />
                    <InfoRow
                        icon={<Mail size={15} className="text-(--grey1)" />}
                        label="Email Address"
                        value={userData.generalInfo.email}
                    />
                    <InfoRow
                        icon={<Phone size={15} className="text-(--grey1)" />}
                        label="Phone Number"
                        value={userData.generalInfo.phone}
                    />
                    <InfoRow
                        icon={<Globe size={15} className="text-(--grey1)" />}
                        label="Website"
                        value={
                            <a
                                href={`https://${userData.generalInfo.website}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-1.5 text-(--blue1) hover:underline"
                            >
                                {userData.generalInfo.website}
                                <ExternalLink size={13} />
                            </a>
                        }
                    />
                </div>
            </div>
        </div>
    );
}

// Info Row helper
function InfoRow({ label, value }) {
    return (
        <div>
            <p className="text-[14px] font-medium text-(--grey1) mb-0.5">{label}</p>
            <p className="text-[16px] font-medium text-(--grey1)">{value}</p>
        </div>
    );
}