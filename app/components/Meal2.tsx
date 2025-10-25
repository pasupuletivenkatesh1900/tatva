import React from "react";
import MealCard, { MealData } from "./MealCard";

interface Props { meal?: MealData }

const Meal2: React.FC<Props> = ({ meal }) => {
  return <MealCard title="Meal 2" meal={meal} />;
};

export default Meal2;
