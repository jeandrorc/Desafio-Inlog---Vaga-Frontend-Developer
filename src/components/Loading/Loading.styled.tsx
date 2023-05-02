import { Box } from "@mui/material";
import { styled } from "@mui/system";

const StyledBox = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  backgroundColor: "rgba(128, 128, 128, 0.5)",
  width: "100%",
  height: "100%",
  position: "absolute",
  top: 0,
  left: 0,
}));

export { StyledBox };
