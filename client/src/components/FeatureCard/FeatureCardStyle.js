import { makeStyles } from "@material-ui/core";
export const useStyles = makeStyles((theme) => ({
  root: {
    padding: "1em",
    background: theme.palette.primary.light,
    width: "400px",
    height: "400px",
    borderRadius: "20px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    color: "#fffffff0",
  },
  text: {
    marginTop: "1em",
    fontVariant: "small-caps",
    fontSize: "1.25em",
    textAlign: "center",
  },
}));
