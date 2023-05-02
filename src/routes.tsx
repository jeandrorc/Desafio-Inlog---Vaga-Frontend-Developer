import { Box } from "@mui/material";
import { VehicleFormPage } from "pages/VehicleFormPage";
import { VehicleListPage } from "pages/VehicleListPage";
import React from "react";
import { Route, Routes } from "react-router-dom";

const AppRoutes: React.FC = () => {
  return (
    <Box sx={{ flex: 1 }}>
      <Routes>
        <Route path="/" element={<VehicleListPage />} />
        <Route path="/novo-veiculo" element={<VehicleFormPage />} />
      </Routes>
    </Box>
  );
};

export default AppRoutes;
