import { Router } from "express";
import { userController } from "../controllers/user.controller";
import { verifyToken } from "../middlewares/jwt.middlewares";

// Path: http://localhost:3000/api/v1/users

const router = Router();

router.use(verifyToken);

// Leer todos los usurios
router.get("/", userController.getAllUsersHandler);

// Crear un usuario
router.post("/", userController.createUserHandler);

// Crear un usuario
router.get("/:id", userController.getUserByIdHandler);

// Crear un usuario
router.put("/:id", userController.updateUserHandler);

// Crear un usuario
router.delete("/:id", userController.deleteUserHandler);

export default router;
