import { Grid, Typography } from "@material-ui/core";
import React, { useEffect, useRef } from "react";
import FeatureCard from "../FeatureCard/FeatureCard";
import { useStyles } from "./FeaturesStyle";
import { BsMusicNoteBeamed } from "react-icons/bs";
import { Icon } from "@iconify/react";
import dashboardIcon from "@iconify/icons-carbon/dashboard";
import consoleIcon from "@iconify/icons-mdi/console";
import Robot from "./robot_greeting.svg";
import rackServerLine from "@iconify/icons-clarity/rack-server-line";
const Features = ({ wasOpened }) => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <img src={Robot} className={classes.robotIcon}></img>

      <Typography variant="h1" className={classes.title}>
        Features
      </Typography>

      <div className={classes.grid}>
        <div className={classes.featureContainer}>
          <FeatureCard
            icon={<BsMusicNoteBeamed className={classes.icon} />}
            text="play all your favourite music from all Across the internet"
          ></FeatureCard>
        </div>
        <div className={classes.featureContainer}>
          <FeatureCard
            icon={<Icon icon={dashboardIcon} className={classes.icon} />}
            text="control your bot from our outstanding web Dashboard"
          ></FeatureCard>
        </div>
        <div className={classes.featureContainer}>
          <FeatureCard
            icon={<Icon icon={consoleIcon} className={classes.icon} />}
            text="Improve your workflow with our powerful commands"
          ></FeatureCard>
        </div>
        <div className={classes.featureContainer}>
          <FeatureCard icon={<Icon icon={rackServerLine} className={classes.icon} />} text="24/7 servers + support over our discord"></FeatureCard>
        </div>
      </div>
    </div>
  );
};

export default Features;
