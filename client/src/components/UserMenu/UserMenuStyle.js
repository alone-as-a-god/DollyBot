import { makeStyles } from "@material-ui/core";

export const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    position: "relative",
    alignItems: "center",
    margin: "0 1rem",
    height: "100%",
  },
  avatar: {
    width: "40px",
    height: "40px",
    borderRadius: "50%",
  },
  icon: {
    fontSize: "2em",
    color: theme.palette.secondary.main,
  },
  options: {
    zIndex: "9999",
    position: "absolute",
    background: theme.palette.primary.dark,
    border: `1px solid ${theme.palette.secondary.main}`,
    zIndex: "-10",
    bottom: "0",
    right: "0",
    transform: "translateY(97%)",
    borderRadius: "5px",
    cursor: "pointer",
    overflow: "hidden",
  },
  optionsIcon: {
    fontSize: "2em",
    marginRight: "1rem",
    color: theme.palette.secondary.main,
  },
  optionsItem: {
    padding: ".75rem 1.5rem",
    display: "flex",
    alignItems: "center",
    "&:hover": {
      background: theme.palette.primary.extradark,
    },
  },
}));
