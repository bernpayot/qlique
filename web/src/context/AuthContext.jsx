import { createContext, useContext, useState, useEffect } from 'react';
import { apiService } from '../services/api';
import { jwtDecode } from 'jwt-decode';

const AuthContext = createContext();

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [claims, setClaims] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        checkAuthStatus();
    }, []);

    const checkAuthStatus = async () => {
        try {
            const token = localStorage.getItem('accessToken');
            if (token) {
                setClaims(jwtDecode(token));
                const response = await apiService.getCurrentUser();
                setUser(response.user);
            }
        } catch (error) {
            localStorage.removeItem('accessToken');
            setClaims(null);
        } finally {
            setLoading(false);
        }
    };

    const login = async (email, password) => {
        try {
            setError(null);
            const response = await apiService.login({ email, password });

            localStorage.setItem('accessToken', response.session.access_token);
            setUser(response.user);
            setClaims(jwtDecode(response.session.access_token));

            return { success: true };
        } catch (error) {
            setError(error.message);
            return { success: false, error: error.message };
        }
    };

    const register = async (userData) => {
        try {
            setError(null);
            const response = await apiService.register(userData);

            const loginResult = await login(userData.email, userData.password);
            return loginResult;
        } catch (error) {
            setError(error.message);
            return { success: false, error: error.message };
        }
    };

    const logout = async () => {
        try {
            await apiService.logout();
        } catch (error) {
            console.error('Logout error: ', error);
        } finally {
            localStorage.removeItem('accessToken');
            setUser(null);
            setClaims(null);
        }
    };

    const value = {
        user,
        claims,
        loading,
        error,
        login,
        register,
        logout,
        isAuthenticated: !!user,
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};