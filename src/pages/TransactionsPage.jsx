import { useEffect, useState } from "react";
import Container from "../components/container"; 
import useTransaction from "../hooks/useTransactions"; 
import ReusableTable from "../components/reusableTable"; 
import Modal from "../components/modal"; 
import TransactionForm from "../forms/transactionForm"; 

import { Toaster } from "react-hot-toast";
import { Box, IconButton, Tooltip } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

export default function TransactionPage() {
    const {
        transactions,
        loading,
        error,
        fetchTransactions,
        createTransaction,
    } = useTransaction();

    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleOpenAddModal = () => {
        setIsModalOpen(true);
    };

    // const handleDelete = (id) => {
    //     if (window.confirm("Apakah Anda yakin ingin menghapus transaksi ini? Ini tidak akan mengembalikan stok produk.")) {
    //         if (deleteTransaction) {
    //             deleteTransaction(id);
    //         } else {
    //             console.error("Fungsi deleteTransaction tidak ditemukan di hook.");
    //         }
    //     }
    // };

    const handleSave = async (formData) => {
        await createTransaction(formData);
        setIsModalOpen(false); 
    };

    const columns = [
        { field: 'id_transaction', headerName: 'ID', width: 50 },
        { field: 'tanggal', headerName: 'Tanggal', width: 100, 
          renderCell: (params) => new Date(params.value).toLocaleDateString('id-ID')
        },
        { field: 'nama_customer', headerName: 'Customer', width: 150 },
        { field: 'nama_product', headerName: 'Produk', width: 200 },
        { field: 'qty', headerName: 'Jml', width: 60 },
        { field: 'total_harga', headerName: 'Total Harga', width: 130,
          renderCell: (params) => `Rp ${Number(params.value).toLocaleString('id-ID')}`
        },
        { field: 'jenis_transaksi', headerName: 'Pembayaran', width: 100 },
        { field: 'nama_kasir', headerName: 'Kasir', width: 100 }
        // {
        //     field: 'actions',
        //     headerName: 'Aksi',
        //     width: 100,
        //     sortable: false,
        //     filterable: false,
        //     renderCell: (params) => (
        //         <Box>
        //             <Tooltip title="Delete">
        //                 <IconButton onClick={() => handleDelete(params.row.id_transaction)} color="error">
        //                     <DeleteIcon />
        //                 </IconButton>
        //             </Tooltip>
        //         </Box>
        //     ),
        // },
    ];

    useEffect(() => {
        fetchTransactions();
    }, [fetchTransactions]);

    if (loading && transactions.length === 0) {
        return <Container><div>Memuat data transaksi... ⏳</div></Container>;
    }

    if (error) {
        return <Container><div>Error: {error.message}</div></Container>;
    }

    return (
        <Container>
            <Toaster position="top-right" />

            <ReusableTable
                columns={columns}
                rows={transactions || []}
                isLoading={loading}
                error={error}
                onAdd={handleOpenAddModal}
                addLabel="Buat Transaksi Baru"
                getRowId={(row) => row.id_transaction}
            />

            <Modal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                title="Buat Transaksi Baru"
            >
                <TransactionForm
                    onSave={handleSave}
                    onCancel={() => setIsModalOpen(false)}
                />
            </Modal>
        </Container>
    );
}