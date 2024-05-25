import './App.css';
import {Route, Routes} from 'react-router-dom';
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
import NotFound from './pages/NotFound';
import PrivateRoutes from './utils/PrivateRoutes';
import Login from "./pages/Login.jsx";

export default function App() {
    return (
        <Routes>
            <Route path="/auth" element={<AnonymousLayout/>}>
                <Route path="Login" element={<Login/>}/>
            </Route>
            <Route element={<PrivateRoutes/>}>
                <Route path="/app" element={<MainLayout/>}>
                    <Route path="Dashboard" element={<Dashboard/>} exact/>
                    <Route path="UserProfile" element={<UserProfile/>}/>
                    <Route path="Notification" element={<Notification/>}/>
                    <Route path="AddVehicleMaintenanceDetails" element={<AddVehicleMaintenanceDetails/>}/>
                    <Route path="AddFuelRefillDetails" element={<AddFuelRefillDetails/>}/>
                    <Route path="ChangePassword" element={<ChangePassword/>}/>
                    <Route path="AddMaintenanceType" element={<AddMaintenanceType/>}/>
                    <Route path="MaintenanceTable" element={<MaintenanceTable/>}/>
                    <Route path="MaintenanceTypeTable" element={<MaintenanceTypeTable/>}/>
                    <Route path="FuelRefillTable" element={<FuelRefillTable/>}/>
                    <Route path="EditMaintenanceType/:id" element={<EditMaintenanceType/>}/>
                </Route>
                <Route path="/auth" element={<AnonymousLayout/>}>
                    <Route path="Login" element={<Login/>}/>
                    <Route path="resetPassword" element={<ResetPassword/>}/>
                    <Route path="ResetPasswordConfirmation" element={<ResetPasswordConfirmation/>}/>
                    <Route path="ResetPassSuccess" element={<ResetPassSuccess/>}/>
                    <Route path="ResetEmail" element={<ResetEmail/>}/>
                </Route>
            </Route>
            <Route path="/unauthorized" element={<UnauthorizedPage/>}/>
            <Route path="/NotFound" element={<NotFound/>}/>
        </Routes>
    );
}
