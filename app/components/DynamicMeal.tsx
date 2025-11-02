import React from "react";
import MealCard, { MealData } from "./MealCard";

interface DynamicMealProps {
  mealKey: string;
  meal: MealData;
}

const DynamicMeal: React.FC<DynamicMealProps> = ({ mealKey, meal }) => {
  const title = mealKey;

  return <MealCard title={title} meal={meal} />;
};

export default DynamicMeal;