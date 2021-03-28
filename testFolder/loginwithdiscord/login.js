const axios = require("axios");
const querystring = require("querystring");
const API_ENDPOINT = "https://discord.com/api/oauth2/token";
const CLIENT_ID = "817437317324079145";
const CLIENT_SECRET = "QTZFbuiytXSwC3NPJ-hp4h3yI0JyVW3J";
const REDIRECT_URI = "http://localhost:3000/";

const get_access = (code) => {
  const data = querystring.stringify({
    client_id: CLIENT_ID,
    client_secret: CLIENT_SECRET,
    grant_type: "authorization_code",
    code: code,
    redirect_uri: REDIRECT_URI,
    scope: "identify email connections guilds",
  });
  const options = { headers: { "Content-Type": "application/x-www-form-urlencoded" } };
  axios
    .post(API_ENDPOINT, data, options)
    .then((response) => {
      console.log(response.data);
      axios
        .get("https://discord.com/api/users/@me/guilds", { headers: { authorization: `Bearer ${response.data.access_token}` } })
        .then((response) => {
          console.log(response.data);
        });
    })
    .then()
    .catch((err) => {
      console.log(err);
    });
};

get_access("dGtMGdRNm4IVHeY9tEgKJgGEBSZUW8");
