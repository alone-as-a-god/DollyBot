import { makeStyles } from "@material-ui/core";

export const useStyles = makeStyles((theme) => ({
  icon: {
    cursor: "pointer",
    color: theme.palette.primary.secondaryText,
    fontSize: "2.25em",
  },
  root: {
    background: theme.palette.primary.light,
    padding: "2em 0",
  },
  logo: {
    color: theme.palette.primary.dark,
    fontWeight: "600",
  },
  header: {
    fontSize: "1.25em",
    color: theme.palette.primary.dark,
    fontWeight: "600",
  },
  link: {
    textDecoration: "none",
  },
  linkText: {
    color: theme.palette.primary.secondaryText,
    textTransform: "capitalize",
    fontVariant: "normal",
  },
}));
