import CalendarComponent from "./_component/CalendarComponent";
export const metadata = {
    title: "Calendar",
};
export default function Page() {
    return (
        <>
            <div className="bg-(--dark4) border border-(--dark2) p-4 rounded-[12px]">
                {/* <h1 className="text-(--grey1) font-bold text-[20px]">
                    Calendar
                </h1>
                <p className="text-[16px] font-normal text-(--grey3)">
                    All upcoming events are available here.
                </p> */}

                <div>
                    <CalendarComponent/>
                </div>
            </div>
            </>
    )
}