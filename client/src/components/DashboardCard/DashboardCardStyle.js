import { makeStyles } from "@material-ui/core";

export const useStyles = makeStyles((theme) => ({
  root: {
    borderRadius: "1rem",
    background: theme.palette.primary.dark,
    width: "100%",
    padding: "3rem",

    maxWidth: "1200px",
    [theme.breakpoints.down("xs")]: {
      fontSize: ".8em",
      padding: "1.5rem",
    },
  },
}));
