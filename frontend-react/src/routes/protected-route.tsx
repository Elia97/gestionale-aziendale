import { Navigate, Outlet } from "react-router-dom";
import { useAppSelector } from "@/hooks/redux";
import { selectAuth } from "@/store/slices/auth-slice";

export default function ProtectedRoute() {
    const { user, token } = useAppSelector(selectAuth);

    // Qui puoi decidere: basta il token? O vuoi anche controllare che ci sia user?
    if (!token || !user) {
        return <Navigate to="/login" replace />;
    }

    return <Outlet />;
}
