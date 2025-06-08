import React from 'react';
import { Box, Button, CircularProgress, Alert, IconButton } from '@mui/material';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import AddIcon from '@mui/icons-material/Add';

export default function ReusableTable({ columns, rows = [], isLoading, error, onAdd, addLabel = "Tambah Data" }) {
    if (isLoading) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: 400 }}>
                <CircularProgress />
            </Box>
        );
    }

    if (error) {
        return (
            <Alert severity="error" sx={{ mt: 2 }}>
                Gagal memuat data: {error.message}
            </Alert>
        );
    }

    return (
        <Box sx={{ width: '100%', height: '70vh' }}>
            <Box sx={{ mb: 2, display: 'flex', justifyContent: 'flex-end' }}>
                {onAdd && (
                    <Button
                        variant="contained"
                        startIcon={<AddIcon />}
                        onClick={onAdd}
                        sx={{
                            backgroundColor: '#000000', 
                            color: 'white',             
                            fontWeight: 'bold',         
                            borderRadius: '8px',       
                            padding: '10px 20px',      
                            textTransform: 'none',      
                            '&:hover': {
                                backgroundColor: '#222222',
                            },
                        }}
                    >
                        {addLabel}
                    </Button>
                )}
            </Box>
            <DataGrid
                rows={rows}
                columns={columns}
                loading={isLoading}
                getRowId={(row) => row.id_customer || row.id_product || row.id_kasir || row.id_transaction || row.id}
                initialState={{
                    pagination: {
                        paginationModel: { page: 0, pageSize: 10 },
                    },
                }}
                pageSizeOptions={[5, 10, 25]}
                slots={{ toolbar: GridToolbar }}
                slotProps={{
                    toolbar: {
                        showQuickFilter: true,
                    },
                }}
                disableRowSelectionOnClick
                sx={{
                    border: 0,
                    '& .MuiDataGrid-cell:focus, & .MuiDataGrid-cell:focus-within': {
                        outline: 'none !important',
                    },
                }}
            />
        </Box>
    );
}