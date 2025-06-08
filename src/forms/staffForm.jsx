import { useState, useEffect } from 'react';

const StaffForm = ({ staff, onSave, onCancel }) => {
  const initialState = {
    username: '',
    password: '',
    nama: '',
  };

  const [formData, setFormData] = useState(initialState);

  useEffect(() => {
    if (staff) {
      setFormData({
        username: staff.username || '',
        password: staff.password || '',
        nama: staff.nama || ''
      });
    } 
    else {
      setFormData(initialState);
    }
  }, [staff]);

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
        <label htmlFor="nama" className="block text-sm font-medium text-gray-700 mb-1">Nama Staff</label>
        <input type="text" id="nama" name="nama" value={formData.nama} onChange={handleChange} required
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <div className="mb-4">
        <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-1">Username</label>
        <input type="text" id="username" name="username" value={formData.username} onChange={handleChange} required
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      {/* <div className="mb-4">
        <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">Password</label>
        <input type="password" id="password" name="password" value={formData.password} onChange={handleChange} required
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div> */}
      <div className="flex justify-end gap-3 mt-6">
        <button type="button" className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300" onClick={onCancel}>Batal</button>
        <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">Simpan</button>
      </div>
    </form>
  );
};

export default StaffForm;