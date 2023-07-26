import { createTheme } from "@mui/material";

export const GlobalTheme = createTheme({
  palette: {
    primary: {
      main: "#4D455D",
    },
    secondary: {
      main: "#E96479",
    },
  },
  typography: {
    button: {
      textTransform: "none",
    },
  },
});
