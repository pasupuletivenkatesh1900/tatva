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
  if (!meal) return null;
  const { Time, Items, Optional } = meal;

  return (
    <section className="meal-card">
      <h3 className="meal-title">
        {title}
        {Optional ? (
          <span style={{
            marginLeft: 8,
            fontSize: "0.85rem",
            color: "#6b8a75",
            fontWeight: 600,
          }}>(Optional)</span>
        ) : null}
      </h3>
      {Time ? <p className="meal-time">{Time}</p> : null}
      {Array.isArray(Items) && Items.length > 0 ? (
        <ul className="meal-items">
          {Items.map((it, idx) => (
            <li key={idx}>{it}</li>
          ))}
        </ul>
      ) : null}
    </section>
  );
};

export default MealCard;
