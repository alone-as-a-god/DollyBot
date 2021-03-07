import { makeStyles } from "@material-ui/core";

export const useStyles = makeStyles((theme) => ({
  root: {
    height: "100%",
    borderBottom: "2px solid transparent",
    float: "left",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "0 1em",
    color: "inherit",
    textDecoration: "none",
    textTransform: "uppercase",
    fontFamily: "Montserrat",
    fontWeight: "400",
    fontSize: "1.125em",
  },
  active: {
    borderBottom: "2px solid" + theme.palette.secondary.main,
    fontWeight: "500",
  },
}));
