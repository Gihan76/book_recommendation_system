import React, { createContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    // if token available set use as logged in
    useEffect(() => {
        const token = localStorage.getItem('token');
        if(token){
            setUser({ loggedIn: true });
        }
    }, []);

    // login
    const login = (token) => {
        localStorage.setItem('token', token);
        setUser({ loggedIn: true });
        navigate('/dashboard'); ///////////////////////
    };

    // logout
    const logout = () => {
        localStorage.removeItem('token');
        setUser(null);
        navigate('/login'); //////////////////////
    };

    return(
        <AuthContext.Provider value={{ user, login, logout}}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContext;