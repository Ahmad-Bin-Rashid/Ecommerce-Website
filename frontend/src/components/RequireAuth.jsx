import { useLocation, Navigate, Outlet } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const RequireAuth = () => {
    const { state, isAuthenticated } = useAuth();
    const location = useLocation();
    console.log(state)
    return (
        isAuthenticated ? (
            <Outlet />
        ) : (
            <Navigate to="/unauthorized" state={{ from: location }} replace />
            )
    );
}

export default RequireAuth; 