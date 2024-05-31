import './App.css';
import { Routes, Route, Navigate } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import AnonymousLayout from './layouts/AnonymousLayout';
import ResetPassword from './pages/ResetPassword';
import ResetPasswordConfirmation from './pages/ResetPasswordConfirmation';
import ResetPassSuccess from './pages/ResetPassSuccess';
import ResetEmail from './pages/ResetEmail';
import UserProfile from './pages/UserProfile';
import ChangePassword from './pages/ChangePassword';
import Notification from './pages/Notification';
import AddVehicleMaintenanceDetails from './pages/AddVehicleMaintenanceDetails';
import AddFuelRefillDetails from './pages/AddFuelRefillDetails';
import Dashboard from './pages/Dashboard';
import AddMaintenanceType from './pages/AddMaintenanceType';
import MaintenanceTable from './pages/MaintenanceTable';
import MaintenanceTypeTable from './pages/MaintenanceTypeTable';
import FuelRefillTable from './pages/FuelRefillTable';
import EditMaintenanceType from './pages/EditMaintenanceType';
import UnauthorizedPage from './pages/UnauthorizedPage';
import PrivateRoutes from './utils/PrivateRoutes';
import NotFound from './pages/NotFound';
import Login from "./pages/Login.jsx";
import ResetPassword from "./pages/ResetPassword.jsx";
import ResetPasswordConfirmation from "./pages/ResetPasswordConfirmation.jsx";
import ResetPassSuccess from "./pages/ResetPassSuccess.jsx";
import ResetEmail from "./pages/ResetEmail.jsx";
import UserProfile from "./pages/UserProfile.jsx";
import ChangePassword from "./pages/ChangePassword.jsx";
import Notification from "./pages/Notification.jsx";
import AddVehicleDetails from "./pages/AddVehicleDetails.jsx";
import AddVehicleMaintenanceDetails from "./pages/AddVehicleMaintenanceDetails.jsx";
import AddFuelRefillDetails from "./pages/AddFuelRefillDetails.jsx";
import Driver from "./pages/Driver.jsx";
import Helper from "./pages/Helper.jsx";
import Staff from "./pages/Staff.jsx";
import Trip from "./pages/Trip.jsx";

import Reports from "./pages/Reports.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import AddAccidentDetails from "./pages/AddAccidentDetails.jsx";
import AddVehicleModel from "./pages/AddVehicleModel.jsx";
import AddManufactureDetails from "./pages/AddManufactureDetails.jsx";
import AddVehicleType from "./pages/AddVehicleType.jsx";
import AddMaintenanceType from "./pages/AddMaintenanceType.jsx";
import VehicleDetailsTable from "./pages/VehicleDetailsTable.jsx";
import VehicleReports from "./pages/VehicleReports.jsx";
import VehicleDetailsReport from "./pages/VehicleDetailsReport.jsx";
import VehicleTypeReport from "./pages/VehicleTypeReport.jsx";
import VehicleModelReport from "./pages/VehicleModelReport.jsx";
import VehicleManufacturerReport from "./pages/VehicleManufacturerReport.jsx";
import VehicleMaintenanceReport from "./pages/VehicleMaintenanceReport.jsx";
import VehicleMaintenanceTypeReport from "./pages/VehicleMaintenanceTypeReport.jsx";
import VehicleFuelRefillReport from "./pages/VehicleFuelRefillReport.jsx";
import DriverReport from "./pages/DriverReport.jsx";
import HelperReport from "./pages/HelperReport.jsx";
import StaffReport from "./pages/StaffReport.jsx";
import TripReport from "./pages/TripReport.jsx";
import AccidentReport from "./pages/AccidentReport.jsx";
import MaintenanceTable from "./pages/MaintenanceTable.jsx";
import MaintenanceTypeTable from "./pages/MaintenanceTypeTable.jsx";
import FuelRefillTable from "./pages/FuelRefillTable.jsx";

