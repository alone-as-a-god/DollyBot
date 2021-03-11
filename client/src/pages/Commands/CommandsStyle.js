import { makeStyles } from "@material-ui/core";

export const useStyles = makeStyles((theme) => ({
  root: {
    margin: "2em",
    minHeight: "100vh",
  },
  container: {},
  accordion: {
    background: theme.palette.primary.dark,
    color: theme.palette.secondary.main,
    width: "900px",
    [theme.breakpoints.down("md")]: {
      width: "70%",
    },
    [theme.breakpoints.down("sm")]: {
      width: "80%",
    },
    [theme.breakpoints.down("xs")]: {
      width: "100%",
    },
  },
  title: {
    color: theme.palette.secondary.main,
    marginBottom: "1rem",
  },
  icon: {
    color: theme.palette.secondary.main,
    fontSize: "1.5em",
  },
  accordionText: {
    fontSize: "1.25em",
  },
  text: {
    color: theme.palette.secondary.main,
    marginBottom: "1rem",
  },
  alias: {
    opacity: "70%",
    marginLeft: "1em",
  },
  accordionTitle: {
    "&>div": {
      display: "flex",
      alignItems: "center",
    },
  },
}));
