import React, { useState, createContext, useEffect } from "react";
import axios from "axios";
const { REACT_APP_API_ENDPOINT } = process.env;

export const DashboardContext = createContext();

export const DashboardProvider = (props) => {
  const [guilds, setGuilds] = useState({});
  useEffect(() => {}, []);

  return <DashboardContext.Provider value={[guilds, setGuilds]}>{props.children}</DashboardContext.Provider>;
};
