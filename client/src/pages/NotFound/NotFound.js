import { Button, Typography } from "@material-ui/core";
import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { useStyles } from "./NotFoundStyle";
import Icon404 from "./404_2.svg";
import { TweenMax } from "gsap/gsap-core";
const NotFound = () => {
  const classes = useStyles();
  let rootRef = useRef(null);
  useEffect(() => {
    TweenMax.from(rootRef, 2, {
      opacity: "0",
      y: "50px",
      ease: "power4.out",
    });
  }, []);
  return (
    <div
      className={classes.root}
      ref={(element) => {
        rootRef = element;
      }}
    >
      <img src={Icon404} className={classes.img}></img>
      <div>
        <Typography className={classes.text} variant="h3">
          Oh No! Dolly coudn't find the page you're looking for :(
        </Typography>
        <Typography variant="h5" className={classes.link} component={Link} to="/" variant="h3">
          back to home
        </Typography>
      </div>
    </div>
  );
};

export default NotFound;
