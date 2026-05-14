import { Navigate, Outlet } from "react-router";

const PrivateRoute = () => {

    const isAuthenticated = localStorage.getItem("accessToken");

    // Allow access during local development while UI is being built.
    if (!isAuthenticated && !import.meta.env.DEV) {
        return <Navigate to="/login" replace />;
    }

    return <Outlet />;
};

export default PrivateRoute;
