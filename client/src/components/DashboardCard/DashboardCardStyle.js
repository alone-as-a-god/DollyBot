import { makeStyles } from "@material-ui/core";

export const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    maxWidth: "1200px",
    padding: "3rem",
    borderRadius: "1rem",
    background: theme.palette.primary.dark,
    [theme.breakpoints.down("xs")]: {
      padding: "1.5rem",
      fontSize: ".8em",
    },
  },
}));
