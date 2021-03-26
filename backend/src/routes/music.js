const express = require("express")

const router = express.Router()


//Get an array of all the tracks in the queue
router.get("/", function(req, res){
    //TODO: get from db
})

//Add a new song to the queue
router.post("/add", function(req, res){
    //TODO: add to db
})


module.exports = router