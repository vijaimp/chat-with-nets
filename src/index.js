const express = require("express");
const app = express();
const cors = require("cors");
const http = require("http").Server(app);
const PORT = 4000;
const socketIO = require("socket.io")(http, {
  cors: {
    origin: "http://localhost:3000",
  },
});

app.use(cors());
let users = [];

socketIO.on("connection", (socket) => {
  console.log(`${socket.id} user just connected!`);

  socket.on("login", (data) => {
    users.push(data);
    let message = "";
    if (data.location.latitude && data.location.latitude) {
      message = `from latitude : ${data.location.latitude} longitude : ${data.location.longitude}`;
    }
    socketIO.emit("message", {
      ...data,
      message: `${data.userName} has connected ${message}`,
    });
  });

  socket.on("message", (data) => {
    socketIO.emit("messageResponse", {
      ...data,
      text: `${data.text.split(":")[1]}`,
    });
  });

  socket.on("typing", (data) => socket.broadcast.emit("typingResponse", data));

  socket.on("disconnect", () => {
    console.log("A user disconnected");
    users = users.filter((user) => user.socketID !== socket.id);
    socketIO.emit("newUserResponse", users);
    socket.disconnect();
  });
});

app.get("/health-check", (req, res) => {
  res.status(200).json({ message: "i am healthy" });
});

http.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
