import { Grid, IconButton, Typography } from "@material-ui/core";
import { TweenMax } from "gsap/gsap-core";
import React, { useEffect, useRef, useState } from "react";
import { useHistory, useParams } from "react-router";
import PrefixCard from "../../components/PrefixCard/PrefixCard";
import QueueCard from "../../components/QueueCard/QueueCard";
import { useStyles } from "./DashboardStyle";
import { IoMdArrowBack, IoMdRefresh } from "react-icons/io";
const Dashboard = () => {
  const { id } = useParams();
  const classes = useStyles();
  const history = useHistory();
  const [refresh, setRefresh] = useState(false);
  let dashboardRef = useRef(null);
  useEffect(() => {
    TweenMax.from(dashboardRef, 2, {
      opacity: "0",
      y: "50px",
      ease: "power4.out",
    });
    //TODO: get guild info
  }, []);
  return (
    <div
      className={classes.root}
      ref={(element) => {
        dashboardRef = element;
      }}
    >
      <div className={classes.iconContainer}>
        <IconButton className={classes.iconButton} onClick={() => history.push("/dashboard")}>
          <IoMdArrowBack />
        </IconButton>
        <IconButton className={classes.iconButton} onClick={() => setRefresh(!refresh)}>
          <IoMdRefresh />
        </IconButton>
      </div>
      <Typography variant="h1" className={classes.title}>
        {id}
      </Typography>
      <Grid container spacing={4}>
        <Grid item xs={12} md={7}>
          <QueueCard refresh={refresh}></QueueCard>
        </Grid>
        <Grid item xs={12} md={5}>
          <PrefixCard refresh={refresh}></PrefixCard>
        </Grid>
      </Grid>
    </div>
  );
};

export default Dashboard;
