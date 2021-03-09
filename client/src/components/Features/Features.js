import { Grid, Typography } from "@material-ui/core";
import React, { useEffect, useRef } from "react";
import FeatureCard from "../FeatureCard/FeatureCard";
import { useStyles } from "./FeaturesStyle";
import { BsMusicNoteBeamed } from "react-icons/bs";
import { Icon } from "@iconify/react";
import dashboardIcon from "@iconify/icons-carbon/dashboard";
import consoleIcon from "@iconify/icons-mdi/console";
import Robot from "./robot_greeting.svg";
import { TweenMax } from "gsap";
const Features = ({ wasOpened }) => {
  const classes = useStyles();
  let featuresRef = useRef(null);
  useEffect(() => {
    if (!wasOpened)
      TweenMax.from(featuresRef, 2, {
        opacity: "0",
        y: "50px",
        ease: "power4.out",
      });
  }, []);
  return (
    <div className={classes.root} ref={(el) => (featuresRef = el)}>
      <img src={Robot} className={classes.robotIcon}></img>

      <Typography variant="h1" className={classes.title}>
        Features
      </Typography>

      <Grid container xs={12} md={12} lg={7} spacing={5}>
        <Grid item xs={12} sm={6} className={classes.featureContainer}>
          <FeatureCard
            icon={<BsMusicNoteBeamed className={classes.icon} />}
            text="play all your favourite music from all Across the internet"
          ></FeatureCard>
        </Grid>
        <Grid item xs={12} sm={6} className={classes.featureContainer}>
          <FeatureCard
            icon={<Icon icon={dashboardIcon} className={classes.icon} />}
            text="control your bot from our outstanding web Dashboard"
          ></FeatureCard>
        </Grid>
        <Grid item xs={12} sm={6} className={classes.featureContainer}>
          <FeatureCard
            icon={<Icon icon={consoleIcon} className={classes.icon} />}
            text="Improve your workflow with our powerful commands"
          ></FeatureCard>
        </Grid>
        <Grid item xs={12} sm={6} className={classes.featureContainer}>
          <FeatureCard
            icon={<Icon icon={consoleIcon} className={classes.icon} />}
            text="Improve your workflow with our powerful commands"
          ></FeatureCard>
        </Grid>
      </Grid>
    </div>
  );
};

export default Features;
