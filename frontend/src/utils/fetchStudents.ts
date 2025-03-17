import { Student } from "../interface/student/stundent";

// Add student
export const addStudent = async (token: string, studentData: Student) => {
  const response = await fetch(
    `${import.meta.env.VITE_API_BASE_URL}/api/students`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(studentData),
    }
  );

  if (!response.ok) {
    throw new Error("Error al agregar el estudiante");
  }

  return response.json();
};

// Fetch students list

const fetchStudentsList = async (token: string) => {
  const response = await fetch(
    `${import.meta.env.VITE_API_BASE_URL}/api/students`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );

  if (!response.ok) {
    throw new Error("Error al obtener los estudiantes");
  }

  return await response.json();
};

export default fetchStudentsList;
