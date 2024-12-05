import { useState } from "react";
import axiosInstance from "../../api/axiosInstance";
import { LOGIN, SIGNUP_ENDPOINT } from "../../config/constants";
import { Link } from "react-router-dom";

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

    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-md-4">
                    <h2 className="text-center mb-4">Sign Up</h2>
                    <form onSubmit={handleSignUp}>
                        <div className="mb-3">
                            <label htmlFor="username" className="form-label">Username</label>
                            <input
                                type="text"
                                className="form-control"
                                id="username"
                                value={formData.username}
                                onChange={handleUsername}
                                required
                            />
                        </div>
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
                            <button type="submit" className="btn btn-primary">Sign Up</button>
                            <Link to={LOGIN} className="text-decoration-none">Already have an account? Login</Link>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default SignUp;