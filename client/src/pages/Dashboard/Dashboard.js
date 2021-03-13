import { Grid, Typography } from "@material-ui/core";
import { TweenMax } from "gsap/gsap-core";
import React, { useEffect, useRef } from "react";
import PrefixCard from "../../components/PrefixCard/PrefixCard";
import QueueCard from "../../components/QueueCard/QueueCard";
import { useStyles } from "./DashboardStyle";
const Dashboard = () => {
  const classes = useStyles();
  let dashboardRef = useRef(null);
  useEffect(() => {
    TweenMax.from(dashboardRef, 2, {
      opacity: "0",
      y: "50px",
      ease: "power4.out",
    });
  }, []);
  return (
    <div
      className={classes.root}
      ref={(element) => {
        dashboardRef = element;
      }}
    >
      <Typography variant="h1" className={classes.title}>
        Dashboard
      </Typography>
      <Grid container spacing={4}>
        <Grid item xs={12} md={7}>
          <QueueCard></QueueCard>
        </Grid>
        <Grid item xs={12} md={5}>
          <PrefixCard></PrefixCard>
        </Grid>
      </Grid>
    </div>
  );
};

export default Dashboard;
