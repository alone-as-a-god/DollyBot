import FeatureCard from "../FeatureCard/FeatureCard";
import { useStyles } from "./FeaturesStyle";
import { Typography } from "@material-ui/core";
import { BsMusicNoteBeamed } from "react-icons/bs";
import { Icon } from "@iconify/react";
import dashboardIcon from "@iconify/icons-carbon/dashboard";
import consoleIcon from "@iconify/icons-mdi/console";
import serverIcon from "@iconify/icons-clarity/rack-server-line";

const Features = () => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Typography variant="h1" className={classes.title}>
        Features
      </Typography>
      <div>
        <div className={classes.grid}>
          <FeatureCard icon={<BsMusicNoteBeamed />} title="music" text="Listen to music together with your friends"></FeatureCard>
          <FeatureCard icon={<Icon icon={dashboardIcon} />} title="dashboard" text="Manage your bot from our dashboard"></FeatureCard>
          <FeatureCard icon={<Icon icon={consoleIcon} />} title="commands" text="Improve your workflow with  commands"></FeatureCard>
          <FeatureCard icon={<Icon icon={serverIcon} />} title="support" text="24/7 servers + support over our discord"></FeatureCard>
        </div>
      </div>
    </div>
  );
};

export default Features;
