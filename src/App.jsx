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
import AddVehicleMaintenanceDetails from "./pages/AddVehicleMaintenanceDetails.jsx";
import AddFuelRefillDetails from "./pages/AddFuelRefillDetails.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import AddMaintenanceType from "./pages/AddMaintenanceType.jsx";
import MaintenanceTable from "./pages/MaintenanceTable.jsx";
import MaintenanceTypeTable from "./pages/MaintenanceTypeTable.jsx";
import FuelRefillTable from "./pages/FuelRefillTable.jsx";
<<<<<<< HEAD
import VehicleDetailsTable from './pages/VehicleDetailsTable.jsx';
import DriverDetails from "./pages/DriverDetails.jsx";
import AddDriverDetails from "./pages/AddDriverDetails.jsx";
=======
import AddAccidentDetails from './pages/AddAccidentDetails.jsx';
import AddVehicleDetails from './pages/AddVehicleDetails.jsx';
import AddVehicleModel from './pages/AddVehicleModel.jsx';
import AddVehicleType from './pages/Driver.jsx';
import DriverDetails from './pages/DriverDetails.jsx';
import Helper from './pages/Helper.jsx';
import Staff from './pages/Staff.jsx';
import Trip from './pages/Trip.jsx';
import VehicleDetailsTable from './pages/VehicleDetailsTable.jsx';
import VehicleType from './pages/VehicleType.jsx';
import AddvehicletypeDetails from './pages/AddvehicletypeDetails.jsx';
>>>>>>> 4d9fd2b46f304d1002ebec0879b6b3684a9c792b


export default function App() {
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
                <Route path="AddAccidentDetails" element={<AddAccidentDetails/>}/>
                <Route path="AddVehicleDetails" element={<AddVehicleDetails />}/>
                <Route path="AddVehicleModel" element={<AddVehicleModel/>}/>
                <Route path="AddVehicleType" element={<AddVehicleType/>}/>
                <Route  path="DriverDetails" element={<DriverDetails/>}/>
                <Route path="Helper" element={<Helper/>}/>
                <Route path="Staff" element={<Staff/>}/>
                <Route path="Trip" element={<Trip />}/>
                <Route path="VehicleDetailsTable" element={<VehicleDetailsTable/>}/>
                <Route path='VehicleType' element={<VehicleType/>}/>
                <Route path='AddvehicletypeDetails' element={<AddvehicletypeDetails />}/>
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

