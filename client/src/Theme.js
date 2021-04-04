import { createMuiTheme } from "@material-ui/core/styles";

//creates the colortheme for our whole app using material-ui
export default createMuiTheme({
  palette: {
    primary: {
      main: "#474A80",
      contrastText: "#F9F7FF",
      light: "#7B7A9E",
      dark: "#32345A",
      extradark: "#27283F",
      secondaryText: "#fffffff0",
    },
    secondary: {
      main: "#F9F7FF",
      dark: "#DBDAE6",
    },
  },
  typography: {
    h1: {
      fontFamily: "Poppins",
      fontSize: "clamp(4em, 12vw, 5em)",
      fontWeight: "500",
    },
    h2: {
      fontFamily: "Poppins",
      fontWeight: "500",
      fontSize: "4em",
    },
    h3: {
      fontFamily: "Poppins",
      fontWeight: "500",
      fontSize: "3em",
    },
    h4: {
      fontFamily: "Poppins",
      textTransform: "uppercase",
      fontWeight: "500",
      fontSize: "2.5em",
    },
    h5: {
      fontSize: "2em",
    },

    button: {
      fontSize: "1.125em",
      textTransform: "capitalize",
      fontFamily: "Poppins",
    },
    body1: {
      fontFamily: "Open Sans",
      fontWeight: "400",
      fontSize: "1.25em",
    },
  },
  spacing: (factor) => `${0.5 * factor}rem`,
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 960,
      lg: 1440,
      xl: 1921,
      xxl: 2560,
      xxxl: 3890,
    },
  },
});
