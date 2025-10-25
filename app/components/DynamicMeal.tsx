import React from "react";
import MealCard, { MealData } from "./MealCard";

interface DynamicMealProps {
  mealKey: string;
  meal: MealData;
}

const DynamicMeal: React.FC<DynamicMealProps> = ({ mealKey, meal }) => {
  // Extract the meal number or type from the key (e.g., "Meal1" -> "Meal 1", "Snack" -> "Snack")
  const getMealTitle = (key: string): string => {
    if (key.toLowerCase().includes('snack')) {
      return 'Snack';
    } else if (key.toLowerCase().startsWith('meal')) {
      const number = key.replace(/[^0-9]/g, '');
      return `Meal ${number}`;
    } else {
      // For any other custom meal names
      return key.charAt(0).toUpperCase() + key.slice(1);
    }
  };

  const title = getMealTitle(mealKey);

  return <MealCard title={title} meal={meal} />;
};

export default DynamicMeal;