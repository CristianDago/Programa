// src/components/statistics/card.tsx
import React from "react";

interface CardProps {
  title: string;
  value: number | string;
}

export const StatisticCard: React.FC<CardProps> = ({ title, value }) => {
  return (
    <div>
      <h3>{title}</h3>
      <p>{value}</p>
    </div>
  );
};
