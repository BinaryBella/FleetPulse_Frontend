import Logo from './../assets/images/Logo.jpg';
import {Outlet} from "react-router-dom";

export default function AnonymousLayout() {
    return (
        <div className="flex w-screen h-screen">
            <div className="bg-[#393970] w-1/2 flex items-center justify-center">
                <img src={Logo} alt="Logo" className="w-1/2"/>
            </div>
            <div className="bg-[#E1E4EB] w-1/2 flex flex-col items-center justify-center">
                <Outlet/>
            </div>
        </div>
    );
}
