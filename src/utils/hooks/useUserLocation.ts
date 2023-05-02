import { useState, useEffect } from "react";
import { getUserLocation } from "utils/helpers/distanceHelper";

export interface UserLocationInterface {
  lat: number | null;
  lng: number | null;
}

export const useUserLocation = (): UserLocationInterface => {
  const [userLocation, setUserLocation] = useState<UserLocationInterface>({ lat: null, lng: null });
  useEffect(() => {
    getUserLocation()
      .then((position) => {
        setUserLocation(position);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  return userLocation;
};
