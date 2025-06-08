import { useEffect, useState } from "react";
import Container from "../components/container"; // Asumsi komponen ini ada
import useTransaction from "../hooks/useTransactions"; // Hook untuk transaksi
import ReusableTable from "../components/reusableTable"; // Komponen tabel
import Modal from "../components/modal"; // Komponen Modal
import TransactionForm from "../forms/transactionForm"; // Form yang baru saja kita buat

import { Toaster } from "react-hot-toast";
import { Box, IconButton, Tooltip } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
// Tidak ada EditIcon karena transaksi tidak diedit

export default function TransactionPage() {
    // 1. Memanggil custom hook untuk transaksi
    const {
        transactions,
        loading,
        error,
        fetchTransactions,
        createTransaction,
        // deleteTransaction, // Pastikan ada fungsi delete di hook Anda
    } = useTransaction();

    // 2. State untuk manajemen Modal (hanya untuk membuka dan menutup)
    const [isModalOpen, setIsModalOpen] = useState(false);

    // 3. Handler untuk membuka modal tambah
    const handleOpenAddModal = () => {
        setIsModalOpen(true);
    };

    // 4. Handler untuk menghapus data
    // const handleDelete = (id) => {
    //     // Asumsi hook deleteTransaction sudah ada
    //     if (window.confirm("Apakah Anda yakin ingin menghapus transaksi ini? Ini tidak akan mengembalikan stok produk.")) {
    //         if (deleteTransaction) {
    //             deleteTransaction(id);
    //         } else {
    //             console.error("Fungsi deleteTransaction tidak ditemukan di hook.");
    //         }
    //     }
    // };

    // 5. Handler untuk menyimpan data (hanya untuk menambah)
    const handleSave = async (formData) => {
        await createTransaction(formData);
        setIsModalOpen(false); // Tutup modal setelah operasi selesai
    };

    // 6. Definisi kolom untuk ReusableTable
    // Kolom ini disesuaikan dengan output dari query JOIN di backend
    const columns = [
        { field: 'id_transaction', headerName: 'ID', width: 50 },
        { field: 'tanggal', headerName: 'Tanggal', width: 120, 
          renderCell: (params) => new Date(params.value).toLocaleDateString('id-ID')
        },
        { field: 'nama_customer', headerName: 'Customer', width: 150 },
        { field: 'nama_product', headerName: 'Produk', width: 200 },
        { field: 'qty', headerName: 'Jml', width: 60 },
        { field: 'total_harga', headerName: 'Total Harga', width: 130,
          renderCell: (params) => `Rp ${Number(params.value).toLocaleString('id-ID')}`
        },
        { field: 'jenis_transaksi', headerName: 'Pembayaran', width: 120 },
        { field: 'nama_kasir', headerName: 'Kasir', width: 150 }
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

    // 7. Memuat data transaksi saat komponen pertama kali di-render
    useEffect(() => {
        fetchTransactions();
    }, [fetchTransactions]);

    // 8. Tampilan Loading dan Error
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
                // Menggunakan id_transaction untuk getRowId jika tabel membutuhkannya
                getRowId={(row) => row.id_transaction}
            />

            <Modal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                title="Buat Transaksi Baru"
            >
                {/* Komponen TransactionForm tidak memerlukan prop 'transaction' 
                  karena kita tidak melakukan edit
                */}
                <TransactionForm
                    onSave={handleSave}
                    onCancel={() => setIsModalOpen(false)}
                />
            </Modal>
        </Container>
    );
}