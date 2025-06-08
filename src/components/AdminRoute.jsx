// src/components/AdminRoute.jsx

import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import { toast } from 'react-hot-toast';

const AdminRoute = () => {
    try {
        const token = localStorage.getItem('authToken');
        if (!token) {
            return <Navigate to="/login" replace />;
        }

        const decodedUser = jwtDecode(token);

        if (decodedUser.nama === 'Ola') {
            return <Outlet />;
        } else {
            toast.error("Anda tidak memiliki hak akses ke halaman ini.");
            return <Navigate to="/dashboard" replace />;
        }

    } catch (error) {
        console.error("Invalid token:", error);
        localStorage.removeItem('authToken'); 
        return <Navigate to="/login" replace />;
    }
};

export default AdminRoute;