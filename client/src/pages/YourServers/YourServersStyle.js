import { makeStyles } from "@material-ui/core";

export const useStyles = makeStyles((theme) => ({
  root: {
    marginBottom: "2rem",
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
      fontSize: ".8em",
      paddingLeft: theme.spacing(2),
      paddingRight: theme.spacing(2),
    },
    minHeight: "100vh",
  },
  title: {
    margin: "2rem 0",
    color: theme.palette.secondary.main,
  },
}));