export default function App() {
    const currentUser = localStorage.getItem('token');

    return (
        <Routes>
            {/* Public routes */}
            <Route path="/auth" element={<AnonymousLayout />}>
                <Route path="Login" element={<Login />} />
                <Route path="ResetEmail" element={<ResetEmail />} />
                <Route path="ResetPassword" element={<ResetPassword />} />
                <Route path="ResetPasswordConfirmation" element={<ResetPasswordConfirmation />} />
                <Route path="ResetPassSuccess" element={<ResetPassSuccess />} />
            </Route>

            {/* Private routes */}
            <Route element={<PrivateRoutes />}>
                <Route path="/app" element={<MainLayout />}>
                    <Route path="Dashboard" element={<Dashboard />} />
                    <Route path="UserProfile" element={<UserProfile />} />
                    <Route path="Notification" element={<Notification />} />
                    <Route path="AddVehicleMaintenanceDetails" element={<AddVehicleMaintenanceDetails />} />
                    <Route path="AddFuelRefillDetails" element={<AddFuelRefillDetails />} />
                    <Route path="ChangePassword" element={<ChangePassword />} />
                    <Route path="AddMaintenanceType" element={<AddMaintenanceType />} />
                    <Route path="MaintenanceTable" element={<MaintenanceTable />} />
                    <Route path="MaintenanceTypeTable" element={<MaintenanceTypeTable />} />
                    <Route path="FuelRefillTable" element={<FuelRefillTable />} />
                    <Route path="EditMaintenanceType/:id" element={<EditMaintenanceType />} />
                </Route>
            <Route path="/app" element={<MainLayout/>}>
                <Route path="Dashboard" element={<Dashboard/>}/>
                <Route path="UserProfile" element={<UserProfile/>}/>
                <Route path="Notification" element={<Notification/>}/>
                <Route path="AddVehicleDetails" element={<AddVehicleDetails/>}/>
                <Route path="AddVehicleMaintenanceDetails" element={<AddVehicleMaintenanceDetails/>}/>
                <Route path="AddFuelRefillDetails" element={<AddFuelRefillDetails/>}/>
                <Route path="Driver" element={<Driver/>}/>
                <Route path="Helper" element={<Helper/>}/>
                <Route path="Staff" element={<Staff/>}/>
                <Route path="Trip" element={<Trip/>}/>
                <Route path="Reports/*" element={<Reports/>}/> {/* Updated Route for Reports */}
                <Route path="AddAccidentDetails" element={<AddAccidentDetails/>}/>
                <Route path="ChangePassword" element={<ChangePassword/>}/>
                <Route path="AddVehicleType" element={<AddVehicleType/>}/>
                <Route path="AddVehicleModel" element={<AddVehicleModel/>}/>
                <Route path="AddManufactureDetails" element={<AddManufactureDetails/>}/>
                <Route path="AddMaintenanceType" element={<AddMaintenanceType/>}/>
                <Route path="VehicleDetailsTable" element={<VehicleDetailsTable/>}/>
                <Route path="VehicleReports" element={<VehicleReports/>}/>
                <Route path="VehicleDetailsReport" element={<VehicleDetailsReport/>}/>
                <Route path="VehicleTypeReport" element={<VehicleTypeReport/>}/>
                <Route path="VehicleModelReport" element={<VehicleModelReport/>}/>
                <Route path="VehicleManufacturerReport" element={<VehicleManufacturerReport/>}/>
                <Route path="VehicleMaintenanceReport" element={<VehicleMaintenanceReport/>}/>
                <Route path="VehicleMainTypeReport" element={<VehicleMaintenanceTypeReport/>}/>
                <Route path="VehicleFuelRefillReport" element={<VehicleFuelRefillReport/>}/>
                <Route path="DriverReport" element={<DriverReport/>}/>
                <Route path="HelperReport" element={<HelperReport/>}/>
                <Route path="StaffReport" element={<StaffReport/>}/>
                <Route path="TripReport" element={<TripReport/>}/>
                <Route path="AccidentReport" element={<AccidentReport/>}/>
                <Route path="MaintenanceTable" element={<MaintenanceTable/>}/>
                <Route path="MaintenanceTypeTable" element={<MaintenanceTypeTable/>}/>
                <Route path="FuelRefillTable" element={<FuelRefillTable/>}/>
            </Route>
            <Route path="/auth" element={<AnonymousLayout/>}>
                <Route path="login" element={<Login/>}/>
                <Route path="resetPassword" element={<ResetPassword/>}/>
                <Route path="ResetPasswordConfirmation" element={<ResetPasswordConfirmation/>}/>
                <Route path="ResetPassSuccess" element={<ResetPassSuccess/>}/>
                <Route path="ResetEmail" element={<ResetEmail/>}/>
            </Route>

            {/* Unauthorized and NotFound routes */}
            <Route path="/unauthorized" element={<UnauthorizedPage />} />
            <Route path="*" element={<NotFound />} />

            {/* Default route handling */}
            <Route path="/" element={currentUser ? <Navigate to="/app/Dashboard" /> : <Navigate to="/auth/Login" />} />
        </Routes>
    );
}
