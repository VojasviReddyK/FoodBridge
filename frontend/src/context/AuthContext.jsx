import { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(localStorage.getItem('token') || null);
    const [loading, setLoading] = useState(true);

    // Axios instance with default headers
    const api = axios.create({
        baseURL: 'http://localhost:5000/api',
    });

    if (token) {
        api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    }

    useEffect(() => {
        const fetchUser = async () => {
            if (!token) {
                setLoading(false);
                return;
            }
            try {
                const { data } = await api.get('/auth/profile');
                setUser(data);
            } catch (error) {
                console.error("Error fetching user profile", error);
                logout();
            } finally {
                setLoading(false);
            }
        };

        fetchUser();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [token]);

    const login = async (email, password) => {
        const { data } = await api.post('/auth/login', { email, password });
        localStorage.setItem('token', data.token);
        setToken(data.token);
        setUser(data);
        return data;
    };

    const register = async (userData) => {
        const { data } = await api.post('/auth/register', userData);
        localStorage.setItem('token', data.token);
        setToken(data.token);
        setUser(data);
        return data;
    };

    const logout = () => {
        localStorage.removeItem('token');
        setToken(null);
        setUser(null);
        delete api.defaults.headers.common['Authorization'];
    };

    return (
        <AuthContext.Provider value={{ user, token, loading, login, register, logout, api }}>
            {children}
        </AuthContext.Provider>
    );
};
