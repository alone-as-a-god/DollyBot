import { Grid, IconButton, Typography } from "@material-ui/core";
import { TweenMax } from "gsap/gsap-core";
import React, { useContext, useEffect, useRef, useState } from "react";
import { Redirect, useHistory, useParams } from "react-router";
import PrefixCard from "../../components/PrefixCard/PrefixCard";
import QueueCard from "../../components/QueueCard/QueueCard";
import { useStyles } from "./DashboardStyle";
import { IoMdArrowBack, IoMdRefresh } from "react-icons/io";
import { YourServersContext } from "../YourServers/YourServersContext";
import Skeleton from "@material-ui/lab/Skeleton";
import { UserContext } from "../../UserContext";

const Dashboard = () => {
  const [user] = useContext(UserContext);
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
    if (guilds.data) setGuild({ data: guilds.data.filter((g) => g.id === id)[0], status: "done" });
  }, [guilds]);
  return (
    <>
      {!guilds && <Redirect to="/"></Redirect>}
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
        {guilds.status === "discord-api-error" && (
          <Typography variant="h5" className={classes.notificationText}>
            Discord API limit reached. Try again later.
          </Typography>
        )}
        {guilds.status === "network-error" && (
          <Typography variant="h5" className={classes.notificationText}>
            Can't reach server.
          </Typography>
        )}
        {guilds.status === "done" && guild.status === "done" ? (
          <Typography variant="h1" className={classes.title}>
            {guild.data.name}
          </Typography>
        ) : (
          <Skeleton height="100px" variant="rect" className={classes.skeleton} />
        )}

        <Grid container spacing={4}>
          <Grid item xs={12} md={7}>
            {guild.status === "loading" ? (
              <Skeleton variant="rect" height="350px" className={classes.skeleton} />
            ) : (
              <QueueCard refresh={refresh} guildID={id}></QueueCard>
            )}
          </Grid>
          <Grid item xs={12} md={5}>
            {guild.status === "loading" ? (
              <Skeleton height="350px" variant="rect" className={classes.skeleton} />
            ) : (
              <PrefixCard refresh={refresh} guildID={id}></PrefixCard>
            )}
          </Grid>
        </Grid>
      </div>
    </>
  );
};

export default Dashboard;
