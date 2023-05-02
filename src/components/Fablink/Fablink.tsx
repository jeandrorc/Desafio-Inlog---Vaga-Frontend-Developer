import React from "react";
import { Link } from "react-router-dom";
import { Box, Fab, Typography } from "@mui/material";
import { styles } from "./fablink.styled";

interface FabLinkProps {
  link: string;
  title: string;
  icon?: React.ReactNode;
}

const FabLink: React.FC<FabLinkProps> = ({ link, title, icon }) => {
  return (
    <Box sx={styles.fab}>
      <Link to={link}>
        <Fab variant="extended" color="primary" aria-label={title}>
          <Typography>{title}</Typography>
          {icon}
        </Fab>
      </Link>
    </Box>
  );
};

export default FabLink;
