import { makeStyles } from "@material-ui/core";
export const useStyles = makeStyles((theme) => ({
  root: {
    padding: "1em",
    background: theme.palette.primary.dark,
    fontFamily: "Montserrat",

    boxShadow: "10px 10px 25px rgba(39, 41, 68, 0.5), -10px -10px 25px rgba(71, 74, 128, 0.25)",
    width: "350px",
    height: "350px",
    borderRadius: "20px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    color: "#fffffff0",

    ["@media (min-width: 2300px)"]: {
      width: "600px",
      height: "600px",
      fontSize: "1.125em",
    },
    [theme.breakpoints.down("sm")]: {
      width: "clamp(250px,40vw, 350px)",
      height: "clamp(250px,40vw,350px)",
      fontSize: "clamp(.8em,2vw,1em)",
    },
    [theme.breakpoints.down("xs")]: {
      width: "clamp(275px,60vw, 400px)",
      height: "clamp(275px,60vw,400px)",
      fontSize: "clamp(.875em,7vw,1em)",
    },
  },
  text: {
    marginTop: "1em",
    fontSize: "1.25em",
    textAlign: "center",
    textTransform: "uppercase",
    fontVariant: "small-caps",
    fontFamily: "Montserrat",
    fontWeight: "500",
  },
}));
