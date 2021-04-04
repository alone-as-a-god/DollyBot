import { makeStyles } from "@material-ui/core";
export const useStyles = makeStyles((theme) => ({
  root: {
    background: "#383A64",
    borderRadius: "20px",
    color: theme.palette.secondary.main,
    display: "flex",
    [theme.breakpoints.down("xl")]: {
      height: "clamp(250px, 13vw, 400px)",
      maxWidth: "1000px",
      fontSize: "1.25em",
    },
    [theme.breakpoints.down("lg")]: {
      height: "250px",
      maxWidth: "700px",
    },
    [theme.breakpoints.down("md")]: {
      height: "clamp(175px,15vw,200px)",
      fontSize: ".875em",
    },
    [theme.breakpoints.down("sm")]: {
      height: "200px",
      fontSize: "1em",
      width: "clamp(550px, 80vw, 700px)",
    },
    [theme.breakpoints.down("xs")]: {
      height: "auto",
      width: "clamp(275px, 70vw, 400px)",
      fontSize: "1em",
      flexDirection: "column",
    },
  },
  title: {
    fontFamily: "Poppins",
    fontSize: "2.25em",
    textTransform: "capitalize",
  },
  text: {
    fontSize: "1.25em",
    textTransform: "capitalize",
    fontWeight: "500",
  },
  textContainer: {
    padding: "2em",
    display: "flex",
    justifyContent: "center",
    flexDirection: "column",
    [theme.breakpoints.down("md")]: {
      padding: "1.25em",
    },
    [theme.breakpoints.down("xs")]: {
      padding: "2em",
    },
  },
  iconContainer: {
    borderRadius: "20px",
    background: theme.palette.primary.main,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",

    flexShrink: "0",

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
      height: "clamp(175px,15vw,200px)",
      width: "clamp(175px,15vw,200px)",
      "& *": {
        fontSize: "125px",
      },
    },
    [theme.breakpoints.down("sm")]: {
      width: "200px",
      height: "200px",
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
