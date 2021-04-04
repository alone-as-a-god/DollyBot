import { makeStyles } from "@material-ui/core";
export const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flex: "1",
    fontSize: "1em",
  },
  title: {
    transform: "translateX(12%)",
    margin: "2em 0",
    color: theme.palette.primary.contrastText,
    fontFamily: "Montserrat",
    textAlign: "center",
    fontSize: "clamp(1.75em, 7vw, 6em)",
    textTransform: "uppercase",
    fontVariant: "small-caps",
    "& span": {
      display: "block",
    },
    [theme.breakpoints.down("sm")]: {
      transform: "translateX(0)",
      fontSize: "clamp(1.75em, 8.5vw,4.5em)",
    },
  },
}));
