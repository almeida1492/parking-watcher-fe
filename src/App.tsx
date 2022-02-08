import React from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import MapActivity from "./components/MapActivity";
import NewReport from "./components/NewReport";
import ReportDetails from "./components/ReportDetails";
import { Error } from "./components/Error";
import { createTheme, ThemeProvider } from "@mui/material";
import SourceSerif4 from "./assets/fonts/SourceSerif4-VariableFont_opsz,wght.ttf";
import { About } from "./components/About";

const theme = createTheme({
  palette: {
    primary: {
      light: "#6698B7",
      main: "#477998",
      dark: "#34586F",
      contrastText: "#fff",
    },
    secondary: {
      light: "#F9AA8A",
      main: "#F78154",
      dark: "#F56329",
      contrastText: "#291F1E",
    },
    text: {
      primary: "#291F1E",
      secondary: "#477998",
      disabled: "#C2C2C2",
    },
    background: {
      default: "#c4d6b0",
      paper: "#EBF1E4",
    },
  },
  typography: {
    // fontFamily: "SourceSerif4",
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: `
        @font-face {
          font-family: 'SourceSerif4';
          font-style: normal;
          font-display: swap;
          font-weight: 400;
          src: "local('SourceSerif4'), local('SourceSerif4-Regular'), url(${SourceSerif4}) format('ttf')";
          unicodeRange: 'U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF',
        }
      `,
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Routes>
        <Route path="/" element={<MapActivity />} />
        <Route path="/new" element={<NewReport />} />
        <Route path="/details/:id" element={<ReportDetails />} />
        <Route path="/about" element={<About />} />
        <Route path="/error" element={<Error />} />
      </Routes>
    </ThemeProvider>
  );
}

export default App;
