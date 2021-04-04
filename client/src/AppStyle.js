import { makeStyles } from "@material-ui/core";

export const useStyles = makeStyles((theme) => ({
  navReplace: {
    [theme.breakpoints.up("xl")]: {
      height: "150px",
    },
    [theme.breakpoints.up("xxl")]: {
      height: "175px",
    },
    [theme.breakpoints.down("lg")]: {
      height: "125px",
    },
    [theme.breakpoints.down("xs")]: {
      height: "90px",
    },
  },
}));
