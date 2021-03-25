const express = require("express");
require("dotenv").config();
const querystring = require("querystring");
const axios = require("axios");
const API_ENDPOINT = process.env.API_ENDPOINT;
const CLIENT_ID = process.env.CLIENT_ID;
const CLIENT_SECRET = process.env.CLIENT_SECRET;
const REDIRECT_URI = process.env.REDIRECT_URI;

const router = express.Router();

router.get("/:code", (req, res) => {
  const authorize = async (code) => {
    const data = querystring.stringify({
      client_id: CLIENT_ID,
      client_secret: CLIENT_SECRET,
      grant_type: "authorization_code",
      code: code,
      redirect_uri: REDIRECT_URI,
      scope: "identify email connections guilds",
    });

    const options = { headers: { "Content-Type": "application/x-www-form-urlencoded" } };

    try {
      //get access_token from discord to use discord api
      const response_token = await axios.post(API_ENDPOINT, data, options);
      const access_token = response_token.data.access_token;
      const refresh_token = response_token.data.refresh_token;

      //get userinfo from discordapi (username, id, ...)
      const response_userinfo = await axios.get("https://discord.com/api/users/@me", {
        headers: { authorization: `Bearer ${access_token}` },
      });
      const user_id = response_userinfo.data.id;
      const user_name = response_userinfo.data.username;
      const user_avatar = response_userinfo.data.avatar;
      req.session.userId = user_id;
      req.session.username = user_name;

      //get guilds the user is part of from discord api
      const response_guildinfo = await axios.get("https://discord.com/api/users/@me/guilds", {
        headers: { authorization: `Bearer ${access_token}` },
      });
      const guilds = response_guildinfo.data;

      res.send({
        id: user_id,
        username: user_name,
        avatar: user_avatar,
      });
    } catch (err) {
      console.log(err);
      res.sendStatus(400);
    }
  };
  authorize(req.params.code);
});

router.get("/servers", (req, res) => {
  const getGuilds = async () => {
    if (req.session.access_token) {
      const response_guildinfo = await axios.get("https://discord.com/api/users/@me/guilds", {
        headers: { authorization: `Bearer ${access_token}` },
      });
      //TODO: check with database for mutual servers, refresh token
      res.send(response_guildinfo.data);
    }
  };
  getGuilds();
});

router.get("/logout", (req, res) => {
  req.session.destroy();
});

module.exports = router;
