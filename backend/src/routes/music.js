const express = require("express");
const sqlite3 = require("sqlite3").verbose();
const APIError = require("../error/APIError");
const dbPath = process.env.DB_PATH || "../database/database.db";

const router = express.Router();

//Gets the id of the currently playing song
router.get("/current/:guildID", (req, res, next) => {
  let guildID = req.params.guildID;

  getCurrentTrackID(guildID, (id) => {
    if (id === null || id === undefined) {
      return next(new APIError(400, "TrackID is null/undefined"));
    }

    let db = new sqlite3.Database(dbPath);
    let sql = `
            SELECT id, songName, url
            FROM queue
            WHERE guildID = ? AND id = ?`;

    db.get(sql, [guildID, id], (err, row) => {
      if (err) {
        return next(new APIError(400, "Error getting current song from databse"));
      }
      res.send(row);
    });

    db.close();
  });
});

//Get an array of all the tracks in the queue
router.get("/all/:guildID", (req, res, next) => {
  let guildID = req.params.guildID;
  let currentID = 0; //TODO julian: get the id of the currently playing song, or ignore it

  let db = new sqlite3.Database(dbPath);
  let sql = `
        SELECT id, songName, url
        FROM queue
        WHERE guildID = ? AND id > ?`;

  db.all(sql, [guildID, currentID], (err, rows) => {
    if (err) {
      return next(new APIError(400, "Error getting songs from databse"));
    }
    if (rows.length == 0) {
      return next(new APIError(204, "Queue is empty"));
    }

    res.send(rows);
  });

  db.close();
});

//Add a new song to the queue
router.post("/add", (req, res, next) => {
  let guildID = req.body.guildID;
  let songName = req.body.songName;
  let url = req.body.url;

  //The value from the callback is used in this part

  getLastTrackID(guildID, (id) => {
    if (id === null || id === undefined) {
      return next(new APIError(400, "TrackID is null/undefined"));
    }
    let db = new sqlite3.Database(dbPath);
    let sql = `
            INSERT OR IGNORE
            INTO queue(guildID, id, songName, url)
            VALUES (?, ?, ?, ?)`;

    db.run(sql, [guildID, id + 1, songName, url], (err) => {
      if (err) {
        return next(new APIError(400, "Error saving track to database"));
      }
      return res.sendStatus(201);
    });

    db.close();
  });
});

//Delete a song from the queue
router.post("/delete", (req, res, next) => {
  let guildID = req.body.guildID;
  let id = req.body.id;
  if (id === null || id === undefined || id < 1) return next(new APIError(400, "TrackID is null/undefined or < 1 "));

  let db = new sqlite3.Database(dbPath);
  let sql = `DELETE FROM queue WHERE guildID = ? AND id = ?`;

  //delete track from queue
  db.run(sql, [guildID, id], (err) => {
    if (err) return next(new APIError(400, "Error deleting track from database 1"));

    let decrementID = `UPDATE queue SET id = id - 1 WHERE guildID = ? AND id > ?`;

    //decrement IDs by 1
    db.run(decrementID, [guildID, id], (err) => {
      if (err) return next(new APIError(400, "Error updating IDs in queue"));
      res.sendStatus(200);
    });
  });
  db.close();
});

//Stores the ID of the last track in the callback
function getLastTrackID(guildID, callback) {
  let db = new sqlite3.Database(dbPath);
  let sql = `
        SELECT MAX(id) AS id
        FROM "queue"
        WHERE guildID = ?`;

  db.get(sql, [guildID], (err, row) => {
    if (err) {
      callback(null);
      console.log(err.message);
    }

    if (row.id === null) {
      return callback(0); //Store value in callback
    } else {
      return callback(row.id); //Store value in callback
    }
  });

  db.close();
}

//Stores the ID of the current track in the callback
function getCurrentTrackID(guildID, callback) {
  let db = new sqlite3.Database(dbPath);
  let sql = `
        SELECT position
        FROM guild
        WHERE guildID = ?`;

  db.get(sql, [guildID], (err, row) => {
    if (err) {
      callback(null);
    }

    //TODO: change later, maybe
    if (!row.position) {
      return callback(1); //Store value in callback
    } else {
      return callback(row.position); //Store value in callback
    }
  });

  db.close();
}

module.exports = router;
