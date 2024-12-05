import React, { useState, useContext } from "react";
import axiosInstance from "../../api/axiosInstance";
import AuthContext from "../../context/AuthContext";
import { login_backend } from "../../config/constants";

const Login = () => {
    const { login } = useContext(AuthContext);
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });

    const handleEmail = (e) => {
        // console.log("🚀 ~ handleEmail ~ e:", e.target.value)
        setFormData({
            ...formData,
            email: e.target.value,
        });
    }

    const handlePassword = (e) => {
        // console.log("🚀 ~ handlePassword ~ e:", e.target.value)
        setFormData({
            ...formData,
            password: e.target.value,
        });
    };

    const handleLogin = async(e) => {
        e.preventDefault();
        try {
            const { data } = await axiosInstance.post(login_backend, formData);
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