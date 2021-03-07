import { makeStyles } from "@material-ui/core";
export const useStyles = makeStyles((theme) => ({
  root: {
    flex: "1",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
  },
  title: {
    textAlign: "center",
    color: theme.palette.primary.contrastText,
    "& > *": {
      display: "block",
    },
    fontSize: "5em",
    textTransform: "uppercase",
    fontVariant: "small-caps",
  },
  icon: {
    position: "absolute",
    bottom: "0",
    left: "-200px",
    fontSize: "500px",
    height: "500px",
    color: theme.palette.secondary.main,
    opacity: "0.35",
  },
  line: {
    overflow: "hidden",
    width: "100&",
    position: "relative",

    height: "100px",
  },
}));
