import { useState, useCallback } from 'react';
import axiosInstance from '../api/axiosInstance';
import { toast } from 'react-hot-toast';

const useDashboard = () => {
    const [dashboardData, setDashboardData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchDashboardData = useCallback(async (period) => {
        setLoading(true);
        setError(null);
        try {
            const response = await axiosInstance.get(`/dashboard/summary?period=${period}`);
            if (response.data.status === 'success') {
                setDashboardData(response.data.data);
            } else {
                throw new Error(response.data.message || 'Gagal mengambil data rangkuman.');
            }
        } catch (err) {
            const errorMessage = err.response?.data?.message || err.message || 'Gagal memuat data dashboard.';
            setError({ message: errorMessage });
            toast.error(errorMessage);
        } finally {
            setLoading(false);
        }
    }, []); 

    return {
        dashboardData,
        loading,
        error,
        fetchDashboardData,
    };
};

export default useDashboard;