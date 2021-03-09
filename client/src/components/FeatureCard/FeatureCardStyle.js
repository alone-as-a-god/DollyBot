import { makeStyles } from "@material-ui/core";
export const useStyles = makeStyles((theme) => ({
  root: {
    padding: "1em",
    background: theme.palette.primary.dark,
    boxShadow: "10px 10px 25px rgba(39, 41, 68, 0.5), -10px -10px 25px rgba(71, 74, 128, 0.25)",
    width: "350px",
    height: "350px",
    borderRadius: "20px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    color: "#fffffff0",
    [theme.breakpoints.down("md")]: {
      width: "350px",
      height: "350px",
    },
    [theme.breakpoints.down("sm")]: {
      width: "275px",
      height: "275px",
    },
    ["@media (min-width: 2300px)"]: {
      width: "600px",
      height: "600px",
      fontSize: "1.5em",
    },
  },
  text: {
    marginTop: "1em",
    fontVariant: "small-caps",
    fontSize: "1.25em",
    textAlign: "center",
  },
}));
