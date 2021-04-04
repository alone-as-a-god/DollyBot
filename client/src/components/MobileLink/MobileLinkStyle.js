import { makeStyles } from "@material-ui/core";

export const useStyles = makeStyles((theme) => ({
  root: {
    margin: "2px 0",
    marginRight: theme.spacing(3),
    display: "flex",
    alignItems: "center",
    cursor: "pointer",
    textTransform: "capitalize",
    color: theme.palette.secondary.main,
    textDecoration: "none",
    fontSize: "clamp(1.25em, 5vw, 1.5em)",
    borderRadius: "0 99em 99em 0",
    "&:hover": {
      background: "#383A64",
    },
  },
  active: {
    background: "#383A64",
  },
  bar: {
    marginRight: `calc(${theme.spacing(3)} - 5px)`,
    width: "5px",
    height: "100%",
    borderRadius: "0 99em 99em 0",
  },
  barActive: {
    background: theme.palette.secondary.main,
  },
  text: {
    padding: ".125em 0",
  },
}));
