import { useState, useEffect } from 'react';

const CustomerForm = ({ customer, onSave, onCancel }) => {
  const initialState = {
    nama: '',
    jenis_kelamin: 'L',
    no_telp: '',
    alamat: '',
  };

  const [formData, setFormData] = useState(initialState);
  useEffect(() => {
    if (customer) {
      setFormData({
        nama: customer.nama || '',
        jenis_kelamin: customer.jenis_kelamin || 'L',
        no_telp: customer.no_telp || '',
        alamat: customer.alamat || '',
      });
    } 
    else {
      setFormData(initialState);
    }
  }, [customer]); 

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-4">
        <label htmlFor="nama" className="block text-sm font-medium text-gray-700 mb-1">Nama Customer</label>
        <input type="text" id="nama" name="nama" value={formData.nama} onChange={handleChange} required
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <div className="mb-4">
        <label htmlFor="jenis_kelamin" className="block text-sm font-medium text-gray-700 mb-1">Jenis Kelamin</label>
        <select id="jenis_kelamin" name="jenis_kelamin" value={formData.jenis_kelamin} onChange={handleChange} required
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
          <option value="L">Laki-laki</option>
          <option value="P">Perempuan</option>
        </select>
      </div>
      <div className="mb-4">
        <label htmlFor="no_telp" className="block text-sm font-medium text-gray-700 mb-1">No. Telepon</label>
        <input type="tel" id="no_telp" name="no_telp" value={formData.no_telp} onChange={handleChange} required
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <div className="mb-6">
        <label htmlFor="alamat" className="block text-sm font-medium text-gray-700 mb-1">Alamat</label>
        <textarea id="alamat" name="alamat" value={formData.alamat} onChange={handleChange} required rows="3"
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        ></textarea>
      </div>
      <div className="flex justify-end gap-3 mt-6">
        <button type="button" className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300" onClick={onCancel}>Batal</button>
        <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">Simpan</button>
      </div>
    </form>
  );
};

export default CustomerForm;