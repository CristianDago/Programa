// src/hooks/useAddStudent.ts
import { useState, ChangeEvent, FormEvent } from "react";
import { addStudent } from "../utils/fetchStudents";
import { Student } from "../interface/student/stundent";
import moment from "moment";

export function useAddStudent(token: string) {
  const [studentData, setStudentData] = useState<Student>({
    name: "",
    lastname: "",
    rut: "",
    sex: undefined,
    birthdate: undefined,
    nationality: "",
    address: "",
    phone: "",
    email: "",
    source: undefined,
    contact: "",
    contactDate: undefined,
    call1: "",
    call2: "",
    call3: "",
    comments1: "",
    comments2: "",
    comments3: "",
    positiveFeedback: "AÚN SIN RESPUESTAS",
    studentImage: "",
    birthCertificate: "",
    studyCertificate: "",
    linkDni: "",
    school: undefined,
    course: undefined,
    communicationPreference: undefined,
    createdAt: undefined,
  });

  const [successMessage, setSuccessMessage] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string>("");

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    if (name === "birthdate" && value) {
      setStudentData({ ...studentData, [name]: moment(value).toDate() });
    } else if (name === "contactDate" && value) {
      setStudentData({ ...studentData, [name]: moment(value).toDate() });
    } else {
      setStudentData({ ...studentData, [name]: value });
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!token) {
      setErrorMessage("No estás autenticado.");
      return;
    }

    try {
      await addStudent(token, studentData); // Utiliza studentData
      setSuccessMessage("Estudiante agregado con éxito");
      setErrorMessage("");
    } catch (error) {
      setErrorMessage("No se pudo agregar el estudiante");
      setSuccessMessage("");
    }
  };

  return {
    successMessage,
    errorMessage,
    handleSubmit,
    studentData,
    handleChange,
  };
}
