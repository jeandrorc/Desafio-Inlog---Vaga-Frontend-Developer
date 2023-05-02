import { createServer, Model } from "miragejs";
import { vehiclesMock } from "mocks/veichleMock";
import { Vehicle } from "types/vehicle";
import { calculateDistance } from "utils/helpers/distanceHelper";

export function makeServer({ environment = "test" } = {}) {
  return createServer({
    environment,

    models: {
      vehicle: Model.extend<Partial<Vehicle>>({}),
    },
    routes() {
      this.namespace = "api";

      this.get("/vehicles", (schema: any, request: any) => {
        const lat = request.queryParams.lat;
        const lng = request.queryParams.lng;
        const searchTerm = request.queryParams.query;

        let vehicles = schema.all("vehicle").models as Vehicle[];

        if (searchTerm) {
          vehicles = vehicles.filter(
            (vehicle) =>
              vehicle.identifier
                .toLowerCase()
                .includes(searchTerm.toLowerCase()) ||
              vehicle.license_plate
                .toLowerCase()
                .includes(searchTerm.toLowerCase()) ||
              vehicle.tracker_serial_number
                .toLowerCase()
                .includes(searchTerm.toLowerCase())
          );
        }

        if (lat && lng) {
          const latNumber = parseFloat(lat);
          const lngNumber = parseFloat(lng);

          vehicles.forEach((vehicle: Vehicle) => {
            const distance = calculateDistance(
              latNumber,
              lngNumber,
              vehicle?.coordinates?.latitude,
              vehicle?.coordinates?.longitude
            );
            (vehicle as any).attrs.distance = distance;
          });

          vehicles.sort((a: any, b: any) => a.distance - b.distance);
        }
        return vehicles;
      });

      this.post("/vehicle", (schema, request) => {
        const attrs = JSON.parse(request.requestBody);
        return schema.create("vehicle", attrs);
      });
    },

    seeds(server) {
      vehiclesMock.forEach((vehicle) => {
        server.create("vehicle", vehicle as object);
      });
    },
  });
}
