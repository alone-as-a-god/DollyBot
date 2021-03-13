import { makeStyles } from "@material-ui/core";

export const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    alignItems: "center",
    flexDirection: "column",
    marginTop: "2rem",
    minHeight: "100vh",
    [theme.breakpoints.down("md")]: {
      paddingLeft: theme.spacing(6),
      paddingRight: theme.spacing(6),
    },
    [theme.breakpoints.down("sm")]: {
      paddingLeft: theme.spacing(4),
      paddingRight: theme.spacing(4),
    },

    [theme.breakpoints.down("xs")]: {
      fontSize: ".8em",
      height: "70px",
      paddingLeft: theme.spacing(2),
      paddingRight: theme.spacing(2),
    },
  },
  img: {
    width: "clamp(275px, 60vw, 1000px)",
    marginBottom: "4rem",
  },
  text: {
    color: "#27283F",
    fontSize: "clamp(2em, 5vw, 3em)",
    marginBottom: "1rem",
  },
  link: {
    color: theme.palette.secondary.main,
    textTransform: "capitalize",
    fontSize: "clamp(2em, 5vw, 3em)",
  },
}));
