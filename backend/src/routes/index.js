const express = require("express");
const router = express.Router();
const auth = require("./auth");
const user = require("./user");
const guilds = require("./guilds");
router.use("/auth", auth);
router.use("/user", user);
router.use("/guilds", guilds);

module.exports = router;
