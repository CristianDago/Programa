// src/components/statistics/StudentFilters.tsx
import { Student, Source, School, Course } from "../../../interface/student/stundent";
import { SourceFilter } from "./SourceFilter";
import { SchoolFilter } from "./SchoolFilter";
import { CourseFilter } from "./CourseFilter";

interface StudentFiltersProps {
    students: Student[];
    sourceFilter: Source | null;
    schoolFilter: School | null;
    courseFilter: Course | null;
}

export const StudentFilters = ({
    students,
    sourceFilter,
    schoolFilter,
    courseFilter,
}: StudentFiltersProps): Student[] => {
    let filteredStudents = students;

    if (sourceFilter) {
        filteredStudents = SourceFilter({ students: filteredStudents, source: sourceFilter });
    }

    if (schoolFilter) {
        filteredStudents = SchoolFilter({ students: filteredStudents, school: schoolFilter });
    }

    if (courseFilter) {
        filteredStudents = CourseFilter({ students: filteredStudents, course: courseFilter });
    }

    return filteredStudents;
};