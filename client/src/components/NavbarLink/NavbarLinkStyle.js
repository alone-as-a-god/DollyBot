import { makeStyles } from "@material-ui/core";

export const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "0 .5em",
    margin: "0 .5em",
    color: "inherit",
    textDecoration: "none",
    textTransform: "capitalize",
    fontWeight: "400",
    fontSize: "1.25em",
  },

  line: {
    width: "100%",
    height: "5px",
    marginTop: "5px",
    background: "transparent",
    borderRadius: "99em",
  },
  active: {
    width: "100%",
    backgroundColor: theme.palette.secondary.main,
    borderRadius: "99em",
  },
}));
