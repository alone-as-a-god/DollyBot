import { IconButton } from "@material-ui/core";
import React from "react";
import { useStyles } from "./SongItemStyle";
import { MdDelete } from "react-icons/md";
const SongItem = ({ song, index, onDelete }) => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <div>
        <span className={classes.songInfo}>{index + 1}</span>
        <span className={classes.songInfo}>{song.title}</span>
      </div>
      <IconButton className={classes.icon} onClick={() => onDelete(song.id)}>
        <MdDelete></MdDelete>
      </IconButton>
    </div>
  );
};

export default SongItem;
