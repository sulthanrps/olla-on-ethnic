import { useEffect, useState } from "react";
import Container from "../components/container"; // Asumsi komponen ini ada
import useProduct from "../hooks/useProducts"; // Hook Anda yang keren
import ReusableTable from "../components/reusableTable"; // Asumsi komponen ini ada
import Modal from "../components/modal"; // Komponen Modal Reusable kita
import ProductForm from "../forms/productForm"; // Komponen Form yang baru saja kita siapkan

import { Toaster } from "react-hot-toast";
import { Box, IconButton, Tooltip } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

export default function ProductPage() {
    // 1. Memanggil custom hook Anda
    const {
        products,
        loading,
        error,
        fetchProduct,
        addProduct,
        updateProduct,
        deleteProduct
    } = useProduct();

    // 2. State untuk manajemen Modal
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalMode, setModalMode] = useState("add"); // "add" atau "edit"
    const [selectedProduct, setSelectedProduct] = useState(null);

    // 3. Handler untuk membuka modal dalam mode "add"
    const handleOpenAddModal = () => {
        setModalMode("add");
        setSelectedProduct(null);
        setIsModalOpen(true);
    };

    // 4. Handler untuk membuka modal dalam mode "edit"
    const handleOpenEditModal = (product) => {
        setModalMode("edit");
        setSelectedProduct(product);
        setIsModalOpen(true);
    };

    // 5. Handler untuk menghapus data, sekarang memanggil fungsi dari hook
    const handleDelete = (id) => {
        if (window.confirm("Apakah Anda yakin ingin menghapus data ini?")) {
            deleteProduct(id);
        }
    };

    // 6. Handler untuk menyimpan data (baik add maupun edit)
    const handleSave = async (formData) => {
        if (modalMode === "add") {
            console.log(formData);
            await addProduct(formData);
        } else {
            await updateProduct(selectedProduct.id_product, formData);
        }
        setIsModalOpen(false); // Tutup modal setelah operasi selesai
    };

    // Definisi kolom untuk ReusableTable
    const columns = [
        { field: 'id_product', headerName: 'ID', width: 50 },
        { field: 'nama_product', headerName: 'Nama Produk', width: 350 },
        { field: 'harga', headerName: 'Harga Satuan', width: 200},
        { field: 'stok', headerName: 'Stok Barang', width: 150},
        {
            field: 'actions',
            headerName: 'Aksi',
            width: 150,
            sortable: false,
            filterable: false,
            renderCell: (params) => (
                <Box>
                    <Tooltip title="Edit">
                        {/* Menggunakan handleOpenEditModal */}
                        <IconButton onClick={() => handleOpenEditModal(params.row)}>
                            <EditIcon />
                        </IconButton>
                    </Tooltip>
                    <Tooltip title="Delete">
                         {/* Menggunakan handleDelete */}
                        <IconButton onClick={() => handleDelete(params.row.id_product)} color="error">
                            <DeleteIcon />
                        </IconButton>
                    </Tooltip>
                </Box>
            ),
        },
    ];

    // Memuat data customer saat komponen pertama kali di-render
    useEffect(() => {
        fetchProduct();
    }, [fetchProduct]);

    // Tampilan Loading dan Error (sudah baik)
    if (loading && products.length === 0) {
        return <div>Memuat data... ⏳</div>;
    }

    if (error) {
        return <div>Error: {error.message}</div>;
    }

    return (
        <Container>
            {/* Untuk menampilkan notifikasi dari react-hot-toast */}
            <Toaster position="top-right" />

            <ReusableTable
                columns={columns}
                rows={products || []}
                isLoading={loading}
                error={error}
                onAdd={handleOpenAddModal} // Menggunakan handleOpenAddModal
                addLabel="Tambah Product" // Label bisa diubah sesuai konteks
            />

            {/* 7. Render Modal di sini */}
            <Modal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                title={modalMode === "add" ? "Tambah Product Baru" : "Edit Product"}
            >
                <ProductForm 
                    product={selectedProduct}
                    onSave={handleSave}
                    onCancel={() => setIsModalOpen(false)}
                />
            </Modal>
        </Container>
    );
}