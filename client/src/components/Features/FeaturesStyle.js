import { makeStyles } from "@material-ui/core";
import Mountain from "./mountain.svg";
import MountainMobile from "./mountain_mobile_new.svg";
import Planet from "./robotmountain.svg";
export const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    paddingLeft: theme.spacing(16),
    paddingRight: theme.spacing(16),
    paddingTop: "clamp(600px, 50vw, 1000px)",
    paddingBottom: "300px",
    position: "relative",
    background: `url(${Planet})`,
    backgroundSize: "cover",
    backgroundPosition: "top left",
    backgroundRepeat: "no-repeat",
    marginTop: "-200px",

    ["@media (min-width: 2000px)"]: {
      paddingTop: "clamp(1000px, 50vw, 2000px)",
    },
    [theme.breakpoints.down("md")]: {
      marginTop: "0px",
      paddingLeft: theme.spacing(6),
      paddingRight: theme.spacing(6),
    },
    [theme.breakpoints.down("sm")]: {
      fontSize: ".9em",
      paddingLeft: theme.spacing(4),
      paddingRight: theme.spacing(4),
      paddingTop: "clamp(500px, 90vw, 900px)",
      paddingBottom: "100px",
      backgroundPosition: "top",
      background: `url(${MountainMobile})`,
      backgroundSize: "cover",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
    },
    [theme.breakpoints.down("xs")]: {
      paddingTop: "clamp(300px, 90vw, 900px)",
      paddingLeft: theme.spacing(4),
      paddingRight: theme.spacing(4),
    },
  },
  title: {
    color: theme.palette.primary.contrastText,
    marginTop: "1em",
    marginBottom: ".5em",
    fontSize: "clamp(4em, 12vw, 5.5em)",
    fontWeight: "500",
  },
  robotIcon: {
    width: "clamp(280px, 50vw, 600px)",
    position: "absolute",
    top: "0",
    left: theme.spacing(16),
    transform: "translateY(-80%) rotate(-5deg) ",
    [theme.breakpoints.down("md")]: {
      left: theme.spacing(6),
    },
    [theme.breakpoints.down("sm")]: {
      left: theme.spacing(8),
      width: "calc(350px + 10vw)",
    },
    [theme.breakpoints.down("xs")]: {
      width: "calc(280px + 10vw)",
      left: "50%",
      transform: "translateY(-90%)  translateX(-50%)",
    },
  },
  grid: {
    display: "inline-grid",
    gridTemplateColumns: "1fr 1fr",
    rowGap: "3em",
    columnGap: "3em",
    [theme.breakpoints.down("sm")]: {
      gridTemplateColumns: "1fr",
    },
  },
  divider: {
    background: "white",
    height: "1px",
    width: "100%",
    marginBottom: "3em",
    marginTop: "1em",
  },
}));
