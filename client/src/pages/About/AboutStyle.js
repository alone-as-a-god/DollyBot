import { makeStyles } from "@material-ui/core";
export const useStyles = makeStyles((theme) => ({
  root: {
    minHeight: "100vh",
    padding: "2rem 0",
    paddingLeft: theme.spacing(16),
    paddingRight: theme.spacing(16),
    [theme.breakpoints.down("md")]: {
      paddingLeft: theme.spacing(6),
      paddingRight: theme.spacing(6),
    },
    [theme.breakpoints.down("sm")]: {
      paddingLeft: theme.spacing(4),
      paddingRight: theme.spacing(4),
    },
    [theme.breakpoints.down("xs")]: {
      paddingLeft: theme.spacing(2),
      paddingRight: theme.spacing(2),
    },
  },
  header: {
    paddingBottom: "2rem",
    fontSize: "clamp(4em, 12vw, 5.5em)",
    color: theme.palette.secondary.main,
  },
  title: {
    color: theme.palette.primary.extradark,
    fontSize: "clamp(2.5em, 7vw, 3em)",
  },
  text: {
    color: theme.palette.secondary.main,
  },
  container: {
    width: "50%",
    maxWidth: "1200px",
    marginBottom: "2rem",
    [theme.breakpoints.down("md")]: {
      width: "60%",
    },
    [theme.breakpoints.down("sm")]: {
      width: "80%",
    },
    [theme.breakpoints.down("xs")]: {
      width: "100%",
    },
  },
  link: {
    color: "inherit",
  },
}));
