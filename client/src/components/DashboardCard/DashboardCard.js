import React from "react";
import { useStyles } from "./DashboardCardStyle";
const DashboardCard = ({ children }) => {
  const classes = useStyles();
  return <div className={classes.root}>{children}</div>;
};

export default DashboardCard;
