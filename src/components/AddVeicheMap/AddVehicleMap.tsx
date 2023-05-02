import { Box } from "@mui/material";
import { GoogleMap, Marker } from "@react-google-maps/api";
import AddressAutocomplete from "components/AddressAutoComplete/AddressAutoComplete";
import GoogleMapSkeleton from "components/GoogleMapSkeleton";
import React from "react";
import useGoogleMapsScript from "utils/hooks/useGoogleMpasScriptOptions";

type Coordinates = {
  lat: number;
  lng: number;
};

type Props = {
  setCoordinates: (coordinates: Coordinates) => void;
  coordinates: Coordinates;
};

const AddVehicleMap: React.FC<Props> = ({
  coordinates,
  setCoordinates,
}: Props) => {
  const { isScriptLoaded } = useGoogleMapsScript();

  const handleMapClick = (event: google.maps.MapMouseEvent) => {
    if (event.latLng) {
      setCoordinates({ lat: event.latLng.lat(), lng: event.latLng.lng() });
    }
  };

  const handlePlaceSelect = (place: google.maps.places.PlaceResult) => {
    const location = place.geometry?.location;
    if (location) {
      setCoordinates({ lat: location.lat(), lng: location.lng() });
    }
  };
  const isCoordinates = coordinates.lat && coordinates.lng;
  return (
    <Box sx={{ height: "100%", width: "100%" }}>
      {isScriptLoaded && (
        <AddressAutocomplete onPlaceSelected={handlePlaceSelect} />
      )}
      {isScriptLoaded ? (
        <GoogleMap
          mapContainerStyle={{ height: "100%", width: "100%" }}
          zoom={isCoordinates ? 13 : 3}
          center={{ lat: coordinates.lat, lng: coordinates.lng }}
          onClick={handleMapClick}
          data-testid="google-map-mock"
        >
          {coordinates.lat !== 0 && coordinates.lng !== 0 && (
            <Marker position={{ lat: coordinates.lat, lng: coordinates.lng }} />
          )}
        </GoogleMap>
      ) : (
        <GoogleMapSkeleton />
      )}
    </Box>
  );
};

export default AddVehicleMap;
