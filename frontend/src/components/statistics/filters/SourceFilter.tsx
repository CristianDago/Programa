// src/components/statistics/SourceFilter.tsx
import { Student, Source } from "../../../interface/student/stundent";

interface SourceFilterProps {
    students: Student[];
    source: Source;
}

export const SourceFilter = ({ students, source }: SourceFilterProps): Student[] => {
    return students.filter((student) => student.source === source);
};