import React from "react";
import MealCard, { MealData } from "./MealCard";

interface Props { meal?: MealData }

const Snack: React.FC<Props> = ({ meal }) => {
  return <MealCard title="Snack" meal={meal} />;
};

export default Snack;
