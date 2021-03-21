const app = require("express");
const http = require("http").createServer();
const io = require("socket.io")(http, {
  cors: { origin: "*" },
});

io.on("connection", (socket) => {
  console.log(`user connected: ${socket.socketID}`);

  socket.on("message", (message) => {
    console.log(`new message: ${message}`);
  });
  socket.emit("message", "hello new user");
});

http.listen(4000, function () {
  console.log("listening on port 4000");
});

function getSocket() {
  return io;
}

module.exports = getSocket;
