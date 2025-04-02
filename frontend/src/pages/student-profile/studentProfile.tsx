// src/pages/studentProfile/StudentProfile.tsx
import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAuth } from "../../components/auth/authContext";
import { useStudentProfile } from "../../hooks/useProfileStudents";
import StudentForm from "../../components/common/forms/student-profile/studentProfileForm";
import StudentDetails from "./studentProfileDetails";

const StudentProfile = () => {
  const { id } = useParams<{ id: string }>();
  const { token: tokenFromAuth } = useAuth();
  const token = tokenFromAuth === null ? undefined : tokenFromAuth;
  const {
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
  } = useStudentProfile(id, token);
  const navigate = useNavigate();

  console.log("StudentProfile renderizado", { id, isEditing, isDeleted }); // Añadido console.log()

  useEffect(() => {
    console.log("useEffect: isDeleted cambiado", isDeleted); // Añadido console.log()
    if (isDeleted) {
      navigate("/dashboard");
    }
  }, [isDeleted, navigate]);

  if (error) {
    console.log("Error en StudentProfile", error); // Añadido console.log()
    return <div>{error}</div>;
  }

  if (!student) {
    console.log("Cargando StudentProfile"); // Añadido console.log()
    return <div>Cargando...</div>;
  }

  return (
    <div>
      {isEditing ? (
        <StudentForm
          student={updatedData!}
          onChange={handleChange}
          onSubmit={handleSubmitEdit}
        />
      ) : (
        <StudentDetails
          student={student}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      )}
      {successMessage && <div>{successMessage}</div>}
    </div>
  );
};

export default StudentProfile;