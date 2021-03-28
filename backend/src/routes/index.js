const express = require("express");
const router = express.Router();

const auth = require("./auth");
const user = require("./user");
const guilds = require("./guilds");
const prefix = require("./preifx");
const music = require("./music");

router.use("/auth", auth);
router.use("/user", user);
router.use("/guilds", guilds);
router.use("/prefix", prefix);
router.use("/music", music);

module.exports = router;