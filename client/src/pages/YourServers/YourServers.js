import { Typography } from "@material-ui/core";
import React, { useContext, useEffect, useRef, useState } from "react";
import { useStyles } from "./YourServersStyle";
import ServerContainer from "../../components/ServerContainer/ServerContainer";
import { YourServersProvider } from "./YourServersContext";
import { UserContext } from "../../UserContext";
import { pageFadeIn, toTop } from "../../utils/animation";
import { Redirect } from "react-router";
const YourServers = () => {
  const classes = useStyles();
  const [user] = useContext(UserContext);
  let serversRef = useRef(null);
  useEffect(() => {
    toTop();
    pageFadeIn(serversRef);
  }, []);

  return (
    <>
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
    </>
  );
};

export default YourServers;
