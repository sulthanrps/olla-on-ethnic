// src/hooks/useCustomer.js
import { useState, useCallback } from 'react';
import axiosInstance from '../api/axiosInstance';
import { toast } from 'react-hot-toast'; // Opsional: untuk notifikasi

const useCustomer = () => {
  const [customers, setCustomers] = useState([]);
  const [customer, setCustomer] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // READ: Mengambil semua customer
  const fetchCustomers = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axiosInstance.get('/customers');
      setCustomers(response.data.data);
    } catch (err) {
      setError(err);
      toast.error('Gagal memuat data customer.');
    } finally {
      setLoading(false);
    }
  }, []);

  // READ: Mengambil satu customer by ID
  const getCustomerById = useCallback(async (id) => {
    setLoading(true);
    setError(null);
    try {
      const response = await axiosInstance.get(`/customers/${id}`);
      setCustomer(response.data);
      return response.data; // Mengembalikan data untuk penggunaan langsung
    } catch (err) {
      setError(err);
      toast.error(`Gagal menemukan customer dengan ID: ${id}.`);
    } finally {
      setLoading(false);
    }
  }, []);

  // CREATE: Menambahkan customer baru
  const createCustomer = useCallback(async (customerData) => {
    setLoading(true);
    setError(null);
    try {
      await axiosInstance.post('/customers', customerData);
      // Menambahkan customer baru ke state tanpa perlu re-fetch semua data
      // setCustomers((prev) => [...prev, response.data]);
      toast.success('Customer berhasil ditambahkan!');
      await fetchCustomers();
    } catch (err) {
      setError(err);
      toast.error('Gagal menambahkan customer.');
    } finally {
      setLoading(false);
    }
  }, [fetchCustomers]);

  // UPDATE: Memperbarui data customer
  const updateCustomer = useCallback(async (id, customerData) => {
    setLoading(true);
    setError(null);
    try {
      await axiosInstance.put(`/customers/${id}`, customerData);
      // Memperbarui state customers dengan data yang baru
      // setCustomers((prev) => 
      //   prev.map((cust) => (cust.id_customer === id ? response.data.data : cust))
      // );
      toast.success('Customer berhasil diperbarui!');
      await fetchCustomers(); // Re-fetch untuk memastikan data terbaru
    } catch (err) {
      setError(err);
      toast.error('Gagal memperbarui customer.');
    } finally {
      setLoading(false);
    }
  }, [fetchCustomers]);

  // DELETE: Menghapus customer
  const deleteCustomer = useCallback(async (id) => {
    setLoading(true);
    setError(null);
    try {
      await axiosInstance.delete(`/customers/${id}`);
      // Menghapus customer dari state
      // setCustomers((prev) => prev.filter((cust) => cust.id_customer !== id));
      toast.success('Customer berhasil dihapus!');
      fetchCustomers(); // Re-fetch untuk memastikan data terbaru
    } catch (err) {
      setError(err);
      toast.error('Gagal menghapus customer.');
    } finally {
      setLoading(false);
    }
  }, [fetchCustomers]);

  return {
    customers,
    customer,
    loading,
    error,
    fetchCustomers,
    getCustomerById,
    createCustomer,
    updateCustomer,
    deleteCustomer,
  };
};

export default useCustomer;