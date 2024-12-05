import { useContext } from "react";
import AuthContext from "../context/AuthContext";
import { Navigate } from "react-router-dom";

export const ProtectedRoute = ({ children }) => {
    const { user } = useContext(AuthContext);
    return user?.loggedIn ? children : <Navigate to="/login" /> ////////////////////////
};