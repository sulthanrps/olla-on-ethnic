// src/hooks/useCustomer.js
import { useState, useCallback } from 'react';
import axiosInstance from '../api/axiosInstance';
import { toast } from 'react-hot-toast'; // Opsional: untuk notifikasi

const useProducts = () => {
  const [products, setProducts] = useState([]);
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // READ: Mengambil semua customer
  const fetchProduct = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axiosInstance.get('/products');
      setProducts(response.data.data);
    } catch (err) {
      setError(err);
      toast.error('Gagal memuat data products.');
    } finally {
      setLoading(false);
    }
  }, []);

  // READ: Mengambil satu product by ID
  const getProductById = useCallback(async (id) => {
    setLoading(true);
    setError(null);
    try {
      const response = await axiosInstance.get(`/products/${id}`);
      setProduct(response.data.data);
      return response.data.data; // Mengembalikan data untuk penggunaan langsung
    } catch (err) {
      setError(err);
      toast.error(`Gagal menemukan product dengan ID: ${id}.`);
    } finally {
      setLoading(false);
    }
  }, []);

  // CREATE: Menambahkan customer baru
  const addProduct = useCallback(async (productData) => {
    setLoading(true);
    setError(null);
    try {
      await axiosInstance.post('/products', productData);
      toast.success('Product berhasil ditambahkan!');
      await fetchProduct();
    } catch (err) {
      setError(err);
      toast.error('Gagal menambahkan product.');
    } finally {
      setLoading(false);
    }
  }, [fetchProduct]);

  // UPDATE: Memperbarui data customer
  const updateProduct = useCallback(async (id, productData) => {
    setLoading(true);
    setError(null);
    try {
      await axiosInstance.put(`/products/${id}`, productData);
      toast.success('Product berhasil diperbarui!');
      await fetchProduct(); // Re-fetch untuk memastikan data terbaru
    } catch (err) {
      setError(err);
      toast.error('Gagal memperbarui product.');
    } finally {
      setLoading(false);
    }
  }, [fetchProduct]);

  // DELETE: Menghapus customer
  const deleteProduct = useCallback(async (id) => {
    setLoading(true);
    setError(null);
    try {
      await axiosInstance.delete(`/products/${id}`);
      toast.success('Products berhasil dihapus!');
      fetchProduct(); // Re-fetch untuk memastikan data terbaru
    } catch (err) {
      setError(err);
      toast.error('Gagal menghapus product.');
    } finally {
      setLoading(false);
    }
  }, [fetchProduct]);

  return {
    products,
    product,
    loading,
    error,
    fetchProduct,
    getProductById,
    addProduct,
    updateProduct,
    deleteProduct,
  };
};

export default useProducts;