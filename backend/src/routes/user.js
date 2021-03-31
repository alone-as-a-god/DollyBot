const express = require("express");
const APIError = require("../error/APIError");
const router = express.Router();

router.get("/", (req, res, next) => {
  //return user information if session exists
  if (!req.session.userId) return next(new APIError(400, "User-Session not found"));
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
  res.sendStatus(200);
});
module.exports = router;
