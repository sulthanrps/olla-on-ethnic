import { useEffect, useState } from "react";
import Container from "../components/container";
import useProduct from "../hooks/useProducts"; 
import ReusableTable from "../components/reusableTable";
import Modal from "../components/modal";
import ProductForm from "../forms/productForm"; 

import { Toaster } from "react-hot-toast";
import { Box, IconButton, Tooltip } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

export default function ProductPage() {
    const {
        products,
        loading,
        error,
        fetchProduct,
        addProduct,
        updateProduct,
        deleteProduct
    } = useProduct();

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalMode, setModalMode] = useState("add");
    const [selectedProduct, setSelectedProduct] = useState(null);

    const handleOpenAddModal = () => {
        setModalMode("add");
        setSelectedProduct(null);
        setIsModalOpen(true);
    };

    const handleOpenEditModal = (product) => {
        setModalMode("edit");
        setSelectedProduct(product);
        setIsModalOpen(true);
    };

    const handleDelete = (id) => {
        if (window.confirm("Apakah Anda yakin ingin menghapus data ini?")) {
            deleteProduct(id);
        }
    };

    const handleSave = async (formData) => {
        if (modalMode === "add") {
            console.log(formData);
            await addProduct(formData);
        } else {
            await updateProduct(selectedProduct.id_product, formData);
        }
        setIsModalOpen(false);
    };

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
                        <IconButton onClick={() => handleOpenEditModal(params.row)}>
                            <EditIcon />
                        </IconButton>
                    </Tooltip>
                    <Tooltip title="Delete">
                        <IconButton onClick={() => handleDelete(params.row.id_product)} color="error">
                            <DeleteIcon />
                        </IconButton>
                    </Tooltip>
                </Box>
            ),
        },
    ];

    useEffect(() => {
        fetchProduct();
    }, [fetchProduct]);

    if (loading && products.length === 0) {
        return <div>Memuat data... ⏳</div>;
    }

    if (error) {
        return <div>Error: {error.message}</div>;
    }

    return (
        <Container>
            <Toaster position="top-left" />

            <ReusableTable
                columns={columns}
                rows={products || []}
                isLoading={loading}
                error={error}
                onAdd={handleOpenAddModal} 
                addLabel="Tambah Product" 
            />

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