import bcryptjs from "bcryptjs";
import { userService } from "./user.service";
import { allowedRoles } from "../interfaces/user.interface";
import { generateAccessToken } from "../utils/auth.util";
import { HttpError } from "../utils/httpError.util";

const authenticateUser = async (email: string, password: string) => {
  const user = await userService.findUserByEmail(email);

  // Verificar que existe el usuario
  if (!user) {
    throw new HttpError("El email no está registrado", 404);
  }

  // Validar que los campos necesarios estén definidos
  const { email: userEmail, id: userId, password: userPassword } = user.get(); // Usar .get() para obtener los valores

  if (!userEmail || !userId) {
    console.error("Datos incompletos del usuario:", user);
    throw new HttpError("Error interno: datos del usuario incompletos", 500);
  }

  // Comparar los hash de contraseña
  const isValidPassword = await bcryptjs.compare(password, userPassword);
  if (!isValidPassword) {
    throw new HttpError("La contraseña es incorrecta", 401);
  }

  // Generar el token sin incluir el campo 'role'
  const token = generateAccessToken(userEmail, userId);
  return token;
};

const createUserAccount = async (
  email: string,
  password: string,
  role: allowedRoles
) => {
  const newUser = await userService.registerUser(email, password, role);

  // Usar .get() para acceder a los valores del modelo
  const user = newUser.get();

  // Generar Token
  const token = generateAccessToken(user.email, user.id);
  return token;
};

export const authService = {
  authenticateUser,
  createUserAccount,
};
