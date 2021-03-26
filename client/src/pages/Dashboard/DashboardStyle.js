import { makeStyles } from "@material-ui/core";

export const useStyles = makeStyles((theme) => ({
  root: {
    overflow: "hidden",
    marginBottom: "200px",
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
  title: {
    color: theme.palette.secondary.main,
    margin: "2rem 0",
    [theme.breakpoints.down("xs")]: {
      fontSize: "3.25em",
    },
  },
}));