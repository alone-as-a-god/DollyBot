import { makeStyles } from "@material-ui/core";

export const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    position: "relative",
    alignItems: "center",
    // margin: "0 1rem",
    marginLeft: "0.75em",
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
    padding: ".5em",
    zIndex: "999999999",
    position: "absolute",
    background: theme.palette.primary.dark,
    // border: `1px solid ${theme.palette.secondary.main}`,
    zIndex: "-10",
    bottom: "0",
    right: "0",
    transform: "translateY(80%)",
    borderRadius: "10px",
    cursor: "pointer",
    overflow: "hidden",
  },
  scrollOption: {
    transform: "translateY(103%)",
  },
  optionsIcon: {
    fontSize: "2em",
    marginRight: "1rem",
    color: theme.palette.secondary.main,
  },
  optionsItem: {
    borderRadius: "10px",
    padding: ".75rem 1.5rem",
    display: "flex",
    alignItems: "center",
    "&:hover": {
      background: theme.palette.primary.extradark,
    },
  },
}));
