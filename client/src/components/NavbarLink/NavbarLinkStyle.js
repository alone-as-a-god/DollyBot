import { makeStyles } from "@material-ui/core";

export const useStyles = makeStyles((theme) => ({
  root: {
    height: "100%",
    borderBottom: "4px solid transparent",
    borderTop: "4px solid transparent",
    float: "left",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "0 1em",
    color: "inherit",
    textDecoration: "none",
    textTransform: "capitalize",
    fontWeight: "400",
    fontSize: "1.25em",
  },
  active: {
    borderBottom: "4px solid" + theme.palette.secondary.main,
  },
}));
