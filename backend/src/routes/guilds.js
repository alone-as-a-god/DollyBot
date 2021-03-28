const express = require("express");
const router = express.Router();
const sqlite = require("sqlite3").verbose();
const querystring = require("querystring");
const axios = require("axios");

//enviroment variables
const API_ENDPOINT = process.env.API_ENDPOINT;
const CLIENT_ID = process.env.CLIENT_ID;
const CLIENT_SECRET = process.env.CLIENT_SECRET;
const REDIRECT_URI = process.env.REDIRECT_URI;

const DB_PATH = "../database/database.db";

var db = new sqlite.Database(DB_PATH, sqlite.OPEN_READWRITE, (err) => {
  if (err) {
    console.log(err);
  }
  console.log("Database connected");
});

const options = { headers: { "Content-Type": "application/x-www-form-urlencoded" } };

router.get("/", (req, res) => {
  const getGuilds = async () => {
    const access_data = querystring.stringify({
      client_id: CLIENT_ID,
      client_secret: CLIENT_SECRET,
      grant_type: "refresh_token",
      refresh_token: req.session.refresh_token,
      redirect_uri: REDIRECT_URI,
      scope: "identify email connections guilds",
    });

    if (!req.session.refresh_token) res.sendStatus(404);
    try {
      //get access token via discord api
      const response_token = await axios.post(API_ENDPOINT, access_data, options);
      req.session.refresh_token = response_token.data.refresh_token;
      //get user's guilds via discord api
      const response_guildinfo = await axios.get("https://discord.com/api/users/@me/guilds", {
        headers: { authorization: `Bearer ${response_token.data.access_token}` },
      });
      if (response_guildinfo.data.length === 0) return res.sendStatus(204);
      let guilds = response_guildinfo.data;
      //compare guilds with db
      let query = `SELECT * FROM guild WHERE guildID = ${guilds[0].id} `;
      guilds.shift();
      for (const guild of guilds) {
        query = query.concat(`OR guildID = ${guild.id} `);
      }
      db.all(query, [], (err, rows) => {
        if (err) res.sendStatus(404);
        if (rows.length === 0) return res.sendStatus(204);
        let matchingGuilds = [];
        rows.forEach((row) => {
          matchingGuilds.push({
            id: response_guildinfo.data.filter((guild) => guild.id == row.guildID)[0].id,
            name: response_guildinfo.data.filter((guild) => guild.id == row.guildID)[0].name,
            icon: response_guildinfo.data.filter((guild) => guild.id == row.guildID)[0].icon,
          });
        });

        console.log(matchingGuilds);

        res.send(matchingGuilds);
      });
    } catch (err) {
      console.log(err);
    }
  };
  getGuilds();
});
module.exports = router;
