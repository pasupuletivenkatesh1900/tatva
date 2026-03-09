import React from "react";

import response from "../client/feb2026/mukkateswaro.json";
import OverviewCard from "./components/OverviewCard";
import DynamicMeal from "./components/DynamicMeal";
import PlanActions from "./components/PlanActions";

const overview = response.Overview;

export default function Page() {
  const daily = response.Daily_Meal_Plan || {};

  // Convert the meal plan structure to match our component expectations
  const convertedDaily: { [key: string]: { Time?: string; Items?: string[] } } = {};
  
  Object.entries(daily).forEach(([key, items]) => {
    let mealKey = key;
    let time = "";
    
    if (key.includes("_")) {
      const parts = key.split("_");
      const second = parts[1];

      if (second && !isNaN(Number(second))) {
        mealKey = `${parts[0]} ${second}`; // e.g., Meal 1
        time = parts.length > 2 ? parts.slice(2).join(" ") : "";
      } else {
        // preserve multi-word labels like 'Early Morning (optional)' or 'Evening Snack'
        mealKey = parts.join(" ");
        time = parts.length > 2 ? parts.slice(2).join(" ") : "";
      }
    }
    
    convertedDaily[mealKey] = {
      Time: time || undefined,
      Items: Array.isArray(items) ? items : []
    };
  });

  return (
    <div className="center-viewport">
      <div className="export-controls no-print" aria-label="Export and print controls">
        <PlanActions
          targetElementId="pdf-content"
          filename={`${overview.Name ? overview.Name.replace(/\s+/g, "_") : "client"}_meal_plan.pdf`}
        />
      </div>
      
      <div id="pdf-content" className="a4-sheet">
        <OverviewCard
          name={overview.Name}
          logoUrl="/TATVA_logos.png"
          age={overview.Age}
          gender={overview.Gender}
          currentWeight={`${overview.Current_Weight_kg} kg`}
          targetWeight={`${overview.Target_Weight_kg} kg`}
          dietType={overview.Diet_Type}
          occupation={overview.Occupation}
          sleep={overview.Sleep_hrs}
          steps={overview.Steps}
          mealsPerDay={overview.Meals_per_Day}
          goal={overview.Goal}
        />

        <div className="meals-wrapper">
          <div className="meals-panel">
            <h2 className="section-heading">Daily Meal Plan</h2>
            <div className="meals-grid">
              {(() => {
                const orderedKeys = Object.keys(convertedDaily);
                // Determine which keys are primary meals (exclude early/mid/snack labels)
                const primaryKeys = orderedKeys.filter(k => {
                  const lk = k.toLowerCase();
                  return !(lk.includes('early') || lk.includes('snack') || lk.includes('mid') || lk.includes('evening'));
                });

                // If Meals_per_Day is set, limit primary meals to that count
                const maxPrimary = typeof overview.Meals_per_Day === 'number' ? overview.Meals_per_Day : primaryKeys.length;
                // When client prefers fewer meals, prefer later meals (skip breakfast).
                const allowedPrimary = primaryKeys.length > maxPrimary
                  ? primaryKeys.slice(primaryKeys.length - maxPrimary)
                  : primaryKeys.slice(0, maxPrimary);

                return orderedKeys.map((mealKey) => {
                  const mealData = convertedDaily[mealKey];
                  let displayKey = mealKey;
                  const primaryIndex = allowedPrimary.indexOf(mealKey);
                  if (primaryIndex !== -1) {
                    displayKey = `Meal ${primaryIndex + 1}`;
                  } else {
                    // If this is a primary meal but not allowed (exceeds Meals_per_Day), skip rendering
                    const isPrimary = primaryKeys.indexOf(mealKey) !== -1;
                    if (isPrimary && allowedPrimary.indexOf(mealKey) === -1) {
                      return null;
                    }
                  }

                  return (
                    <DynamicMeal
                      key={mealKey}
                      mealKey={displayKey}
                      meal={mealData}
                    />
                  );
                });
              })()}
            </div>

            <div className="notes-section">
              <h3 className="section-heading section-heading--small">Notes & Tips</h3>
              <ul>
                {(response.Notes_and_Tips || []).map((n: string, i: number) => (
                  <li key={i} style={{ margin: "6px 0" }}>
                    {n}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
