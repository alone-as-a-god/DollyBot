import { makeStyles } from "@material-ui/core";
import Mountain from "./mountain.svg";
import MountainMobile from "./mountain_mobile.svg";
export const useStyles = makeStyles((theme) => ({
  root: {
    padding: "5rem 2em",
    paddingLeft: theme.spacing(16),
    marginTop: "300px",
    position: "relative",
    background: `url(${Mountain})`,
    backgroundSize: "cover",
    backgroundPosition: "top left",
    backgroundRepeat: "no-repeat",

    ["@media (max-width: 1600px)"]: {
      backgroundSize: "cover",
    },
    [theme.breakpoints.down("md")]: {
      paddingLeft: theme.spacing(6),
    },
    [theme.breakpoints.down("sm")]: {
      fontSize: ".9em",
      paddingLeft: theme.spacing(4),
    },
    [theme.breakpoints.down("xs")]: {
      backgroundPosition: "top",
      background: `url(${MountainMobile})`,
      backgroundSize: "cover",
      padding: "5rem 0",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
    },
  },
  title: {
    color: theme.palette.primary.contrastText,
    margin: ".8em 0",
    fontSize: "clamp(4em, 12vw, 5.5em)",
    fontWeight: "500",
  },
  icon: {
    fontSize: "clamp(200px, 12vw, 500px)",
  },
  featureContainer: {
    [theme.breakpoints.down("xs")]: {
      display: "flex",
      justifyContent: "center",
    },
    width: "fit-content",
  },
  robotIcon: {
    width: "clamp(280px, 50vw, 600px)",
    position: "absolute",
    top: "0",
    left: theme.spacing(16),
    transform: "translateY(-90%) ",
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
      rowGap: "2em",
      columnGap: "2em",
    },
    [theme.breakpoints.down("xs")]: {
      gridTemplateColumns: "1fr",
    },
  },
}));
