import React, { useContext } from "react"
import AuthContext from "../context/AuthContext"
import { Tooltip as ReactTooltip } from 'react-tooltip';
import 'react-tooltip/dist/react-tooltip.css'

export const DashboardPage = () => {
    const { user, logout } = useContext(AuthContext);

    return (
        <div>
            {/* Header */}
            <header className="d-flex justify-content-between align-items-center py-3" style={{backgroundColor: "#ccffff"}}>
                <h1 className="h4" style={{marginLeft: "20px"}}>Book Recommendation System <i class="fas fa-book"></i></h1>
                <div className="dropdown" style={{marginRight: "20px"}}>
                    {/* user avatar */}
                    <img
                        src={`${process.env.PUBLIC_URL}/assets/avatar.png`}
                        alt="User Avatar"
                        className="rounded-circle"
                        style={{ cursor: 'pointer', width: "40px", height: "40px", border: '1px solid' }}
                        id="avatarDropdown"
                        data-bs-toggle="dropdown"
                        data-tooltip-id="email-tooltip"
                    />
                    {/* email tooltip when hover on user avatar */}
                    <ReactTooltip
                        id="email-tooltip"
                        content={user?.email}
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
            <main className="container" style={{marginTop: "20px"}}>
                <p>Welcome to your dashboard!</p>
            </main>
        </div>
    )
}