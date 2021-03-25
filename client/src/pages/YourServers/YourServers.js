import { Grid, Typography } from "@material-ui/core";
import { TweenMax } from "gsap/gsap-core";
import React, { useEffect, useRef, useState } from "react";
import ServerCard from "../../components/ServerCard/ServerCard";
import { useStyles } from "./YourServersStyle";
const YourServers = () => {
  const classes = useStyles();
  const [guilds, setGuilds] = useState([
    { name: "Dolly Parton Fanclub", id: "421355660127764494", icon: "df01f6a917d12413768616b79cb591a3" },
    { name: "Dolly Parton Fanclub", id: "421355660127764494", icon: "df01f6a917d12413768616b79cb591a3" },
    { name: "Dolly Parton Fanclub", id: "421355660127764494", icon: "df01f6a917d12413768616b79cb591a3" },
  ]);
  let serversRef = useRef(null);
  useEffect(() => {
    TweenMax.from(serversRef, 1.5, {
      opacity: "0",
      y: "50px",
      ease: "power4.out",
      clearProps: "all",
    });
  }, []);

  useEffect(() => {
    //TODO: get all your guilds
  }, []);

  return (
    <div
      className={classes.root}
      ref={(element) => {
        serversRef = element;
      }}
    >
      <Typography variant="h1" className={classes.title}>
        Your Servers
      </Typography>
      <Grid container spacing={3} className={classes.container}>
        {guilds.map((guild) => {
          return (
            <Grid item lg={3} md={4} sm={6} xs={10}>
              <ServerCard guild={guild} id={guild.id} />
            </Grid>
          );
        })}
      </Grid>
    </div>
  );
};

export default YourServers;
