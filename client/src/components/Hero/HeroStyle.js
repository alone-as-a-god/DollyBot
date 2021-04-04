import { makeStyles } from "@material-ui/core";
export const useStyles = makeStyles((theme) => ({
  root: {
    flex: "1",
    display: "flex",
    alignItems: "center",
    fontSize: "1em",
    justifyContent: "center",
    [theme.breakpoints.down("sm")]: {
      justifyContent: "center",
    },
  },
  title: {
    transform: "translateX(15%)",
    fontFamily: "Montserrat",
    textAlign: "center",
    color: theme.palette.primary.contrastText,
    "& > *": {
      display: "block",
    },
    fontSize: "clamp(1.75em, 7vw, 6em)",
    [theme.breakpoints.up("xxl")]: {
      // fontSize: "clamp(4em, 5vw, 7em)",
    },
    [theme.breakpoints.down("sm")]: {
      fontSize: "clamp(1.75em, 8.5vw,4.5em)",
      transform: "translateX(0)",
      marginTop: "1.5em",
      marginBottom: "3em",
    },
    textTransform: "uppercase",
    fontVariant: "small-caps",
    margin: "2em 0",
  },
  line: {
    overflow: "hidden",
    width: "100%",
    position: "relative",
    height: "100px",
  },
}));
