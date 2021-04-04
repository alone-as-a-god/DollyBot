import { IconButton, Typography } from "@material-ui/core";
import React from "react";
import { useStyles } from "./SongItemStyle";
import { MdDelete } from "react-icons/md";
const SongItem = ({ song, onDelete }) => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <div className={classes.songInfoContainer}>
        <span className={classes.songInfo}>
          <Typography> {song.id}</Typography>
        </span>

        <a className={classes.songInfo} href={song.url} target="_blank">
          <Typography> {song.songName}</Typography>
        </a>
      </div>
      <IconButton className={classes.icon} onClick={() => onDelete(song.id)}>
        <MdDelete></MdDelete>
      </IconButton>
    </div>
  );
};

export default SongItem;
