import { sequelizeUser } from "../config/sequelize";
import { User } from "../config/schema"; // Asegúrate de que la ruta sea correcta

export const getUserEmail = async (userId: string): Promise<string | null> => {
  try {
    const user = await User.findOne({
      where: {
        id: userId,
      },
    });

    if (user) {
      return user.email;
    } else {
      return null;
    }
  } catch (error) {
    console.error("Error al obtener el email del usuario:", error);
    return null;
  }
};
