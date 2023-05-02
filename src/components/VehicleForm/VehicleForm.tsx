import { Button, ButtonGroup, Grid, TextField } from "@mui/material";
import { Box } from "@mui/system";
import MaskedTextField from "components/MaskedTextField";
import React from "react";
import { Controller, SubmitHandler, UseFormReturn } from "react-hook-form";
import { LICENSE_PLATE_MASK, SERIAL_NUMBER_MASK } from "utils/helpers/masks";

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

interface Props {
  formMethods: UseFormReturn<FormData>;
  onSubmit: SubmitHandler<FormData>;
  handleResetAllForm: () => void;
  loading: boolean;
}

const VehicleForm = ({
  formMethods,
  onSubmit,
  handleResetAllForm,
  loading = false,
}: Props) => {
  const {
    control,
    formState: { errors },
    handleSubmit,
  } = formMethods;

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Box mt={1}>
        <Controller
          render={({ field }) => (
            <TextField
              {...field}
              defaultValue=""
              fullWidth
              label="Identificação"
              error={!!errors.identifier}
              helperText={errors.identifier?.message}
            />
          )}
          control={control}
          name="identifier"
        />
      </Box>
      <Box mt={1}>
        <Controller
          render={({ field }) => (
            <MaskedTextField
              mask={LICENSE_PLATE_MASK}
              field={field}
              label="Placa"
              error={!!errors.license_plate}
              helperText={errors.license_plate?.message || ""}
            />
          )}
          control={control}
          name="license_plate"
        />
      </Box>
      <Box mt={1}>
        <Controller
          render={({ field }) => (
            <MaskedTextField
              mask={SERIAL_NUMBER_MASK}
              field={field}
              label="N. de série"
              error={!!errors.tracker_serial_number}
              helperText={errors.tracker_serial_number?.message || ""}
            />
          )}
          control={control}
          name="tracker_serial_number"
        />
      </Box>
      <Box mt={1}>
        <Grid container columnSpacing={2}>
          <Grid sm={6} xs={12} item>
            <Controller
              render={({ field }) => (
                <TextField
                  {...field}
                  fullWidth
                  label="Latitude"
                  error={!!errors.coordinates?.lat}
                  helperText={errors.coordinates?.lat?.message}
                />
              )}
              control={control}
              name="coordinates.lat"
            />
          </Grid>
          <Grid sm={6} xs={12} item>
            <Controller
              render={({ field }) => (
                <TextField
                  {...field}
                  fullWidth
                  label="Longitude"
                  error={!!errors.coordinates?.lng}
                  helperText={errors.coordinates?.lng?.message}
                />
              )}
              control={control}
              name="coordinates.lng"
            />
          </Grid>
        </Grid>
      </Box>
      <Box mt={1}>
        <Controller
          render={({ field }) => (
            <TextField
              {...field}
              fullWidth
              label="Imagem (URL)"
              error={!!errors.image}
              helperText={errors.image?.message}
            />
          )}
          control={control}
          name="image"
        />
      </Box>
      <Box mt={2}>
        <ButtonGroup color="primary" aria-label="actions-form" fullWidth>
          <Button
            type="button"
            onClick={handleResetAllForm}
            variant="outlined"
            color="warning"
            size="large"
            disabled={loading}
          >
            Cancelar
          </Button>
          <Button
            disabled={loading}
            type="submit"
            fullWidth
            variant="contained"
            size="large"
          >
            {loading ? "Cadastrando ..." : "Adicionar novo veiculo"}
          </Button>
        </ButtonGroup>
      </Box>
    </form>
  );
};

export default VehicleForm;
