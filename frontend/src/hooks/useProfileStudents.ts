// src/hooks/useStudentProfile.ts
import { useState, useEffect } from "react";
import {
  fetchStudent,
  updateStudent,
  deleteStudent,
} from "../utils/studentsProfile";
import { Student } from "../interface/student/stundent";

export const useStudentProfile = (
  id: string | undefined,
  token: string | undefined
) => {
  const [student, setStudent] = useState<Student | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [updatedData, setUpdatedData] = useState<Student | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [isDeleted, setIsDeleted] = useState(false); // Nuevo estado

  useEffect(() => {
    const fetchData = async () => {
      if (!id) {
        setError("ID del estudiante no proporcionado");
        return;
      }

      if (!token) {
        setError("Token no proporcionado");
        return;
      }

      try {
        const data = await fetchStudent(id, token);
        setStudent(data);
        setUpdatedData(data);
      } catch (err: any) {
        setError(err.message || "Error desconocido");
      } finally {
        setIsEditing(false);
      }
    };

    if (id && token) {
      fetchData();
    }
  }, [id, token]);

  const handleEdit = () => setIsEditing(true);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    if (!updatedData) return;
    const { name, value } = e.target;
    setUpdatedData({ ...updatedData, [name]: value });
  };

  const handleSubmitEdit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!updatedData || !id || !token) return;

    try {
      const data = await updateStudent(id, token, updatedData);
      setSuccessMessage("Estudiante actualizado con éxito.");
      setStudent(data);
      setIsEditing(false);
    } catch (error: any) {
      setError(error.message || "Error inesperado");
    }
  };

  const handleDelete = async () => {
    if (!id) {
      setError("ID del estudiante no proporcionado");
      return;
    }

    if (!token) {
      setError("Token no proporcionado");
      return;
    }

    if (
      !window.confirm("¿Estás seguro de que deseas eliminar a este estudiante?")
    )
      return;

    try {
      await deleteStudent(id, token);
      setSuccessMessage("Estudiante eliminado con éxito.");
      setStudent(null);
      setIsDeleted(true);
    } catch (error: any) {
      setError(error.message || "Error inesperado");
    }
  };

  return {
    student,
    error,
    isEditing,
    updatedData,
    successMessage,
    handleEdit,
    handleChange,
    handleSubmitEdit,
    handleDelete,
    isDeleted,
  };
};
