import { createMuiTheme } from "@material-ui/core/styles";

//creates the colortheme for our whole app using material-ui
export default createMuiTheme({
  palette: {
    primary: {
      main: "#474A80",
      contrastText: "#EDD8C7",
      light: "#7B7A9E",
      secondaryText: "#fffffff0",
    },
    secondary: {
      main: "#EDD8C7",
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
  breakpoints: {},
});
