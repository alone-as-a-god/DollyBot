import { makeStyles } from "@material-ui/core";

export const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    alignItems: "center",
    margin: "2px 0",
    marginRight: theme.spacing(3),
    color: theme.palette.secondary.main,
    fontSize: "clamp(1.25em, 5vw, 1.5em)",
    textTransform: "capitalize",
    textDecoration: "none",
    borderRadius: "0 99em 99em 0",
    cursor: "pointer",
    "&:hover": {
      background: "#383A64",
    },
  },
  active: {
    background: "#383A64",
  },
  bar: {
    width: "5px",
    height: "100%",
    marginRight: `calc(${theme.spacing(3)} - 5px)`,
    borderRadius: "0 99em 99em 0",
  },
  barActive: {
    background: theme.palette.secondary.main,
  },
  text: {
    padding: ".125em 0",
  },
}));
