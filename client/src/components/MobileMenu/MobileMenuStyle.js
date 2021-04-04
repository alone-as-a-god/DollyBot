import { makeStyles } from "@material-ui/core";

export const useStyles = makeStyles((theme) => ({
  drawerContainer: {
    display: "flex",
    flexDirection: "column",
    height: "100%",
    width: "min(350px, 80vw)",
    padding: `${theme.spacing(3)} 0`,
    background: theme.palette.primary.dark,
    zIndex: "99999999",
  },
  link: {
    padding: ".375em",
    paddingLeft: "1em",
    color: theme.palette.secondary.main,
    fontSize: "clamp(1.25em, 5vw, 1.75em)",
    textTransform: "capitalize",
    textDecoration: "none",
    cursor: "pointer",
    borderRadius: "0 99em 99em 0",
    "&:hover": {
      background: theme.palette.primary.main,
    },
  },
  active: {
    background: "#383A64",
  },
  button: {
    margin: `${theme.spacing(1)} 0`,
    marginLeft: theme.spacing(3),
    marginRight: theme.spacing(3),
    borderRadius: "99em",
    fontSize: "clamp(1.25em, 5vw, 1.5em)",
    "&:hover": {
      background: theme.palette.primary.extradark,
    },
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
    marginRight: "1rem",
    borderRadius: "50%",
  },
}));
