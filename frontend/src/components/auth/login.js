import React, { useState, useContext } from "react";
import axiosInstance from "../../api/axiosInstance";
import AuthContext from "../../context/AuthContext";
import { LOGIN_ENDPOINT } from "../../config/constants";
import { useNavigate } from "react-router-dom";

const Login = () => {
    const { user, login } = useContext(AuthContext);
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });

    // check whether user is already logged in when navigate to login page
    if (user?.loggedIn) {
        navigate('/dashboard'); ////////////
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
        <form onSubmit={handleLogin}>
            <input type="email" placeholder="Email" value={formData.email} onChange={handleEmail} />
            <input type="password" placeholder="Password" value={formData.password} onChange={handlePassword} />
            <button type="submit">Login</button>
        </form>
    );
};

export default Login;