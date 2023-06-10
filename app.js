const express = require("express");
const socketIO = require("socket.io");
const cors = require("cors");
const bodyParser = require("body-parser");
const usersGroup = require("./routes/groupRoutes");
const userRoutes = require("./routes/users");
const messageRoutes = require("./routes/messageRoutes");
const app = express();
const path = require("path");

app.use(cors());

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
//app.use(express.static(path.join(__dirname, "public")));

app.use("/", userRoutes);
app.use("/", usersGroup);
app.use("/", messageRoutes);
app.use(express.static(path.join(__dirname, "public")));

const server = app.listen(8000, () => {
  console.log("Server listening on port 8000");
});

const io = socketIO(server, {
  cors: {
    origin: "*",
  },
});

io.on("connection", (socket) => {
  console.log("A client connected");
  // socket.emit('new-user','a')

  socket.on("joinRoom", (data) => {
    const { username, group_id } = data;
    socket.join(group_id);
    console.log(`${username} joined room: ${group_id}`);
    // socket.on('new-user',`${username} joined room: ${roomId}`)
    io.to(group_id).emit("join", `${username} joined room`);
  });

  socket.on("message", (data) => {
    const { username, group_id, message } = data;
    console.log(`Message from ${username} in room ${group_id}: ${message}`);
    io.to(group_id).emit("message", { username, message, group_id });
  });

  socket.on("disconnect", () => {
    console.log("A client disconnected");
  });
});
