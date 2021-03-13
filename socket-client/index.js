import io from "socket.io-client";

let socket = io.connect("http://localhost:4000/");

socket.emit("message", "message");

socket.on("message", (message) => {
  console.log(message);
});
