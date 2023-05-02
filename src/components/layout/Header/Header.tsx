import React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { Box } from "@mui/material";
import { Link } from "react-router-dom";
import LogoSvg from 'assets/svg/brcars.svg'

const Header: React.FC = () => {
  return (
    <Box>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            <Link to="/">
              <img
                alt="logo: brcars"
                title="brcars"
                height={80}
                src={LogoSvg}
              />
            </Link>
          </Typography>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Header;
