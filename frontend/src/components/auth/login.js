import React, { useState, useContext } from "react";
import axiosInstance from "../../api/axiosInstance";
import AuthContext from "../../context/AuthContext";
import { DASHBOARD, LOGIN_ENDPOINT, SIGNUP } from "../../config/constants";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
    const { user, login } = useContext(AuthContext);
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });

    // check whether user is already logged in when navigate to login page
    if (user?.loggedIn) {
        navigate(DASHBOARD);
        return null;
    }

    const handleEmail = (e) => {
        setFormData({
            ...formData,
            email: e.target.value,
        });
    }

    const handlePassword = (e) => {
        setFormData({
            ...formData,
            password: e.target.value,
        });
    };

    const handleLogin = async(e) => {
        e.preventDefault();
        try {
            const { data } = await axiosInstance.post(LOGIN_ENDPOINT, formData);
            login(data?.token);
        } catch (error) {
            console.log("🚀 ~ handleLogin ~ error:", error)
            alert(error?.response?.data?.error || 'Login failed!');
        }
    };

    return(
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-md-4">
                    <h2 className="text-center mb-4">Login</h2>
                    <form onSubmit={handleLogin}>
                        <div className="mb-3">
                            <label htmlFor="email" className="form-label">Email address</label>
                            <input
                                type="email"
                                className="form-control"
                                id="email"
                                value={formData.email}
                                onChange={handleEmail}
                                required
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="password" className="form-label">Password</label>
                            <input
                                type="password"
                                className="form-control"
                                id="password"
                                value={formData.password}
                                onChange={handlePassword}
                                required
                            />
                        </div>
                        <div className="d-flex justify-content-between align-items-center">
                            <button type="submit" className="btn btn-primary">Login</button>
                            <Link to={SIGNUP} className="text-decoration-none">Don't have an account? Sign Up</Link>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Login;