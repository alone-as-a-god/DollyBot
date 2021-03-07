import { makeStyles } from "@material-ui/core";

export const useStyles = makeStyles((theme) => ({
  root: {
    padding: "2rem",
    marginBottom: "5em",
  },
  title: {
    color: theme.palette.primary.contrastText,
    margin: "1em 0",
    fontSize: "6em",
  },
  icon: {
    fontSize: "200px",
  },
  featureContainer: {
    display: "flex",
    justifyContent: "center",
  },
}));
