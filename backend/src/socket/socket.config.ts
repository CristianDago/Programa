import "dotenv/config";
import { Server } from "socket.io";
import { setupSocketHandlers } from "./socket.handlers";

export const configureSocket = (server: any) => {
  const io = new Server(server, {
    cors: {
      origin: process.env.CORS_ORIGIN,
      methods: process.env.CORS_METHODS?.split(","),
      credentials: true,
    },
  });

  const chat = io.of("/chat");

  chat.on("connection", (socket) => {
    setupSocketHandlers(socket, chat);
  });

  return io;
};
