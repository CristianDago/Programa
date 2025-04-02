import "dotenv/config";
import express from "express";
import cors from "cors";
import userRoute from "./routes/user.route";
import studentRoute from "./routes/student.route";
import authRoute from "./routes/auth.route";
import { httpErrorHandle } from "./middlewares/httpErrorHandle.middleware";
import rateLimit from "express-rate-limit";
import openapiSpecification from "./config/swagger";
import swaggerUi from "swagger-ui-express";
import morgan from "morgan";

// Traer todos los métodos de express
const app = express();

// Configurar Morgan como middleware
app.use(morgan("dev"));

// Configurar CORS
const corsOptions = {
  origin: process.env.CORS_ORIGIN,
  methods: process.env.CORS_METHODS?.split(","),
  allowedHeaders: process.env.CORS_HEADERS?.split(","),
};
app.use(cors(corsOptions));

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(openapiSpecification));

app.use(express.json());

// Configurar el limitador
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutos
  max: 100, // Límite de 100 peticiones por IP
  message:
    "Demasiadas solicitudes desde esta IP, por favor inténtalo más tarde.",
  standardHeaders: true, // Informa el límite en las cabeceras `RateLimit-*`
  legacyHeaders: false, // Desactiva las cabeceras `X-RateLimit-*`
});

// Aplicar el limitador globalmente
app.use(limiter);

// Rutas
app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
app.use("/api/students", studentRoute);

app.use(httpErrorHandle);

export default app;
