import Header from "./header";
import SideBar from "./sideBar";

export default function Layout({ children }) {
    return (

        <>
            <SideBar />
            <div className="ml-70 flex flex-col gap-3">
                <Header />
                <div className="p-10">
                    {children}
                </div>
            </div>

        </>
    )
}