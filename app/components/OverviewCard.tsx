// app/components/OverviewCard.tsx
import React from "react";

interface OverviewCardProps {
  name: string;
  logoUrl: string;
  age: number;
  gender: string;
  currentWeight: string;
  targetWeight: string;
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
  targetWeight,
  dietType,
  occupation,
  sleep,
  steps,
  mealsPerDay,
  goal,
}) => (
  <section className="overview-card">
    <div className="title-section">
      <h1 className="main-title">
        <span className="client-name">{name}</span>
      </h1>
      <p className="plan-subtitle">Nutrition Plan</p>
    </div>
    <div className="logo-section">
      <img src={logoUrl} alt="Tatva logo" className="header-logo" />
    </div>
    <h2 className="section-heading section-heading--small">Overview</h2>
    <ul>
      <li>
        <span className="overview-label">Age:</span> {age} <span className="overview-separator">|</span> <span className="overview-label">Gender:</span> {gender}
      </li>
      <li>
        <span className="overview-label">Current Weight:</span> {currentWeight}
      </li>
      <li>
        <span className="overview-label">Target Weight:</span> {targetWeight}
      </li>
      <li>
        <span className="overview-label">Diet Type:</span> {dietType}
      </li>
      <li>
        <span className="overview-label">Occupation:</span> {occupation}
      </li>
      <li>
        <span className="overview-label">Sleep:</span> {sleep} <span className="overview-separator">|</span> <span className="overview-label">Steps per Day:</span> {steps}
      </li>
      <li>
        <span className="overview-label">Meals per Day:</span> {mealsPerDay}
      </li>
    </ul>
    <div className="goal-box">
      <span className="overview-label">Goal:</span> {goal}
    </div>
  </section>
);

export default OverviewCard;
