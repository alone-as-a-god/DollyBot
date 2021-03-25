import { makeStyles } from "@material-ui/core";

export const useStyles = makeStyles((theme) => ({
  drawerContainer: {
    background: theme.palette.primary.dark,
    display: "flex",
    flexDirection: "column",
    padding: "2em",
    height: "100%",
    width: "80vw",
    maxWidth: "400px",
    zIndex: "999999",
  },
  link: {
    margin: "2px 0",
    textTransform: "capitalize",
    color: theme.palette.secondary.main,
    textDecoration: "none",
    fontSize: "clamp(1.25em, 5vw, 1.75em)",
    borderRadius: "5px",
    "&:hover": {
      background: "#27283F",
    },
    padding: ".25em",
  },
  active: {
    background: "#27283F",
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
