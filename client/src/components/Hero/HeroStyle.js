import { makeStyles } from "@material-ui/core";
export const useStyles = makeStyles((theme) => ({
  root: {
    flex: "1",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "1em",

    [theme.breakpoints.down("sm")]: {
      fontSize: ".7em",
    },
    [theme.breakpoints.down("xs")]: {
      fontSize: ".5em",
    },
    ["@media (max-width: 375px)"]: {
      fontSize: ".4em",
    },
  },
  title: {
    textAlign: "center",
    color: theme.palette.primary.contrastText,
    "& > *": {
      display: "block",
    },
    fontSize: "4em",
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
