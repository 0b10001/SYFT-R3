import { useEffect, useState } from "react";
import axios from "axios"; // Import Axios or your preferred HTTP library
import { Box } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import Header from "../../components/Header";
import { useTheme } from "@mui/material";

const Contacts = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const columns = [
    { field: "id", headerName: "ID", flex: 0.5 },
    { field: "name", headerName: "Name", flex: 1 },
    { field: "is_supplier", headerName: "Is Supplier", flex: 1 },
    { field: "is_customer", headerName: "Is Customer", flex: 1 },
    { field: "email", headerName: "Email", flex: 1 },
    { field: "phone", headerName: "Phone", flex: 1 },
  ];

  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);

  console.log("Making API request...");
  useEffect(() => {
    // Make an API request here to fetch contacts
    axios
      .get(
        "https://friendly-telegram-x55w4rwj77pcpxg6-3001.app.github.dev/contacts"
      )
      .then((response) => {
        console.log("API Response:", response.data);
        // Assuming the API response matches the expected format
        setContacts(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching contacts:", error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div>Loading...</div>; // You can show a loading indicator while data is being fetched
  }

  return (
    <Box m="20px">
      <Header
        title="CONTACTS"
        subtitle="List of Contacts for Future Reference"
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
        }}
      >
        <DataGrid
          rows={contacts}
          columns={columns}
          components={{ Toolbar: GridToolbar }}
        />
      </Box>
    </Box>
  );
};

export default Contacts;
