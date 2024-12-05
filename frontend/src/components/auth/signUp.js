import { useState } from "react";
import axiosInstance from "../../api/axiosInstance";
import { sign_up_backend } from "../../config/constants";

const SignUp = () => {
    const [formData, setFormData] = useState({
        email: "",
        username: "",
        password: "",
    });

    const handleUsername = (e) => {
        // console.log("🚀 ~ handleUsername ~ e:", e.target.value)
        setFormData({
            ...formData,
            username: e.target.value,
        });
    };

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

    const handleSignUp = async (e) => {
        e.preventDefault();
        try {
            await axiosInstance.post(sign_up_backend, formData);
            alert('Sign Up successful! you can now log in');
        } catch (error) {
            console.log("🚀 ~ handleSignUp ~ error:", error)
            alert(error.response?.data?.error || 'Sign Up failed!');
        }
    }

    return(
        <form onSubmit={handleSignUp}>
            <input type="text" placeholder="Username" value={formData.username} onChange={handleUsername} />
            <input type="email" placeholder="Email" value={formData.email} onChange={handleEmail} />
            <input type="password" placeholder="Password" value={formData.password} onChange={handlePassword} />
            <button type="submit">Sign Up</button>
        </form>
    );
};

export default SignUp;