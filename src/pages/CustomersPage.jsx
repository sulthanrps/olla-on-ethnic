import { useEffect, useState } from "react";
import Container from "../components/container"; // Asumsi komponen ini ada
import useCustomer from "../hooks/useCustomers"; // Hook Anda yang keren
import ReusableTable from "../components/reusableTable"; // Asumsi komponen ini ada
import Modal from "../components/modal"; // Komponen Modal Reusable kita
import CustomerForm from "../forms/customerForm"; // Komponen Form yang baru saja kita siapkan

import { Toaster } from "react-hot-toast";
import { Box, IconButton, Tooltip } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

export default function CustomersPage() {
    // 1. Memanggil custom hook Anda
    const {
        customers,
        loading,
        error,
        fetchCustomers,
        createCustomer,
        updateCustomer, // Pastikan ini diekspor dari hook Anda dan diimpor di sini
        deleteCustomer,
    } = useCustomer();

    // 2. State untuk manajemen Modal
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalMode, setModalMode] = useState("add"); // "add" atau "edit"
    const [selectedCustomer, setSelectedCustomer] = useState(null);

    // 3. Handler untuk membuka modal dalam mode "add"
    const handleOpenAddModal = () => {
        setModalMode("add");
        setSelectedCustomer(null);
        setIsModalOpen(true);
    };

    // 4. Handler untuk membuka modal dalam mode "edit"
    const handleOpenEditModal = (customer) => {
        setModalMode("edit");
        setSelectedCustomer(customer);
        setIsModalOpen(true);
    };

    // 5. Handler untuk menghapus data, sekarang memanggil fungsi dari hook
    const handleDelete = (id) => {
        if (window.confirm("Apakah Anda yakin ingin menghapus data ini?")) {
            deleteCustomer(id);
        }
    };

    // 6. Handler untuk menyimpan data (baik add maupun edit)
    const handleSave = async (formData) => {
        if (modalMode === "add") {
            await createCustomer(formData);
        } else {
            await updateCustomer(selectedCustomer.id_customer, formData);
        }
        setIsModalOpen(false); // Tutup modal setelah operasi selesai
    };

    // Definisi kolom untuk ReusableTable
    const columns = [
        { field: 'id_customer', headerName: 'ID', width: 50 },
        { field: 'nama', headerName: 'Nama Customer', width: 200 },
        { field: 'jenis_kelamin', headerName: 'Jenis Kelamin', width: 150, renderCell: (params) => (
            <span>{params.value === "P" ? "Perempuan" : "Laki-laki"}</span>
        )},
        { field: 'no_telp', headerName: 'No Telepon', width: 150},
        { field: 'alamat', headerName: 'Alamat', width: 250 },
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
                        <IconButton onClick={() => handleDelete(params.row.id_customer)} color="error">
                            <DeleteIcon />
                        </IconButton>
                    </Tooltip>
                </Box>
            ),
        },
    ];

    // Memuat data customer saat komponen pertama kali di-render
    useEffect(() => {
        fetchCustomers();
    }, [fetchCustomers]);

    // Tampilan Loading dan Error (sudah baik)
    if (loading && customers.length === 0) {
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
                rows={customers || []}
                isLoading={loading}
                error={error}
                onAdd={handleOpenAddModal} // Menggunakan handleOpenAddModal
                addLabel="Tambah Customer" // Label bisa diubah sesuai konteks
            />

            {/* 7. Render Modal di sini */}
            <Modal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                title={modalMode === "add" ? "Tambah Customer Baru" : "Edit Customer"}
            >
                <CustomerForm
                    customer={selectedCustomer}
                    onSave={handleSave}
                    onCancel={() => setIsModalOpen(false)}
                />
            </Modal>
        </Container>
    );
}