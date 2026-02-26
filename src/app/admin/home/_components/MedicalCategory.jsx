import { MoveRight } from "lucide-react";
import Link from "next/link";

export default function MedicalCategory() {
    const categories = [
        {
            id: 1,
            catName: 'Cardiologie',
            gradient:'linear-gradient(110.56deg,_rgba(239,68,68,0.125)_0%,_rgba(239,68,68,0.063)_100%)',
            icon: '',
            total: 12
        },
        {
            id: 2,
            catName: 'Neurologie',
            gradient:'linear-gradient(110.56deg,_rgba(139,92,246,0.125)_0%,_rgba(139,92,246,0.063)_100%)',
            icon: '',
            total: 8,
        },
        {
            id: 3,
            catName: 'Médecine Générale',
            gradient:'linear-gradient(110.56deg,_rgba(59,130,246,0.125)_0%,_rgba(59,130,246,0.063)_100%)',
            icon: '',
            total: 24,
        },
        {
            id: 4,
            catName: 'Immunologie',
            gradient:'linear-gradient(110.56deg,_rgba(16,185,129,0.19)_0%,_rgba(16,185,129,0.125)_100%)',
            icon: '',
            total: 6,
        },
        {
            id: 5,
            catName: 'Pédiatrie',
            gradient:'linear-gradient(110.56deg,_rgba(245,158,11,0.125)_0%,_rgba(245,158,11,0.063)_100%)',
            icon: '',
            total: 14,
        },
        {
            id: 6,
            catName: 'Orthopédie',
            gradient:'linear-gradient(110.56deg,_rgba(236,72,153,0.125)_0%,_rgba(236,72,153,0.063)_100%)',
            icon: '',
            total: 9,
        },
    ]
    return (
        <>
            <div className='flex items-center justify-between '>
                <h1 className="text-[30px] font-normal text-white">
                    Categories
                </h1>
                <Link
                    href='/admin/virtual-classroom'
                    className="group flex items-center gap-2 text-(--blue1) text-[15px] font-normal"
                >
                    <span className="group-hover:underline">See All</span>

                    <span className="transform transition-transform duration-300 group-hover:translate-x-1.5">
                        <MoveRight size={18} />
                    </span>
                </Link>
            </div>
            <div className="grid gri-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {
                    categories.map((item) => (
                        <div key={item.id} className={` min-h-41 p-3 rounded-[12px] bg-[${item.gradient}]`}>
                            <div className="size-12 rounded-[12px] bg-[#EF444430] flex items-center justify-center">ic</div>
                            {item.catName}</div>

                    ))
                }
            </div>

        </>
    )
}