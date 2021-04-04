import { makeStyles } from "@material-ui/core";
export const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    background: "#383A64",
    color: theme.palette.secondary.main,
    borderRadius: "20px",
    [theme.breakpoints.down("xl")]: {
      height: "clamp(250px, 13vw, 400px)",
      fontSize: "1.25em",
    },
    [theme.breakpoints.down("lg")]: {
      height: "250px",
    },
    [theme.breakpoints.down("md")]: {
      height: "clamp(175px,15vw,200px)",
      fontSize: ".875em",
    },
    [theme.breakpoints.down("sm")]: {
      height: "200px",
      width: "clamp(550px, 80vw, 700px)",
      fontSize: "1em",
    },
    [theme.breakpoints.down("xs")]: {
      flexDirection: "column",
      height: "auto",
      width: "clamp(275px, 70vw, 400px)",
      fontSize: "1em",
    },
  },
  title: {
    fontFamily: "Poppins",
    fontSize: "2.25em",
    textTransform: "capitalize",
  },
  text: {
    fontSize: "1.25em",
    fontWeight: "500",
    textTransform: "capitalize",
  },
  textContainer: {
    display: "flex",
    justifyContent: "center",
    flexDirection: "column",
    padding: "2em",
    [theme.breakpoints.down("md")]: {
      padding: "1.25em",
    },
    [theme.breakpoints.down("xs")]: {
      padding: "2em",
    },
  },
  iconContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    flexShrink: "0",
    background: theme.palette.primary.main,
    borderRadius: "20px",
    [theme.breakpoints.down("xl")]: {
      width: "clamp(250px, 13vw, 400px)",
      "& *": {
        fontSize: "clamp(160px, 10vw, 250px)",
      },
    },
    [theme.breakpoints.down("lg")]: {
      width: "250px",
      "& *": {
        fontSize: "160px",
      },
    },
    [theme.breakpoints.down("md")]: {
      width: "clamp(175px,15vw,200px)",
      "& *": {
        fontSize: "125px",
      },
    },
    [theme.breakpoints.down("sm")]: {
      width: "200px",
      "& *": {
        fontSize: "150px",
      },
    },
    [theme.breakpoints.down("xs")]: {
      width: "clamp(275px, 70vw, 400px)",
      height: "clamp(275px, 70vw, 400px)",
      "& *": {
        fontSize: "clamp(190px, 50vw, 300px)",
      },
    },
  },
}));
