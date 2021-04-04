import { makeStyles } from "@material-ui/core";

export const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
    height: "100%",
    padding: "2rem 1rem",
    borderRadius: "1rem",
    color: theme.palette.secondary.main,
    backgroundColor: theme.palette.primary.dark,
    fontSize: "1.25em",
    textAlign: "center",
    cursor: "pointer",
    userSelect: "none",
    "&:hover": {
      boxShadow: theme.shadows[3],
    },
  },
  img: {
    borderRadius: "50%",
    width: "60%",
    marginBottom: "1rem",
  },
  icon: {
    fontSize: "6em",
  },
}));
