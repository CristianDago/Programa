// src/components/StudentTable.tsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import css from "./StudentTable.module.scss";
import { StudentList } from "../../interface/student/StudentList";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleRight, faCircleLeft } from "@fortawesome/free-solid-svg-icons";

interface StudentTableProps {
  students: StudentList[];
  title: string;
  filterBySchoolAndCourse?: (student: StudentList) => boolean;
  viewProfilePath: string;
}

export const StudentTable: React.FC<StudentTableProps> = ({
  students,
  title,
  filterBySchoolAndCourse,
  viewProfilePath,
}) => {
  const navigate = useNavigate();
  const [searchRut, setSearchRut] = useState("");
  const [filterFeedback, setFilterFeedback] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const studentsPerPage = 20;

  const getBackgroundColor = (
    positiveFeedback: StudentList["positiveFeedback"]
  ) => {
    switch (positiveFeedback) {
      case "AÚN SIN RESPUESTAS":
        return "#FFFFFF";
      case "NO SE MATRICULARÁ":
        return "#F08080";
      case "INCONTACTABLE":
        return "#ff9900";
      case "PERSONA INTERESADA QUE ENVIARÁ DOCUMENTACIÓN":
        return "#ADD8E6";
      case "PERSONA QUE ENVIÓ DOCUMENTACIÓN PERO LE FALTA FIRMAR SU MATRÍCULA":
        return "#E0FFFF";
      case "PERSONA QUE IRÁ A MATRICULARSE DIRECTAMENTE A LA ESCUELA":
        return "#90EE90";
      case "PERSONA CON DOCUMENTACIÓN Y MATRÍCULA FIRMADA EN ESCUELA":
        return "#98FB98";
      case "INTERESADA PARA PRÓXIMO AÑO":
        return "#FFA07A";
      case "PERSONA QUE ENVÍA DOCUMENTACIÓN Y SE DEBE TRASLADAR A OTRA PLANILLA":
        return "#DDA0DD";
      default:
        return "#FFFFFF";
    }
  };

  let filteredStudents = students;

  if (filterBySchoolAndCourse) {
    filteredStudents = filteredStudents.filter(filterBySchoolAndCourse);
  }

  filteredStudents = filteredStudents.filter((student) => {
    return (
      (searchRut === "" || student.rut?.includes(searchRut)) &&
      (filterFeedback === "" || student.positiveFeedback === filterFeedback)
    );
  });

  const indexOfLastStudent = currentPage * studentsPerPage;
  const indexOfFirstStudent = indexOfLastStudent - studentsPerPage;
  const currentStudents = filteredStudents.slice(
    indexOfFirstStudent,
    indexOfLastStudent
  );
  const totalPages = Math.ceil(filteredStudents.length / studentsPerPage);

  const handleViewProfile = (id: string) => {
    navigate(`${viewProfilePath}/${id}`);
  };

  return (
    <>
      <h1>{title}</h1>
      <p className={css.counter}>
        Total de estudiantes: {filteredStudents.length}
      </p>

      <div className={css.filters}>
        <input
          type="text"
          placeholder="Buscar por RUT"
          value={searchRut}
          onChange={(e) => setSearchRut(e.target.value)}
        />
        <select
          value={filterFeedback}
          onChange={(e) => setFilterFeedback(e.target.value)}
        >
          <option value="">Todos los estados</option>
          <option value="AÚN SIN RESPUESTAS">AÚN SIN RESPUESTAS</option>
          <option value="NO SE MATRICULARÁ">NO SE MATRICULARÁ</option>
          <option value="INCONTACTABLE">INCONTACTABLE</option>
          <option value="PERSONA INTERESADA QUE ENVIARÁ DOCUMENTACIÓN">
            PERSONA INTERESADA QUE ENVIARÁ DOCUMENTACIÓN
          </option>
          <option value="PERSONA QUE ENVIÓ DOCUMENTACIÓN PERO LE FALTA FIRMAR SU MATRÍCULA">
            PERSONA QUE ENVIÓ DOCUMENTACIÓN PERO LE FALTA FIRMAR SU MATRÍCULA
          </option>
          <option value="PERSONA QUE IRÁ A MATRICULARSE DIRECTAMENTE A LA ESCUELA">
            PERSONA QUE IRÁ A MATRICULARSE DIRECTAMENTE A LA ESCUELA
          </option>
          <option value="PERSONA CON DOCUMENTACIÓN Y MATRÍCULA FIRMADA EN ESCUELA">
            PERSONA CON DOCUMENTACIÓN Y MATRÍCULA FIRMADA EN ESCUELA
          </option>
          <option value="INTERESADA PARA PRÓXIMO AÑO">
            INTERESADA PARA PRÓXIMO AÑO
          </option>
          <option value="PERSONA QUE ENVÍA DOCUMENTACIÓN Y SE DEBE TRASLADAR A OTRA PLANILLA">
            PERSONA QUE ENVÍA DOCUMENTACIÓN Y SE DEBE TRASLADAR A OTRA PLANILLA
          </option>
        </select>
      </div>

      <table className="desktop">
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Apellido</th>
            <th>RUT</th>
            <th>Estado</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {currentStudents.map((student) => (
            <tr key={student.id}>
              <td>{student.name}</td>
              <td>{student.lastname}</td>
              <td>{student.rut}</td>
              <td
                style={{
                  backgroundColor: getBackgroundColor(student.positiveFeedback),
                }}
              >
                {student.positiveFeedback}
              </td>
              <td>
                <button
                  onClick={() => handleViewProfile(student.id)}
                  className={css.viewProfileButton}
                >
                  Ver Perfil
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className={css.pagination}>
        <button
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
        >
          <FontAwesomeIcon icon={faCircleLeft} className={css.icons} />
        </button>
        <span>
          Página {currentPage} de {totalPages}
        </span>
        <button
          onClick={() =>
            setCurrentPage((prev) => Math.min(prev + 1, totalPages))
          }
          disabled={currentPage === totalPages}
        >
          <FontAwesomeIcon icon={faCircleRight} className={css.icons} />
        </button>
      </div>
    </>
  );
};
