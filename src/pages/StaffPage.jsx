import { useEffect, useState } from "react";
import Container from "../components/container"; // Asumsi komponen ini ada
import useStaff from "../hooks/useStaff"; // Hook Anda yang keren
import ReusableTable from "../components/reusableTable"; // Asumsi komponen ini ada
import Modal from "../components/modal"; // Komponen Modal Reusable kita
import StaffForm from "../forms/staffForm"; // Komponen Form yang baru saja kita siapkan

import { Toaster } from "react-hot-toast";
import { Box, IconButton, Tooltip } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

export default function StaffPage() {
    // 1. Memanggil custom hook Anda
    const {
        staff,
        loading,
        error,
        fetchStaff,
        createStaff,
        updateStaff, // Pastikan ini diekspor dari hook Anda dan diimpor di sini
        deleteStaff,
    } = useStaff();

    // 2. State untuk manajemen Modal
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalMode, setModalMode] = useState("add"); // "add" atau "edit"
    const [selectedStaff, setSelectedStaff] = useState(null);

    // 3. Handler untuk membuka modal dalam mode "add"
    const handleOpenAddModal = () => {
        setModalMode("add");
        setSelectedStaff(null);
        setIsModalOpen(true);
    };

    // 4. Handler untuk membuka modal dalam mode "edit"
    const handleOpenEditModal = (staff) => {
        setModalMode("edit");
        setSelectedStaff(staff);
        setIsModalOpen(true);
    };

    // 5. Handler untuk menghapus data, sekarang memanggil fungsi dari hook
    const handleDelete = (id) => {
        if (window.confirm("Apakah Anda yakin ingin menghapus data ini?")) {
            deleteStaff(id);
        }
    };

    // 6. Handler untuk menyimpan data (baik add maupun edit)
    const handleSave = async (formData) => {
        if (modalMode === "add") {
            console.log(formData);
            await createStaff(formData);
        } else {
            console.log(formData);
            await updateStaff(selectedStaff.id_kasir, formData);
        }
        setIsModalOpen(false); // Tutup modal setelah operasi selesai
    };

    // Definisi kolom untuk ReusableTable
    const columns = [
        { field: 'id_kasir', headerName: 'ID', width: 50 },
        { field: 'nama', headerName: 'Nama Staff', width: 200 },
        { field: 'username', headerName: 'Username', width: 150},
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
                        <IconButton onClick={() => handleDelete(params.row.id_kasir)} color="error">
                            <DeleteIcon />
                        </IconButton>
                    </Tooltip>
                </Box>
            ),
        },
    ];

    // Memuat data staff saat komponen pertama kali di-render
    useEffect(() => {
        fetchStaff();
    }, [fetchStaff]);

    // Tampilan Loading dan Error (sudah baik)
    if (loading && staff.length === 0) {
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
                rows={staff || []}
                isLoading={loading}
                error={error}
                // onAdd={handleOpenAddModal} // Menggunakan handleOpenAddModal
                // addLabel="Tambah Staff" // Label bisa diubah sesuai konteks
            />

            {/* 7. Render Modal di sini */}
            <Modal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                title={modalMode === "add" ? "Tambah Staff Baru" : "Edit Staff"}
            >
                <StaffForm
                    staff={selectedStaff}
                    onSave={handleSave}
                    onCancel={() => setIsModalOpen(false)}
                />
            </Modal>
        </Container>
    );
}