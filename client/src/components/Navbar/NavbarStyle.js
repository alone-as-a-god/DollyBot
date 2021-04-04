import { makeStyles } from "@material-ui/core";

export const useStyles = makeStyles((theme) => ({
  root: {
    height: "125px",
    position: "fixed",
    width: "100%",
    zIndex: "10",
    top: "0",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    color: theme.palette.primary.contrastText,
    backgroundColor: theme.palette.primary.main,
    paddingLeft: theme.spacing(16),
    paddingRight: theme.spacing(16),

    [theme.breakpoints.up("xl")]: {
      height: "150px",
    },
    [theme.breakpoints.up("xxl")]: {
      height: "175px",
    },
    [theme.breakpoints.down("lg")]: {
      height: "125px",
    },
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
      height: "90px",
      paddingLeft: theme.spacing(2),
      paddingRight: theme.spacing(2),
    },

    transition: "all 0.3s ease-out",
    transitionProperty: "height, opacity, background",
  },
  scroll: {
    paddingTop: ".75em",
    paddingBottom: ".75em",

    background: theme.palette.primary.dark,
    borderBottom: `1px solid ${theme.palette.secondary.main}`,

    [theme.breakpoints.up("xl")]: {
      height: "100px",
    },
    [theme.breakpoints.up("xxl")]: {
      height: "115px",
    },
    [theme.breakpoints.down("lg")]: {
      height: "80px",
    },
    [theme.breakpoints.down("xs")]: {
      height: "70px",
    },
  },

  linkContainer: {
    display: "flex",
    alignItems: "center",
    height: "100%",
    [theme.breakpoints.down("sm")]: {
      display: "none",
    },
  },
  line: {
    background: theme.palette.secondary.main,
    width: "100%",
    zIndex: "999",
  },
  icon: {
    color: theme.palette.secondary.main,
    fontSize: "2.5em",

    [theme.breakpoints.up("md")]: {
      display: "none",
    },
  },
  button: {
    "&:nth-child(1)": {
      marginLeft: "2em",
    },
    borderRadius: "99em",
    padding: ".375em 1.25em",
    margin: "0 .25em",
  },
  invite: {
    background: theme.palette.primary.dark,
    "&:hover": {
      background: "#27283F",
    },
  },
  buttonScroll: {
    background: theme.palette.primary.main,
    "&:hover": {
      background: "#27283F",
    },
  },
  drawerButton: {
    margin: ".5rem 0",
    fontSize: "clamp(1.25em, 5vw, 1.5em)",
  },
  logoContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    textDecoration: "none",
  },
  logo: {
    marginRight: "1rem",
    [theme.breakpoints.up("xl")]: {
      height: "70px",
      width: "70px",
    },
    [theme.breakpoints.down("lg")]: {
      height: "60px",
      width: "60px",
    },
    [theme.breakpoints.down("sm")]: {
      height: "50px",
      width: "50px",
    },
  },
  logoText: {
    color: theme.palette.secondary.main,
    letterSpacing: "1px",
  },
}));
