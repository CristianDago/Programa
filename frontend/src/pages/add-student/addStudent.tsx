import React, { useEffect } from "react";
import { AddStudentForm } from "../../components/common/forms/add-student/addStudentForm";
import { useAuth } from "../../components/auth/authContext";
import { useAddStudent } from "../../hooks/useAddStudents";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; // Importa estilos de toastify

export default function AddStudent() {
  const { token } = useAuth();
  const {
    successMessage,
    errorMessage,
    handleSubmit,
    studentData,
    handleChange,
  } = useAddStudent(token || "");

  const handleAddStudent = async (e: React.FormEvent<HTMLFormElement>) => {
    console.log("handleAddStudent llamado");
    await handleSubmit(e);
    console.log("handleSubmit completado");
  };

  useEffect(() => {
    if (successMessage) {
      toast.success(successMessage, { position: "top-right" });
      console.log("Mensaje de éxito mostrado");
    }
    if (errorMessage) {
      toast.error(errorMessage, { position: "top-right" });
      console.log("Mensaje de error mostrado");
    }
  }, [successMessage, errorMessage]); // Se ejecuta cuando cambian los mensajes

  if (!token) {
    return (
      <div>
        <h1>Agregar Estudiante</h1>
        <p style={{ color: "red" }}>
          No estás autenticado. Inicia sesión para agregar estudiantes.
        </p>
      </div>
    );
  }

  console.log("AddStudent renderizado");

  return (
    <div>
      <h1>Agregar Estudiante</h1>
      <AddStudentForm
        studentData={studentData}
        handleChange={handleChange}
        handleSubmit={handleAddStudent}
      />
    </div>
  );
}
