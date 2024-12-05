import React, { useContext } from "react"
import AuthContext from "../context/AuthContext"

export const DashboardPage = () => {
    const { user, logout } = useContext(AuthContext);

    return (
        <div className="container">
            {/* Header */}
            <header className="d-flex justify-content-between align-items-center py-3">
                <h1 className="h4">Book Recommendation System</h1>
                <div className="dropdown">
                    <img
                        src={`${process.env.PUBLIC_URL}/assets/avatar.png`}
                        alt="Avatar"
                        className="rounded-circle"
                        style={{ cursor: 'pointer', width: "40px", height: "40px" }}
                        id="avatarDropdown"
                        data-bs-toggle="dropdown"
                        title={user?.email} // Tooltip with email
                    />
                    <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="avatarDropdown">
                        <li>
                            <button className="dropdown-item" onClick={logout}>
                                Logout
                            </button>
                        </li>
                    </ul>
                </div>
            </header>

            {/* Main Content */}
            <main>
                <p>Welcome to your dashboard!</p>
            </main>
        </div>
    )
}