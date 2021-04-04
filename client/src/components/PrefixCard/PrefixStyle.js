import { makeStyles } from "@material-ui/core";

export const useStyles = makeStyles((theme) => ({
  title: {
    color: theme.palette.secondary.main,
    marginBottom: "1rem",
    fontSize: "clamp(2.25em, 5vw, 3em)",
  },
  text: {
    color: theme.palette.secondary.dark,
    marginBottom: "1rem",
    fontSize: "1.25em",
  },
}));
