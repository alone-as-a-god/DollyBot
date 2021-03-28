const express = require("express");
const net = require("net");
const sqlite3 = require("sqlite3").verbose();

const router = express.Router();
const dbPath = process.env.DB_PATH || "../database/database.db";


//Gets the song thats currently playing
router.get("/current", (req, res) => {
    //TODO: get from db
})

//Get an array of all the tracks in the queue
router.get("/all", (req, res) => {
    //TODO: get from db
})

//Add a new song to the queue
router.post("/add", (req, res) => {
    //TODO: add to db
})

//Returns the ID of the last track
function getLastTrackID(){

}

module.exports = router;