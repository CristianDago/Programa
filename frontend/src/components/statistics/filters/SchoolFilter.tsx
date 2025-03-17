// src/components/statistics/SchoolFilter.tsx
import { Student, School } from "../../../interface/student/stundent";

interface SchoolFilterProps {
    students: Student[];
    school: School;
}

export const SchoolFilter = ({ students, school }: SchoolFilterProps): Student[] => {
    return students.filter((student) => student.school === school);
};