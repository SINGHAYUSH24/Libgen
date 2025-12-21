const { Server } = require("socket.io");
const Chat = require("./model/Chat");

const initSocket = (server) => {
  const io = new Server(server, {
    cors: { origin: "*" },
  });

  io.on("connection", (socket) => {
    console.log("Socket connected:", socket.id);

    socket.on("join", async ({ roomId }) => {
      socket.join(roomId);

      const history = await Chat.find({ roomId }).sort({ createdAt: 1 });
      socket.emit("chatHistory", history);
    });

    socket.on("sendMessage", async ({ roomId, sender, message }) => {
      const chat = await Chat.create({ roomId, sender, message });
      io.to(roomId).emit("receiveMessage", chat);
    });

    socket.on("disconnect", () => {
      console.log("Socket disconnected:", socket.id);
    });
  });
};

module.exports = initSocket;
