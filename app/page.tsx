import React from "react";
import response from "./data/response.json";
import OverviewCard from "./components/OverviewCard";
import Meal1 from "./components/Meal1";
import Meal2 from "./components/Meal2";
import Snack from "./components/Snack";
import PDFExportButton from "./components/PDFExportButton";
const goalsText = response.Goals.join(", ");

export default function Page() {
  const daily = response.DailyMealPlan || {};

  return (
    <div className="center-viewport">
      <div className="export-controls" style={{ textAlign: 'center', marginBottom: '20px' }}>
        <PDFExportButton targetElementId="pdf-content" filename="tatva-meal-plan.pdf" />
      </div>
      
      <div id="pdf-content" className="a4-sheet">
        <OverviewCard
          name={response.Name}
          logoUrl="/tatva-logo.svg"
          age={response.Age}
          gender={response.Gender}
          currentWeight={response.CurrentWeight}
          dietType={response.DietType}
          occupation={response.Occupation}
          sleep={response.Sleep}
          steps={response.Steps}
          mealsPerDay={response.MealsPerDay}
          goal={goalsText}
        />

        <div className="meals-wrapper">
          <div className="meals-panel">
            <div className="meals-grid">
              <Meal1 meal={daily.Meal1} />
              <Meal2 meal={daily.Meal2} />
              <Snack meal={daily.Snack} />
            </div>

            <div className="notes-section">
              <h3 style={{ margin: "12px 0 8px 0", color: "var(--primary)", fontSize: "1.02rem" }}>
                Notes & Tips
              </h3>
              <ul>
                {(response.NotesAndTips || []).map((n: string, i: number) => (
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
