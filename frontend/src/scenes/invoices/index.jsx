import { useEffect, useState, useRef } from "react";
import axios from "axios";
import { Box, useTheme } from "@mui/material";
import { DataGrid ,  GridToolbar} from "@mui/x-data-grid";
import { tokens } from "../../theme";
import Header from "../../components/Header";

const Invoices = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const columns = [
    { field: "id", headerName: "ID"},
    { field: "issue_date", headerName: "Issue Date", flex: 1 },
    { field: "due_date", headerName: "Due Date", flex: 1 },
    { field: "paid_date", headerName: "Paid Date", flex: 1 },
    { field: "paid", headerName: "Paid", flex: 1 },
    { field: "contact_id", headerName: "Contact ID", flex: 1 },
    { field: "total", headerName: "Total", flex: 1 },
    { field: "amount_due", headerName: "Amount Due", flex: 1 },
    { field: "exchange_rate", headerName: "Exchange Rate", flex: 1 },
    { field: "currency", headerName: "Currency", flex: 1 },
    { field: "is_sale", headerName: "Is Sale", flex: 1 },
  ];

  const [invoices, setInvoices] = useState([]);
  const [loading, setLoading] = useState(true);
  const gridRef = useRef(null);

  console.log("Making API request...");
  useEffect(() => {
    // Make an API request here to fetch invoices
    axios
      .get(
        "https://backend-ayp7siwk3a-uc.a.run.app/invoice"
      )
      .then((response) => {
        console.log("API Response:", response.data);
        // Assuming the API response matches the expected format
        const apiData = response.data.data;

        setInvoices(apiData);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching invoices:", error);
        setLoading(false);
      });
  }, []);


  if (loading) {
    return <div>Loading...</div>; // You can show a loading indicator while data is being fetched
  }

  return (
    <Box m="20px">
      <Header
        title="INVOICES"
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
          rows={invoices}
          columns={columns}
          components={{ Toolbar: GridToolbar }}
          ref={gridRef}
        />
      </Box>
    </Box>
  );
};

export default Invoices;