import { Card, CardContent, CardMedia, Typography } from "@mui/material";
import { InfoWindow, Marker } from "@react-google-maps/api";
import { useState } from "react";
import { Vehicle } from "types/vehicle";
import { distanceToHuman } from "utils/helpers/distanceHelper";
import useGoogleMapsScript from "utils/hooks/useGoogleMpasScriptOptions";

const VehicleMarker: React.FC<{ vehicle: Vehicle }> = ({ vehicle }) => {
  const { isScriptLoaded } = useGoogleMapsScript();

  const [infoWindowOpen, setInfoWindowOpen] = useState(false);
  const toggleInfoWindow = () => {
    setInfoWindowOpen(!infoWindowOpen);
  };

  if (!isScriptLoaded) {
    return null;
  }

  return (
    <>
      <Marker
        position={{
          lat: vehicle?.coordinates?.latitude,
          lng: vehicle?.coordinates?.longitude,
        }}
        onClick={toggleInfoWindow}
        label={{
          text: vehicle.identifier,
          fontWeight: "bold",
          fontSize: "16px",
          color: "red",
        }}
        icon={{
          url: "http://maps.google.com/mapfiles/ms/icons/bus.png",
          scaledSize: new window.google.maps.Size(55, 55),
        }}
      />
      {infoWindowOpen && (
        <InfoWindow
          position={{
            lat: vehicle?.coordinates?.latitude,
            lng: vehicle?.coordinates?.longitude,
          }}
          onCloseClick={toggleInfoWindow}
        >
          <Card sx={{ maxWidth: 345 }}>
            <CardMedia
              component="img"
              height="200"
              width="200"
              image={vehicle.image || undefined}
              alt={vehicle.identifier}
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                {vehicle.identifier}
              </Typography>
              <Typography gutterBottom component="p">
                Placa: {vehicle.license_plate}
              </Typography>
              <Typography gutterBottom component="p">
                N de série: {vehicle.tracker_serial_number}
              </Typography>
              {vehicle.distance && (
                <Typography gutterBottom component="p">
                  {distanceToHuman(vehicle.distance)}
                </Typography>
              )}
            </CardContent>
          </Card>
        </InfoWindow>
      )}
    </>
  );
};

export default VehicleMarker;
