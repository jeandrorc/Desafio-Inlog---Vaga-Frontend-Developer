import React, { useEffect, SyntheticEvent } from "react";
import Snackbar, { SnackbarCloseReason } from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import { ToastData } from "utils/hooks/useToast";

interface ToastProps {
  toast: ToastData;
  onClose: () => void;
}

export const Toast: React.FC<ToastProps> = ({ toast, onClose }) => {
  const { open, message, type, duration } = toast;

  useEffect(() => {
    if (open) {
      const timer = setTimeout(() => {
        onClose();
      }, duration);

      return () => {
        clearTimeout(timer);
      };
    }
  }, [open, duration, onClose]);

  const handleClose = (
    event: SyntheticEvent | Event,
    reason?: SnackbarCloseReason
  ) => {
    if (reason === "clickaway") {
      return;
    }
    onClose();
  };

  return (
    <Snackbar
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      open={open}
      autoHideDuration={duration}
      onClose={handleClose}
      action={
        <IconButton size="small" color="inherit" onClick={handleClose}>
          <CloseIcon fontSize="small" />
        </IconButton>
      }
    >
      <MuiAlert
        elevation={6}
        variant="filled"
        severity={type}
        onClose={handleClose}
      >
        {message}
      </MuiAlert>
    </Snackbar>
  );
};
