import React, { useState } from "react";
import { Grid, TextField } from "@mui/material";
import { Search } from "@mui/icons-material";
import AddIcon from "@mui/icons-material/Add";
import { VehicleList } from "components/VehicleList";
import { useUserLocation } from "utils/hooks/useUserLocation";
import { RequestLocalization } from "components/RequestLocalization";
import { useVehicles } from "utils/hooks/useVehicle";
import VehicleListSkeleton from "components/VehicleListSkeleton";
import GoogleMapSkeleton from "components/GoogleMapSkeleton";
import VehiclesMap from "components/VehiclesMap/VehiclesMap";
import { Vehicle } from "types/vehicle";
import FabLink from "components/Fablink/Fablink";
import useSortedVehicles from "utils/hooks/useSortedVehicles";

const VehicleListPage = () => {
  const userLocation = useUserLocation();
  const [selectedVehicle, setSelectedVehicle] = useState<Vehicle | null>(null);

  const { vehicles, vehiclesStatus, handleSearch } =
    useVehicles(userLocation);

  const vehiclesIsLoading =
    vehiclesStatus === "loading" || vehiclesStatus === "idle";

  const sortedVehicles = useSortedVehicles(vehicles);

  const handleVehicleSelect = (vehicle: Vehicle) => {
    setSelectedVehicle(vehicle);
  };

  return (
    <>
      <FabLink icon={<AddIcon />} title="Adicionar veiculo" link="/novo-veiculo"/>
      <RequestLocalization />
      <Grid container spacing={3} height={'100%'}>
        <Grid item xs={12} sm={4}>
          <TextField
            fullWidth
            label="Buscar"
            onChange={(e) => handleSearch(e.target.value)}
            InputProps={{
              startAdornment: <Search />,
            }}
          />
          {vehiclesIsLoading ? (
            <VehicleListSkeleton />
          ) : (
            <VehicleList
              onVehicleSelect={handleVehicleSelect}
              data={sortedVehicles}
            />
          )}
        </Grid>
        <Grid item xs={12} sm={8} height="100%">
          {vehiclesIsLoading ? (
            <GoogleMapSkeleton />
          ) : (
            <VehiclesMap
              key={vehicles.length}
              selectedVehicle={selectedVehicle}
              vehicles={sortedVehicles}
            />
          )}
        </Grid>
      </Grid>
    </>
  );
};

export default VehicleListPage;
