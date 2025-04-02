import { Student } from "../config/schema";
import { HttpError } from "../utils/httpError.util";
import { CreationAttributes } from "sequelize";

// Crear un nuevo estudiante
const createStudent = async (
  studentData: Partial<CreationAttributes<Student>>
): Promise<Omit<Student, "id">> => {
  const { phone, name, lastname } = studentData;

  // Validar campos obligatorios
  const validateField = (field: any, fieldName: string): void => {
    if (!field) {
      throw new HttpError(`${fieldName} es obligatorio`, 400);
    }
  };

  validateField(name, "El nombre");
  validateField(lastname, "El apellido");
  validateField(phone, "El número de teléfono");

  // Verificar si el estudiante ya existe por número de teléfono
  const existingStudent = await Student.findOne({ where: { phone } });
  if (existingStudent) {
    throw new HttpError("El número de teléfono ya está registrado", 409);
  }

  // Crear el estudiante en la base de datos
  const newStudent = await Student.create(studentData);

  // Eliminar el campo 'id' antes de devolver
  const { id, ...studentWithoutId } = newStudent.toJSON();

  return studentWithoutId;
};

// Obtener estudiante por ID
const getStudentById = async (id: string): Promise<Omit<Student, "id">> => {
  const student = await Student.findByPk(id);
  if (!student) throw new HttpError("El ID de estudiante no es válido", 404);

  // Eliminar el campo 'id' antes de devolver
  const { id: studentId, ...studentWithoutId } = student.toJSON();

  return studentWithoutId;
};

// Obtener estudiante por email
const getStudentByEmail = async (email: string): Promise<Student> => {
  const student = await Student.findOne({ where: { email } });
  if (!student) throw new HttpError("El email no se encuentra registrado", 404);
  return student;
};

// Eliminar estudiante por ID
const deleteStudentById = async (id: string): Promise<Student> => {
  const student = await Student.findByPk(id);
  if (!student) {
    throw new HttpError("No se encontró el estudiante para eliminar", 404);
  }

  await student.destroy();
  return student;
};

// Actualizar estudiante por ID
const updateStudentById = async (
  id: string,
  studentData: Partial<Student>
): Promise<Omit<Student, "id">> => {
  // Verificar si se está intentando modificar el phone
  if (studentData.phone) {
    const existingStudent = await Student.findOne({
      where: { phone: studentData.phone },
    });
    if (existingStudent && existingStudent.id !== id) {
      throw new HttpError(
        "El número de teléfono ya está registrado por otro estudiante",
        400
      );
    }
  }

  const student = await Student.findByPk(id);
  if (!student) {
    throw new HttpError(
      "No se pudo actualizar el estudiante: ID inválido",
      400
    );
  }

  await student.update(studentData);

  const { id: studentId, ...studentWithoutId } = student.toJSON();

  return studentWithoutId;
};

// Obtener todos los estudiantes // Cambio AllStudents
const getAllStudents = async (): Promise<Student[]> => {
  const students = await Student.findAll();
  if (!students.length) {
    throw new HttpError("No se encontraron estudiantes registrados", 404);
  }

  return students.map((student) => student.toJSON());
};

export const studentService = {
  createStudent,
  getStudentById,
  getStudentByEmail,
  deleteStudentById,
  updateStudentById,
  getAllStudents,
};
