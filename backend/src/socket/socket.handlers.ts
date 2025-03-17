import { Socket } from "socket.io";
import { handleError } from "../utils/error.handler";
import { getUserEmail } from "../utils/getUserEmail";

export const setupSocketHandlers = (socket: Socket, chat: any) => {
  let previousRoom: string | null = null;
  let currentUserId: string = "";

  const userId = socket.handshake.query.userId;
  if (!userId) {
    console.log("❌ Usuario sin ID intentó conectarse.");
    socket.disconnect();
    return;
  }
  currentUserId = userId as string;

  // Guardamos el email en `socket.data` de manera segura
  getUserEmail(currentUserId)
    .then((email) => {
      socket.data.email = email || "No disponible"; // Guardamos el email o "No disponible"
      console.log(
        `✅ Usuario conectado al chat con ID: ${currentUserId}, Email: ${email}`
      );
    })
    .catch((error) => {
      console.error("Error al obtener el email del usuario:", error);
      socket.data.email = "No disponible";
      console.log(
        `✅ Usuario conectado al chat con ID: ${currentUserId}, Email: No disponible`
      );
    });

  socket.on("join", (room) => {
    try {
      if (previousRoom && previousRoom !== room) {
        socket
          .to(previousRoom)
          .emit("userDisconnected", {
            userId: currentUserId,
            email: socket.data.email,
          });
      }

      socket.rooms.forEach((existingRoom) => {
        if (existingRoom !== socket.id) {
          socket.leave(existingRoom);
          console.log(
            `Usuario ${currentUserId} ha dejado la sala ${existingRoom}`
          );
        }
      });

      socket.join(room);
      console.log(`🟢 Usuario ${currentUserId} se unió a la sala ${room}`);
      previousRoom = room;

      socket.to(room).emit("message", {
        userId: "System",
        email: socket.data.email, // Usamos el email guardado
        msg: `✅ Usuario ${
          socket.data.email || currentUserId
        } se ha unido a la sala`,
      });
    } catch (error) {
      handleError(socket, "join", error as Error);
    }
  });

  socket.on("message", ({ userId, msg, room }) => {
    try {
      console.log(
        `Mensaje recibido de ${currentUserId} en la sala ${room}: ${msg}`
      );
      chat.to(room).emit("message", { userId, email: socket.data.email, msg });
    } catch (error) {
      handleError(socket, "message", error as Error);
    }
  });

  socket.on("disconnect", () => {
    try {
      console.log(`❌ Usuario ${currentUserId} desconectado`);

      // Si no hay email en `socket.data`, asignamos el email como "desconocido"
      const userEmail = socket.data.email || "Usuario desconocido";

      if (previousRoom) {
        socket.to(previousRoom).emit("userDisconnected", {
          userId: currentUserId,
          email: userEmail, // Utilizamos el email que está guardado
        });
      }
    } catch (error) {
      handleError(socket, "disconnect", error as Error);
    }
  });
};
