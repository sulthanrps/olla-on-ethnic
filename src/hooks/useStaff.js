import { useState, useCallback } from 'react';
import axiosInstance from '../api/axiosInstance';
import { toast } from 'react-hot-toast'; // Opsional: untuk notifikasi

const useStaff = () => {
  const [staff, setStaff] = useState([]);
  const [oneStaff, setOneStaff] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // READ: Mengambil semua staff
  const fetchStaff = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axiosInstance.get('/staff');
      setStaff(response.data.data);
    } catch (err) {
      setError(err);
      toast.error('Gagal memuat data staff.');
    } finally {
      setLoading(false);
    }
  }, []);

  // READ: Mengambil satu customer by ID
  const getStaffById = useCallback(async (id) => {
    setLoading(true);
    setError(null);
    try {
      const response = await axiosInstance.get(`/staff/${id}`);
      setOneStaff(response.data.data);
      return response.data.data; // Mengembalikan data untuk penggunaan langsung
    } catch (err) {
      setError(err);
      toast.error(`Gagal menemukan staff dengan ID: ${id}.`);
    } finally {
      setLoading(false);
    }
  }, []);

  // CREATE: Menambahkan customer baru
  const createStaff = useCallback(async (staffData) => {
    setLoading(true);
    setError(null);
    try {
      await axiosInstance.post('/staff', staffData);
      toast.success('staff berhasil ditambahkan!');
      await fetchStaff();
    } catch (err) {
      setError(err);
      toast.error('Gagal menambahkan staff.');
    } finally {
      setLoading(false);
    }
  }, [fetchStaff]);

  // UPDATE: Memperbarui data staff
  const updateStaff = useCallback(async (id, staffData) => {
    setLoading(true);
    setError(null);
    try {
      await axiosInstance.put(`/staff/${id}`, staffData);
      toast.success('staff berhasil diperbarui!');
      await fetchStaff(); // Re-fetch untuk memastikan data terbaru
    } catch (err) {
      setError(err);
      toast.error('Gagal memperbarui staff.');
    } finally {
      setLoading(false);
    }
  }, [fetchStaff]);

  // DELETE: Menghapus staff
  const deleteStaff = useCallback(async (id) => {
    setLoading(true);
    setError(null);
    try {
      await axiosInstance.delete(`/staff/${id}`);
      toast.success('staff berhasil dihapus!');
      fetchStaff(); // Re-fetch untuk memastikan data terbaru
    } catch (err) {
      setError(err);
      toast.error('Gagal menghapus staff.');
    } finally {
      setLoading(false);
    }
  }, [fetchStaff]);

  return {
    staff,
    oneStaff,
    loading,
    error,
    fetchStaff,
    getStaffById,
    createStaff,
    updateStaff,
    deleteStaff,
  };
};

export default useStaff;