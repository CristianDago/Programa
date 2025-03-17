// src/components/statistics/StatisticsFilters.tsx
import {
  Student,
  School,
  Course,
  Source,
} from "../../interface/student/stundent";
import { SourceFilter } from "./filters/SourceFilter";
import { SchoolFilter } from "./filters/SchoolFilter";
import { CourseFilter } from "./filters/CourseFilter";

interface StatisticsFiltersProps {
  students: Student[];
  source: Source | null;
  school: School | null;
  course: Course | null;
}

interface FilteredStatistics {
  socialMediaCount: number;
  captadorCount: number;
  noResponseCount: number;
  notEnrolledCount: number;
  enrolledCount: number;
  whatsappCount: number;
  phoneCount: number;
  contactsByPerson: { Captador: string; Contacto: number }[];
  studentsBySchool: { school: string; students: number }[];
  studentsByCollegeCourse: { [school: string]: { [course: string]: number } };
}

interface FilteredStatistics {
  // ... (resto de las propiedades)
  studentsBySchoolCourseFeedback: {
    school: string;
    course: string;
    feedback: string;
    count: number;
  }[];
}

// Objetos de mapeo para School y Course
const schoolMap: Record<School, string> = {
  [School.Quinta]: "QUINTA NORMAL",
  [School.Buin]: "BUÍN",
  [School.Granja]: "LA GRANJA",
  [School.Nunoa]: "ÑUÑOA",
  [School.Pudahuel]: "PUDAHUEL",
  [School.Miguel]: "SAN MIGUEL",
};

const courseMap: Record<Course, string> = {
  [Course.NB1]: "1° NIVEL BÁSICO",
  [Course.NB2]: "2° NIVEL BÁSICO",
  [Course.NB3]: "3° NIVEL BÁSICO",
  [Course.NM1]: "1° NIVEL MEDIO",
  [Course.NM2]: "2° NIVEL MEDIO",
};

// Funciones para obtener las etiquetas de School y Course

const getSchoolLabel = (school: School | undefined | null): string => {
  if (school === undefined || school === null) {
    return "No asignado";
  }
  return schoolMap[school];
};

// Función para obtener la etiqueta de Course

const getCourseLabel = (course: Course | undefined | null): string => {
  if (course === undefined || course === null) {
    return "No asignado";
  }
  return courseMap[course];
};

// Función para calcular las estadísticas
export const calculateStatistics = ({
  students,
  source,
  school,
  course,
}: StatisticsFiltersProps): FilteredStatistics => {
  let filteredStudents = students;

  if (source) {
    filteredStudents = SourceFilter({
      students: filteredStudents,
      source: source,
    });
  }

  if (school) {
    filteredStudents = SchoolFilter({
      students: filteredStudents,
      school: school,
    });
  }

  if (course) {
    filteredStudents = CourseFilter({
      students: filteredStudents,
      course: course,
    });
  }

  let socialMediaCount: number = 0;
  let captadorCount: number = 0;
  let noResponseCount: number = 0;
  let notEnrolledCount: number = 0;
  let enrolledCount: number = 0;
  let whatsappCount: number = 0;
  let phoneCount: number = 0;

  for (const student of filteredStudents) {
    if (student.source === "REDES SOCIALES") {
      socialMediaCount++;
    }
    if (student.source === "CAPTADOR") {
      captadorCount++;
    }
    if (student.positiveFeedback === "AÚN SIN RESPUESTAS") {
      noResponseCount++;
    }
    if (student.positiveFeedback === "NO SE MATRICULARÁ") {
      notEnrolledCount++;
    }
    if (
      student.positiveFeedback ===
      "PERSONA CON DOCUMENTACIÓN Y MATRÍCULA FIRMADA EN ESCUELA"
    ) {
      enrolledCount++;
    }
    if (student.communicationPreference === "WHATSAPP") {
      whatsappCount++;
    }
    if (student.communicationPreference === "TELÉFONO") {
      phoneCount++;
    }
  }

  // Contactos por persona

  const contactsByPerson = [
    {
      Captador: "Lorena",
      Contacto: filteredStudents.filter((s) => s.contact === "LORENA").length,
    },
    {
      Captador: "Arlette",
      Contacto: filteredStudents.filter((s) => s.contact === "ARLETTE").length,
    },
    // ... (puedes agregar más personas)
  ];

  // Estudiantes por escuela

  const studentsBySchool = Object.keys(School).map((schoolKey) => {
    const schoolEnumValue = School[schoolKey as keyof typeof School];
    const schoolName = schoolMap[schoolEnumValue];
    const count = filteredStudents.filter(
      (s) => s.school === schoolEnumValue
    ).length;
    return { school: schoolName, students: count };
  });

  // Estudiantes por curso en cada escuela

  const studentsByCollegeCourse: {
    [school: string]: { [course: string]: number };
  } = {};
  Object.keys(School).forEach((escuelaKey) => {
    const schoolName = getSchoolLabel(
      School[escuelaKey as keyof typeof School]
    );
    studentsByCollegeCourse[schoolName] = {};

    Object.keys(Course).forEach((cursoKey) => {
      const courseName = getCourseLabel(
        Course[cursoKey as keyof typeof Course]
      );
      const count = filteredStudents.filter(
        (s) =>
          s.school === School[escuelaKey as keyof typeof School] &&
          s.course === Course[cursoKey as keyof typeof Course]
      ).length;
      studentsByCollegeCourse[schoolName][courseName] = count;
    });
  });

  // Estudiantes por escuela, curso y feedback

  const studentsBySchoolCourseFeedback: {
    school: string;
    course: string;
    feedback: string;
    count: number;
  }[] = [];
  const allFeedbacks = Array.from(
    new Set(students.map((s) => s.positiveFeedback))
  ); // Obtener todos los feedbacks posibles

  Object.values(School).forEach((schoolValue) => {
    Object.values(Course).forEach((courseValue) => {
      allFeedbacks.forEach((feedback) => {
        const count = filteredStudents.filter(
          (s) =>
            s.school === schoolValue &&
            s.course === courseValue &&
            s.positiveFeedback === feedback
        ).length;

        studentsBySchoolCourseFeedback.push({
          school: schoolMap[schoolValue],
          course: courseMap[courseValue],
          feedback: feedback,
          count: count,
        });
      });
    });
  });

  return {
    socialMediaCount,
    captadorCount,
    noResponseCount,
    notEnrolledCount,
    enrolledCount,
    whatsappCount,
    phoneCount,
    contactsByPerson,
    studentsBySchool,
    studentsByCollegeCourse,
    studentsBySchoolCourseFeedback,
  };
};

export const StatisticsFilters = () => {
  return null;
};
