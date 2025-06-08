import { useState, useCallback } from 'react';
import axiosInstance from '../api/axiosInstance';
import { toast } from 'react-hot-toast'; 

const useProducts = () => {
  const [products, setProducts] = useState([]);
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
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

  const getProductById = useCallback(async (id) => {
    setLoading(true);
    setError(null);
    try {
      const response = await axiosInstance.get(`/products/${id}`);
      setProduct(response.data.data);
      return response.data.data;
    } catch (err) {
      setError(err);
      toast.error(`Gagal menemukan product dengan ID: ${id}.`);
    } finally {
      setLoading(false);
    }
  }, []);

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

  const updateProduct = useCallback(async (id, productData) => {
    setLoading(true);
    setError(null);
    try {
      await axiosInstance.put(`/products/${id}`, productData);
      toast.success('Product berhasil diperbarui!');
      await fetchProduct();
    } catch (err) {
      setError(err);
      toast.error('Gagal memperbarui product.');
    } finally {
      setLoading(false);
    }
  }, [fetchProduct]);

  const deleteProduct = useCallback(async (id) => {
    setLoading(true);
    setError(null);
    try {
      await axiosInstance.delete(`/products/${id}`);
      toast.success('Products berhasil dihapus!');
      fetchProduct();
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