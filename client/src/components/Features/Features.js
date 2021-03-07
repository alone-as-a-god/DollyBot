import { Grid, Typography } from "@material-ui/core";
import React from "react";
import FeatureCard from "../FeatureCard/FeatureCard";
import { useStyles } from "./FeaturesStyle";
import { BsMusicNoteBeamed } from "react-icons/bs";
import { Icon } from "@iconify/react";
import dashboardIcon from "@iconify/icons-carbon/dashboard";
import consoleIcon from "@iconify/icons-mdi/console";

const Features = () => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Typography variant="h1" className={classes.title}>
        Features
      </Typography>

      <Grid container>
        <Grid item xs={4} className={classes.featureContainer}>
          <FeatureCard
            icon={<BsMusicNoteBeamed className={classes.icon} />}
            text="play all your favourite music from all Across the internet"
          ></FeatureCard>
        </Grid>
        <Grid item xs={4} className={classes.featureContainer}>
          <FeatureCard
            icon={<Icon icon={dashboardIcon} className={classes.icon} />}
            text="control your bot from our outstanding web Dashboard"
          ></FeatureCard>
        </Grid>
        <Grid item xs={4} className={classes.featureContainer}>
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
