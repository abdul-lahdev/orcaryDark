// virtual-classroom/[id]/page.jsx
'use client'
import { useParams } from 'next/navigation'
import { liveCards } from '@/app/data/cards';


export default function Page() {
    const params = useParams()
    console.log(params)
    console.log(liveCards)

    return (
        <div className="p-3 text-white">
            <h1>Welcome to Virtual Classroom: {params.id} </h1>
            {/* Yahan aap id ke basis par data fetch kar sakte hain */}
        </div>
    );
}