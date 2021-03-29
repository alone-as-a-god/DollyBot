import { Typography } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import DashboardCard from "../DashboardCard/DashboardCard";
import SongItem from "../SongItem/SongItem";
import { ReactSortable } from "react-sortablejs";
import { useStyles } from "./QueueCardStyle";
import InputForm from "../InputForm/InputForm";
import axios from "axios";

const { REACT_APP_API_ENDPOINT } = process.env;
const YOUTUBE_REGEX = `^(https?\:\/\/)?((www\.)?youtube\.com|youtu\.?be)\/.+$`;
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

    if (songName.match(YOUTUBE_REGEX)) {
      setSongName(songName.replace(/\s/g, "")); //remove spaces
      const substrings = songName.split("watch?v=");
      const id = substrings[substrings.length - 1];
      console.log(id);
      axios
        .get(`https://youtube.googleapis.com/youtube/v3/videos?part=snippet&id=${id}&maxResults=1&key=AIzaSyDioJoz3dUl53RSC5QcIFx7tIBORGfWi9g`)
        .then((response) => {
          const url = songName;
          const name = response.data.items[0].snippet.title;
          return axios.post(`${REACT_APP_API_ENDPOINT}/music/add`, { guildID: guildID, songName: name, url: url });
        });
    } else {
      axios
        .get(`https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=1&q=${songName}&key=AIzaSyDioJoz3dUl53RSC5QcIFx7tIBORGfWi9g`)
        .then((response) => {
          const url = `https://www.youtube.com/watch?v=${response.data.items[0].id.videoId}`;
          const name = response.data.items[0].snippet.title;
          console.log(url, name);
          return axios.post(`${REACT_APP_API_ENDPOINT}/music/add`, { guildID: guildID, songName: name, url: url });
        });
    }

    // axios
    //   .post(`${REACT_APP_API_ENDPOINT}/music/add`, { guildID: guildID, songName: songName })
    //   .then((response) => {
    //     return axios.get(`${REACT_APP_API_ENDPOINT}/music/all/${guildID}`);
    //   })
    //   .then((response) => {
    //     setSongs({ status: "done", data: response.data });
    //   });
  };

  const getSongs = () => {
    setSongs({ status: "loading" });
    axios.get(`${REACT_APP_API_ENDPOINT}/music/all/${guildID}`).then((response) => {
      setSongs({ status: "done", data: response.data });
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
          {songs.data.map((song) => {
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
