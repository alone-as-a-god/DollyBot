import { makeStyles } from "@material-ui/core";

export const useStyles = makeStyles((theme) => ({
  icon: {
    cursor: "pointer",
    color: theme.palette.primary.main,
    fontSize: "2.25em",
  },
  root: {
    position: "relative",
    background: theme.palette.secondary.main,
    padding: "2em 0",
    display: "flex",
    justifyContent: "space-evenly",
    [theme.breakpoints.down("xs")]: {
      flexDirection: "column",
      paddingLeft: "2rem",
    },
  },
  logo: {
    color: theme.palette.primary.dark,
    fontWeight: "600",
  },
  header: {
    fontSize: "1.5em",
    color: theme.palette.primary.dark,
    fontWeight: "600",
  },
  link: {
    textDecoration: "none",
    fontSize: "1.25em",
  },
  linkText: {
    color: theme.palette.primary.main,
    textTransform: "capitalize",
    fontVariant: "normal",
  },
  robot: {
    position: "absolute",
    right: "0px",
    top: "0",
    transform: "translateY(-98%)",
    width: "calc(250px + 5vw)",
    [theme.breakpoints.down("sm")]: {
      display: "none",
    },
  },
}));
