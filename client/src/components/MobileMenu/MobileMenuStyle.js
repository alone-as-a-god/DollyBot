import { makeStyles } from "@material-ui/core";

export const useStyles = makeStyles((theme) => ({
  drawerContainer: {
    padding: `${theme.spacing(3)} 0`,
    background: theme.palette.primary.dark,
    display: "flex",
    flexDirection: "column",
    height: "100%",
    width: "min(350px, 80vw)",
    zIndex: "99999999",
  },
  link: {
    cursor: "pointer",
    textTransform: "capitalize",
    color: theme.palette.secondary.main,
    textDecoration: "none",
    fontSize: "clamp(1.25em, 5vw, 1.75em)",
    borderRadius: "0 99em 99em 0",
    "&:hover": {
      background: theme.palette.primary.main,
    },
    padding: ".375em",
    paddingLeft: "1em",
  },
  active: {
    background: "#383A64",
  },
  button: {
    margin: ".375em 0",
    marginLeft: theme.spacing(3),
    marginRight: theme.spacing(3),
    "&:hover": {
      background: "#27283F",
    },
  },
  drawerButton: {
    borderRadius: "99em",
    fontSize: "clamp(1.25em, 5vw, 1.5em)",
  },
  logoContainer: {
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "center",
    textDecoration: "none",
    marginLeft: theme.spacing(3),
    marginBottom: theme.spacing(1),
  },
  logo: {
    width: "50px",
    marginRight: "1rem",
  },
  logoText: {
    color: theme.palette.secondary.main,
    letterSpacing: "1px",
  },
  userContainer: {
    display: "flex",
    alignItems: "center",
    margin: ".5rem 0",
    marginLeft: theme.spacing(3),
  },
  username: {
    color: theme.palette.secondary.main,
    fontSize: "1.5em",
  },
  avatar: {
    width: "40px",
    height: "40px",
    borderRadius: "50%",
    marginRight: "1rem",
  },
}));
