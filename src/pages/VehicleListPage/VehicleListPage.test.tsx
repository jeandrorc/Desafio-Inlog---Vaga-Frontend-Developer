import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import userEvent from "@testing-library/user-event";
import VehicleListPage from "./VehicleListPage";
import { MemoryRouter } from "react-router-dom";

export const vehiclesMock = [
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

jest.mock("utils/hooks/useSortedVehicles", () => (vehicles: any) => vehicles);

jest.mock("utils/hooks/useUserLocation", () => ({
  useUserLocation: () => ({ lat: 0, lng: 0 }),
}));

jest.mock("utils/hooks/useVehicle", () => ({
  useVehicles: () => ({
    vehicles: vehiclesMock,
    vehiclesStatus: "idle",
    handleSearch: jest.fn(),
  }),
}));

describe("VehicleListPage", () => {
  test("renders without crashing", () => {
    render(
      <MemoryRouter>
        <VehicleListPage />
      </MemoryRouter>
    );
    expect(screen.getByLabelText("Buscar")).toBeInTheDocument();
  });

  test("handles search input", () => {
    render(
      <MemoryRouter>
        <VehicleListPage />
      </MemoryRouter>
    );
    const searchInput = screen.getByLabelText("Buscar");

    userEvent.type(searchInput, "test search");
    expect(searchInput).toHaveValue("test search");
  });
});
