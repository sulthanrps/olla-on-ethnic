import React from "react";
import { Routes, Navigate, Route } from "react-router-dom";
import DashboardPage from "../pages/DashboardPage";
import ProductsPage from "../pages/ProductsPage";
import StaffPage from "../pages/StaffPage";
import CustomersPage from "../pages/CustomersPage";
import TransactionsPage from "../pages/TransactionsPage";
import LoginPage from "../pages/LoginPage"; 
import RegisterPage from "../pages/RegisterPage"; 
import AdminRoute from "../components/AdminRoute"; 
import Layout from "../layout/Layout";
import ProtectedRoute from "../components/ProtectedRoute";

export default function AppRoutes() {
    return (
        <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route element={<ProtectedRoute />}>
                <Route element={<Layout />}>
                    <Route path="/" element={<Navigate replace to="/dashboard" />} />
                    <Route path="/dashboard" element={<DashboardPage />} />
                    <Route path="/products" element={<ProductsPage />} />
                    <Route path="/customers" element={<CustomersPage />} />
                    <Route path="/transactions" element={<TransactionsPage />} />
                    <Route element={<AdminRoute />}>
                        <Route path="/staff" element={<StaffPage />} />
                    </Route>
                </Route>
            </Route>
            <Route path="*" element={<div>Halaman Tidak Ditemukan</div>} />
        </Routes>
    );
}