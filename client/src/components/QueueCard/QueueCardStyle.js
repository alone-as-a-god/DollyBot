import { makeStyles } from "@material-ui/core";

export const useStyles = makeStyles((theme) => ({
  title: {
    color: theme.palette.secondary.main,
    marginBottom: "1rem",
  },
  text: {
    color: theme.palette.secondary.dark,
    margin: "1rem 0",
    fontSize: "1.25em",
  },
}));
