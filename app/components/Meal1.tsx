import React from "react";
import MealCard, { MealData } from "./MealCard";

interface Props { meal?: MealData }

const Meal1: React.FC<Props> = ({ meal }) => {
  return <MealCard title="Meal 1" meal={meal} />;
};

export default Meal1;
