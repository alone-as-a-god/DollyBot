const express = require("express");
const net = require("net");
const sqlite3 = require("sqlite3").verbose();

const router = express.Router();
const dbPath = process.env.DB_PATH || "../database/database.db";

//Gets the prefix of a specific guild
router.get("/:guildID", (req, res) => {
  let db = new sqlite3.Database(dbPath);
  let sql = `
        SELECT prefix 
        FROM guild
        WHERE guildID = ?`;

  db.get(sql, [req.params.guildID], (err, row) => {
    if (err) {
      //TODO: send better error message
      res.sendStatus(400);
      return console.error(err.message);
    }

    //Check if row contains data
    if (row) {
      res.json({ prefix: row.prefix });
    } else {
      res.sendStatus(404);
    }
  });

  db.close();
});

//Change the prefix of a specific guild
router.post("/", (req, res) => {
  console.log(req.body);
  let prefix = req.body.prefix;
  let guildID = req.body.guildID;

  //Check if both values are not empty
  if (!prefix || !guildID) {
    res.sendStatus(400);
    return;
  }

  let db = new sqlite3.Database(dbPath);
  let sql = `
        UPDATE guild
        SET prefix = ?
        WHERE guildID = ?`;

  db.run(sql, [prefix, guildID], (err) => {
    if (err) {
      //TODO: send better error message
      res.sendStatus(400);
      return console.error(err.message);
    }

    console.log(`Updated prefix of guild: ${guildID} to ${prefix}`);

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
