// src/pages/addStudent/AddStudent.tsx
import React from "react";
import { AddStudentForm } from "../../components/common/forms/add-student/addStudentForm";
import { useAuth } from "../../components/auth/authContext";
import { useAddStudent } from "../../hooks/useAddStudents";

export default function AddStudent() {
    const { token } = useAuth();
    const { successMessage, errorMessage, handleSubmit, studentData, handleChange } = useAddStudent(token || "");

    const handleAddStudent = async (e: React.FormEvent<HTMLFormElement>) => {
        await handleSubmit(e);
        if (successMessage) {
            window.alert("Estudiante agregado con éxito");
        } else if (errorMessage) {
            window.alert(`Error al agregar estudiante: ${errorMessage}`);
        }
    };

    if (!token) {
        return (
            <div>
                <h1>Agregar Estudiante</h1>
                <p style={{ color: "red" }}>No estás autenticado. Inicia sesión para agregar estudiantes.</p>
            </div>
        );
    }

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