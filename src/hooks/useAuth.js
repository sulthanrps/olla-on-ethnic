import { useState, useCallback } from 'react';
import axiosInstance from '../api/axiosInstance';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const useAuth = () => {
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const register = useCallback(async (userData) => {
        setLoading(true);
        try {
            await axiosInstance.post('/auth/register', userData);
            toast.success('Registrasi berhasil! Silakan login.');
            setTimeout(() => {
                navigate('/login'); 
            }, 2000); 
        } catch (err) {
            const errorMessage = err.response?.data?.message || 'Registrasi gagal.';
            toast.error(errorMessage);
        } finally {
            setLoading(false);
        }
    }, [navigate]);

    const login = useCallback(async (credentials) => {
        setLoading(true);
        try {
            const response = await axiosInstance.post('/auth/login', credentials);
            localStorage.setItem('authToken', response.data.token);
            toast.success('Login berhasil!');
            setTimeout(() => {
                navigate('/'); 
            }, 1200);
        } catch (err) {
            const errorMessage = err.response?.data?.message || 'Login gagal.';
            toast.error(errorMessage);
        } finally {
            setLoading(false);
        }
    }, [navigate]);
    
    const logout = useCallback(() => {
        localStorage.removeItem('authToken');
        navigate('/login');
    }, [navigate]);

    return {
        loading,
        register,
        login,
        logout
    };
};

export default useAuth;