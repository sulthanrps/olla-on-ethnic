import { useState, useCallback } from 'react';
import axiosInstance from '../api/axiosInstance';
import { toast } from 'react-hot-toast';

const useTransaction = () => {
  const [transactions, setTransactions] = useState([]);
  const [transaction, setTransaction] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchTransactions = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axiosInstance.get('/transactions');
      setTransactions(response.data.data);
    } catch (err) {
      setError(err);
      toast.error('Gagal memuat data transactions.');
    } finally {
      setLoading(false);
    }
  }, []);

  const getTransactionById = useCallback(async (id) => {
    setLoading(true);
    setError(null);
    try {
      const response = await axiosInstance.get(`/transactions/${id}`);
      setTransaction(response.data.data);
      return response.data.data;
    } catch (err) {
      setError(err);
      toast.error(`Gagal menemukan transaction dengan ID: ${id}.`);
    } finally {
      setLoading(false);
    }
  }, []);

  const createTransaction = useCallback(async (transactionData) => {
    setLoading(true);
    setError(null);
    try {
      await axiosInstance.post('/transactions', transactionData);
      toast.success('staff berhasil ditambahkan!');
      await fetchTransactions();
    } catch (err) {
      setError(err);
      toast.error('Gagal menambahkan transaksi.');
    } finally {
      setLoading(false);
    }
  }, [fetchTransactions]);

  return {
    transactions,
    transaction,
    loading,
    error,
    fetchTransactions,
    getTransactionById,
    createTransaction
  };
};

export default useTransaction;