import React from "react";

interface GridProps extends React.HTMLAttributes<HTMLDivElement> {
  columns?: number; // Número opcional de columnas
}

export const Grid: React.FC<GridProps> = ({ children, columns, className, ...props }) => {
  const dynamicClass = columns ? `grid-columns-${columns}` : '';
  return (
    <div className={`grid ${dynamicClass} ${className || ''}`} {...props}>
      {children}
    </div>
  );
};
