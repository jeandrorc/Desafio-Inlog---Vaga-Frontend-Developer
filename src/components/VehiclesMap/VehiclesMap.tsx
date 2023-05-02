import React, { useCallback, useEffect, useState } from "react";
import { GoogleMap, Marker } from "@react-google-maps/api";
import { Vehicle } from "types/vehicle";
import { VehicleMarker } from "components/VehicleMarker";
import { useUserLocation } from "utils/hooks/useUserLocation";
import useGoogleMapsScript from "utils/hooks/useGoogleMpasScriptOptions";
type Props = {
  vehicles: Array<Vehicle>;
  selectedVehicle: Vehicle | null;
};

const VehiclesMap: React.FC<Props> = ({ vehicles, selectedVehicle }) => {
  const userPosition = useUserLocation();
  const [map, setMap] = useState<google.maps.Map | null>(null);

  const { isScriptLoaded } = useGoogleMapsScript();

  const onLoad = useCallback(function callback(map: google.maps.Map) {
    setMap(map);
  }, []);

  const onUnmount = useCallback(function callback(map: google.maps.Map) {
    setMap(null);
  }, []);

  const handleMarkerClick = useCallback(
    (vehicle: Vehicle) => {
      if (map) {
        map.panTo({
          lat: vehicle?.coordinates?.latitude,
          lng: vehicle?.coordinates?.longitude,
        });
        map.setZoom(16);
      }
    },
    [map]
  );

  useEffect(() => {
    if (selectedVehicle) {
      handleMarkerClick(selectedVehicle);
    }
  }, [handleMarkerClick, selectedVehicle]);

  useEffect(() => {
    if (map && vehicles.length > 0) {
      const bounds = new window.google.maps.LatLngBounds();

      vehicles.forEach((vehicle) => {
        bounds.extend(
          new window.google.maps.LatLng(
            vehicle?.coordinates?.latitude,
            vehicle?.coordinates?.longitude
          )
        );
      });

      if (userPosition.lat !== null && userPosition.lng !== null) {
        bounds.extend(
          new window.google.maps.LatLng(userPosition.lat, userPosition.lng)
        );
      }

      map.fitBounds(bounds);
    }
  }, [map, vehicles, userPosition]);

  return isScriptLoaded ? (
    <div data-testid="map" style={{ width: "100%", height: "100%" }}>
      <GoogleMap
        onLoad={onLoad}
        onUnmount={onUnmount}
        mapContainerStyle={{
          width: "100%",
          height: "100%",
        }}
        center={{
          lat: userPosition.lat || vehicles[0]?.coordinates?.latitude,
          lng: userPosition.lng || vehicles[0]?.coordinates?.longitude,
        }}
        zoom={14}
      >
        {userPosition.lat !== null && userPosition.lng !== null && (
          <Marker
            position={{ lat: userPosition.lat, lng: userPosition.lng }}
            icon={{
              url: "http://maps.google.com/mapfiles/ms/icons/blue-dot.png",
              scaledSize: new window.google.maps.Size(25, 25),
            }}
          />
        )}
        {vehicles.map((vehicle, index) => (
          <VehicleMarker
            vehicle={vehicle}
            key={`${index}--${vehicle.tracker_serial_number}`}
          />
        ))}
      </GoogleMap>
    </div>
  ) : null;
};
export default React.memo(VehiclesMap);
