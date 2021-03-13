import { makeStyles } from "@material-ui/core";
export const useStyles = makeStyles((theme) => ({
  root: {
    flex: "1",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "1em",
  },
  title: {
    fontFamily: "Montserrat",
    textAlign: "center",
    color: theme.palette.primary.contrastText,
    "& > *": {
      display: "block",
    },
    fontSize: "clamp(4em, 7vw, 5em)",
    [theme.breakpoints.down("sm")]: {
      fontSize: "clamp(1.75em, 7vw, 5em)",
    },
    textTransform: "uppercase",
    fontVariant: "small-caps",
    margin: "3.5em 0",
  },
  line: {
    overflow: "hidden",
    width: "100&",
    position: "relative",
    height: "100px",
  },
}));
