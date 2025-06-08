import { useEffect, useState } from "react";
import Container from "../components/container"; 
import useCustomer from "../hooks/useCustomers"; 
import ReusableTable from "../components/reusableTable"; 
import Modal from "../components/modal";
import CustomerForm from "../forms/customerForm";

import { Toaster } from "react-hot-toast";
import { Box, IconButton, Tooltip } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

export default function CustomersPage() {
    const {
        customers,
        loading,
        error,
        fetchCustomers,
        createCustomer,
        updateCustomer,
        deleteCustomer,
    } = useCustomer();

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalMode, setModalMode] = useState("add");
    const [selectedCustomer, setSelectedCustomer] = useState(null);

    const handleOpenAddModal = () => {
        setModalMode("add");
        setSelectedCustomer(null);
        setIsModalOpen(true);
    };

    const handleOpenEditModal = (customer) => {
        setModalMode("edit");
        setSelectedCustomer(customer);
        setIsModalOpen(true);
    };

    const handleDelete = (id) => {
        if (window.confirm("Apakah Anda yakin ingin menghapus data ini?")) {
            deleteCustomer(id);
        }
    };

    const handleSave = async (formData) => {
        if (modalMode === "add") {
            await createCustomer(formData);
        } else {
            await updateCustomer(selectedCustomer.id_customer, formData);
        }
        setIsModalOpen(false); 
    };

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
                        <IconButton onClick={() => handleOpenEditModal(params.row)}>
                            <EditIcon />
                        </IconButton>
                    </Tooltip>
                    <Tooltip title="Delete">
                        <IconButton onClick={() => handleDelete(params.row.id_customer)} color="error">
                            <DeleteIcon />
                        </IconButton>
                    </Tooltip>
                </Box>
            ),
        },
    ];

    useEffect(() => {
        fetchCustomers();
    }, [fetchCustomers]);

    if (loading && customers.length === 0) {
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
                rows={customers || []}
                isLoading={loading}
                error={error}
                onAdd={handleOpenAddModal} 
                addLabel="Tambah Customer" 
            />

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