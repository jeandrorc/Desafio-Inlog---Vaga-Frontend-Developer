import React from "react";
import { render, screen } from "@testing-library/react";
import App from "./App";

// Mock the Routes and BaseLayout components
jest.mock("./routes", () => () => <div data-testid="mock-routes" />);
jest.mock("components/layout/BaseLayout", () => ({
  BaseLayout: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="mock-base-layout">{children}</div>
  ),
}));

describe("App", () => {
  it("renders without crashing", () => {
    const { container } = render(<App />);
    expect(container).toBeInTheDocument();
  });

  it("renders the BaseLayout component", () => {
    render(<App />);
    const baseLayout = screen.getByTestId("mock-base-layout");
    expect(baseLayout).toBeInTheDocument();
  });

  it("renders the Routes component", () => {
    render(<App />);
    const routes = screen.getByTestId("mock-routes");
    expect(routes).toBeInTheDocument();
  });
});
