import './App.css';
import { Route, Routes, Navigate } from 'react-router-dom';
import MainLayout from './layouts/MainLayout.jsx';
import AnonymousLayout from './layouts/AnonymousLayout.jsx';
import Login from './pages/Login.jsx';
import ResetPassword from './pages/ResetPassword.jsx';
import ResetPasswordConfirmation from './pages/ResetPasswordConfirmation.jsx';
import ResetPassSuccess from './pages/ResetPassSuccess.jsx';
import ResetEmail from './pages/ResetEmail.jsx';
import UserProfile from './pages/UserProfile.jsx';
import ChangePassword from './pages/ChangePassword.jsx';
import Notification from './pages/Notification.jsx';
import AddVehicleMaintenanceDetails from './pages/AddVehicleMaintenanceDetails.jsx';
import AddFuelRefillDetails from './pages/AddFuelRefillDetails.jsx';
import Dashboard from './pages/Dashboard.jsx';
import AddMaintenanceType from './pages/AddMaintenanceType.jsx';
import MaintenanceTable from './pages/MaintenanceTable.jsx';
import MaintenanceTypeTable from './pages/MaintenanceTypeTable.jsx';
import FuelRefillTable from './pages/FuelRefillTable.jsx';
import EditMaintenanceType from './pages/EditMaintenanceType.jsx';
import UnauthorizedPage from './pages/UnauthorizedPage.jsx';
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
                <Route path="/" element={<Navigate to="/auth/login" />} />
            </Routes>
        </AuthProvider>
    );
}
