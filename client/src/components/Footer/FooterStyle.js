import { makeStyles } from "@material-ui/core";

export const useStyles = makeStyles((theme) => ({
  root: {
    position: "relative",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "2rem",
    paddingLeft: theme.spacing(16),
    paddingRight: theme.spacing(16),
    background: theme.palette.secondary.main,
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
  title: {
    color: theme.palette.primary.dark,
    fontSize: "1.5em",
    fontWeight: "600",
    textTransform: "uppercase",
  },
  link: {
    cursor: "pointer",
    textDecoration: "none",
  },
  linkText: {
    color: theme.palette.primary.main,
    fontFamily: "Poppins",
    textTransform: "capitalize",
    "&:hover": {
      textDecoration: "underline",
    },
  },
  robot: {
    position: "absolute",
    right: "0",
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
        marginLeft: "0",
        marginTop: theme.spacing(2),
      },
    },
  },
}));
