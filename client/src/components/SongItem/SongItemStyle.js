import { makeStyles } from "@material-ui/core";

export const useStyles = makeStyles((theme) => ({
  root: {
    padding: "5px",
    border: `1px solid ${theme.palette.secondary.main}`,
    color: theme.palette.secondary.main,
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    cursor: "pointer",
    userSelect: "none",
  },
  icon: {
    color: "inherit",
  },
  songInfo: {
    marginLeft: "1rem",
    fontSize: "1.25em",
  },
}));
