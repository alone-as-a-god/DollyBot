import { makeStyles } from "@material-ui/core";

export const useStyles = makeStyles((theme) => ({
  title: {
    marginBottom: "1rem",
    color: theme.palette.secondary.main,
    fontSize: "clamp(2.25em, 5vw, 3em)",
  },
  text: {
    margin: "1rem 0",
    color: theme.palette.secondary.dark,
    fontSize: "1.25em",
  },
  songContainer: {
    maxHeight: "600px",
    marginTop: "1rem",
    overflowY: "auto",
  },
}));
