import React from "react";
import { render, screen } from "@testing-library/react";
import { Vehicle } from "types/vehicle";
import VehiclesMap from "./VehiclesMap";

const mockVehicles: Array<Vehicle> = [
  {
    identifier: "Vehicle 1",
    license_plate: "JJG-8F82",
    tracker_serial_number: "A2680080",
    image: "",
    coordinates: {
      latitude: -25.46253012646349,
      longitude: -49.32330020554043,
    },
  },
  {
    identifier: "Vehicle 2",
    license_plate: "MCO-1C50",
    tracker_serial_number: "A8978156",
    image: "",
    coordinates: {
      latitude: -25.416098496545292,
      longitude: -49.272603049311364,
    },
  },
  {
    identifier: "Vehicle 3",
    license_plate: "JSC-5X74",
    tracker_serial_number: "A8760034",
    image: "",
    coordinates: {
      latitude: -25.408264364910078,
      longitude: -49.24510798779167,
    },
  },
  {
    identifier: "Vehicle 4",
    license_plate: "JCJ-7B65",
    tracker_serial_number: "A4128134",
    image: "",
    coordinates: {
      latitude: -25.39855804376087,
      longitude: -49.31543895352931,
    },
  },
  {
    identifier: "Vehicle 5",
    license_plate: "OZS-7J24",
    tracker_serial_number: "A6762033",
    image: "",
    coordinates: {
      latitude: -25.40109368164335,
      longitude: -49.276463043839996,
    },
  },
  {
    identifier: "Vehicle 6",
    license_plate: "ALV-7J52",
    tracker_serial_number: "A2791611",
    image: "",
    coordinates: {
      latitude: -25.398374002529053,
      longitude: -49.23478704613542,
    },
  },
  {
    identifier: "Vehicle 7",
    license_plate: "ZMV-6L72",
    tracker_serial_number: "A7085880",
    image: "",
    coordinates: {
      latitude: -25.427401607532225,
      longitude: -49.269776442741815,
    },
  },
  {
    identifier: "Vehicle 8",
    license_plate: "HJT-6K62",
    tracker_serial_number: "A5034991",
    image: "",
    coordinates: {
      latitude: -25.467465880669668,
      longitude: -49.25047996522125,
    },
  },
];

describe("VehiclesMap component", () => {
  beforeEach(() => {
    jest.mock("utils/hooks/useGoogleMpasScriptOptions", () => ({
      __esModule: true,
      default: () => ({ isScriptLoaded: true }),
    }));

    jest.mock("utils/hooks/useUserLocation", () => ({
      __esModule: true,
      useUserLocation: () => ({ lat: 37.7749, lng: -122.4194 }),
    }));
  });

  test("renders the map with markers", async () => {
    render(<VehiclesMap vehicles={mockVehicles} selectedVehicle={null} />);

    const mapElement = await screen.findByTestId("map");
    expect(mapElement).toBeInTheDocument();
  });

  test("pans and zooms to the selected vehicle", async () => {
    render(
      <VehiclesMap vehicles={mockVehicles} selectedVehicle={mockVehicles[0]} />
    );
  });
});
