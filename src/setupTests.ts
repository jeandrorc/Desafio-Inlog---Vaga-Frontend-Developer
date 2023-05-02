// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import "@testing-library/jest-dom";

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
