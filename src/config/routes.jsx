import React from "react";
import { Routes, Navigate, Route } from "react-router-dom";
import DashboardPage from "../pages/DashboardPage";
import ProductsPage from "../pages/ProductsPage";
import StaffPage from "../pages/StaffPage";
import CustomersPage from "../pages/CustomersPage";
import TransactionsPage from "../pages/TransactionsPage";
import Layout from "../layout/Layout";

export default function AppRoutes() {
    return (
        <Layout>
            <Routes>
                <Route path="/" element={<Navigate replace to="/dashboard" />} />
                <Route path="/dashboard" element={<DashboardPage />} />
                <Route path="/products" element={<ProductsPage />} />
                <Route path="/staff" element={<StaffPage />} />
                <Route path="/customers" element={<CustomersPage />} />
                <Route path="/transactions" element={<TransactionsPage />} />
            </Routes>
        </Layout>
    )
}