import React from "react";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import AddVehicleMap from "./AddVehicleMap";

jest.mock("utils/hooks/useGoogleMpasScriptOptions", () => () => ({
  isScriptLoaded: true,
}));

jest.mock("@react-google-maps/api", () => {
  const originalModule = jest.requireActual("@react-google-maps/api");
  return {
    ...originalModule,
    GoogleMap: (props: any) => <div data-testid="google-map-mock" />,
  };
});

describe("AddVehicleMap", () => {
  const mockSetCoordinates = jest.fn();

  beforeEach(() => {
    (global as any).google = undefined;
    (global as any).google = {
      maps: {
        Map: jest.fn().mockImplementation(() => ({
          addListener: jest.fn(),
          setCenter: jest.fn(),
          setZoom: jest.fn(),
        })),
        Marker: jest.fn(),
        InfoWindow: jest.fn(),
        event: {
          addListener: jest.fn(),
          removeListener: jest.fn(),
        },
        places: {
          AutocompleteService: jest.fn(),
          PlacesServiceStatus: {
            INVALID_REQUEST: "INVALID_REQUEST",
            OK: "OK",
            OVER_QUERY_LIMIT: "OVER_QUERY_LIMIT",
            REQUEST_DENIED: "REQUEST_DENIED",
            UNKNOWN_ERROR: "UNKNOWN_ERROR",
            ZERO_RESULTS: "ZERO_RESULTS",
          },
        },
      },
    };
  });

  afterEach(() => {
    delete (global as any).google;
  });

  it("renders without crashing", () => {
    render(
      <AddVehicleMap
        setCoordinates={mockSetCoordinates}
        coordinates={{ lat: 0, lng: 0 }}
      />
    );
    const addressAutocomplete = screen.getByRole("textbox", {
      name: /Procurar endereço/i,
    });
    expect(addressAutocomplete).toBeInTheDocument();
  });
});
