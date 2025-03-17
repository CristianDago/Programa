import { useStudents } from "../../hooks/useStudents";
import { StatisticCard } from "../../components/statistics/layouts/card";
import { calculateStatistics } from "../../components/statistics/statisticsFilters";
import { BarChart } from "../../components/statistics/layouts/barChart";
import { Table } from "../../components/statistics/layouts/table";
import { Source, School, Course } from "../../interface/student/stundent";
import { useState } from "react";
import { Grid } from "../../components/common/grid/grid";
import css from "./statistics.module.scss";

const Statistics = () => {
  const { students, error, loading } = useStudents();
  const [source, setSource] = useState<Source | null>(null);
  const [school, setSchool] = useState<School | null>(null);
  const [course, setCourse] = useState<Course | null>(null);

  if (loading) return <p>Cargando estadísticas...</p>;
  if (error) return <p>Error: {error}</p>;

  if (!students || students.length === 0) {
    return <p>No hay datos disponibles.</p>;
  }

  const filteredStatistics = calculateStatistics({
    students,
    source,
    school,
    course,
  });

  const uniqueFeedbacks = Array.from(
    new Set(
      filteredStatistics.studentsBySchoolCourseFeedback.map(
        (item) => item.feedback
      )
    )
  );

  return (
    <div>
      <h1>Estadísticas</h1>

      <div
        style={{
          display: "flex",
          justifyContent: "space-around",
          flexWrap: "wrap",
        }}
      >
        <StatisticCard
          title="Redes Sociales"
          value={filteredStatistics.socialMediaCount}
        />
        <StatisticCard
          title="Captador"
          value={filteredStatistics.captadorCount}
        />
        <StatisticCard
          title="Aún Sin Respuestas"
          value={filteredStatistics.noResponseCount}
        />
        <StatisticCard
          title="No Se Matriculará"
          value={filteredStatistics.notEnrolledCount}
        />
        <StatisticCard
          title="Matriculados"
          value={filteredStatistics.enrolledCount}
        />
        <StatisticCard
          title="WhatsApp"
          value={filteredStatistics.whatsappCount}
        />
        <StatisticCard title="Teléfono" value={filteredStatistics.phoneCount} />
      </div>

      <Grid className={css.modulos}>
        <BarChart
          data={[
            {
              name: "WhatsApp",
              value: filteredStatistics.whatsappCount,
            },
            { name: "Teléfono", value: filteredStatistics.phoneCount },
          ]}
          title="Preferencia de comunicación"
        />
      </Grid>

      <Grid className={css.modulos}>
        <BarChart
          data={[
            {
              name: "Redes Sociales",
              value: filteredStatistics.socialMediaCount,
            },
            { name: "Captador", value: filteredStatistics.captadorCount },
          ]}
          title="Fuentes de Inscripción"
        />
      </Grid>

      <Grid className={css.modulos}>
        <h1>% Captadores </h1>
        <Table
          data={filteredStatistics.contactsByPerson}
          columns={["Captador", "Contacto"]}
        />
      </Grid>
      <Grid className={css.modulos}>
      <h1>Estudiantes por colegio </h1>
        <Table
          data={filteredStatistics.studentsBySchool.map((item) => ({
            school: item.school,
            students: item.students,
          }))}
          columns={["school", "students"]}
        />
      </Grid>
      <Grid className={css.modulos}>
      <h1>Estudiantes por nivel </h1>
        {Object.entries(filteredStatistics.studentsByCollegeCourse).map(
          ([school, courses]) => (
            <div key={school}>
              <h2>{school}</h2>
              <Table
                data={Object.entries(courses).map(([course, count]) => ({
                  course: course,
                  students: count,
                }))}
                columns={["course", "students"]}
              />
            </div>
          )
        )}
      </Grid>
      <Grid className={css.modulos}>
        <h1>Estado de los estudiantes </h1>
        {uniqueFeedbacks.map((feedback) => (
          <div key={feedback}>
            <h2>{feedback}</h2>
            <Table
              data={filteredStatistics.studentsBySchoolCourseFeedback.filter(
                (item) => item.feedback === feedback
              )}
              columns={["school", "course", "count"]}
            />
          </div>
        ))}
      </Grid>
    </div>
  );
};

export default Statistics;
