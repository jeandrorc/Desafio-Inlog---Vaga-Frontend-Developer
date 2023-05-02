import { useEffect, useState } from "react";
import { Coordinates, Vehicle } from "types/vehicle";
import { calculateDistance } from "utils/helpers/distanceHelper";

const useSortedVehicles = (vehicles: Vehicle[]): Vehicle[] => {
  const [sortedVehicles, setSortedVehicles] = useState<Vehicle[]>([]);
  const [userCoordinates, setUserCoordinates] = useState<Coordinates | null>(
    null
  );

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserCoordinates({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          });
        },
        (error) => {
          console.error("Error obtaining user location:", error);
          setUserCoordinates(null);
        }
      );
    } else {
      console.error("Geolocation is not supported by this browser.");
      setUserCoordinates(null);
    }
  }, []);

  useEffect(() => {
    if (userCoordinates) {
      const sorted = vehicles
        .map((vehicle) => {
          if (!vehicle.distance && vehicle.coordinates) {
            const distance = calculateDistance(
              userCoordinates.latitude,
              userCoordinates.longitude,
              vehicle.coordinates.latitude,
              vehicle.coordinates.longitude
            );
            return { ...vehicle, distance };
          }
          return vehicle;
        })
        .sort((a, b) => {
          if (a.distance === undefined) {
            return 1;
          }
          if (b.distance === undefined) {
            return -1;
          }
          return a.distance - b.distance;
        });

      setSortedVehicles(sorted);
    } else {
      setSortedVehicles(
        vehicles.filter((vehicle) => vehicle.distance !== undefined)
      );
    }
  }, [vehicles, userCoordinates]);

  return sortedVehicles;
};

export default useSortedVehicles;
