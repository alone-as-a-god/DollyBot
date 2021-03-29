import { Grid, IconButton, Typography } from "@material-ui/core";
import { TweenMax } from "gsap/gsap-core";
import React, { useContext, useEffect, useRef, useState } from "react";
import { useHistory, useParams } from "react-router";
import PrefixCard from "../../components/PrefixCard/PrefixCard";
import QueueCard from "../../components/QueueCard/QueueCard";
import { useStyles } from "./DashboardStyle";
import { IoMdArrowBack, IoMdRefresh } from "react-icons/io";
import { YourServersContext, YourServersProvider } from "../YourServers/YourServersContext";
import Skeleton from "@material-ui/lab/Skeleton";

const Dashboard = () => {
  const [guilds, setGuilds] = useContext(YourServersContext);
  const [guild, setGuild] = useState({ status: "loading" });
  const { id } = useParams();
  const classes = useStyles();
  const history = useHistory();
  const [refresh, setRefresh] = useState(false);
  let dashboardRef = useRef(null);
  useEffect(() => {
    TweenMax.from(dashboardRef, 1.5, {
      opacity: "0",
      y: "50px",
      ease: "power4.out",
      clearProps: "all",
    });
  }, []);

  useEffect(() => {
    if (guilds.data) setGuild(guilds.data.filter((g) => g.id === id)[0], { status: "done" });
  }, [guilds]);
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
        {guild.status === "loading" ? <Skeleton /> : guild.name}
      </Typography>
      <Grid container spacing={4}>
        <Grid item xs={12} md={7}>
          {guild.status === "loading" ? <Skeleton /> : <QueueCard refresh={refresh} id={id}></QueueCard>}
        </Grid>
        <Grid item xs={12} md={5}>
          {guild.status === "loading" ? <Skeleton /> : <PrefixCard refresh={refresh} id={id}></PrefixCard>}
        </Grid>
      </Grid>
    </div>
  );
};

export default Dashboard;
