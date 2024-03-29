import './App.css'
import {Route, Routes} from "react-router-dom";
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
import Dashboard from "./pages/Dashboard.jsx";
import AddAccidentDetails from "./pages/AddAccidentDetails.jsx";
import AddVehicleModel from "./pages/AddVehicleModel.jsx";
import AddManufactureDetails from "./pages/AddManufactureDetails.jsx";
import AddVehicleType from "./pages/AddVehicleType.jsx";
import AddMaintenanceType from "./pages/AddMaintenanceType.jsx";
import VehicleDetailsTable from "./pages/VehicleDetailsTable.jsx";
import DriverDetails from "./pages/DriverDetails.jsx";
import AddDriverDetails from "./pages/AddDriverDetails.jsx";


export default function App() {
    return (
        <Routes>
            <Route path="/app" element={<MainLayout/>}>
                <Route path="Dashboard" element={<Dashboard/>}/>
                <Route path="UserProfile" element={<UserProfile/>}/>
                <Route path="Notification" element={<Notification/>}/>
                <Route path="VehicleDetailsTable/AddVehicleDetails" element={<AddVehicleDetails/>}/>
                <Route path="AddVehicleMaintenanceDetails" element={<AddVehicleMaintenanceDetails/>}/>
                <Route path="AddFuelRefillDetails" element={<AddFuelRefillDetails/>}/>
                <Route path="Driver" element={<Driver/>}/>
                <Route path="Helper" element={<Helper/>}/>
                <Route path="Staff" element={<Staff/>}/>
                <Route path="Trip" element={<Trip/>}/>
                <Route path="AddAccidentDetails" element={<AddAccidentDetails/>}/>
                <Route path="AddAccidentDetails" element={<AddAccidentDetails/>}/>
                <Route path="ChangePassword" element={<ChangePassword/>}/>
                <Route path="AddVehicleType" element={<AddVehicleType/>}/>
                <Route path="AddVehicleModel" element={<AddVehicleModel/>}/>
                <Route path="AddManufactureDetails" element={<AddManufactureDetails/>}/>
                <Route path="AddMaintenanceType" element={<AddMaintenanceType/>}/>
                <Route path="VehicleDetailsTable" element={<VehicleDetailsTable/>}/>
                <Route path="DriverDetails" element={<DriverDetails/>}/>
                <Route path="AddDriverDetails" element={<AddDriverDetails/>}/>
            </Route>
            <Route path="/app" element={<AnonymousLayout/>}>
                <Route path="login" element={<Login/>}/>
                <Route path="resetPassword" element={<ResetPassword/>}/>
                <Route path="ResetPasswordConfirmation" element={<ResetPasswordConfirmation/>}/>
                <Route path="ResetPassSuccess" element={<ResetPassSuccess/>}/>
                <Route path="ResetEmail" element={<ResetEmail/>}/>
                <Route path="DriverDetails" element={<DriverDetails/>}/>
                <Route path="AddDriverDetails" element={<AddDriverDetails/>}/>
                
            </Route>
        </Routes>
    );
}

