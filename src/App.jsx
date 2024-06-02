import './App.css';
import { Routes, Route, Navigate } from 'react-router-dom';
import { getToken, onMessage } from "firebase/messaging";
import { messaging } from "./firebase/firebaseConfig";
import MainLayout from './layouts/MainLayout';
import AnonymousLayout from './layouts/AnonymousLayout';
import ResetPassword from './pages/ResetPassword';
import ResetPasswordConfirmation from './pages/ResetPasswordConfirmation';
import ResetPassSuccess from './pages/ResetPassSuccess';
import ResetEmail from './pages/ResetEmail';
import UserProfile from './pages/UserProfile';
import ChangePassword from './pages/ChangePassword';
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
import AddVehicleDetails from "./pages/AddVehicleDetails.jsx";
import Driver from "./pages/Driver.jsx";
import Helper from "./pages/Helper.jsx";
import Staff from "./pages/Staff.jsx";
import Trip from "./pages/Trip.jsx";
import Reports from "./pages/Reports.jsx";
import AddAccidentDetails from "./pages/AddAccidentDetails.jsx";
import AddVehicleModel from "./pages/AddVehicleModel.jsx";
import AddManufactureDetails from "./pages/AddManufactureDetails.jsx";
import AddVehicleType from "./pages/AddVehicleType.jsx";
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
import {useEffect} from "react";
import {ChakraProvider, useToast} from "@chakra-ui/react";
import ResetPasswordDriverHelper from "./pages/ResetPasswordDriverHelper.jsx";

export default function App() {
    const currentUser = localStorage.getItem('Token');
    const { VITE_APP_VAPID_KEY } = import.meta.env;
    const toast = useToast();

    async function requestPermission() {
        try {
            const permission = await Notification.requestPermission();

            if (permission === "granted") {
                const token = await getToken(messaging, {
                    vapidKey: VITE_APP_VAPID_KEY,
                });
                console.log("Token generated: ", token);
            } else if (permission === "denied") {
                alert("You denied the notification");
            }
        } catch (error) {
            console.error("Error requesting permission or getting token: ", error);
        }
    }

    useEffect(() => {
        requestPermission();

        return () => unsubscribe();
    }, []);

        const unsubscribe = onMessage(messaging, (payload) => {
            console.log("Incoming message");
            toast({
                title: payload.notification.title,
                description: payload.notification.body,
                status: "success",
                duration: 5000,
                isClosable: true,
                position: "top-right",
            });
        });

    return (
        <ChakraProvider>
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
                            <Route path="AddVehicleMaintenanceDetails" element={<AddVehicleMaintenanceDetails />} />
                            <Route path="AddFuelRefillDetails" element={<AddFuelRefillDetails />} />
                            <Route path="ChangePassword" element={<ChangePassword />} />
                            <Route path="AddMaintenanceType" element={<AddMaintenanceType />} />
                            <Route path="MaintenanceTable" element={<MaintenanceTable />} />
                            <Route path="MaintenanceTypeTable" element={<MaintenanceTypeTable />} />
                            <Route path="FuelRefillTable" element={<FuelRefillTable />} />
                            <Route path="EditMaintenanceType/:id" element={<EditMaintenanceType />} />
                            <Route path="AddVehicleDetails" element={<AddVehicleDetails />} />
                            <Route path="Driver" element={<Driver />} />
                            <Route path="Helper" element={<Helper />} />
                            <Route path="Staff" element={<Staff />} />
                            <Route path="Trip" element={<Trip />} />
                            <Route path="Reports/*" element={<Reports />} />
                            <Route path="AddAccidentDetails" element={<AddAccidentDetails />} />
                            <Route path="ChangePassword" element={<ChangePassword />} />
                            <Route path="AddVehicleType" element={<AddVehicleType />} />
                            <Route path="AddVehicleModel" element={<AddVehicleModel />} />
                            <Route path="AddManufactureDetails" element={<AddManufactureDetails />} />
                            <Route path="VehicleDetailsTable" element={<VehicleDetailsTable />} />
                            <Route path="VehicleReports" element={<VehicleReports />} />
                            <Route path="VehicleDetailsReport" element={<VehicleDetailsReport />} />
                            <Route path="VehicleTypeReport" element={<VehicleTypeReport />} />
                            <Route path="VehicleModelReport" element={<VehicleModelReport />} />
                            <Route path="VehicleManufacturerReport" element={<VehicleManufacturerReport />} />
                            <Route path="VehicleMaintenanceReport" element={<VehicleMaintenanceReport />} />
                            <Route path="VehicleMaintenanceTypeReport" element={<VehicleMaintenanceTypeReport />} />
                            <Route path="VehicleFuelRefillReport" element={<VehicleFuelRefillReport />} />
                            <Route path="DriverReport" element={<DriverReport />} />
                            <Route path="HelperReport" element={<HelperReport />} />
                            <Route path="StaffReport" element={<StaffReport />} />
                            <Route path="TripReport" element={<TripReport />} />
                            <Route path="AccidentReport" element={<AccidentReport />} />
                            <Route path="ResetPasswordDriverHelper" element={<ResetPasswordDriverHelper />} />
                        </Route>
                    </Route>

                    {/* Unauthorized and NotFound routes */}
                    <Route path="/unauthorized" element={<UnauthorizedPage />} />
                    <Route path="*" element={<NotFound />} />

                    {/* Default route handling */}
                    <Route path="/"
                           element={currentUser ? <Navigate to="/app/Dashboard" /> : <Navigate to="/auth/Login" />} />
                </Routes>
        </ChakraProvider>
    );
}
