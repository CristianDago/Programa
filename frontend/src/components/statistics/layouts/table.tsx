// src/components/statistics/table.tsx
import React from "react";

interface TableProps {
  data: Record<string, any>[];
  columns: string[];
}

export const Table: React.FC<TableProps> = ({ data, columns }) => {
  return (
    <div>
      <table>
        <thead>
          <tr>
            {columns.map((column) => (
              <th key={column}>{column}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, index) => (
            <tr key={index}>
              {columns.map((column) => (
                <td key={column}>{row[column]}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
