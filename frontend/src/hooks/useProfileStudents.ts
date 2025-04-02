import { useState, useEffect } from "react";
import {
  fetchStudent,
  updateStudent,
  deleteStudent,
} from "../utils/studentsProfile";
import { Student } from "../interface/student/stundent";
import { toast } from "react-toastify";

export const useStudentProfile = (
  id: string | undefined,
  token: string | undefined
) => {
  const [student, setStudent] = useState<Student | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [updatedData, setUpdatedData] = useState<Student | null>(null);
  const [isDeleted, setIsDeleted] = useState(false);

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
      setStudent(data);
      setIsEditing(false);
      toast.success("Estudiante actualizado con éxito.", {
        position: "top-right",
      });
    } catch (error: any) {
      toast.error(error.message || "Error inesperado", {
        position: "top-right",
      });
    }
  };

  const handleDelete = async () => {
    if (!id) {
      toast.error("ID del estudiante no proporcionado", {
        position: "top-right",
      });
      return;
    }

    if (!token) {
      toast.error("Token no proporcionado", { position: "top-right" });
      return;
    }

    if (
      !window.confirm("¿Estás seguro de que deseas eliminar a este estudiante?")
    ) {
      return;
    }

    try {
      await deleteStudent(id, token);
      setStudent(null);
      setIsDeleted(true);
      toast.success("Estudiante eliminado con éxito.", {
        position: "top-right",
      });
    } catch (error: any) {
      toast.error(error.message || "Error inesperado", {
        position: "top-right",
      });
    }
  };

  return {
    student,
    error,
    isEditing,
    updatedData,
    handleEdit,
    handleChange,
    handleSubmitEdit,
    handleDelete,
    isDeleted,
  };
};
