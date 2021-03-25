import { makeStyles } from "@material-ui/core";

export const useStyles = makeStyles((theme) => ({
  root: {
    borderRadius: "1rem",
    padding: "2rem 1rem",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
    backgroundColor: theme.palette.primary.dark,
    color: theme.palette.secondary.main,
    cursor: "pointer",
    userSelect: "none",
    fontSize: "1.25em",
    textAlign: "center",
  },
  img: {
    borderRadius: "50%",
    width: "60%",
    marginBottom: "1rem",
  },
}));
