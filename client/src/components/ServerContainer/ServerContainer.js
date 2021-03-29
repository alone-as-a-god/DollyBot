import { Grid, Typography } from "@material-ui/core";
import React, { useContext } from "react";
import ServerCard from "../ServerCard/ServerCard";
import { useStyles } from "./ServerContainerStyle";
import { YourServersContext } from "../../pages/YourServers/YourServersContext";
import Skeleton from "@material-ui/lab/Skeleton";
import { UserContext } from "../../UserContext";
import { Redirect } from "react-router";
const ServerContainer = () => {
  const classes = useStyles();
  const [guilds] = useContext(YourServersContext);

  return (
    <>
      {guilds.status === "loading" && (
        <Grid container spacing={3} className={classes.container}>
          <Grid item lg={3} md={4} sm={6} xs={10}>
            <Skeleton variant="rect" width="100%" height="300px" className={classes.skeleton} />
          </Grid>
          <Grid item lg={3} md={4} sm={6} xs={10}>
            <Skeleton variant="rect" width="100%" height="300px" className={classes.skeleton} />
          </Grid>
          <Grid item lg={3} md={4} sm={6} xs={10}>
            <Skeleton variant="rect" width="100%" height="300px" className={classes.skeleton} />
          </Grid>
          <Grid item lg={3} md={4} sm={6} xs={10}>
            <Skeleton variant="rect" width="100%" height="300px" className={classes.skeleton} />
          </Grid>
        </Grid>
      )}
      {guilds.status === "network-error" && (
        <Typography variant="h5" className={classes.notificationText}>
          Can't reach server.
        </Typography>
      )}
      {guilds.status === "noguilds-error" && (
        <Typography variant="h5" className={classes.notificationText}>
          You have no guilds running our bot.
        </Typography>
      )}
      <Grid container spacing={3} className={classes.container}>
        {guilds.data &&
          guilds.data.map((guild) => {
            return (
              <Grid key={guild.id} item lg={3} md={4} sm={6} xs={10}>
                <ServerCard key={guild.id} guild={guild} id={guild.id} />
              </Grid>
            );
          })}
      </Grid>
    </>
  );
};

export default ServerContainer;
