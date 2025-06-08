import { useState, useCallback } from 'react';
import axiosInstance from '../api/axiosInstance';
import { toast } from 'react-hot-toast';

const useCustomer = () => {
  const [customers, setCustomers] = useState([]);
  const [customer, setCustomer] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchCustomers = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axiosInstance.get('/customers'); // '/' di customers.route = '/customers' dihook useCustomer
      setCustomers(response.data.data);
    } catch (err) {
      setError(err);
      toast.error('Gagal memuat data customer.');
    } finally {
      setLoading(false);
    }
  }, []);

  const getCustomerById = useCallback(async (id) => {
    setLoading(true);
    setError(null);
    try {
      const response = await axiosInstance.get(`/customers/${id}`);
      setCustomer(response.data.data);
      return response.data.data;
    } catch (err) {
      setError(err);
      toast.error(`Gagal menemukan customer dengan ID: ${id}.`);
    } finally {
      setLoading(false);
    }
  }, []);

  const createCustomer = useCallback(async (customerData) => {
    setLoading(true);
    setError(null);
    try {
      await axiosInstance.post('/customers', customerData);
      toast.success('Customer berhasil ditambahkan!');
      await fetchCustomers();
    } catch (err) {
      setError(err);
      toast.error('Gagal menambahkan customer.');
    } finally {
      setLoading(false);
    }
  }, [fetchCustomers]);

  const updateCustomer = useCallback(async (id, customerData) => {
    setLoading(true);
    setError(null);
    try {
      await axiosInstance.put(`/customers/${id}`, customerData);
      toast.success('Customer berhasil diperbarui!');
      await fetchCustomers();
    } catch (err) {
      setError(err);
      toast.error('Gagal memperbarui customer.');
    } finally {
      setLoading(false);
    }
  }, [fetchCustomers]);

  const deleteCustomer = useCallback(async (id) => {
    setLoading(true);
    setError(null);
    try {
      await axiosInstance.delete(`/customers/${id}`);
      toast.success('Customer berhasil dihapus!');
      fetchCustomers();
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