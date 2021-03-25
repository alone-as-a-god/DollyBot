import { Typography } from "@material-ui/core";
import { TweenMax } from "gsap/gsap-core";
import React, { useEffect, useRef } from "react";
import { useStyles } from "./AboutStyle";
const About = () => {
  const classes = useStyles();
  let rootRef = useRef(null);
  useEffect(() => {
    TweenMax.from(rootRef, 1.5, {
      opacity: "0",
      y: "50px",
      ease: "power4.out",
      clearProps: "all",
    });
  }, []);
  return (
    <div className={classes.root}>
      <div
        ref={(element) => {
          rootRef = element;
        }}
      >
        <Typography variant="h1" className={classes.header}>
          About
        </Typography>

        <div className={classes.container}>
          <Typography variant="h3" className={classes.title}>
            Project
          </Typography>
          <Typography className={classes.text}>
            Dolly is a Discord-Bot that can be managed via our web dashboard. It offers a lot of powerful commands for example playing music, pausing,
            looping and many more.
          </Typography>
        </div>
        <div className={classes.container}>
          <Typography variant="h3" className={classes.title}>
            Motivation
          </Typography>
          <Typography className={classes.text}>
            This Project was started as a school project. We had the assignment to create a Project using Webservices and a UI to go along with it.
          </Typography>
        </div>
      </div>
    </div>
  );
};

export default About;
