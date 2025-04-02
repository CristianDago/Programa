import { NextFunction, Request, Response } from "express";
import { studentService } from "../services/student.service";

// Función auxiliar para transformar todas las cadenas de un objeto a mayúsculas
function transformStringsToUppercase(obj: any): any {
  if (typeof obj !== "object" || obj === null) {
    return obj;
  }

  const transformedObj: any = {};
  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      if (typeof obj[key] === "string") {
        transformedObj[key] = obj[key].toUpperCase();
      } else {
        transformedObj[key] = transformStringsToUppercase(obj[key]); // Recursión para objetos anidados
      }
    }
  }
  return transformedObj;
}

// Crear estudiante
const createStudentHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    let studentData = req.body;
    studentData = transformStringsToUppercase(studentData); // Convertir a mayúsculas
    const newStudent = await studentService.createStudent(studentData);
    res.json(newStudent);
  } catch (error) {
    next(error);
  }
};

// Obtener estudiante por ID
const getStudentByIdHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const student = await studentService.getStudentById(id);
    res.json(student);
  } catch (error) {
    next(error);
  }
};

// Actualizar estudiante
const updateStudentHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    let studentData = req.body;
    studentData = transformStringsToUppercase(studentData); // Convertir a mayúsculas
    const updatedStudent = await studentService.updateStudentById(id, {
      ...studentData,
    });
    res.json(updatedStudent);
  } catch (error) {
    next(error);
  }
};

// Eliminar estudiante
const deleteStudentHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const deletedStudent = await studentService.deleteStudentById(id);
    res.json(deletedStudent);
  } catch (error) {
    next(error);
  }
};

// Obtener todos los estudiantes
const getAllStudentsHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const students = await studentService.getAllStudents();
    res.json(students);
  } catch (error) {
    next(error);
  }
};

export const studentController = {
  createStudentHandler,
  getStudentByIdHandler,
  updateStudentHandler,
  deleteStudentHandler,
  getAllStudentsHandler,
};
