import React from "react";
import MainPage from "./views/MainPage";
import { createTheme, ThemeProvider } from "@material-ui/core";
import ScrollToBottom from "./components/ScrollToBottom";
import ScrollToTop from "./components/ScrollToTop";

const theme = createTheme({
  palette: {
    primary: {
      main: "#333996",
      light: "#3c44b126",
    },
    secondary: {
      main: "#f83245",
      light: "#f8324526",
    },
    background: {
      default: "#f4f5fd",
    },
    undone: {
      main: "#a7a8a7",
      light: "333996",
    },
  },
  overrides: {
    MuiAppBar: {
      root: {
        transform: "translateZ(0)",
      },
    },
  },
  props: {
    MuiIconButton: {
      disableRipple: true,
    },
  },
});

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <MainPage />
      <ScrollToTop />
      <ScrollToBottom />
    </ThemeProvider>
  );
};

export default App;
