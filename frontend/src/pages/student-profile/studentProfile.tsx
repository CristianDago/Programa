import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAuth } from "../../components/auth/authContext";
import { useStudentProfile } from "../../hooks/useProfileStudents";
import StudentForm from "../../components/common/forms/student-profile/studentProfileForm";
import StudentDetails from "./studentProfileDetails";

const StudentProfile = () => {
  const { id } = useParams<{ id: string }>();
  const { token: tokenFromAuth } = useAuth(); // Renombrar para evitar conflictos
  const token = tokenFromAuth === null ? undefined : tokenFromAuth; // Convertir null a undefined
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
  } = useStudentProfile(id, token); // Usa el hook
  const navigate = useNavigate(); 

  useEffect(() => {
    if (isDeleted) {
        navigate("/dashboard"); // Redirige al dashboard
    }
}, [isDeleted, navigate]); // A

  if (error) {
    return <div>{error}</div>;
  }

  if (!student) {
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
