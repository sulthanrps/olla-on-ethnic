import { useState, useEffect } from 'react';

const ProductForm = ({ product, onSave, onCancel }) => {
  const initialState = {
    nama_product: '',
    harga: '',
    stok: '',
  };

  const [formData, setFormData] = useState(initialState);
  useEffect(() => {
    if (product) {
      setFormData({
        nama_product: product.nama_product || '',
        harga: product.harga || '',
        stok: product.stok || ''
      });
    } 
    else {
      setFormData(initialState);
    }
  }, [product]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const payload = {
        ...formData,
        harga: parseFloat(formData.harga), 
        stok: parseInt(formData.stok, 10) 
    }
    onSave(payload);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-4">
        <label htmlFor="nama_product" className="block text-sm font-medium text-gray-700 mb-1">Nama product</label>
        <input type="text" id="nama_product" name="nama_product" value={formData.nama_product} onChange={handleChange} required
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <div className="mb-4">
        <label htmlFor="harga" className="block text-sm font-medium text-gray-700 mb-1">Harga Satuan</label>
        <input type="number" id="harga" name="harga" value={formData.harga} onChange={handleChange} required
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <div className="mb-4">
        <label htmlFor="stok" className="block text-sm font-medium text-gray-700 mb-1">Stok Awal</label>
        <input type="number" id="stok" name="stok" value={formData.stok} onChange={handleChange} required
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <div className="flex justify-end gap-3 mt-6">
        <button type="button" className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300" onClick={onCancel}>Batal</button>
        <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">Simpan</button>
      </div>
    </form>
  );
};

export default ProductForm;