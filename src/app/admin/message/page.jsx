import ChatPage from "./_component/ChatPage";
export const metadata = {
    title: "Message",
};
export default function Page() {
    return (
        <>
            <div className="px-8 py-6">
                {/* <h1 className="text-(--grey1) font-bold text-[20px]">
                    Calendar
                </h1>
                <p className="text-[16px] font-normal text-(--grey3)">
                    All upcoming events are available here.
                </p> */}

                <div>
               <ChatPage/>
                </div>
            </div>
            </>
    )
}