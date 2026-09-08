import { Navigate, Outlet } from "react-router-dom";

function ProtectedRoute() {
    const token =
        localStorage.getItem("access_token") ||
        sessionStorage.getItem("access_token");

    const isAdmin = localStorage.getItem("is_admin") === "true";

    if (!token) {
        return <Navigate to="/LogIn" replace />;
    }

    if (!isAdmin) {
        return <Navigate to="/" replace />;
    }

    return <Outlet />;
}

export default ProtectedRoute;