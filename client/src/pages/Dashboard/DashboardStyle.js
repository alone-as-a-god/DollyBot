import { makeStyles } from "@material-ui/core";

export const useStyles = makeStyles((theme) => ({
  root: {
    minHeight: "100vh",
    marginBottom: "200px",
    paddingLeft: theme.spacing(16),
    paddingRight: theme.spacing(16),
    overflow: "hidden",
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
    marginBottom: "2rem",
    color: theme.palette.secondary.main,
    overflowWrap: "break-word",
    fontSize: "clamp(2.5em, 8vw, 5em)",
  },
  iconContainer: {
    margin: "2rem 0",
  },
  skeleton: {
    marginBottom: "1rem",
    borderRadius: "1rem",
  },
  iconButton: {
    marginRight: "1rem",
    fontSize: "1.75em",
    backgroundColor: theme.palette.primary.dark,
    color: theme.palette.secondary.main,
    "&:hover": {
      backgroundColor: theme.palette.primary.extradark,
    },
  },
  notificationText: {
    color: theme.palette.secondary.dark,
  },
}));
