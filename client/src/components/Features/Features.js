import { Typography } from "@material-ui/core";
import FeatureCard from "../FeatureCardNew/FeatureCard";
import { useStyles } from "./FeaturesStyle";
import { BsMusicNoteBeamed } from "react-icons/bs";
import { Icon } from "@iconify/react";
import dashboardIcon from "@iconify/icons-carbon/dashboard";
import consoleIcon from "@iconify/icons-mdi/console";
import rackServerLine from "@iconify/icons-clarity/rack-server-line";
const Features = () => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Typography variant="h1" className={classes.title}>
        Features
      </Typography>
      <div>
        <div className={classes.grid}>
          <div className={classes.featureContainer}>
            <FeatureCard
              icon={<BsMusicNoteBeamed className={classes.icon} />}
              title="music"
              text="Listen to music together with your friends"
            ></FeatureCard>
          </div>
          <div className={classes.featureContainer}>
            <FeatureCard
              icon={<Icon icon={dashboardIcon} className={classes.icon} />}
              title="dashboard"
              text="manage your bot from our Dashboard"
            ></FeatureCard>
          </div>
          <div className={classes.featureContainer}>
            <FeatureCard
              icon={<Icon icon={consoleIcon} className={classes.icon} />}
              title="commands"
              text="Improve your workflow with  commands"
            ></FeatureCard>
          </div>
          <div className={classes.featureContainer}>
            <FeatureCard
              icon={<Icon icon={rackServerLine} className={classes.icon} />}
              title="support"
              text="24/7 servers + support over our discord"
            ></FeatureCard>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Features;
