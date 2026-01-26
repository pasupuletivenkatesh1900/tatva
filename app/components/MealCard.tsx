import React from "react";

export interface MealData {
  Time?: string;
  Items?: string[];
  Optional?: boolean;
}

interface MealCardProps {
  title: string;
  meal?: MealData;
}

const MealCard: React.FC<MealCardProps> = ({ title, meal }) => {
  const { Time, Items, Optional } = meal || {};

  return (
    <section className="meal-card">
      <h3 className="meal-title">
        {title}
        {Optional && (
          <span className="meal-optional">(Optional)</span>
        )}
      </h3>
      {Time && <p className="meal-time">{Time}</p>}
      {Items && (
        <ul className="meal-items">
          {Items.map((it, idx) => (
            <li key={idx}>{it}</li>
          ))}
        </ul>
      )}
    </section>
  );
};

export default MealCard;
