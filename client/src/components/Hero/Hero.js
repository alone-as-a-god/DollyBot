import { Typography } from "@material-ui/core";
import React, { useEffect, useRef } from "react";
import { useStyles } from "./HeroStyle";
import { TweenMax } from "gsap";
const Hero = ({ wasOpened }) => {
  const classes = useStyles();
  let iconRef = useRef(null);
  useEffect(() => {
    if (!wasOpened) {
      TweenMax.from(iconRef, 2, {
        opacity: "0",
        y: "50px",
        ease: "power4.out",
      });
    }
  }, []);

  return (
    <div
      className={classes.root}
      ref={(element) => {
        iconRef = element;
      }}
    >
      <Typography variant="h2" className={classes.title}>
        <span>meet the world's</span> <span>most powerful</span> <span>discord bot</span>
      </Typography>
    </div>
  );
};

export default Hero;
