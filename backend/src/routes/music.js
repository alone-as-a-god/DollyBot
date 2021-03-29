const express = require("express");
const net = require("net");
const sqlite3 = require("sqlite3").verbose();

const router = express.Router();
const dbPath = process.env.DB_PATH || "../database/database.db";




//Gets the song thats currently playing
router.get("/current", (req, res) => {
    //TODO: get from db
});

//Get an array of all the tracks in the queue
router.get("/all", (req, res) => {
    //TODO: get from db
});

//Add a new song to the queue
router.post("/add", (req, res) => {
    let guildID = req.body.guildID;
    let songName = req.body.songName;

    //The value from the callback is used in this part
    getLastTrackID(guildID, (id) => {
        if(!id){
            //TODO: send better error message
            res.sendStatus(400);
            return;
        }

        let db = new sqlite3.Database(dbPath);
        let sql = `
            INSERT OR IGNORE
            INTO queue(guildID, id, songName)
            VALUES (?, ?, ?)`;
    
        db.run(sql, [guildID, id + 1, songName], (err) => {
            if (err) {
                //TODO: send better error message
                res.sendStatus(400)
                return console.error(err.message);
            } 
    
            res.sendStatus(200)
        });
    
        db.close();
    });
});

//Delete a song from the queue
router.post("/delete", (req, res) => {
    let guildID = req.body.guildID;
    let id = req.body.id;

    let db = new sqlite3.Database(dbPath);
    let sql = `
        DELETE FROM queue
        WHERE guildID = ? AND id = ?`;

    db.run(sql, [guildID, id], (err) => {
        if (err) {
            //TODO: send better error message
            res.sendStatus(400)
            return console.error(err.message);
        }

        res.sendStatus(200);
    });

    db.close();
});


//Stores the ID of the last track in the callback
function getLastTrackID(guildID, callback){
    let id = null;

    let db = new sqlite3.Database(dbPath);
    let sql =`
        SELECT MAX(id) AS id
        FROM "queue"
        WHERE guildID = ?`;
    
    db.get(sql, [guildID], (err, row) => {
        if (err) {
            callback(null)
            return console.log(err.message)
        }

        return callback(row.id) //Store value in callback
    });

    db.close();
}

module.exports = router;