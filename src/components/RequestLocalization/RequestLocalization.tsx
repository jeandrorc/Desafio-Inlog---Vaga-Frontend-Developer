import React, { useState, useEffect } from "react";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Collapse from "@mui/material/Collapse";
import CloseIcon from "@mui/icons-material/Close";

const RequestLocalization: React.FC = () => {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!navigator.geolocation) {
      setOpen(true);
    } else {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setOpen(false);
        },
        (error) => {
          if (error.code === error.PERMISSION_DENIED) {
            setOpen(true);
          }
        }
      );
    }
  }, []);

  const requestLocationPermission = () => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setOpen(false);
      },
      (error) => {
        if (error.code === error.PERMISSION_DENIED) {
          setOpen(true);
        }
      }
    );
  };

  return (
    <Collapse in={open}>
      <Alert
        severity="warning"
        action={
          <>
            <Button
              color="inherit"
              size="small"
              onClick={requestLocationPermission}
            >
              Permitir
            </Button>
            <IconButton
              aria-label="close"
              color="inherit"
              size="small"
              onClick={() => {
                setOpen(false);
              }}
            >
              <CloseIcon fontSize="inherit" />
            </IconButton>
          </>
        }
      >
        <AlertTitle>Acesso à localização</AlertTitle>
        Por favor, permita o acesso à sua localização para melhorar a sua
        experiência no site.
      </Alert>
    </Collapse>
  );
};

export default RequestLocalization;
