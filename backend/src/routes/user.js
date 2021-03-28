const express = require("express");
const router = express.Router();
router.get("/", (req, res) => {
  //return user information if session exists
  if (!req.session.userId) return res.sendStatus(404);
  res.send({
    username: req.session.username,
    id: req.session.userId,
    avatar: req.session.userAvatar,
  });
});

router.delete("/", (req, res) => {
  //delete session
  req.session.destroy();
  res.clearCookie("connect.sid", { path: "/" });
});
module.exports = router;
