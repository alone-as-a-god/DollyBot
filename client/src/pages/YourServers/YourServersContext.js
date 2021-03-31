import React, { useState, createContext, useEffect } from "react";
import axios from "axios";
const { REACT_APP_API_ENDPOINT } = process.env;

export const YourServersContext = createContext();

export const YourServersProvider = (props) => {
  const [guilds, setGuilds] = useState({ status: "loading" });
  useEffect(() => {
    axios
      .get(`${REACT_APP_API_ENDPOINT}/guilds`, { withCredentials: true })
      .then((response) => {
        if (response.status === 204) return setGuilds({ status: "noguilds-error" });
        setGuilds({ data: response.data, status: "done" });
      })
      .catch((error) => {
        if (!error.response) return setGuilds({ status: "network-error" });
        if (error.response.status === 429) setGuilds({ status: "discord-api-error" });
      });
  }, []);

  return <YourServersContext.Provider value={[guilds, setGuilds]}>{props.children}</YourServersContext.Provider>;
};
