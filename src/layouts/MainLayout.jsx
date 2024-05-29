import SideMenu from "../components/SideMenu.jsx"; // Importing the SideMenu component
import TopMenu from "../components/TopMenu.jsx"; // Importing the TopMenu component
import { Outlet } from "react-router-dom"; // Importing the Outlet component from react-router-dom

// MainLayout component definition
export default function MainLayout() {
    // Rendering the layout structure
    return (
        <div className="flex min-w-screen min-h-screen bg-[#393970]">
            {/* Rendering the SideMenu component */}
            <SideMenu/>

            {/* Main content area */}
            <div className="bg-[#E1E4EB] w-4/5 pl-16">
                {/* Rendering the TopMenu component */}
                <TopMenu/>

                {/* Outlet for rendering nested routes */}
                <Outlet />
            </div>
        </div>
    );
}
