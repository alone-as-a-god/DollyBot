import { makeStyles } from "@material-ui/core";

export const useStyles = makeStyles((theme) => ({
  root: {
    position: "relative",
    background: theme.palette.secondary.main,
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "2rem",
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
      flexDirection: "column",
      alignItems: "flex-start",
    },
  },
  icon: {
    padding: "5px",
    cursor: "pointer",
    color: theme.palette.primary.main,
    fontSize: "2.25em",
  },
  logo: {
    color: theme.palette.primary.dark,
    textTransform: "lowercase",
  },
  header: {
    fontSize: "1.5em",
    color: theme.palette.primary.dark,
    fontWeight: "600",
    textTransform: "uppercase",
  },
  link: {
    textDecoration: "none",
  },
  linkText: {
    color: theme.palette.primary.main,
    textTransform: "capitalize",
    fontFamily: "Poppins",
  },
  robot: {
    position: "absolute",
    right: "0px",
    top: "0",
    transform: "translateY(-97%)",
    width: "calc(200px + 5vw)",
    [theme.breakpoints.down("sm")]: {
      display: "none",
    },
  },
  linksContainer: {
    display: "flex",
    [theme.breakpoints.down("xs")]: {
      flexDirection: "column",
    },
    "&>*": {
      marginLeft: theme.spacing(8),
      [theme.breakpoints.down("xs")]: {
        marginLeft: theme.spacing(0),
        marginTop: theme.spacing(2),
      },
    },
  },
}));
