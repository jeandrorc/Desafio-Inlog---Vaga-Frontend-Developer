import React from "react";
import Routes from "./routes";
import { BaseLayout } from "components/layout/BaseLayout";
import { BrowserRouter } from "react-router-dom";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import useGoogleMapsScript from "utils/hooks/useGoogleMpasScriptOptions";
import { SnackbarProvider } from "notistack";

const theme = createTheme({
  palette: {
    action: {
      hover: "rgba(0, 0, 0, 0.04)",
    },
  },
});

const App: React.FC = () => {
  useGoogleMapsScript();

  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <BaseLayout>
          <SnackbarProvider />
          <Routes />
        </BaseLayout>
      </BrowserRouter>
    </ThemeProvider>
  );
};

export default App;
