import React, { createContext, useState, useEffect } from 'react';
import { jwtDecode } from "jwt-decode";
import { useNavigate } from 'react-router-dom';
import { DASHBOARD, LOGIN } from '../config/constants';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    // if token available set use as logged in
    useEffect(() => {
        // on app load, check for the token in local storage
        const token = localStorage.getItem('token');
        if(token){
            try {
                const  decodedToken = jwtDecode(token); // decode the token
                const currentTime = Date.now() / 1000;  // current time in seconds
                if(decodedToken?.exp > currentTime){
                    // token is valid
                    console.log("🚀 ~ Token exists")
                    setUser({ loggedIn: true, ...decodedToken });
                }else{
                    // token is expired
                    console.log("🚀 ~ Token expired")
                    localStorage.removeItem('token'); // Clear the expired token
                    setUser(null);
                }
            } catch (error) {
                console.log('🚀 ~ Invalid token:',error);
                localStorage.removeItem('token'); // Clear the invalid token
                setUser(null);
            }
        }else{
            console.log('🚀 ~ No token found, redirecting to login.');
            navigate(LOGIN);
        }
    }, []);

    // login
    const login = (token) => {
        localStorage.setItem('token', token);
        setUser({ loggedIn: true, ...token });
        navigate(DASHBOARD);
    };

    // logout
    const logout = () => {
        localStorage.removeItem('token');
        setUser(null);
        navigate(LOGIN);
    };

    return(
        <AuthContext.Provider value={{ user, login, logout}}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContext;