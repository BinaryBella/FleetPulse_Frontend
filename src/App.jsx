import './App.css';
import { useEffect, useState } from "react";
import { Routes, Route, Navigate } from 'react-router-dom';
import { ChakraProvider } from "@chakra-ui/react";
import { NotificationProvider } from './context/NotificationContext';
import MainLayout from './layouts/MainLayout';
import AnonymousLayout from './layouts/AnonymousLayout';
import NotificationHandler from './components/NotificationHandler';
import Notifications from './pages/Notifications';
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
import ResetPasswordDriverHelper from "./pages/ResetPasswordDriverHelper.jsx";
import VehicleMaintenanceConfiguration from "./pages/VehicleMaintenanceConfiguration.jsx";
import VehicleMaintenanceConfigurationTable from "./pages/VehicleMaintenanceConfigurationTable.jsx";
import EditMaintenance from "./pages/EditMaintenance.jsx";
import EditFuelRefillDetails from "./pages/EditFuelRefillDetails.jsx";
import EditVehicleMaintenanceConfiguration from "./pages/EditVehicleMaintenanceConfiguration.jsx";

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
    const [isAdmin, setIsAdmin] = useState(false);

    useEffect(() => {
        const currentUser = localStorage.getItem('Token');
        const userRole = sessionStorage.getItem('UserRole');

        if (currentUser && userRole === 'Admin') {
            setIsAdmin(true);
        } else {
            setIsAdmin(false);
        }
    }, []);

    // Update isAdmin in localStorage whenever it changes
    useEffect(() => {
        localStorage.setItem('isAdmin', isAdmin);
    }, [isAdmin]);

    return (
        <ChakraProvider>
            <NotificationProvider>
                <NotificationHandler />
                <Routes>
                    {/* Public routes */}
                    <Route path="/auth/" element={<AnonymousLayout />}>
                        <Route path="/auth/Login" element={<Login />} />
                        <Route path="/auth/ResetEmail" element={<ResetEmail />} />
                        <Route path="/auth/ResetPassword" element={<ResetPassword />} />
                        <Route path="/auth/ResetPasswordConfirmation" element={<ResetPasswordConfirmation />} />
                        <Route path="/auth/ResetPassSuccess" element={<ResetPassSuccess />} />
                    </Route>

                    {/* Private routes for Admin and Staff */}
                    <Route element={<PrivateRoutes roles={['Admin', 'Staff']} />}>
                        <Route path="/app/" element={<MainLayout isAdmin={isAdmin} />}>
                            <Route path="/app/AddAccidentDetails" element={<AddAccidentDetails/>}/>
                            <Route path="/app/Dashboard" element={<Dashboard />} />
                            <Route path="/app/UserProfile" element={<UserProfile />} />
                            <Route path="/app/AddVehicleMaintenanceDetails" element={<AddVehicleMaintenanceDetails />} />
                            <Route path="/app/AddFuelRefillDetails" element={<AddFuelRefillDetails />} />
                            <Route path="/app/ChangePassword" element={<ChangePassword />} />
                            <Route path="/app/MaintenanceTable" element={<MaintenanceTable />} />
                            <Route path="/app/MaintenanceTypeTable" element={<MaintenanceTypeTable />} />
                            <Route path="/app/FuelRefillTable" element={<FuelRefillTable />} />
                            <Route path="/app/EditMaintenanceType/:id" element={<EditMaintenanceType />} />
                            <Route path="/app/EditMaintenance/:id" element={<EditMaintenance />} />
                            <Route path="/app/EditFuelRefillDetails/:id" element={<EditFuelRefillDetails />} />
                            <Route path="/app/EditVehicleMaintenanceConfiguration/:id" element={<EditVehicleMaintenanceConfiguration />} />
                            <Route path="/app/AddVehicleDetails" element={<AddVehicleDetails />} />
                            <Route path="/app/AddMaintenanceType" element={<AddMaintenanceType />} />
                            <Route path="/app/Driver" element={<Driver />} />
                            <Route path="/app/Helper" element={<Helper />} />
                            <Route path="/app/Trip" element={<Trip />} />
                            <Route path="/app/Reports/*" element={<Reports />} />
                            <Route path="/app/AddAccidentDetails" element={<AddAccidentDetails />} />
                            <Route path="/app/AddVehicleType" element={<AddVehicleType />} />
                            <Route path="/app/AddVehicleModel" element={<AddVehicleModel />} />
                            <Route path="/app/AddManufactureDetails" element={<AddManufactureDetails />} />
                            <Route path="/app/VehicleDetailsTable" element={<VehicleDetailsTable />} />
                            <Route path="/app/VehicleReports" element={<VehicleReports />} />
                            <Route path="/app/VehicleDetailsReport" element={<VehicleDetailsReport />} />
                            <Route path="/app/VehicleTypeReport" element={<VehicleTypeReport />} />
                            <Route path="/app/VehicleModelReport" element={<VehicleModelReport />} />
                            <Route path="/app/VehicleManufacturerReport" element={<VehicleManufacturerReport />} />
                            <Route path="/app/VehicleMaintenanceReport" element={<VehicleMaintenanceReport />} />
                            <Route path="/app/VehicleMaintenanceTypeReport" element={<VehicleMaintenanceTypeReport />} />
                            <Route path="/app/VehicleFuelRefillReport" element={<VehicleFuelRefillReport />} />
                            <Route path="/app/DriverReport" element={<DriverReport />} />
                            <Route path="/app/HelperReport" element={<HelperReport />} />
                            <Route path="/app/TripReport" element={<TripReport />} />
                            <Route path="/app/AccidentReport" element={<AccidentReport />} />
                            <Route path="/app/Notification" element={<Notifications />} />
                            <Route path="/app/VehicleMaintenanceConfiguration" element={<VehicleMaintenanceConfiguration />} />
                            <Route path="VehicleMaintenanceConfigurationTable" element={<VehicleMaintenanceConfigurationTable/>} />
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
                            <Route path='EditAccidentDetails/:id' element={<EditAccidentDetails />}/>
                            <Route path='EditVehicleDetails/:id' element={<EditVehicleDetails />}/>
                            <Route path='EditVehicleType/:id' element={<EditVehicleType />}/>
                            <Route path='EditDriverDetails/:id' element={<EditDriverDetails />}/>
                            <Route path='EditHelperDetails/:id' element={<EditHelperDetails />}/>
                            <Route path='EditStaffDetails/:id' element={<EditStaffDetails />}/>
                            <Route path='EditTripDetails/:id' element={<EditTripDetails />}/>
                            <Route path='EditManufacturerTypeDetails/:id' element={<EditManufacturerTypeDetails />}/>

                        </Route>
                    </Route>

                    {/* Admin-only routes */}
                    <Route element={<PrivateRoutes roles={['Admin']} />}>
                        <Route path="/app/" element={<MainLayout isAdmin={isAdmin} />}>
                            <Route path="/app/Staff" element={<Staff />} />
                            <Route path='EditStaffDetails/:id' element={<EditStaffDetails />}/>
                            <Route path="/app/ResetPasswordDriverHelper" element={<ResetPasswordDriverHelper />} />
                            <Route path="/app/StaffReport" element={<StaffReport />} />

                        </Route>
                    </Route>

                    {/* Unauthorized and NotFound routes */}
                    <Route path="/unauthorized" element={<UnauthorizedPage />} />
                    <Route path="*" element={<NotFound />} />

                    {/* Default route handling */}
                    <Route
                        path="/"
                        element={
                            isAdmin ? (
                                <Navigate to="/app/Dashboard" />
                            ) : (
                                <Navigate to="/auth/Login" />
                            )
                        }
                    />
                </Routes>
            </NotificationProvider>
        </ChakraProvider>
    );
}
