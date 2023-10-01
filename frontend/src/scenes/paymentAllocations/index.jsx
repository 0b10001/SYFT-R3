import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Box, useTheme } from '@mui/material';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import { tokens } from '../../theme';
import Header from '../../components/Header';

const PaymentAllocations = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const columns = [
    { field: 'payment_id', headerName: 'Payment ID', flex: 1 },
    { field: 'invoice_id', headerName: 'Invoice ID', flex: 1 },
    { field: 'amount', headerName: 'Amount', flex: 1 },
    { field: 'date', headerName: 'Date', flex: 1 },
  ];

  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Make an API request here to fetch payment data
    axios
      .get('https://backend-ayp7siwk3a-uc.a.run.app/payment-allocations')
      .then((response) => {
        console.log('API Response:', response.data);
        // Assuming the API response matches the expected format
        const apiData = response.data.data;

        setPayments(apiData);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching payments:', error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  // Define a function to specify a custom ID for each row
  const getRowId = (row) => row.payment_id;

  return (
    <Box m="20px">
      <Header title="Payment Allocations" />
      <Box
        m="40px 0 0 0"
        height="75vh"
        sx={{
            "& .MuiDataGrid-root": {
              border: "none",
            },
            "& .MuiDataGrid-cell": {
              borderBottom: "none",
            },
            "& .name-column--cell": {
              color: colors.greenAccent[300],
            },
            "& .MuiDataGrid-columnHeaders": {
              backgroundColor: colors.blueAccent[700],
              borderBottom: "none",
            },
            "& .MuiDataGrid-virtualScroller": {
              backgroundColor: colors.primary[400],
            },
            "& .MuiDataGrid-footerContainer": {
              borderTop: "none",
              backgroundColor: colors.blueAccent[700],
            },
            "& .MuiCheckbox-root": {
              color: `${colors.greenAccent[200]} !important`,
            },
            "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
              color: `${colors.grey[100]} !important`,
            },
          }}
      >
        <DataGrid
          checkboxSelection
          rows={payments}
          columns={columns}
          components={{ Toolbar: GridToolbar }}
          getRowId={getRowId} // Specify the custom ID for each row
        />
      </Box>
    </Box>
  );
};

export default PaymentAllocations;
