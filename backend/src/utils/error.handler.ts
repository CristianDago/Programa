import { Socket } from "socket.io";

export const handleError = (socket: Socket, event: string, error: Error) => {
  console.error(`Error in event ${event}: ${error.message}`);
  socket.emit("error", {
    event,
    message: "An error occurred",
  });
};
