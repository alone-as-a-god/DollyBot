import { Typography } from "@material-ui/core";
import React from "react";
import { useStyles } from "./FeatureCardStyle";
import { motion } from "framer-motion";
const FeatureCard = ({ icon, text, title }) => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <div className={classes.iconContainer}>{icon}</div>
      <div className={classes.textContainer}>
        <Typography className={classes.title}>{title}</Typography>
        <Typography className={classes.text}> {text}</Typography>
      </div>
    </div>
  );
};

export default FeatureCard;
