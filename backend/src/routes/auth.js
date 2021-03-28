const express = require("express");
const router = express.Router();
require("dotenv").config();
const querystring = require("querystring");
const axios = require("axios");

//enviroment variables
const API_ENDPOINT = process.env.API_ENDPOINT;
const CLIENT_ID = process.env.CLIENT_ID;
const CLIENT_SECRET = process.env.CLIENT_SECRET;
const REDIRECT_URI = process.env.REDIRECT_URI;

const options = { headers: { "Content-Type": "application/x-www-form-urlencoded" } };

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
      // console.log("Error authorizing");
    }
  };
  authorize(req.params.code);
});

module.exports = router;
