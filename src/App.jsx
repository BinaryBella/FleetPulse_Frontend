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
import VehicleDetailsTable from './pages/VehicleDetailsTable.jsx';
import DriverDetails from "./pages/DriverDetails.jsx";
import AccidentDetails from "./pages/AccidentDetails.jsx";
 import AddAccidentDetails from "./pages/AddAccidentDetails.jsx";
 import AddVehicleDetails from "./pages/AddVehicleDetails.jsx";
 import AddVehicleModel from "./pages/AddVehicleModel.jsx";
 import AddVehicleType from "./pages/AddVehicleType.jsx";
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
import AddManufacturerTypeDetails from "./pages/AddManufacturerTypeDetails.jsx";
import EditAccidentDetails from "./pages/EditAccidentDetails.jsx";
import EditVehicleDetails from "./pages/EditVehicleDetails.jsx";
import EditVehicleType from "./pages/EditVehicleType.jsx";
import EditDriverDetails from "./pages/EditDriverDetails.jsx";
import EditHelperDetails from "./pages/EditHelperDetails.jsx";
import EditStaffDetails from "./pages/EditStaffDetails.jsx";
import EditTripDetails from "./pages/EditTripDetails.jsx";
import EditManufacturerTypeDetails from "./pages/EditManufacturerTypeDetails.jsx";
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
                <Route path="AccidentDetails" element={<AccidentDetails/>}/>
                <Route path="AddAccidentDetails" element={<AddAccidentDetails/>}/>
                <Route path="AddVehicleDetails" element={<AddVehicleDetails />}/>
                <Route path="AddVehicleModel" element={<AddVehicleModel/>}/>
                <Route path="AddVehicleType" element={<AddVehicleType/>}/>
                <Route  path="DriverDetails" element={<DriverDetails/>}/>
                <Route  path="AddDriverDetails" element={<AddDriverDetails/>}/>
                <Route path="AddHelperDetails" element={<AddHelperDetails/>}/>
                <Route path="HelperDetails" element={<HelperDetails/>}/>
                <Route path="AddStaffDetails" element={<AddStaffDetails/>}/>
                <Route path="StaffDetails" element={<StaffDetails/>}/>
                <Route path="AddTripDetails" element={<AddTripDetails />}/>
                <Route path="TripDetails" element={<TripDetails />}/>
                <Route path="VehicleDetailsTable" element={<VehicleDetailsTable/>}/>
                <Route path='VehicleType' element={<VehicleType/>}/>
                <Route path='AddvehicletypeDetails' element={<AddvehicletypeDetails />}/>
                <Route path='Manufacturer' element={<Manufacturer />}/>
                <Route path='AddManufacturerTypeDetails' element={<AddManufacturerTypeDetails />}/>
                <Route path='EditAccidentDetails' element={<EditAccidentDetails />}/>
                <Route path='EditVehicleDetails/:id' element={<EditVehicleDetails />}/>
                <Route path='EditVehicleType/:id' element={<EditVehicleType />}/>
                <Route path='EditDriverDetails' element={<EditDriverDetails />}/>
                <Route path='EditHelperDetails' element={<EditHelperDetails />}/>
                <Route path='EditStaffDetails' element={<EditStaffDetails />}/>
                <Route path='EditTripDetails' element={<EditTripDetails />}/>
                <Route path='EditManufacturerTypeDetails/:id' element={<EditManufacturerTypeDetails />}/>


                
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

