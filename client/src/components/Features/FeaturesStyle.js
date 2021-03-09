import { makeStyles } from "@material-ui/core";
import Mountain from "./mountain.svg";
import MountainMobile from "./mountain_mobile.svg";
export const useStyles = makeStyles((theme) => ({
  root: {
    padding: "5rem 2em",
    marginTop: "300px",
    position: "relative",
    background: `url(${Mountain})`,
    backgroundSize: "cover",
    backgroundPosition: "top left",
    backgroundRepeat: "no-repeat",
    ["@media (max-width: 1600px)"]: {
      backgroundSize: "cover",
    },
    [theme.breakpoints.down("xs")]: {
      fontSize: ".8em",
      backgroundPosition: "top",
      background: `url(${MountainMobile})`,
      backgroundSize: "cover",
    },
    [theme.breakpoints.down("sm")]: {
      padding: "5rem 0",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
    },
  },
  title: {
    color: theme.palette.primary.contrastText,
    margin: ".8em 0",
    fontSize: "6em",
    [theme.breakpoints.down("xs")]: {
      fontSize: "5em",
      textAlign: "center",
    },
  },
  icon: {
    fontSize: "200px",
  },
  featureContainer: {
    [theme.breakpoints.down("xs")]: {
      display: "flex",
      justifyContent: "center",
    },
  },
  robotIcon: {
    width: "calc(500px + 10vw)",
    position: "absolute",
    top: "0",
    transform: "translateY(-90%) ",
    [theme.breakpoints.down("sm")]: {
      width: "calc(350px + 10vw)",
    },
    [theme.breakpoints.down("xs")]: {
      width: "calc(300px + 10vw)",
      left: "50%",
      transform: "translateY(-90%)  translateX(-50%)",
    },
  },
}));
