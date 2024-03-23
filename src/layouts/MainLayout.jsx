import SideMenu from "../components/SideMenu.jsx";
import TopMenu from "../components/TopMenu.jsx";
import {Outlet} from "react-router-dom";

export default function MainLayout() {
    return (
        <div className="flex min-w-screen min-h-screen bg-[#393970]">
            <SideMenu/>
            <div className="bg-[#E1E4EB] w-4/5 pl-16">
                <TopMenu/>
                <Outlet />
            </div>
        </div>
    );
}