// src/components/statistics/CourseFilter.tsx
import { Student, Course } from "../../../interface/student/stundent";

interface CourseFilterProps {
  students: Student[];
  course: Course;
}

export const CourseFilter = ({
  students,
  course,
}: CourseFilterProps): Student[] => {
  return students.filter((student) => student.course === course);
};
