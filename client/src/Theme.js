import { createMuiTheme } from "@material-ui/core/styles";

//creates the colortheme for our whole app using material-ui
export default createMuiTheme({
  palette: {
    primary: {
      main: "#474A80",
      contrastText: "#F9F7FF",
      light: "#7B7A9E",
      dark: "#32345A",
      secondaryText: "#fffffff0",
    },
    secondary: {
      main: "#F9F7FF",
    },
  },
  typography: {
    h3: {
      fontFamily: "Montserrat",
      textTransform: "uppercase",
      fontWeight: "500",
    },
    h1: {
      fontFamily: "Montserrat",
      fontWeight: "500",
      fontSize: "5em",
    },
    h2: {
      fontFamily: "Montserrat",
      fontWeight: "500",
    },
    button: {
      fontSize: "1.125em",
    },
    body1: {
      fontFamily: "Montserrat",
      fontWeight: "500",
      fontSize: "1em",
      textTransform: "uppercase",
      fontVariant: "small-caps",
    },
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 960,
      lg: 1440,
      xl: 1920,
    },
  },
});
