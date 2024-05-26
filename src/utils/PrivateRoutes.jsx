import { Navigate, Outlet } from "react-router-dom";

const PrivateRoutes = () => {
    const isAuthenticated = localStorage.getItem("Token") ? true : false;

    if (!isAuthenticated) {
        return <Navigate to="/auth/login" />;
    } else {
        return <Outlet />;
    }
};

export default PrivateRoutes;
