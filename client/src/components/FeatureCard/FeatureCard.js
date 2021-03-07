import { Typography } from "@material-ui/core";
import React from "react";
import { useStyles } from "./FeatureCardStyle";

const FeatureCard = ({ icon, text }) => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      {icon}
      <Typography className={classes.text}> {text}</Typography>
    </div>
  );
};

export default FeatureCard;
