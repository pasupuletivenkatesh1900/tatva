// app/components/OverviewCard.tsx
import React from "react";

interface OverviewCardProps {
  name: string;
  logoUrl: string;
  age: number;
  gender: string;
  currentWeight: string;
  dietType: string;
  occupation: string;
  sleep: string;
  steps: string;
  mealsPerDay: number;
  goal: string;
}

const OverviewCard: React.FC<OverviewCardProps> = ({
  name,
  logoUrl,
  age,
  gender,
  currentWeight,
  dietType,
  occupation,
  sleep,
  steps,
  mealsPerDay,
  goal,
}) => (
  <section className="overview-card">
    <div className="header-flex-row">
      <div className="title-container">
        <h1 className="main-title">
          <span className="client-name">{name}</span>
        </h1>
        <p className="plan-subtitle">Nutrition Plan</p>
      </div>
      <img src={logoUrl} alt="Tatva logo" className="header-logo" />
    </div>
    <h2>Overview</h2>
    <ul>
      <li>
        <strong>Age:</strong> {age} <b>|</b> <strong>Gender:</strong> {gender}
      </li>
      <li>
        <strong>Current Weight:</strong> {currentWeight}
      </li>
      <li>
        <strong>Diet Type:</strong> {dietType}
      </li>
      <li>
        <strong>Occupation:</strong> {occupation}
      </li>
      <li>
        <strong>Sleep:</strong> {sleep} <b>|</b> <strong>Steps per Day:</strong> {steps}
      </li>
      <li>
        <strong>Meals per Day:</strong> {mealsPerDay}
      </li>
    </ul>
    <div className="goal-box">
      <strong>Goal:</strong> {goal}
    </div>
  </section>
);

export default OverviewCard;
