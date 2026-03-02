import { Baby, Bone, Brain, Heart, MoveRight, Stethoscope, Syringe } from "lucide-react";
import Link from "next/link";

export default function MedicalCategory() {
    const categories = [
        {
            id: 1,
            catName: 'Cardiologie',
            gradient: 'linear-gradient(110.56deg, rgba(239, 68, 68, 0.19) 0%, rgba(239, 68, 68, 0.125) 100%)',
            total: 12
        },
        {
            id: 2,
            catName: 'Neurologie',
            gradient: 'linear-gradient(110.56deg, rgba(139, 92, 246, 0.125) 0%, rgba(139, 92, 246, 0.063) 100%)',
            total: 8,
        },
        {
            id: 3,
            catName: 'Médecine Générale',
            gradient: 'linear-gradient(110.56deg, rgba(59, 130, 246, 0.125) 0%, rgba(59, 130, 246, 0.063) 100%)',
            total: 24,
        },
        {
            id: 4,
            catName: 'Immunologie',
            gradient: 'linear-gradient(110.56deg, rgba(16, 185, 129, 0.125) 0%, rgba(16, 185, 129, 0.063) 100%)',
            total: 6,
        },
        {
            id: 5,
            catName: 'Pédiatrie',
            gradient: 'linear-gradient(110.56deg, rgba(245, 158, 11, 0.125) 0%, rgba(245, 158, 11, 0.063) 100%)',
            total: 14,
        },
        {
            id: 6,
            catName: 'Orthopédie',
            gradient: 'linear-gradient(110.56deg, rgba(236, 72, 153, 0.125) 0%, rgba(236, 72, 153, 0.063) 100%)',
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
            <div className="grid gri-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mt-4">
                {
                    categories.map((item) => (
                        <div key={item.id} style={{ background: item.gradient }} className={` min-h-41 transition-all duration-300 hover:-translate-y-1.5 pl-3  rounded-[12px] cursor-pointer `}>
                            <div className='flex justify-between h-full'>
                                <div className="flex flex-col items-start justify-center h-full ">
                                    <div className={`size-12 rounded-[12px] ${item.catName === 'Cardiologie' ? 'bg-[#EF444430]' : item.catName === 'Neurologie' ? 'bg-[#8B5CF630]' : item.catName === 'Médecine Générale' ? 'bg-[#3B82F630]' : item.catName === 'Immunologie' ? 'bg-[#10B98130]' : item.catName === 'Pédiatrie' ? 'bg-[#F59E0B30]' : 'bg-[#EC489930]'} flex items-center justify-center p-2.5`}>
                                        {item.catName === 'Cardiologie' ? <Heart size={32} className="text-[#EF4343]" /> : item.catName === 'Neurologie' ? <Brain size={32} className="text-[#8B5CF6]" /> : item.catName === 'Médecine Générale' ? <Stethoscope size={32} className="text-[#3B82F6]" /> : item.catName === 'Immunologie' ? <Syringe size={32} className="text-[#10B981]" /> : item.catName === 'Pédiatrie' ? <Baby size={32} className="text-[#FE7B02]" /> : <Bone size={32} className="text-[#EC4899]" />}
                                    </div>
                                    <h1 className='text-white text-[18px] font-normal mt-4'>
                                        {item.catName}
                                    </h1>
                                    <p className='text-(--grey1) text-[14px] font-normal '>
                                        {item.total} cours en direct
                                    </p>
                                </div>

                                <div className="flex justify-start items-start opacity-6">
                                    {item.catName === 'Cardiologie' ? <Heart size={128} className="text-[#EF4343]" /> : item.catName === 'Neurologie' ? <Brain size={128} className="text-[#8B5CF6]" /> : item.catName === 'Médecine Générale' ? <Stethoscope size={128} className="text-[#3B82F6]" /> : item.catName === 'Immunologie' ? <Syringe size={128} className="text-[#10B981]" /> : item.catName === 'Pédiatrie' ? <Baby size={128} className="text-[#FE7B02]" /> : <Bone size={128} className="text-[#EC4899]" />}

                                </div>
                            </div>
                        </div>

                    ))
                }
            </div>

        </>
    )
}