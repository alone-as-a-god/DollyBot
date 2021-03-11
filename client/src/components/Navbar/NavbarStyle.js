import { makeStyles } from "@material-ui/core";

export const useStyles = makeStyles((theme) => ({
  root: {
    position: "sticky",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: theme.palette.primary.dark,
    color: theme.palette.primary.contrastText,
    padding: "0 2em",
    overflow: "hidden",
    height: "80px",
    [theme.breakpoints.down("xs")]: {
      fontSize: ".8em",
      height: "70px",
    },
  },

  linkContainer: {
    display: "flex",
    alignItems: "center",
    height: "100%",
    [theme.breakpoints.down("sm")]: {
      display: "none",
    },
  },
  line: {
    height: "1px",
    background: theme.palette.secondary.main,
    width: "100%",
    zIndex: "999",
  },
  icon: {
    color: theme.palette.secondary.main,
    fontSize: "2.5em",

    [theme.breakpoints.up("md")]: {
      display: "none",
    },
  },
  button: {
    "&:hover": {
      background: "#27283F",
    },
  },
  logoContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    textDecoration: "none",
  },
  logo: {
    width: "50px",
    marginRight: "1rem",
  },
  logoText: {
    color: theme.palette.secondary.main,
  },
}));
