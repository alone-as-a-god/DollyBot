import React, { useState, createContext, useEffect } from "react";
import axios from "axios";
const { REACT_APP_API_ENDPOINT } = process.env;

export const YourServersContext = createContext();

export const YourServersProvider = (props) => {
  const [guilds, setGuilds] = useState({});
  useEffect(() => {
    setGuilds({ ...guilds, status: "loading" });
    axios
      .get(`${REACT_APP_API_ENDPOINT}/guilds`, { withCredentials: true })
      .then((response) => {
        if (response.data === "") return setGuilds({ status: "noguilds-error" });

        setGuilds({ data: response.data, status: "done" });
      })
      .catch((error) => {
        if (!error.response) setGuilds({ ...guilds, status: "network-error" });
      });
    console.log(guilds);
  }, []);

  return <YourServersContext.Provider value={[guilds, setGuilds]}>{props.children}</YourServersContext.Provider>;
};
