import React from "react";
import { render, screen } from "@testing-library/react";
import AddressAutocomplete from "./AddressAutoComplete";

describe("AddressAutocomplete", () => {
  it("renders without crashing", () => {
    const { container } = render(
      <AddressAutocomplete onPlaceSelected={() => {}} />
    );
    expect(container).toBeInTheDocument();
  });

  it("does not render the suggestions list initially", () => {
    render(<AddressAutocomplete onPlaceSelected={() => {}} />);
    const suggestionsList = screen.queryByRole("list");
    expect(suggestionsList).not.toBeInTheDocument();
  });
});
