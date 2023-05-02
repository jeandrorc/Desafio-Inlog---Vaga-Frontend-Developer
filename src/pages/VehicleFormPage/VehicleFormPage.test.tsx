// src/pages/VehicleFormPage/VehicleFormPage.test.tsx

import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import store from "store/store";
import { BrowserRouter as Router } from "react-router-dom";
import VehicleFormPage from "./VehicleFormPage";

describe("VehicleFormPage", () => {
  it("renders VehicleFormPage", () => {
    // Wrap the VehicleFormPage component in a Redux Provider with the actual store
    render(
      <Provider store={store}>
        <Router>
          <VehicleFormPage />
        </Router>
      </Provider>
    );

    const title = screen.getByText("Cadastro de veiculo");
    expect(title).toBeInTheDocument();
  });
});
