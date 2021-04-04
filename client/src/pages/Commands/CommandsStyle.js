import { makeStyles } from "@material-ui/core";
export const useStyles = makeStyles((theme) => ({
  root: {
    minHeight: "100vh",
    padding: "2rem 0",
    paddingLeft: theme.spacing(16),
    paddingRight: theme.spacing(16),
    [theme.breakpoints.down("md")]: {
      paddingLeft: theme.spacing(6),
      paddingRight: theme.spacing(6),
    },
    [theme.breakpoints.down("sm")]: {
      paddingLeft: theme.spacing(4),
      paddingRight: theme.spacing(4),
    },
    [theme.breakpoints.down("xs")]: {
      paddingLeft: theme.spacing(2),
      paddingRight: theme.spacing(2),
    },
  },
  accordion: {
    width: "60%",
    background: theme.palette.primary.dark,
    color: theme.palette.secondary.main,
    borderColor: "red",
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
    marginBottom: "1rem",
    color: theme.palette.secondary.main,
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
  syntax: {
    marginLeft: ".75em",
    color: theme.palette.secondary.dark,
  },
  accordionTitle: {
    "&>div": {
      display: "flex",
      alignItems: "center",
    },
  },
  description: {
    color: theme.palette.secondary.dark,
  },
  commandName: {
    fontSize: "1.75em",
  },
}));
