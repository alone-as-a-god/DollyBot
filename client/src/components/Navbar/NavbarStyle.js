import { makeStyles } from "@material-ui/core";

export const useStyles = makeStyles((theme) => ({
  root: {
    position: "relative",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.primary.contrastText,
    height: "75px",
    padding: "0 2em",
    overflow: "hidden",
  },
  linkContainer: {
    display: "flex",
    alignItems: "center",
    height: "100%",
  },
  line: {
    height: "1px",
    background: theme.palette.secondary.main,
    width: "100%",
    zIndex: "999",
  },
}));
