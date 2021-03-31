const express = require("express");
const sqlite3 = require("sqlite3").verbose();
const querystring = require("querystring");
const axios = require("axios");
const APIError = require("../error/APIError");

const router = express.Router();

const { API_ENDPOINT, CLIENT_ID, CLIENT_SECRET, REDIRECT_URI, DB_PATH } = process.env;
const options = { headers: { "Content-Type": "application/x-www-form-urlencoded" } };

router.get("/", (req, res, next) => {
  const access_data = querystring.stringify({
    client_id: CLIENT_ID,
    client_secret: CLIENT_SECRET,
    grant_type: "refresh_token",
    refresh_token: req.session.refresh_token,
    redirect_uri: REDIRECT_URI,
    scope: "identify email connections guilds",
  });

  axios
    //get access token via discord api
    .post(API_ENDPOINT, access_data, options)
    .then((response_token) => {
      req.session.refresh_token = response_token.data.refresh_token;
      //get user's guilds via discord api
      return axios.get("https://discord.com/api/users/@me/guilds", {
        headers: { authorization: `Bearer ${response_token.data.access_token}` },
      });
    })
    //compare guilds with db and send matching guilds
    .then((response_guildinfo) => {
      if (response_guildinfo.data.length === 0) return res.sendStatus(204);
      let guilds = response_guildinfo.data;
      let query = `SELECT * FROM guild WHERE guildID = ${guilds[0].id} `;
      guilds.shift();
      for (const guild of guilds) {
        query = query.concat(`OR guildID = ${guild.id} `);
      }
      let db = new sqlite3.Database(DB_PATH);
      db.all(query, [], (err, rows) => {
        if (err) return next(new APIError(400, "Cant get guilds from database"));
        if (rows.length === 0) return next(new APIError(204, "You have no guilds running our bot"));
        let matchingGuilds = [];
        rows.forEach((row) => {
          matchingGuilds.push({
            id: response_guildinfo.data.filter((guild) => guild.id == row.guildID)[0].id,
            name: response_guildinfo.data.filter((guild) => guild.id == row.guildID)[0].name,
            icon: response_guildinfo.data.filter((guild) => guild.id == row.guildID)[0].icon,
          });
        });
        req.session.guilds = matchingGuilds;
        res.send(matchingGuilds);
      });
    })
    .catch((err) => {
      if (err.response) {
        switch (err.response.status) {
          case 400:
            return next(new APIError(400, "Invalid Grant"));
          case 429:
            return next(new APIError(429, `Discord API limiting requests. Try again in ${err.response.data.retry_after} seconds.`));
        }
      }
      return next(new APIError(400, "Error getting guilds"));
    });
});

router.get("/:id", (req, res, next) => {
  if (!req.session.guilds) return next(new APIError(400, "No guilds found."));
  const guild = req.session.guilds.filter((guild) => guild.id == req.params.id);
  res.send(...guild);
});
module.exports = router;
