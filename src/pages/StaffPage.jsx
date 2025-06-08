import { useEffect, useState } from "react";
import Container from "../components/container";
import useStaff from "../hooks/useStaff";
import ReusableTable from "../components/reusableTable";
import Modal from "../components/modal"; 
import StaffForm from "../forms/staffForm"; 

import { Toaster } from "react-hot-toast";
import { Box, IconButton, Tooltip } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

export default function StaffPage() {
    const {
        staff,
        loading,
        error,
        fetchStaff,
        createStaff,
        updateStaff, 
        deleteStaff,
    } = useStaff();

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalMode, setModalMode] = useState("add"); 
    const [selectedStaff, setSelectedStaff] = useState(null);

    const handleOpenAddModal = () => {
        setModalMode("add");
        setSelectedStaff(null);
        setIsModalOpen(true);
    };

    const handleOpenEditModal = (staff) => {
        setModalMode("edit");
        setSelectedStaff(staff);
        setIsModalOpen(true);
    };

    const handleDelete = (id) => {
        if (window.confirm("Apakah Anda yakin ingin menghapus data ini?")) {
            deleteStaff(id);
        }
    };

    const handleSave = async (formData) => {
        if (modalMode === "add") {
            console.log(formData);
            await createStaff(formData);
        } else {
            console.log(formData);
            await updateStaff(selectedStaff.id_kasir, formData);
        }
        setIsModalOpen(false);
    };

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
                        <IconButton onClick={() => handleOpenEditModal(params.row)}>
                            <EditIcon />
                        </IconButton>
                    </Tooltip>
                    <Tooltip title="Delete">
                        <IconButton onClick={() => handleDelete(params.row.id_kasir)} color="error">
                            <DeleteIcon />
                        </IconButton>
                    </Tooltip>
                </Box>
            ),
        },
    ];

    useEffect(() => {
        fetchStaff();
    }, [fetchStaff]);

    if (loading && staff.length === 0) {
        return <div>Memuat data... ⏳</div>;
    }

    if (error) {
        return <div>Error: {error.message}</div>;
    }

    return (
        <Container>
            <Toaster position="top-right" />

            <ReusableTable
                columns={columns}
                rows={staff || []}
                isLoading={loading}
                error={error}
            />
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