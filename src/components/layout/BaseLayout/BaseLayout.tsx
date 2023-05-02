import React from "react";
import Box from "@mui/material/Box";
import { Header } from "../Header";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <Box display="flex" flexDirection="column" minHeight="100vh">
      <Header />
      <Box flex={1} my={4} paddingRight={2} paddingLeft={2} sx={{ height: '100%', position:'relative', display: 'flex'}}>
        {children}
      </Box>
    </Box>
  );
};

export default Layout;
