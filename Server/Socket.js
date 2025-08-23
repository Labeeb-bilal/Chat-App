let io;
const userSocketMap = {};

function initSocket(server) {
  const { Server } = require("socket.io");
  io = new Server(server, {
    cors: {
      origin: "*",
    },
  });

  io.on("connection", (socket) => {
    const userId = socket.handshake.query.userId;
    if (userId) userSocketMap[userId] = socket.id;
     // send
    io.emit("getOnlineUsers", Object.keys(userSocketMap));
    console.log('userSocketMap',userSocketMap)

    socket.on("disconnect", () => {
      delete userSocketMap[userId];
      io.emit("getOnlineUsers", Object.keys(userSocketMap));
    });
  });

  return io;
}

function getIO() {
  if (!io) throw new Error("Socket.io not initialized!");
  return io;
}

module.exports = { initSocket, getIO, userSocketMap };
