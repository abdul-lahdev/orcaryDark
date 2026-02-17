import { LuUsers } from "react-icons/lu";
import SubscriptionChart from "./_components/subscriptChart";
import ClaimsChart from "./_components/claimsChart";
import EarningsChart from "./_components/earningChart";
import ActiveUsersChart from "./_components/activeUserChart";

export const metadata = {
    title: "Dashboard",
};




export default function Page() {


    const cardData = [
        {
            id: 1,
            title: 'Total Subscriptions',
            value: '1,234',
            icon: 'LuUsers',
        },
        {
            id: 2,
            title: 'Total Free Users',
            value: '1,234',
            icon: 'LuUsers',
        },
        {
            id: 3,
            title: 'Total Earnings',
            value: '1,234',
            icon: 'LuUsers',
        },
        {
            id: 4,
            title: 'Total Advertisements',
            value: '1,234',
            icon: 'LuUsers',
        },

    ]


    return (
        <>
            <div>
                <h1 className="text-white font-semibold text-[24px]">
                    Dashboard Overview
                </h1>
                <p className="text-[16px]/[24px] font-normal text-(--grey1) ">
                    Monitor your {`platform's`} performance and growth metrics.
                </p>
            </div>
            <div className="flex flex-col gap-6 mt-10">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                    {
                        cardData.map((item) => (
                            <div key={item.id} className="bg-(--dark3) border border-(--dark2) rounded-[10px] min-h-37.25 flex flex-col justify-between p-4">
                                <h1 className="text-[16px] font-normal text-(--grey1)">{item.title}</h1>
                                <div className="flex justify-between items-center">
                                    <p className='text-white text-[30px] font-bold'>{item.title === 'Total Earnings' ? '$' : ''} {item.value}</p>

                                    {item.icon === 'LuUsers' && <LuUsers size={30} className="text-(--blue1)" />}
                                </div>

                            </div>
                        ))
                    }

                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-(--dark3) rounded-[10px] p-4">
                        <SubscriptionChart />
                    </div>
                    <div className="bg-(--dark3) rounded-[10px] p-4">
                        {/* <ClaimsChart /> */}
                        <ActiveUsersChart />
                    </div>
                </div>
                <div className="bg-(--dark3) rounded-[10px] p-4">
                    <EarningsChart />
                </div>
            </div>
        </>
    )
}