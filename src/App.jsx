import './App.css';
import { Route, Routes, Navigate } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import AnonymousLayout from './layouts/AnonymousLayout';
import Login from './pages/Login';
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
import ProtectedRoute from './components/ProtectedRoute';
import { AuthProvider } from './context/AuthContext';

export default function App() {
    return (
        <AuthProvider>
            <Routes>
                <Route path="/app" element={<MainLayout />}>
                    <Route
                        path="Dashboard"
                        element={
                            <ProtectedRoute>
                                <Dashboard />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="UserProfile"
                        element={
                            <ProtectedRoute>
                                <UserProfile />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="Notification"
                        element={
                            <ProtectedRoute>
                                <Notification />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="AddVehicleMaintenanceDetails"
                        element={
                            <ProtectedRoute>
                                <AddVehicleMaintenanceDetails />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="AddFuelRefillDetails"
                        element={
                            <ProtectedRoute>
                                <AddFuelRefillDetails />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="ChangePassword"
                        element={
                            <ProtectedRoute>
                                <ChangePassword />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="AddMaintenanceType"
                        element={
                            <ProtectedRoute>
                                <AddMaintenanceType />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="MaintenanceTable"
                        element={
                            <ProtectedRoute>
                                <MaintenanceTable />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="MaintenanceTypeTable"
                        element={
                            <ProtectedRoute>
                                <MaintenanceTypeTable />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="FuelRefillTable"
                        element={
                            <ProtectedRoute>
                                <FuelRefillTable />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="EditMaintenanceType/:id"
                        element={
                            <ProtectedRoute>
                                <EditMaintenanceType />
                            </ProtectedRoute>
                        }
                    />
                </Route>
                <Route path="/auth" element={<AnonymousLayout />}>
                    <Route path="login" element={<Login />} />
                    <Route path="resetPassword" element={<ResetPassword />} />
                    <Route path="ResetPasswordConfirmation" element={<ResetPasswordConfirmation />} />
                    <Route path="ResetPassSuccess" element={<ResetPassSuccess />} />
                    <Route path="ResetEmail" element={<ResetEmail />} />
                </Route>
                <Route path="/unauthorized" element={<UnauthorizedPage />} />
            </Routes>
        </AuthProvider>
    );
}
