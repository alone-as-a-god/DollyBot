import { Typography } from "@material-ui/core";
import React from "react";
import { useHistory } from "react-router";
import { useStyles } from "./ServerCardStyle";
const ServerCard = ({ guild }) => {
  const classes = useStyles();
  const history = useHistory();
  return (
    <div className={classes.root} onClick={() => history.push(`/dashboard/${guild.id}`)}>
      <img className={classes.img} src={`https://cdn.discordapp.com/icons/${guild.id}/${guild.icon}.png`} alt={guild.icon} />
      <Typography>{guild.name}</Typography>
    </div>
  );
};

export default ServerCard;
