import { useContext } from "react";
import AuthContext from "../context/AuthContext";
import { Navigate } from "react-router-dom";
import { LOGIN } from "../config/constants";

export const ProtectedRoute = ({ children }) => {
    const { user } = useContext(AuthContext);

    if (user === null) {
        return <div>Loading...</div>
    }

    // if unauthorized redirect to login
    if (!user?.loggedIn) {
        return <Navigate to={LOGIN} />
    }
    // else authorize protected routes
    return children; // Render the protected content
};