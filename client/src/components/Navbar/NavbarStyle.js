import { makeStyles } from "@material-ui/core";

export const useStyles = makeStyles((theme) => ({
  root: {
    position: "relative",
    zIndex: "9999999 !important",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: theme.palette.primary.dark,
    color: theme.palette.primary.contrastText,
    paddingLeft: theme.spacing(16),
    paddingRight: theme.spacing(16),
    height: "80px",
    [theme.breakpoints.down("md")]: {
      paddingLeft: theme.spacing(6),
      paddingRight: theme.spacing(6),
    },
    [theme.breakpoints.down("sm")]: {
      paddingLeft: theme.spacing(4),
      paddingRight: theme.spacing(4),
    },

    [theme.breakpoints.down("xs")]: {
      fontSize: ".8em",
      height: "70px",
      paddingLeft: theme.spacing(2),
      paddingRight: theme.spacing(2),
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
  drawerButton: {
    margin: ".5rem 0",
    fontSize: "clamp(1.25em, 5vw, 1.5em)",
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
    letterSpacing: "1px",
  },
}));
