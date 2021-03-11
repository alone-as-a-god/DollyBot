import { Typography } from "@material-ui/core";
import React, { useEffect, useRef } from "react";
import { useStyles } from "./HeroStyle";
import { TweenMax } from "gsap";
const Hero = ({ wasOpened }) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Typography variant="h2" className={classes.title}>
        <span>meet the world's</span> <span>most powerful</span> <span>discord bot</span>
      </Typography>
    </div>
  );
};

export default Hero;
