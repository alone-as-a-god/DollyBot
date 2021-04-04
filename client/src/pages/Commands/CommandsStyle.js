import { makeStyles } from "@material-ui/core";
import Curve from "./curve.svg";
export const useStyles = makeStyles((theme) => ({
  root: {
    minHeight: "100vh",
    padding: "2rem 0",
    backgroundPosition: "top right",
    backgroundRepeat: "no-repeat",
    backgroundSize: "contain",
    paddingLeft: theme.spacing(16),
    paddingRight: theme.spacing(16),
    [theme.breakpoints.down("md")]: {
      paddingLeft: theme.spacing(6),
      paddingRight: theme.spacing(6),
    },
    [theme.breakpoints.down("sm")]: {
      paddingLeft: theme.spacing(4),
      paddingRight: theme.spacing(4),
      background: "url()",
    },
    [theme.breakpoints.down("xs")]: {
      paddingLeft: theme.spacing(2),
      paddingRight: theme.spacing(2),
    },
  },
  accordion: {
    background: theme.palette.primary.dark,
    color: theme.palette.secondary.main,
    borderColor: "red",
    width: "60%",
    [theme.breakpoints.down("lg")]: {
      width: "80%",
    },
    [theme.breakpoints.down("md")]: {
      width: "80%",
    },
    [theme.breakpoints.down("sm")]: {
      width: "100%",
    },
    [theme.breakpoints.down("xs")]: {
      width: "100%",
    },
  },
  title: {
    color: theme.palette.secondary.main,
    marginBottom: "1rem",
    [theme.breakpoints.down("xs")]: {
      fontSize: "3em",
    },
  },
  icon: {
    color: theme.palette.secondary.main,
    fontSize: "1.5em",
  },

  text: {
    color: theme.palette.secondary.main,
    marginBottom: "1rem",
  },
  alias: {
    opacity: "80%",
    marginLeft: "1em",
  },
  accordionTitle: {
    "&>div": {
      display: "flex",
      alignItems: "center",
    },
  },
  accordionText: {
    opacity: "80%",
  },
  commandName: {
    fontSize: "1.75em",
  },
}));
