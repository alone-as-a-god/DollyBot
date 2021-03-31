import { Typography } from "@material-ui/core";
import React from "react";
import { useHistory } from "react-router";
import { useStyles } from "./ServerCardStyle";
const ServerCard = ({ guild }) => {
  const classes = useStyles();
  const history = useHistory();
  return (
    <div className={classes.root} onClick={() => history.push(`/dashboard/${guild.id}`)}>
      {guild.icon ? (
        [
          guild.icon.startsWith("a_", 0) ? (
            <img key={1} className={classes.img} src={`https://cdn.discordapp.com/icons/${guild.id}/${guild.icon}.gif`} alt={guild.icon} />
          ) : (
            <img key={2} className={classes.img} src={`https://cdn.discordapp.com/icons/${guild.id}/${guild.icon}.png`} alt={guild.icon} />
          ),
        ]
      ) : (
        <img
          className={classes.img}
          src={`https://eu.ui-avatars.com/api/?background=27283F&color=F9F7FF&name=${guild.name.charAt(0)}`}
          alt={guild.icon}
        />
      )}
      <Typography>{guild.name}</Typography>
    </div>
  );
};

export default ServerCard;
