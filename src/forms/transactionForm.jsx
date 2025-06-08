import { useState, useEffect } from 'react';
import useCustomer from '../hooks/useCustomers'; 
import useProduct from '../hooks/useProducts';   
import useStaff from '../hooks/useStaff';    

const TransactionForm = ({ transaction, onSave, onCancel }) => {
    const initialState = {
        id_customer: '',
        id_product: '',
        size: 'M', 
        warna: '',
        jenis_transaksi: 'QRIS', 
        qty: 1, 
        id_kasir: '',
    };
    const [formData, setFormData] = useState(initialState);

    const { customers, fetchCustomers } = useCustomer();
    const { products, fetchProduct } = useProduct();
    const { staff, fetchStaff } = useStaff();

    useEffect(() => {
        fetchCustomers();
        fetchProduct();
        fetchStaff();
    }, []); 

    // useEffect(() => {
    //     if (transaction) {
    //         setFormData({
    //             id_customer: transaction.id_customer || '',
    //             id_product: transaction.id_product || '',
    //             size: transaction.size || 'M',
    //             warna: transaction.warna || '',
    //             jenis_transaksi: transaction.jenis_transaksi || 'QRIS',
    //             qty: transaction.qty || 1,
    //             id_kasir: transaction.id_kasir || '',
    //         });
    //     } else {
    //         setFormData(initialState);
    //     }
    // }, [transaction]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const payload = {
            ...formData,
            id_customer: parseInt(formData.id_customer, 10),
            id_product: parseInt(formData.id_product, 10),
            qty: parseInt(formData.qty, 10),
            id_kasir: parseInt(formData.id_kasir, 10),
        };
        onSave(payload);
    };

    const sizeOptions = ['S', 'M', 'L', 'XL'];
    const paymentOptions = ['QRIS', 'DEBIT', 'TRANSFER', 'CASH'];

    return (
        <form onSubmit={handleSubmit}>
            <div className="mb-4">
                <label htmlFor="id_customer" className="block text-sm font-medium text-gray-700 mb-1">Customer</label>
                <select id="id_customer" name="id_customer" value={formData.id_customer} onChange={handleChange} required className="w-full px-3 py-2 border border-gray-300 rounded-md">
                    <option value="" disabled>Pilih Customer</option>
                    {customers.map(c => (
                        <option key={c.id_customer} value={c.id_customer}>{c.nama}</option>
                    ))}
                </select>
            </div>

            <div className="mb-4">
                <label htmlFor="id_product" className="block text-sm font-medium text-gray-700 mb-1">Produk</label>
                <select id="id_product" name="id_product" value={formData.id_product} onChange={handleChange} required className="w-full px-3 py-2 border border-gray-300 rounded-md">
                    <option value="" disabled>Pilih Produk</option>
                    {products.map(p => (
                        <option key={p.id_product} value={p.id_product}>{p.nama_product}</option>
                    ))}
                </select>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                    <label htmlFor="warna" className="block text-sm font-medium text-gray-700 mb-1">Warna</label>
                    <input type="text" id="warna" name="warna" value={formData.warna} onChange={handleChange} required className="w-full px-3 py-2 border border-gray-300 rounded-md" />
                </div>
                <div>
                    <label htmlFor="qty" className="block text-sm font-medium text-gray-700 mb-1">Quantity</label>
                    <input type="number" id="qty" name="qty" value={formData.qty} min="1" onChange={handleChange} required className="w-full px-3 py-2 border border-gray-300 rounded-md" />
                </div>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                    <label htmlFor="size" className="block text-sm font-medium text-gray-700 mb-1">Ukuran</label>
                    <select id="size" name="size" value={formData.size} onChange={handleChange} required className="w-full px-3 py-2 border border-gray-300 rounded-md">
                        {sizeOptions.map(s => <option key={s} value={s}>{s}</option>)}
                    </select>
                </div>
                <div>
                    <label htmlFor="jenis_transaksi" className="block text-sm font-medium text-gray-700 mb-1">Jenis Pembayaran</label>
                    <select id="jenis_transaksi" name="jenis_transaksi" value={formData.jenis_transaksi} onChange={handleChange} required className="w-full px-3 py-2 border border-gray-300 rounded-md">
                        {paymentOptions.map(p => <option key={p} value={p}>{p}</option>)}
                    </select>
                </div>
            </div>

            <div className="mb-6">
                <label htmlFor="id_kasir" className="block text-sm font-medium text-gray-700 mb-1">Kasir Bertugas</label>
                <select id="id_kasir" name="id_kasir" value={formData.id_kasir} onChange={handleChange} required className="w-full px-3 py-2 border border-gray-300 rounded-md">
                    <option value="" disabled>Pilih Kasir</option>
                    {staff.map(s => (
                        <option key={s.id_kasir} value={s.id_kasir}>{s.nama}</option>
                    ))}
                </select>
            </div>

            <div className="flex justify-end gap-3 mt-6">
                <button type="button" className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300" onClick={onCancel}>Batal</button>
                <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">Simpan Transaksi</button>
            </div>
        </form>
    );
};

export default TransactionForm;