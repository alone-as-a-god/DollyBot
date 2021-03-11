import { makeStyles } from "@material-ui/core";

export const useStyles = makeStyles((theme) => ({
  container: {
    margin: "0 2em",
    marginBottom: "30rem",
    [theme.breakpoints.down("xs")]: {
      fontSize: ".875em",
      margin: "0 1em",
    },
  },
  title: {
    color: theme.palette.secondary.main,
    margin: "2rem 0",
    [theme.breakpoints.down("xs")]: {
      fontSize: "3.5em",
    },
  },
}));
