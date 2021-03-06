import { makeStyles } from "@material-ui/core";

export const useStyles = makeStyles((theme) => ({
  container: {
    [theme.breakpoints.down("xs")]: {
      justifyContent: "center",
    },
  },
  notificationText: {
    color: theme.palette.secondary.dark,
  },
  skeleton: {
    borderRadius: "20px",
  },
}));
