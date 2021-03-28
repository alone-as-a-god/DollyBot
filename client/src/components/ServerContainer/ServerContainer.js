import { Grid, Typography } from "@material-ui/core";
import React, { useContext } from "react";
import ServerCard from "../ServerCard/ServerCard";
import { useStyles } from "./ServerContainerStyle";
import { YourServersContext } from "../../pages/YourServers/YourServersContext";
const ServerContainer = () => {
  const classes = useStyles();
  const [guilds, setGuilds] = useContext(YourServersContext);

  return (
    <>
      {guilds.status === "loading" && (
        <Typography variant="h5" className={classes.notificationText}>
          Loading ...
        </Typography>
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
