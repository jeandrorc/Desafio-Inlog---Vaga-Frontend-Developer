import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Grid, Typography, Box } from "@mui/material";
import AddVehicleMap from "components/AddVeicheMap/AddVehicleMap";
import { Vehicle } from "types/vehicle";
import validators from "./validators";
import { VehicleForm } from "components/VehicleForm";
import useAddVehicle from "utils/hooks/useAddVehicle";
import FabLink from "components/Fablink/Fablink";
import { Toast } from "components/Toast/Toast";
import { useToast } from "utils/hooks/useToast";

interface FormData {
  identifier: string;
  image: string;
  license_plate: string;
  tracker_serial_number: string;
  coordinates: {
    lat: number;
    lng: number;
  };
}

const VehicleFormPage = () => {
  const {toast, showToast, hideToast} = useToast()
  const [coordinates, setCoordinates] = useState({ lat: 0, lng: 0 });
  const formController = useForm<FormData>({
    resolver: validators,
  });

  const handleResetAllForm = () => {
    formController.reset({
      coordinates: {
        lat: 0,
        lng: 0,
      },
      identifier: "",
      image: "",
      license_plate: "",
      tracker_serial_number: "",
    });

    setCoordinates({
      lat: 0,
      lng: 0,
    });
  };

  const { addVehicle, status } = useAddVehicle(
    (vehicle) => {
      handleResetAllForm();
      showToast('Veículo cadastrdo!', 'success', 2000);

    },
    (error) => {
      alert("Error")
      showToast('Ocorreu um erro ao tentar cadastrar o veiculo!', 'error', 2000);
    }
  );



  const onSubmit = (data: FormData) => {
    if (status === "loading") return;

    const { coordinates, ...restOfData } = data;
    const formData: Vehicle = {
      ...restOfData,
      coordinates: {
        latitude: coordinates.lat,
        longitude: coordinates.lng,
      },
    };

    addVehicle(formData);
  };

  useEffect(() => {
    formController.setValue("coordinates.lat", coordinates.lat);
    formController.setValue("coordinates.lng", coordinates.lng);
  }, [coordinates, formController, formController.setValue]);

  return (
    <>
    <Box sx={{ flexGrow: 1, height: "100%" }}>
      <Grid container spacing={4} sx={{ height: "100%" }}>
        <Grid item xs={12} md={6}>
          <Typography variant="h4">Cadastro de veiculo</Typography>
          <VehicleForm
            loading={status === 'loading'}
            formMethods={formController}
            onSubmit={onSubmit}
            handleResetAllForm={handleResetAllForm}
          />
        </Grid>
        <Grid item xs={12} md={6} sx={{ height: "100%", position: "relative" }}>
          <Box
            sx={{
              width: "100%",
              height: "100%",
            }}
          >
            <AddVehicleMap
              coordinates={coordinates}
              setCoordinates={setCoordinates}
            />
          </Box>
        </Grid>
      </Grid>
    </Box>
    <FabLink title="Listar veiculos" link="/"/>
    <Toast toast={toast} onClose={hideToast}/>
    </>
  );
};

export default VehicleFormPage;
