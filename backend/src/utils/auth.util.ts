import jwt from "jsonwebtoken";

// Usa el valor de JWT_SECRET del entorno, o un valor predeterminado
const secret = process.env.JWT_SECRET;

if (!secret) {
  throw new Error("JWT_SECRET must be provided");
}

export const generateAccessToken = (email: string, uid: string) => {
  return jwt.sign({ email, uid }, secret, {
    expiresIn: "24h", // Asegúrate de que expiresIn sea una cadena como "1h" o un número
  });
};

export const verifyAccessToken = (token: string) => {
  return jwt.verify(token, secret) as jwt.JwtPayload; // Usa `secret` en lugar de "secret"
};
