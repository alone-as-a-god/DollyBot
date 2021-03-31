const express = require("express");
require("dotenv").config();
const axios = require("axios");
const querystring = require("querystring");
const APIError = require("../error/APIError");

const router = express.Router();

const { API_ENDPOINT, CLIENT_ID, CLIENT_SECRET, REDIRECT_URI } = process.env;

const options = { headers: { "Content-Type": "application/x-www-form-urlencoded" } };

router.get("/:code", (req, res, next) => {
  const code = req.params.code;
  const access_data = querystring.stringify({
    client_id: CLIENT_ID,
    client_secret: CLIENT_SECRET,
    grant_type: "authorization_code",
    code: code,
    redirect_uri: REDIRECT_URI,
    scope: "identify email connections guilds",
  });

  axios
    .post(API_ENDPOINT, access_data, options)
    .then((response_token) => {
      req.session.access_token = response_token.data.access_token;
      req.session.refresh_token = response_token.data.refresh_token;

      return axios.get("https://discord.com/api/users/@me", {
        headers: { authorization: `Bearer ${response_token.data.access_token}` },
      });
    })
    .then((response_userinfo) => {
      req.session.userId = response_userinfo.data.id;
      req.session.username = response_userinfo.data.username;
      req.session.userAvatar = response_userinfo.data.avatar;
      res.send({
        id: response_userinfo.data.id,
        username: response_userinfo.data.username,
        avatar: response_userinfo.data.avatar,
      });
    })
    .catch((err) => {
      if (err.response) {
        console.error(err.response);
        if (err.response.data.error_description) return next(new APIError(err.response.status, "Authorization Error: Invalid code in request."));
        return next(new APIError(err.response.status, "Authorization Error"));
      }
      return next(new APIError(400, "Authorization Error"));
    });
});

module.exports = router;
