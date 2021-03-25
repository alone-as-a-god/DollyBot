require("dotenv").config();
const session = require("express-session");
const net = require("net");
const express = require("express");
const { send } = require("process");
const { write } = require("fs");
const app = express();
const routes = require("./routes");
const port = process.env.BACKEND_PORT || 4000;

app.use(
  session({
    secret: "dolly is cool",
    resave: false,
    saveUninitialized: true,
  })
);
app.use("/api", routes);

//Api testing functions
app.get("/", function (req, res) {
  res.send("DollyBot");
});

app.get("/test/:test", function (req, res) {
  console.log(req.params.test);
  sendNotification(req.params.test);
});

//Communication with python
const client = new net.Socket();

client.on("error", (err) => {
  console.log(`An error occured: ${err}`);
});

function sendNotification(msg) {
  const botIp = process.env.BOT_ADDRESS || "localhost";
  const botPort = process.env.BOT_PORT || 12345;

  client.connect(botPort, botIp, () => {
    console.log(`Connected to ${botIp}:${botPort}`);
    client.write(msg);
    client.destroy();
  });
}

//Start server
app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});
