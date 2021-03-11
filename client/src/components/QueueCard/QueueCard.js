import { Button, Typography } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import DashboardCard from "../DashboardCard/DashboardCard";
import SongItem from "../SongItem/SongItem";
import { ReactSortable } from "react-sortablejs";

import { useStyles } from "./QueueCardStyle";
import InputForm from "../InputForm/InputForm";
const QueueCard = () => {
  const getSongs = () => {
    //TODO: implement get songs
    const songs = [
      { title: "Jolene", id: 1 },
      { title: "Jolene", id: 2 },
      { title: "Jolene", id: 3 },
      { title: "Jolene", id: 4 },
      { title: "Jolene", id: 5 },
      { title: "Jolene", id: 6 },
      { title: "Jolene", id: 7 },
      { title: "Jolene", id: 8 },
      { title: "Jolene", id: 9 },
      { title: "Jolene", id: 10 },
      { title: "Jolene", id: 11 },
      { title: "Jolene", id: 12 },
      { title: "Jolene", id: 13 },
      { title: "Jolene", id: 14 },
      { title: "Jolene", id: 15 },
      { title: "Jolene", id: 16 },
      { title: "Jolene", id: 17 },
      { title: "Jolene", id: 18 },
      { title: "Jolene", id: 19 },
      { title: "Jolene", id: 20 },
    ];
    return songs;
  };
  const [songs, setSongs] = useState(getSongs());
  const [displayedSongs, setDisplayedSongs] = useState([...songs]);
  const [songName, setSongName] = useState("");
  const [songLimit, setSongLimit] = useState(10);

  const reorderSongs = () => {
    //TODO: post songs
    console.log("reorder");
  };

  const onDelete = (id) => {
    setSongs(songs.filter((s) => s.id !== id));
    setDisplayedSongs(displayedSongs.filter((s) => s.id !== id));
    //TODO: implement post new song list
  };

  const addSong = (e) => {
    e.preventDefault();
    //TODO: post new song
    console.log(songName);
  };

  // useEffect(() => {
  //   console.log(songs, displayedSongs);
  // }, [songLimit]);

  const classes = useStyles();
  return (
    <DashboardCard>
      <Typography variant="h3" className={classes.title}>
        Queue
      </Typography>
      <Typography className={classes.text}>Submit a songname or Youtube-URL that will be added to queue. </Typography>
      <InputForm label="Songname or URL" value={songName} onChange={setSongName} onSubmit={addSong}></InputForm>
      <Typography className={classes.text}>Drag and drop songs to change song order</Typography>
      <ReactSortable onUpdate={reorderSongs} list={displayedSongs} setList={setDisplayedSongs} animation={200} delayOnTouchStart={true} delay={2}>
        {displayedSongs.slice(0, songLimit).map((song, index) => {
          return <SongItem onDelete={onDelete} key={song.id} song={song} index={index}></SongItem>;
        })}
      </ReactSortable>
      {songs.length === 0 && <Typography className={classes.text}>No songs currently in queue</Typography>}
      {songs.length > songLimit && (
        <Button color="secondary" onClick={() => setSongLimit(songLimit + 10)} style={{ zIndex: "999" }}>
          show more
        </Button>
      )}
      {songLimit >= displayedSongs.length && (
        <Button color="secondary" onClick={() => setSongLimit(10)} style={{ zIndex: "999" }}>
          collapse
        </Button>
      )}
    </DashboardCard>
  );
};

export default QueueCard;
