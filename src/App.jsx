import './App.css';
import {Routes, Route, Navigate} from 'react-router-dom';
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
import EditVehicleMaintenanceDetails from "./pages/EditVehicleMaintenanceDetails";
import FuelRefillTable from './pages/FuelRefillTable';
import EditMaintenanceType from './pages/EditMaintenanceType';
import EditFuelRefillDetails from './pages/EditFuelRefillDetails';
import UnauthorizedPage from './pages/UnauthorizedPage';
import PrivateRoutes from './utils/PrivateRoutes';
import NotFound from './pages/NotFound';
import Login from "./pages/Login.jsx";
import VehicleDetailsTable from './pages/VehicleDetailsTable.jsx';
import DriverDetails from "./pages/DriverDetails.jsx";
import AccidentDetails from "./pages/AccidentDetails.jsx";
import AddAccidentDetails from "./pages/AddAccidentDetails.jsx";
import AddVehicleDetails from "./pages/AddVehicleDetails.jsx";
import AddVehicleType from "./pages/AddDriverDetails.jsx";
import AddHelperDetails from "./pages/AddHelperDetails.jsx";
import HelperDetails from "./pages/HelperDetails.jsx";
import AddStaffDetails from "./pages/AddStaffDetails.jsx";
import StaffDetails from "./pages/StaffDetails.jsx";
import AddTripDetails from "./pages/AddTripDetails.jsx";
import TripDetails from "./pages/TripDetails.jsx";
import VehicleType from "./pages/VehicleType.jsx";
import AddvehicletypeDetails from "./pages/AddvehicletypeDetails.jsx";
import AddDriverDetails from "./pages/AddDriverDetails.jsx";
import Manufacturer from "./pages/Manufacturer.jsx";
import AddManufacturerTypeDetails from "./pages/AddManufactureDetails.jsx";
import EditAccidentDetails from "./pages/EditAccidentDetails.jsx";
import EditVehicleDetails from "./pages/EditVehicleDetails.jsx";
import EditVehicleType from "./pages/EditVehicleType.jsx";
import EditDriverDetails from "./pages/EditDriverDetails.jsx";
import EditHelperDetails from "./pages/EditHelperDetails.jsx";
import EditStaffDetails from "./pages/EditStaffDetails.jsx";
import EditTripDetails from "./pages/EditTripDetails.jsx";
import EditManufacturerTypeDetails from "./pages/EditManufacturerTypeDetails.jsx";
import Reports from "./pages/Reports.jsx";
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

export default function App() {
    const currentUser = localStorage.getItem('token');

    return (
        <Routes>
            {/* Public routes */}
            <Route path="/auth" element={<AnonymousLayout/>}>
                <Route path="Login" element={<Login/>}/>
                <Route path="ResetEmail" element={<ResetEmail/>}/>
                <Route path="ResetPassword" element={<ResetPassword/>}/>
                <Route path="ResetPasswordConfirmation" element={<ResetPasswordConfirmation/>}/>
                <Route path="ResetPassSuccess" element={<ResetPassSuccess/>}/>
            </Route>

            {/* Private routes */}
            <Route element={<PrivateRoutes/>}>
                <Route path="/app" element={<MainLayout/>}>
                    <Route path="EditMaintenanceType" element={<EditMaintenanceType/>}/>
                    <Route path="EditVehicleMaintenanceDetails" element={<EditVehicleMaintenanceDetails/>}/>
                    <Route path="EditFuelRefillDetails" element={<EditFuelRefillDetails/>}/>
                    <Route path="Dashboard" element={<Dashboard/>}/>
                    <Route path="UserProfile" element={<UserProfile/>}/>
                    <Route path="Notification" element={<Notification/>}/>
                    <Route path="AddVehicleMaintenanceDetails" element={<AddVehicleMaintenanceDetails/>}/>
                    <Route path="AddFuelRefillDetails" element={<AddFuelRefillDetails/>}/>
                    <Route path="ChangePassword" element={<ChangePassword/>}/>
                    <Route path="AddMaintenanceType" element={<AddMaintenanceType/>}/>
                    <Route path="MaintenanceTable" element={<MaintenanceTable/>}/>
                    <Route path="MaintenanceTypeTable" element={<MaintenanceTypeTable/>}/>
                    <Route path="FuelRefillTable" element={<FuelRefillTable/>}/>
                    <Route path="AccidentDetails" element={<AccidentDetails/>}/>
                    <Route path="AddAccidentDetails" element={<AddAccidentDetails/>}/>
                    <Route path="AddVehicleDetails" element={<AddVehicleDetails/>}/>
                    <Route path="AddVehicleType" element={<AddVehicleType/>}/>
                    <Route path="DriverDetails" element={<DriverDetails/>}/>
                    <Route path="AddDriverDetails" element={<AddDriverDetails/>}/>
                    <Route path="AddHelperDetails" element={<AddHelperDetails/>}/>
                    <Route path="HelperDetails" element={<HelperDetails/>}/>
                    <Route path="AddStaffDetails" element={<AddStaffDetails/>}/>
                    <Route path="StaffDetails" element={<StaffDetails/>}/>
                    <Route path="AddTripDetails" element={<AddTripDetails/>}/>
                    <Route path="TripDetails" element={<TripDetails/>}/>
                    <Route path="VehicleDetailsTable" element={<VehicleDetailsTable/>}/>
                    <Route path='VehicleType' element={<VehicleType/>}/>
                    <Route path='AddvehicletypeDetails' element={<AddvehicletypeDetails/>}/>
                    <Route path='Manufacturer' element={<Manufacturer/>}/>
                    <Route path='AddManufacturerTypeDetails' element={<AddManufacturerTypeDetails/>}/>
                    <Route path='EditAccidentDetails' element={<EditAccidentDetails/>}/>
                    <Route path='EditVehicleDetails' element={<EditVehicleDetails/>}/>
                    <Route path='EditVehicleType' element={<EditVehicleType/>}/>
                    <Route path='EditDriverDetails' element={<EditDriverDetails/>}/>
                    <Route path='EditHelperDetails' element={<EditHelperDetails/>}/>
                    <Route path='EditStaffDetails' element={<EditStaffDetails/>}/>
                    <Route path='EditTripDetails' element={<EditTripDetails/>}/>
                    <Route path='EditManufacturerTypeDetails' element={<EditManufacturerTypeDetails/>}/>
                    <Route path="Reports/*" element={<Reports/>}/> {/* Updated Route for Reports */}
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
                </Route>

                {/* Unauthorized and NotFound routes */}
                <Route path="/unauthorized" element={<UnauthorizedPage/>}/>
                <Route path="*" element={<NotFound/>}/>

                {/* Default route handling */}
                <Route path="/" element={currentUser ? <Navigate to="/app/Dashboard"/> : <Navigate to="/auth/Login"/>}/>
            </Route>
        </Routes>
    );
}

