import { IconButton } from "@material-ui/core";
import React from "react";
import { useStyles } from "./SongItemStyle";
import { MdDelete } from "react-icons/md";
const SongItem = ({ song, onDelete }) => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <div>
        <span className={classes.songInfo}>{song.id}</span>
        <span>
          <a className={classes.songInfo} href={song.url} target="_blank">
            {song.songName}
          </a>
        </span>
      </div>
      <IconButton className={classes.icon} onClick={() => onDelete(song.id)}>
        <MdDelete></MdDelete>
      </IconButton>
    </div>
  );
};

export default SongItem;
