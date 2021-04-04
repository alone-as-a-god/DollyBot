import { makeStyles } from "@material-ui/core";
import RobotMountainMobile from "./mountain_mobile_new.svg";
import RobotMountain from "./robotmountain.svg";
export const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: "-200px",
    paddingLeft: theme.spacing(16),
    paddingRight: theme.spacing(16),
    paddingTop: "clamp(600px, 50vw, 1000px)",
    paddingBottom: "300px",
    background: `url(${RobotMountain})`,
    backgroundSize: "cover",
    backgroundPosition: "top left",
    backgroundRepeat: "no-repeat",

    [theme.breakpoints.up("xl")]: {
      paddingTop: "clamp(1000px, 50vw, 2000px)",
    },
    [theme.breakpoints.down("md")]: {
      marginTop: "0px",
      paddingLeft: theme.spacing(6),
      paddingRight: theme.spacing(6),
    },
    [theme.breakpoints.down("sm")]: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      paddingLeft: theme.spacing(4),
      paddingRight: theme.spacing(4),
      paddingTop: "clamp(500px, 90vw, 900px)",
      paddingBottom: "100px",
      backgroundPosition: "top",
      background: `url(${RobotMountainMobile})`,
      fontSize: ".9em",
      backgroundSize: "cover",
    },
    [theme.breakpoints.down("xs")]: {
      paddingTop: "clamp(300px, 90vw, 900px)",
      paddingLeft: theme.spacing(4),
      paddingRight: theme.spacing(4),
    },
  },
  title: {
    marginTop: "1em",
    marginBottom: ".5em",
    color: theme.palette.primary.contrastText,
    fontSize: "clamp(4em, 12vw, 5.5em)",
    fontWeight: "500",
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
}));
