import React from "react";
import response from "../client/Swapna_N.json";
import OverviewCard from "./components/OverviewCard";
import DynamicMeal from "./components/DynamicMeal";
import PDFExportButton from "./components/PDFExportButton";

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
      const name = parts[0]; // "Meal", "Snack", etc.
      const second = parts[1]; // Could be number or description
      
      // Check if second part is a number
      if (second && !isNaN(Number(second))) {
        // Has number: keep name + number as title
        mealKey = `${name} ${second}`;
        time = parts.slice(2).join(" "); // Rest as description
      } else {
        // No number: keep just name as title
        mealKey = name;
        time = parts.slice(1).join(" "); // Rest as description
      }
    }
    
    convertedDaily[mealKey] = {
      Time: time || undefined,
      Items: Array.isArray(items) ? items : []
    };
  });

  // Debug: log the converted data
  console.log("Converted Daily:", convertedDaily);

  return (
    <div className="center-viewport">
      <div className="export-controls" style={{ textAlign: 'center', marginBottom: '20px' }}>
        <PDFExportButton 
          targetElementId="pdf-content" 
          filename={`${overview.Name ? overview.Name.replace(/\s+/g, '_') : 'client'}_meal_plan.pdf`} 
        />
      </div>
      
      <div id="pdf-content" className="a4-sheet">
        <OverviewCard
          name={overview.Name}
          logoUrl="/tatva.png"
          age={overview.Age}
          gender={overview.Gender}
          currentWeight={`${overview.Current_Weight_kg} kg`}
          dietType={overview.Diet_Type}
          occupation={overview.Occupation}
          sleep={overview.Sleep_hrs}
          steps={overview.Steps}
          mealsPerDay={overview.Meals_per_Day}
          goal={overview.Goal}
        />

        <div className="meals-wrapper">
          <div className="meals-panel">
            <div className="meals-grid">
              {Object.entries(convertedDaily).map(([mealKey, mealData]) => (
                <DynamicMeal 
                  key={mealKey} 
                  mealKey={mealKey} 
                  meal={mealData} 
                />
              ))}
            </div>

            <div className="notes-section">
              <h3 style={{ margin: "12px 0 8px 0", color: "var(--primary)", fontSize: "1.02rem" }}>
                Notes & Tips
              </h3>
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
