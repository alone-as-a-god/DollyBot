import { makeStyles } from "@material-ui/core";

export const useStyles = makeStyles((theme) => ({
  root: {
    padding: "3px",
    borderBottom: `2px solid ${theme.palette.primary.main}`,
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
