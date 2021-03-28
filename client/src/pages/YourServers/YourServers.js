import { Grid, Typography } from "@material-ui/core";
import { TweenMax } from "gsap/gsap-core";
import React, { useEffect, useRef, useState } from "react";
import { useStyles } from "./YourServersStyle";
import ServerContainer from "../../components/ServerContainer/ServerContainer";
import { YourServersProvider } from "./YourServersContext";
const { REACT_APP_API_ENDPOINT } = process.env;
const YourServers = () => {
  const classes = useStyles();

  let serversRef = useRef(null);
  useEffect(() => {
    TweenMax.from(serversRef, 1.5, {
      opacity: "0",
      y: "50px",
      ease: "power4.out",
      clearProps: "all",
    });
  }, []);

  return (
    <div
      className={classes.root}
      ref={(element) => {
        serversRef = element;
      }}
    >
      <Typography variant="h1" className={classes.title}>
        Your Guilds
      </Typography>

      <YourServersProvider>
        <ServerContainer></ServerContainer>
      </YourServersProvider>
    </div>
  );
};

export default YourServers;
