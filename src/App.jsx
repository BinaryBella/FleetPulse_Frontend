import './App.css';
import { Route, Routes } from "react-router-dom";
import MainLayout from "./layouts/MainLayout.jsx";
import AnonymousLayout from "./layouts/AnonymousLayout.jsx";
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

export default function App() {
    return (
        <Routes>
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
            </Route>
            <Route path="/app" element={<AnonymousLayout/>}>
                <Route path="login" element={<Login/>}/>
                <Route path="resetPassword" element={<ResetPassword/>}/>
                <Route path="ResetPasswordConfirmation" element={<ResetPasswordConfirmation/>}/>
                <Route path="ResetPassSuccess" element={<ResetPassSuccess/>}/>
                <Route path="ResetEmail" element={<ResetEmail/>}/>
            </Route>
        </Routes>
    );
}
