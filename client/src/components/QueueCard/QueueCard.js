import { Typography } from "@material-ui/core";
import { useEffect, useState } from "react";
import DashboardCard from "../DashboardCard/DashboardCard";
import SongItem from "../SongItem/SongItem";
import { useStyles } from "./QueueCardStyle";
import InputForm from "../InputForm/InputForm";
import axios from "axios";

const { REACT_APP_API_ENDPOINT, REACT_APP_YOUTUBE_API_KEY } = process.env;
const YOUTUBE_REGEX = `^(https?\:\/\/)?((www\.)?youtube\.com|youtu\.?be)\/.+$`;
const QueueCard = ({ refresh, guildID }) => {
  const [songs, setSongs] = useState({ status: "loading", data: [] });
  const [songName, setSongName] = useState("");
  const [currentSong, setCurrentSong] = useState("");

  const onDelete = (id) => {
    axios.post(`${REACT_APP_API_ENDPOINT}/music/delete`, { guildID: guildID, id: id }).then((response) => {
      setSongs({ data: songs.data.filter((s) => s.id !== id), status: "done" });
    });
  };

  const getCurrentSong = () => {
    axios
      .get(`${REACT_APP_API_ENDPOINT}/music/current/${guildID}`)
      .then((response) => {
        setCurrentSong({ status: "done", data: response.data });
      })
      .catch((err) => {
        setCurrentSong({ status: "error" });
      });
  };

  const addSong = (e) => {
    e.preventDefault();
    setSongs({ status: "loading", data: [] });

    if (songName.match(YOUTUBE_REGEX)) {
      setSongName(songName.replace(/\s/g, "")); //remove spaces
      const substrings = songName.split("watch?v=");
      const id = substrings[substrings.length - 1];
      axios
        .get(`https://youtube.googleapis.com/youtube/v3/videos?part=snippet&id=${id}&maxResults=1&key=${REACT_APP_YOUTUBE_API_KEY}`)
        .then((response) => {
          const url = songName;
          const name = response.data.items[0].snippet.title;
          return axios.post(`${REACT_APP_API_ENDPOINT}/music/add`, { guildID: guildID, songName: name, url: url });
        })
        .then((response) => {
          return axios.get(`${REACT_APP_API_ENDPOINT}/music/all/${guildID}`);
        })
        .then((response) => {
          setSongs({ status: "done", data: response.data });
          getCurrentSong();
          setSongName("");
        });
    } else {
      axios
        .get(`https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=1&q=${songName}&key=${REACT_APP_YOUTUBE_API_KEY}`)
        .then((response) => {
          const url = `https://www.youtube.com/watch?v=${response.data.items[0].id.videoId}`;
          const name = response.data.items[0].snippet.title;
          return axios.post(`${REACT_APP_API_ENDPOINT}/music/add`, { guildID: guildID, songName: name, url: url });
        })
        .then((response) => {
          return axios.get(`${REACT_APP_API_ENDPOINT}/music/all/${guildID}`);
        })
        .then((response) => {
          setSongs({ status: "done", data: response.data });
          getCurrentSong();
          setSongName("");
        });
    }
  };

  const getSongs = () => {
    setSongs({ status: "loading" });
    axios
      .get(`${REACT_APP_API_ENDPOINT}/music/all/${guildID}`)
      .then((response) => {
        if (response.status === 204) return setSongs({ status: "empty-error", data: [] });
        setSongs({ status: "done", data: response.data });
      })
      .catch((err) => {
        if (err.response) {
          setSongs({ status: "error", data: [] });
        }
      });
  };

  useEffect(() => {
    getSongs();
    getCurrentSong();
    setSongName("");
  }, [refresh]);

  const classes = useStyles();
  return (
    <DashboardCard>
      <Typography variant="h3" className={classes.title}>
        Queue
      </Typography>
      {currentSong.status === "done" && currentSong.data && (
        <Typography className={classes.text}>Currently playing: {currentSong.data.songName}</Typography>
      )}
      <InputForm label="Songname or URL" value={songName} defaultValue="" onChange={setSongName} onSubmit={addSong}></InputForm>

      {songs.status === "error" && <Typography className={classes.text}>Can't get songs from database</Typography>}
      {typeof songs.data !== "undefined" && songs.data.length === 0 && <Typography className={classes.text}>Queue is empty</Typography>}
      {songs.status === "done" && (
        <div className={classes.songContainer}>
          {songs.data.map((song) => {
            return <SongItem onDelete={onDelete} key={song.id} song={song}></SongItem>;
          })}
        </div>
      )}
    </DashboardCard>
  );
};

export default QueueCard;
