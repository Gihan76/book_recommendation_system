import React, { useContext } from "react"
import AuthContext from "../context/AuthContext"
import { Navigate } from "react-router-dom";
import { DASHBOARD, LOGIN } from "../config/constants";

export const NavigateBasedOnAuth = () => {
    const { user } = useContext(AuthContext);

    // if authorized user directed to dashboard
    if(user?.loggedIn) {
        return <Navigate to={DASHBOARD} />
    }
    // if unauthorized redirects to login 
    return <Navigate to={LOGIN} />
}