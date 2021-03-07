import { Typography } from "@material-ui/core";
import React, { useEffect, useRef } from "react";
import { useStyles } from "./HeroStyle";
import { FaDiscord } from "react-icons/fa";
import { TweenMax, TimelineLite } from "gsap";
const Hero = () => {
  const classes = useStyles();
  let lines = useRef([]);
  let iconRef = useRef(null);
  useEffect(() => {
    TweenMax.from(iconRef, 1.3, {
      opacity: "0",
      delay: 1.5,
    });
    // TweenMax.staggerFrom(
    //   lines.current,
    //   1,
    //   {
    //     opacity: "0",
    //     delay: 1.5,
    //   },
    //   0.4
    // );
  }, []);

  return (
    <div
      className={classes.root}
      ref={(element) => {
        iconRef = element;
      }}
    >
      <Typography variant="h2" className={classes.title}>
        <div className={classes.line}>
          <span
            style={{ position: "relative" }}
            ref={(element) => {
              lines.current[0] = element;
            }}
          >
            Meet the world’s
          </span>
        </div>
        <div className={classes.line}>
          <span
            ref={(element) => {
              lines.current[1] = element;
            }}
          >
            most powerful
          </span>
        </div>
        <div className={classes.line}>
          <span
            ref={(element) => {
              lines.current[2] = element;
            }}
          >
            discord bot
          </span>
        </div>
      </Typography>
      <div className={classes.icon}>
        <FaDiscord />
      </div>
    </div>
  );
};

export default Hero;
