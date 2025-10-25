import React from "react";
import response from "../response1.json";
import OverviewCard from "./components/OverviewCard";
import DynamicMeal from "./components/DynamicMeal";
import PDFExportButton from "./components/PDFExportButton";

const overview = response.Overview;

export default function Page() {
  const daily = response.Daily_Meal_Plan || {};

  // Convert the meal plan structure to match our component expectations
  const convertedDaily: { [key: string]: { Time?: string; Items?: string[] } } = {};
  
  Object.entries(daily).forEach(([key, items]) => {
    // Extract meal type and time from key like "Meal_1_Late_Breakfast_or_Brunch"
    let mealKey = key;
    let time = "";
    
    if (key.includes("_")) {
      const parts = key.split("_");
      if (parts.length >= 3) {
        // Handle different patterns: "Meal_1", "Snack", etc.
        if (parts[0] === "Meal" && parts[1]) {
          mealKey = `Meal${parts[1]}`; // "Meal_1" → "Meal1"
        } else if (parts[0] === "Snack") {
          mealKey = "Snack"; // "Snack_Midday_or_Post_Yoga" → "Snack"
        } else {
          mealKey = parts[0]; // fallback to first part
        }
        
        // Join the remaining parts as time description
        time = parts.slice(2).join(" ").replace(/_/g, " ");
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
        <PDFExportButton targetElementId="pdf-content" filename="tatva-meal-plan.pdf" />
      </div>
      
      <div id="pdf-content" className="a4-sheet">
        <OverviewCard
          name={overview.Name}
          logoUrl="/tatva-logo.svg"
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
