// frontend/src/contexts/AuthContext.js
import React, { createContext, useState, useEffect } from 'react';
import authService from '../services/authService'; // Import authService

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const checkAuth = async () => {
            setIsLoading(true);
            try {
                const storedUser = localStorage.getItem('user');
                const token = localStorage.getItem('token');

                if (storedUser) {
                    try {
                        const parsedUser = JSON.parse(storedUser);
                        setUser(parsedUser);
                    } catch (parseError) {
                        console.error("Error parsing user data:", parseError);
                        localStorage.removeItem('user');
                        localStorage.removeItem('token');
                        setUser(null);
                    }
                } else {
                    setUser(null);
                }
            } catch (error) {
                console.error("Error checking auth:", error);
                localStorage.removeItem('user');
                localStorage.removeItem('token');
                setUser(null);
            } finally {
                setIsLoading(false);
            }
        };
        checkAuth();
    }, []);

    const login = async (userData) => {
        try {
            const response = await authService.login(userData);
            if (response && response.token) {
                localStorage.setItem('user', JSON.stringify(response)); // Store the whole response
                localStorage.setItem('token', response.token);
                setUser(response); // Set user to the entire response object
            } else {
                console.warn("Invalid login response:", response);
                throw new Error("Invalid login response");
            }
        } catch (error) {
            console.error("Login failed:", error);
            throw error;
        }
    };

    const register = async (userData) => {
        try {
            const response = await authService.register(userData);
            if (response && response.token) {
                localStorage.setItem('user', JSON.stringify(response)); // Store the whole response
                localStorage.setItem('token', response.token);
                setUser(response); // Set user to the entire response object
            } else {
                console.warn("Invalid registration response:", response);
                throw new Error("Invalid registration response");
            }
        } catch (error) {
            console.error("Registration failed:", error);
            throw error;
        }
    };

    const logout = () => {
        localStorage.removeItem('user');
        localStorage.removeItem('token');
        setUser(null);
    };

    const value = {
        user,
        isLoading,
        login,
        register,
        logout
    };

    return (
        <AuthContext.Provider value={value}>
            {!isLoading && children}
        </AuthContext.Provider>
    );
};