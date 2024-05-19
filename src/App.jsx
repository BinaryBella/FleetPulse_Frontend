import './App.css'
import {Navigate, Route, Routes} from "react-router-dom";
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
import AddVehicleMaintenanceDetails from "./pages/AddVehicleMaintenanceDetails.jsx";
import AddFuelRefillDetails from "./pages/AddFuelRefillDetails.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import AddMaintenanceType from "./pages/AddMaintenanceType.jsx";
import MaintenanceTable from "./pages/MaintenanceTable.jsx";
import MaintenanceTypeTable from "./pages/MaintenanceTypeTable.jsx";
import FuelRefillTable from "./pages/FuelRefillTable.jsx";
import EditMaintenanceType from "./pages/EditMaintenanceType.jsx";

export default function App() {

    const token = localStorage.getItem("Token");

    return (
        <Routes>
            <Route path="/app" element={<MainLayout/>}>
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
                <Route path="EditMaintenanceType/:id" element={<EditMaintenanceType />} />

            </Route>
            <Route path="/auth" element={<AnonymousLayout/>}>
                <Route path="login" element={<Login/>}/>
                <Route path="resetPassword" element={<ResetPassword/>}/>
                <Route path="ResetPasswordConfirmation" element={<ResetPasswordConfirmation/>}/>
                <Route path="ResetPassSuccess" element={<ResetPassSuccess/>}/>
                <Route path="ResetEmail" element={<ResetEmail/>}/>
            </Route>
            <Route path="/" element={token == null ? <Navigate to="/auth/Login" /> : <Navigate to="/app/Dashboard" />}/>
        </Routes>
    );
}

