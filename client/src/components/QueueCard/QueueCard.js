import { Typography } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import DashboardCard from "../DashboardCard/DashboardCard";
import SongItem from "../SongItem/SongItem";
import { ReactSortable } from "react-sortablejs";
import { useStyles } from "./QueueCardStyle";
import InputForm from "../InputForm/InputForm";
import { axios } from "axios";
const { REACT_APP_API_ENDPOINT } = process.env;
const QueueCard = ({ refresh, guildID }) => {
  const [songs, setSongs] = useState({ status: "loading" });
  const [songName, setSongName] = useState("");

  const onDelete = (id) => {
    axios.post(`${REACT_APP_API_ENDPOINT}/music/delete`, { guildID: guildID, songID: id }).then((response) => {
      setSongs({ data: songs.data.filter((s) => s.id !== id), status: "done" });
    });
  };

  const addSong = (e) => {
    e.preventDefault();
    setSongs({ status: "loading" });
    axios
      .post(`${REACT_APP_API_ENDPOINT}/music/add`, { guildID: guildID, songName: e.target.value })
      .then((response) => {
        return axios.get(`${REACT_APP_API_ENDPOINT}/music/all`);
      })
      .then((response) => {
        setSongs({ status: "done", data: response.data });
      });
  };

  const getSongs = () => {
    setSongs({ status: "loading" });
    axios.get(`${REACT_APP_API_ENDPOINT}/music/all`).then((response) => {
      setSongs({ status: "loading", data: response.data });
    });
  };

  useEffect(() => {
    getSongs();
    setSongName("");
  }, [refresh]);

  const classes = useStyles();
  return (
    <DashboardCard>
      <Typography variant="h3" className={classes.title}>
        Queue
      </Typography>
      <Typography className={classes.text}>Submit a songname or Youtube-URL that will be added to queue. </Typography>
      <InputForm label="Songname or URL" value={songName} defaultValue="" onChange={setSongName} onSubmit={addSong}></InputForm>
      {/* <ReactSortable onUpdate={reorderSongs} list={displayedSongs} setList={setDisplayedSongs} animation={200} delayOnTouchStart={true} delay={2}>
        {displayedSongs.slice(0, songLimit).map((song, index) => {
          return <SongItem onDelete={onDelete} key={song.id} song={song} index={index}></SongItem>;
        })}
      </ReactSortable> */}

      {songs.status === "done" && (
        <div className={classes.songContainer}>
          {songs.data.map((song, index) => {
            console.log(song);
            return <SongItem onDelete={onDelete} key={song.id} song={song}></SongItem>;
          })}
        </div>
      )}
      {/* {songs.length === 0 && <Typography className={classes.text}>No songs currently in queue</Typography>} */}
      {/* {songs.length > songLimit && (
        <Button color="secondary" onClick={() => setSongLimit(songLimit + 10)} style={{ zIndex: "999" }}>
          show more
        </Button>
      )}
      {songLimit >= displayedSongs.length && (
        <Button color="secondary" onClick={() => setSongLimit(10)} style={{ zIndex: "999" }}>
          collapse
        </Button>
      )} */}
    </DashboardCard>
  );
};

export default QueueCard;
