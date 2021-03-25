const express = require("express");
require("dotenv").config();
const querystring = require("querystring");
const axios = require("axios");
const API_ENDPOINT = process.env.API_ENDPOINT;
const CLIENT_ID = process.env.CLIENT_ID;
const CLIENT_SECRET = process.env.CLIENT_SECRET;
const REDIRECT_URI = process.env.REDIRECT_URI;

const router = express.Router();
const options = { headers: { "Content-Type": "application/x-www-form-urlencoded" } };

const refreshToken = async (refresh_token) => {
  let response_token;
  const access_data = querystring.stringify({
    client_id: CLIENT_ID,
    client_secret: CLIENT_SECRET,
    grant_type: "refresh_token",
    refresh_token: refresh_token,
    redirect_uri: REDIRECT_URI,
    scope: "identify email connections guilds",
  });
  try {
    response_token = await axios.post(API_ENDPOINT, access_data, options);
  } catch (err) {
    return false;
  }
  return response_token.data.access_token;
};

router.get("/user", (req, res) => {
  if (!req.session) res.sendStatus(404);
  res.send({
    username: req.session.username,
    id: req.session.userId,
    avatar: req.session.userAvatar,
  });
});

router.get("/:code", (req, res) => {
  const authorize = async (code) => {
    try {
      const access_data = querystring.stringify({
        client_id: CLIENT_ID,
        client_secret: CLIENT_SECRET,
        grant_type: "authorization_code",
        code: code,
        redirect_uri: REDIRECT_URI,
        scope: "identify email connections guilds",
      });
      const response_token = await axios.post(API_ENDPOINT, access_data, options);

      const response_userinfo = await axios.get("https://discord.com/api/users/@me", {
        headers: { authorization: `Bearer ${response_token.data.access_token}` },
      });

      //store session variables
      req.session.access_token = response_token.data.access_token;
      req.session.refresh_token = response_token.data.refresh_token;
      req.session.userId = response_userinfo.data.id;
      req.session.username = response_userinfo.data.username;
      req.session.userAvatar = response_userinfo.data.avatar;

      res.send({
        id: response_userinfo.data.id,
        username: response_userinfo.data.username,
        avatar: response_userinfo.data.avatar,
      });
    } catch (err) {
      console.log("Error authorizing");
    }
  };
  authorize(req.params.code);
});

router.get("/guilds", (req, res) => {
  const getGuilds = async () => {
    try {
      if (!req.session.refresh_token) res.sendStatus(404);
      const access_token = refreshToken(req.session.refresh_token);
      const response_guildinfo = await axios.get("https://discord.com/api/users/@me/guilds", {
        headers: { authorization: `Bearer ${access_token}` },
      });
      //TODO: check with database for mutual servers, refresh token

      
      res.send(response_guildinfo.data);
    } catch (err) {
      console.log(err);
    }
  };
  getGuilds();
});

router.get("/logout", (req, res) => {
  req.session.destroy();
  res.clearCookie("connect.sid", { path: "/" });
});

module.exports = router;
