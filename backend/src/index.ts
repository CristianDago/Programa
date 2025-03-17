import "dotenv/config";
import app from "./app";
import { sequelizeStudent, sequelizeUser } from "./config/sequelize";
import { createServer } from "http";
import { configureSocket } from "./socket/socket.config";

const port = process.env.PORT || 3000;

const server = createServer(app);
configureSocket(server);

const main = async () => {
  try {
    await sequelizeUser.authenticate();
    await sequelizeUser.sync();
    console.log("Base de datos userdb conectada:");
  } catch (error) {
    console.error("Error conectando a userdb:", error);
  }

  try {
    await sequelizeStudent.authenticate();
    await sequelizeStudent.sync();
    console.log("Base de datos profiledb conectada:");
  } catch (error) {
    console.error("Error conectando a userdb:", error);
  }

  server.listen(port, () => {
    console.log(`Servidor encendido en puerto ${port}`);
  });
};

main();