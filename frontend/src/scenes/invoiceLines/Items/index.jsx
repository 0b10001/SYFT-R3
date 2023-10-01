import { useEffect, useState } from "react";
import axios from "axios";
import { Box, useTheme } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import Header from "../../components/Header";

const Items = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const columns = [
    { field: "id", headerName: "ID"},
    { field: "name", headerName: "Name", flex: 1, cellClassName: "name-column--cell"},
    { field: "code", headerName: "Code", flex: 1 },
    { field: "quantity_on_hand", headerName: "Quantity on Hand", flex: 1 },
    { field: "purchase_unit_price", headerName: "Purchase Unit Price", flex: 1 },
    
  ];
  
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  console.log("Making API request...");
  useEffect(() => {
    // Make an API request here to fetch contacts
    axios
      .get(
        "https://backend-ayp7siwk3a-uc.a.run.app/item"
      )
      .then((response) => {
        console.log("API Response:", response.data);
        // Assuming the API response matches the expected format
        const apiData = response.data.data;

        setItems(apiData);
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
      <Header title="Items" subtitle="Managing the Items" />
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
        }}
      >
        <DataGrid checkboxSelection rows={items} columns={columns} />
      </Box>
    </Box>
  );
};

export default Items;