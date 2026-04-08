import {
    ExternalLink,
} from "lucide-react";


import Threads from "./Threads";

export default function ThreadsTab() {
    const sidebarInfo = {
        location: "Melbourne, Australia",
        locationFlag: "🌏",
        company: "Aga Khan University Hospital",
        designation: "Senior Doctor",
        email: "dr.james.smith@email.com",
        phone: "(555) 987-6543",
        website: "jayawillis.com",
    };
    return (
        <>
            <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-6 mt-6">

                <Threads />
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
        </>
    )
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