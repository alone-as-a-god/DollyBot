import { makeStyles } from "@material-ui/core";

export const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "3px",
    borderBottom: `2px solid ${theme.palette.primary.main}`,
    color: theme.palette.secondary.main,
    cursor: "pointer",
    userSelect: "none",
  },
  icon: {
    color: "inherit",
  },
  songInfo: {
    marginLeft: "1rem",
    fontSize: "1em",
    color: theme.palette.secondary.main,
  },
  songInfoContainer: {
    display: "flex",
  },
}));
