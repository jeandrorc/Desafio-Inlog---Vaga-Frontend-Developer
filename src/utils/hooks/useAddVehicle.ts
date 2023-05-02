import { useCallback } from "react";
import { Vehicle } from "types/vehicle";
import { useAppDispatch, useAppSelector } from "./useAppDispatch";
import { addVehicle } from "store/features/vehicles/vehicleSlice";

type SuccessCallback = (vehicle: Vehicle) => void;
type ErrorCallback = (error: Error) => void;

const useAddVehicle = (
  onSuccess?: SuccessCallback,
  onError?: ErrorCallback
) => {
  const dispatch = useAppDispatch();
  const status = useAppSelector((state) => state.vehicles.addStatus);
  const error = useAppSelector((state) => state.vehicles.error);

  const handleAddVehicle = useCallback(
    async (vehicle: Vehicle) => {
      try {
        const resultAction = await dispatch(addVehicle(vehicle)).unwrap();
        if (onSuccess) {
          onSuccess(resultAction.vehicle);
        }
      } catch (error: unknown) {
        if (onError && error instanceof Error) {
          onError(error);
        }
      }
    },
    [dispatch, onSuccess, onError]
  );

  return { addVehicle: handleAddVehicle, status, error };
};

export default useAddVehicle;
