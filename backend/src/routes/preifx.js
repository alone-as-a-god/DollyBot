const express = require("express");
const net = require("net");
const sqlite3 = require("sqlite3").verbose();
const APIError = require("../error/APIError");

const router = express.Router();
const dbPath = process.env.DB_PATH || "../database/database.db";

//Gets the prefix of a specific guild
router.get("/:guildID", (req, res, next) => {
  let guildID = req.params.guildID;

  let db = new sqlite3.Database(dbPath);
  let sql = `
        SELECT prefix
        FROM guild
        WHERE guildID = ?`;

  db.get(sql, [guildID], (err, row) => {
    if (err) {
      return next(new APIError(400, "Error getting prefix from database"));
    }

    //Check if row contains data
    if (row) {
      res.json({ prefix: row.prefix });
    } else {
      return next(new APIError(400, "Error getting prefix from database"));
    }
  });

  db.close();
});

//Change the prefix of a specific guild
router.post("/", (req, res, next) => {
  let prefix = req.body.prefix;
  let guildID = req.body.guildID;

  //Check if both values are not empty
  if (!prefix || !guildID) {
    return next(new APIError(400, "guildID/prefix empty"));
  }

  let db = new sqlite3.Database(dbPath);
  let sql = `
        UPDATE guild
        SET prefix = ?
        WHERE guildID = ?`;

  db.run(sql, [prefix, guildID], (err) => {
    if (err) {
      return next(new APIError(400, "Error writing prefix into database"));
    }

    sendNotification("updateDictionary");
    res.sendStatus(200); //TODO: Return error code if sendNotification failed
  });

  db.close();
});

//Send a notification to the Pyhton server
function sendNotification(msg) {
  const client = new net.Socket();

  client.on("error", (err) => {
    console.log(`An error occured: ${err}`);
  });

  const botIp = process.env.BOT_ADDRESS || "localhost";
  const botPort = process.env.BOT_PORT || 12345;

  client.connect(botPort, botIp, () => {
    console.log(`Connected to ${botIp}:${botPort}`);
    client.write(msg);
    client.destroy();
  });
}

module.exports = router;
