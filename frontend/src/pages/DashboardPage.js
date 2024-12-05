import React, { useContext } from "react"
import AuthContext from "../context/AuthContext"

export const DashboardPage = () => {
    const { logout } = useContext(AuthContext);

    return (
        <div>
            <h1>Dashboard</h1>
            <button onClick={logout}>Logout</button>
        </div>
    )
}