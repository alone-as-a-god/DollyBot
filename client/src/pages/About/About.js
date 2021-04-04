import { Typography } from "@material-ui/core";
import { TweenMax } from "gsap/gsap-core";
import React, { useEffect, useRef } from "react";
import { useStyles } from "./AboutStyle";
import { pageFadeIn, toTop } from "../../utils/animation";
import { Link } from "react-router-dom";
const About = () => {
  const classes = useStyles();
  let rootRef = useRef(null);
  useEffect(() => {
    toTop();
    pageFadeIn(rootRef);
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
            Dolly is a Discord bot that can be managed via our web dashboard. The focus lies on playing music. It offers a lot of commands for example
            shuffling, skipping, looping and{" "}
            <Link to="/commands" className={classes.link}>
              many more.
            </Link>
          </Typography>
        </div>
        <div className={classes.container}>
          <Typography variant="h3" className={classes.title}>
            Motivation
          </Typography>
          <Typography className={classes.text}>
            This Project was started as a school project. We had the assignment to create a Project using Webservices, Databases and a UI to go along
            with it. Follow our journey on{" "}
            <a href="https://github.com/alone-as-a-god/DollyBot" target="_blank" className={classes.link}>
              GitHub.
            </a>
          </Typography>
        </div>
      </div>
    </div>
  );
};

export default About;
