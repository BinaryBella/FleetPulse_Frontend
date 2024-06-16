import PropTypes from 'prop-types'; // Import PropTypes
import SideMenu from '../components/SideMenu.jsx';
import TopMenu from '../components/TopMenu.jsx';
import { Outlet } from 'react-router-dom';

// MainLayout component definition
export default function MainLayout({ isAdmin }) {
    return (
        <div className="flex min-w-screen min-h-screen bg-[#393970]">
            <SideMenu isAdmin={isAdmin} />
            <div className="bg-[#E1E4EB] w-4/5 pl-16">
                <TopMenu />
                <Outlet />
            </div>
        </div>
    );
}

// PropTypes validation for MainLayout component
MainLayout.propTypes = {
    isAdmin: PropTypes.bool.isRequired, // Validate isAdmin prop
};
