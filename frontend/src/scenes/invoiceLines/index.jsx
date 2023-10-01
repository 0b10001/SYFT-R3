import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Box, useTheme } from '@mui/material';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import { tokens } from '../../theme';
import Header from '../../components/Header';

const InvoiceLines = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const columns = [
    { field: 'id', headerName: 'ID' },
    { field: 'invoice_id', headerName: 'Invoice ID', flex: 1 },
    { field: 'description', headerName: 'Description', flex: 1 },
    { field: 'item_code', headerName: 'Item Code', flex: 1 },
    { field: 'total', headerName: 'Total', flex: 1 },
    { field: 'quantity', headerName: 'Quantity', flex: 1 },
  ];

  const [invoiceLines, setInvoiceLines] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(
        `https://backend-ayp7siwk3a-uc.a.run.app/invoice-lines`
      )
      .then((response) => {
        console.log('API Response:', response.data);
        // Assuming the API response matches the expected format
        const apiData = response.data.data;

        setInvoiceLines(apiData);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching invoice lines:', error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  
  return (
    <Box m="20px">
      <Header
        title="INVOICE LINES"
        subtitle="List of invoices"
      />
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
          rows={invoiceLines}
          columns={columns}
          components={{ Toolbar: GridToolbar }}
        />
      </Box>
    </Box>
  );
};


export default InvoiceLines;
