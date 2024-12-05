import { useState } from "react";
import axiosInstance from "../../api/axiosInstance";
import { SIGNUP_ENDPOINT } from "../../config/constants";

const SignUp = () => {
    const [formData, setFormData] = useState({
        email: "",
        username: "",
        password: "",
    });

    const handleUsername = (e) => {
        setFormData({
            ...formData,
            username: e.target.value,
        });
    };

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

    const handleSignUp = async (e) => {
        e.preventDefault();
        try {
            await axiosInstance.post(SIGNUP_ENDPOINT, formData);
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