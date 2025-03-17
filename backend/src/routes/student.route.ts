import { Router } from "express";
import { studentController } from "../controllers/student.controller";
import { verifyToken } from "../middlewares/jwt.middlewares";

const router = Router();

router.use(verifyToken);

router.get("/", studentController.getAllStudentsHandler);

router.post("/", studentController.createStudentHandler);

// Crear un usuario
router.get("/:id", studentController.getStudentByIdHandler);

// Crear un usuario
router.put("/:id", studentController.updateStudentHandler);

// Crear un usuario
router.delete("/:id", studentController.deleteStudentHandler);

export default router;
