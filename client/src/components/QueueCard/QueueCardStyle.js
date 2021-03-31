import { makeStyles } from "@material-ui/core";

export const useStyles = makeStyles((theme) => ({
  title: {
    color: theme.palette.secondary.main,
    marginBottom: "1rem",
    fontSize: "clamp(2.25em, 5vw, 3em)",
  },
  text: {
    color: theme.palette.secondary.dark,
    margin: "1rem 0",
    fontSize: "1.25em",
  },
  songContainer: {
    marginTop: "1rem",
    maxHeight: "600px",
    overflowY: "auto",
  },
}));
