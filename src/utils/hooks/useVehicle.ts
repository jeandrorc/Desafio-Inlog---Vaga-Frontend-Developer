import { useState, useEffect, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchVehicles,
  searchVehicles,
} from "store/features/vehicles/vehicleSlice";
import { AppDispatch, RootState } from "store/store";
import { UserLocationInterface } from "./useUserLocation";
import { debounce } from "@mui/material";

export const useVehicles = (userLocation: UserLocationInterface) => {
  const [prevLocation, setPrevLocation] = useState<UserLocationInterface>({
    lat: null,
    lng: null,
  });

  const dispatch: AppDispatch = useDispatch();
  const vehicles = useSelector((state: RootState) => state.vehicles.items);
  const vehiclesStatus = useSelector(
    (state: RootState) => state.vehicles.fetchStatus
  );
  const vehiclesError = useSelector((state: RootState) => state.vehicles.error);

  useEffect(() => {
    if (
      (userLocation.lat !== prevLocation.lat ||
        userLocation.lng !== prevLocation.lng) &&
      userLocation.lat !== undefined &&
      userLocation.lng !== undefined
    ) {
      setPrevLocation({ lat: userLocation.lat, lng: userLocation.lng });
      if (vehiclesStatus === "idle") {
        dispatch(
          fetchVehicles({
            lat: userLocation.lat || undefined,
            lng: userLocation.lng || undefined,
          })
        );
      }
    }
  }, [vehiclesStatus, dispatch, userLocation, prevLocation]);

  const debouncedSearch = useCallback((query: string) => {
    const handleSearch = () => {
      dispatch(
        searchVehicles({
          query,
          lat: userLocation.lat || undefined,
          lng: userLocation.lng || undefined,
        })
      );
    };
    const debouncedHandleSearch = debounce(handleSearch, 500);
    debouncedHandleSearch();
  }, [dispatch, userLocation.lat, userLocation.lng]);

  const handleSearch = (query: string) => {
    debouncedSearch(query);
  };

  return { vehicles, vehiclesStatus, vehiclesError, handleSearch };
};
