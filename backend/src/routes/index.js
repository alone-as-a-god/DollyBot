const express = require("express")
const router = express.Router()

const prefix = require("./preifx")
const music = require("./music")

router.use("/prefix", prefix)
router.use("/music", music)

module.exports = router