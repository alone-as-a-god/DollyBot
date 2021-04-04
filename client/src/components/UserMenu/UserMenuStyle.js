import { makeStyles } from "@material-ui/core";

export const useStyles = makeStyles((theme) => ({
  root: {
    position: "relative",
    display: "flex",
    alignItems: "center",
    height: "100%",
    marginLeft: "0.75em",
  },
  avatar: {
    width: "40px",
    height: "40px",
    borderRadius: "50%",
  },
  icon: {
    color: theme.palette.secondary.main,
    fontSize: "2em",
  },
  options: {
    position: "absolute",
    bottom: "0",
    right: "0",
    transform: "translateY(100%)",
    zIndex: "999999999",
    padding: ".5em",
    background: theme.palette.primary.dark,
    borderRadius: "10px",
    cursor: "pointer",
    overflow: "hidden",
  },
  scrollOption: {
    transform: "translateY(105%)",
  },
  optionsItem: {
    display: "flex",
    alignItems: "center",
    borderRadius: "10px",
    padding: ".75rem 1.5rem",
    "&:hover": {
      background: theme.palette.primary.extradark,
    },
  },
  optionsIcon: {
    marginRight: "1rem",
    fontSize: "2em",
    color: theme.palette.secondary.main,
  },
}));
