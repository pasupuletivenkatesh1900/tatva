"use client";

import React, { useState } from "react";
import { saveAs } from "file-saver";
import * as XLSX from "xlsx";
import "./intake-global.css";

interface FormData {
  // Personal Information
  fullName: string;
  age: number;
  gender: string;
  height: number;
  currentWeight: number;
  targetWeight: number;
  
  // Any food allergies
  allergies: string[];
  otherAllergy: string;
  
  // Medical conditions
  medicalConditions: string[];
  
  // Occupation
  occupation: string[];
  otherOccupation: string;
  
  // Who cooks your meals
  whoCooksMeals: string;
  
  // How many steps per day
  stepsPerDay: string;
  
  // Water intake
  waterIntake: string;
  
  // Any digestive issues
  digestiveIssues: string[];
  otherDigestiveIssue: string;
  
  // Eating habits
  eatingHabits: string[];
  otherEatingHabit: string;
  
  // Meal timing
  mealTiming: string[];
  
  // Snacking habits
  snackingHabits: string[];
  
  // Food cravings
  foodCravings: string[];
  otherFoodCraving: string;
  
  // Energy levels throughout the day
  energyLevels: string;
  
  // Sleep quality
  sleepQuality: string;
  
  // Stress levels
  stressLevels: string;
  
  // Exercise frequency
  exerciseFrequency: string;
  
  // Current medications/supplements
  medications: string;
  supplements: string;
  
  // Previous diet experience
  previousDietExperience: string[];
  
  // Weight loss/gain history
  weightHistory: string;
  
  // Family history of diseases
  familyHistory: string[];
  
  // Lifestyle Information
  dietType: string;
  exerciseType: string;
  sleepHours: string;
  mealsPerDay: number;
  
  // Goals and Preferences
  primaryGoal: string;
  foodPreferences: string;
  foodDislikes: string;
  cookingTime: string;
  budget: string;
  
  // Additional Information
  additionalNotes: string;
}

const initialFormData: FormData = {
  fullName: "",
  age: 0,
  gender: "",
  height: 0,
  currentWeight: 0,
  targetWeight: 0,
  allergies: [],
  otherAllergy: "",
  medicalConditions: [],
  occupation: [],
  otherOccupation: "",
  whoCooksMeals: "",
  stepsPerDay: "",
  waterIntake: "",
  digestiveIssues: [],
  otherDigestiveIssue: "",
  eatingHabits: [],
  otherEatingHabit: "",
  mealTiming: [],
  snackingHabits: [],
  foodCravings: [],
  otherFoodCraving: "",
  energyLevels: "",
  sleepQuality: "",
  stressLevels: "",
  exerciseFrequency: "",
  medications: "",
  supplements: "",
  previousDietExperience: [],
  weightHistory: "",
  familyHistory: [],
  dietType: "",
  exerciseType: "",
  sleepHours: "",
  mealsPerDay: 3,
  primaryGoal: "",
  foodPreferences: "",
  foodDislikes: "",
  cookingTime: "",
  budget: "",
  additionalNotes: ""
};

export default function IntakePage() {
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    
    setFormData(prev => ({
      ...prev,
      [name]: type === 'number' ? Number(value) : value
    }));
  };

  const handleCheckboxChange = (field: keyof FormData, value: string, checked: boolean) => {
    setFormData(prev => ({
      ...prev,
      [field]: checked 
        ? [...(prev[field] as string[]), value]
        : (prev[field] as string[]).filter(item => item !== value)
    }));
  };

  const exportToExcel = () => {
    const ws = XLSX.utils.json_to_sheet([formData]);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Diet Plan Intake");
    
    const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
    const data = new Blob([excelBuffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
    
    const fileName = `diet-plan-intake-${formData.fullName.replace(/\s+/g, '-')}-${new Date().toISOString().split('T')[0]}.xlsx`;
    saveAs(data, fileName);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      exportToExcel();
      alert("Diet plan intake form submitted successfully! Excel file downloaded.");
      setFormData(initialFormData);
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("Error submitting form. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="intake-page">
      <div className="intake-container">
        <div className="intake-form-card">
          <div className="intake-header">
            <h1 className="intake-brand-title">TATVA</h1>
            <h2 className="intake-form-title">Personalized Diet Plan Intake</h2>
            <p className="intake-description">
              We're excited to create your personalized diet plan. Please answer these questions 
              honestly so we can design a plan that fits your goals, preferences, and lifestyle.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="intake-form">
            {/* Personal Information */}
            <section className="form-section">
              <h3 className="section-title">Personal Information</h3>
              
              <div className="form-grid">
                <div className="form-group">
                  <label className="form-label">
                    Full Name <span className="required">*</span>
                  </label>
                  <input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleInputChange}
                    required
                    className="form-input"
                    placeholder="Enter your full name"
                  />
                </div>
                
                <div className="form-group">
                  <label className="form-label">
                    Age <span className="required">*</span>
                  </label>
                  <input
                    type="number"
                    name="age"
                    value={formData.age || ''}
                    onChange={handleInputChange}
                    required
                    min="1"
                    max="100"
                    className="form-input"
                    placeholder="Your age"
                  />
                </div>
                
                <div className="form-group">
                  <label className="form-label">
                    Gender <span className="required">*</span>
                  </label>
                  <select
                    name="gender"
                    value={formData.gender}
                    onChange={handleInputChange}
                    required
                    className="form-select"
                  >
                    <option value="">Select Gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
                
                <div className="form-group">
                  <label className="form-label">
                    Height (cm)
                  </label>
                  <input
                    type="number"
                    name="height"
                    value={formData.height || ''}
                    onChange={handleInputChange}
                    min="100"
                    max="250"
                    className="form-input"
                    placeholder="Height in centimeters"
                  />
                </div>
                
                <div className="form-group">
                  <label className="form-label">
                    Current Weight (kg) <span className="required">*</span>
                  </label>
                  <input
                    type="number"
                    name="currentWeight"
                    value={formData.currentWeight || ''}
                    onChange={handleInputChange}
                    required
                    min="20"
                    max="300"
                    step="0.1"
                    className="form-input"
                    placeholder="Current weight in kg"
                  />
                </div>
                
                <div className="form-group">
                  <label className="form-label">
                    Target Weight (kg)
                  </label>
                  <input
                    type="number"
                    name="targetWeight"
                    value={formData.targetWeight || ''}
                    onChange={handleInputChange}
                    min="20"
                    max="300"
                    step="0.1"
                    className="form-input"
                    placeholder="Target weight in kg"
                  />
                </div>
              </div>
            </section>

            {/* Health Information */}
            <section className="form-section">
              <h3 className="section-title">Health Information</h3>
              
              <div className="form-group full-width">
                <label className="form-label">
                  Any food allergies?
                </label>
                <div className="checkbox-grid">
                  {[
                    'Dairy', 'Gluten', 'Nuts', 'Soy', 'Seafood', 'None'
                  ].map(allergy => (
                    <label key={allergy} className="checkbox-item">
                      <input
                        type="checkbox"
                        checked={formData.allergies.includes(allergy)}
                        onChange={(e) => handleCheckboxChange('allergies', allergy, e.target.checked)}
                        className="checkbox-input"
                      />
                      <span className="checkbox-label">{allergy}</span>
                    </label>
                  ))}
                </div>
                <div className="form-group" style={{marginTop: '1rem'}}>
                  <label className="form-label">Other:</label>
                  <input
                    type="text"
                    name="otherAllergy"
                    value={formData.otherAllergy}
                    onChange={handleInputChange}
                    placeholder="Specify other allergies..."
                    className="form-input"
                  />
                </div>
              </div>
              
              <div className="form-group full-width">
                <label className="form-label">
                  Medical Conditions (Select all that apply)
                </label>
                <div className="checkbox-grid">
                  {[
                    'Diabetes', 'Hypertension', 'High Cholesterol', 'PCOS', 'Thyroid',
                    'Heart Disease', 'Fatty Liver', 'Kidney Disease', 'Back Pain', 'Arthritis'
                  ].map(condition => (
                    <label key={condition} className="checkbox-item">
                      <input
                        type="checkbox"
                        checked={formData.medicalConditions.includes(condition)}
                        onChange={(e) => handleCheckboxChange('medicalConditions', condition, e.target.checked)}
                        className="checkbox-input"
                      />
                      <span className="checkbox-label">{condition}</span>
                    </label>
                  ))}
                </div>
              </div>
            </section>

            {/* Lifestyle Information */}
            <section className="form-section">
              <h3 className="section-title">Lifestyle Information</h3>
              
              <div className="form-group full-width">
                <label className="form-label">
                  Occupation
                </label>
                <div className="checkbox-grid">
                  {[
                    'Desk Job', 'Field Work', 'Homemaker', 'Student'
                  ].map(occ => (
                    <label key={occ} className="checkbox-item">
                      <input
                        type="checkbox"
                        checked={formData.occupation.includes(occ)}
                        onChange={(e) => handleCheckboxChange('occupation', occ, e.target.checked)}
                        className="checkbox-input"
                      />
                      <span className="checkbox-label">{occ}</span>
                    </label>
                  ))}
                </div>
                <div className="form-group" style={{marginTop: '1rem'}}>
                  <label className="form-label">Other:</label>
                  <input
                    type="text"
                    name="otherOccupation"
                    value={formData.otherOccupation}
                    onChange={handleInputChange}
                    placeholder="Specify other occupation..."
                    className="form-input"
                  />
                </div>
              </div>
              
              <div className="form-group full-width">
                <label className="form-label">
                  Who cooks your meals?
                </label>
                <div className="radio-group">
                  {['Self', 'Family member', 'Cook', 'Mixed'].map(option => (
                    <label key={option} className="radio-item">
                      <input
                        type="radio"
                        name="whoCooksMeals"
                        value={option}
                        checked={formData.whoCooksMeals === option}
                        onChange={handleInputChange}
                        className="radio-input"
                      />
                      <span className="radio-label">{option}</span>
                    </label>
                  ))}
                </div>
              </div>
              
              <div className="form-group full-width">
                <label className="form-label">
                  How many steps per day?
                </label>
                <div className="radio-group">
                  {[
                    'Less than 2000', '2000-5000', '5000-8000', 
                    '8000-10000', 'More than 10000', 'Not tracked'
                  ].map(steps => (
                    <label key={steps} className="radio-item">
                      <input
                        type="radio"
                        name="stepsPerDay"
                        value={steps}
                        checked={formData.stepsPerDay === steps}
                        onChange={handleInputChange}
                        className="radio-input"
                      />
                      <span className="radio-label">{steps}</span>
                    </label>
                  ))}
                </div>
              </div>
              
              <div className="form-group full-width">
                <label className="form-label">
                  How much water do you drink per day?
                </label>
                <div className="radio-group">
                  {[
                    'Less than 1 liter', '1-2 liters', '2-3 liters', 
                    '3-4 liters', 'More than 4 liters'
                  ].map(water => (
                    <label key={water} className="radio-item">
                      <input
                        type="radio"
                        name="waterIntake"
                        value={water}
                        checked={formData.waterIntake === water}
                        onChange={handleInputChange}
                        className="radio-input"
                      />
                      <span className="radio-label">{water}</span>
                    </label>
                  ))}
                </div>
              </div>
              
              <div className="form-group full-width">
                <label className="form-label">
                  Any digestive issues?
                </label>
                <div className="checkbox-grid">
                  {[
                    'Constipation', 'Diarrhea', 'Bloating', 'Gas', 'Acid reflux', 
                    'Nausea', 'Loss of appetite', 'None'
                  ].map(issue => (
                    <label key={issue} className="checkbox-item">
                      <input
                        type="checkbox"
                        checked={formData.digestiveIssues.includes(issue)}
                        onChange={(e) => handleCheckboxChange('digestiveIssues', issue, e.target.checked)}
                        className="checkbox-input"
                      />
                      <span className="checkbox-label">{issue}</span>
                    </label>
                  ))}
                </div>
                <div className="form-group" style={{marginTop: '1rem'}}>
                  <label className="form-label">Other:</label>
                  <input
                    type="text"
                    name="otherDigestiveIssue"
                    value={formData.otherDigestiveIssue}
                    onChange={handleInputChange}
                    placeholder="Specify other digestive issues..."
                    className="form-input"
                  />
                </div>
              </div>
              
              <div className="form-group full-width">
                <label className="form-label">
                  Eating habits
                </label>
                <div className="checkbox-grid">
                  {[
                    'Eat quickly', 'Eat slowly', 'Skip meals', 'Eat while watching TV', 
                    'Eat late at night', 'Emotional eating', 'Regular meal times'
                  ].map(habit => (
                    <label key={habit} className="checkbox-item">
                      <input
                        type="checkbox"
                        checked={formData.eatingHabits.includes(habit)}
                        onChange={(e) => handleCheckboxChange('eatingHabits', habit, e.target.checked)}
                        className="checkbox-input"
                      />
                      <span className="checkbox-label">{habit}</span>
                    </label>
                  ))}
                </div>
                <div className="form-group" style={{marginTop: '1rem'}}>
                  <label className="form-label">Other:</label>
                  <input
                    type="text"
                    name="otherEatingHabit"
                    value={formData.otherEatingHabit}
                    onChange={handleInputChange}
                    placeholder="Specify other eating habits..."
                    className="form-input"
                  />
                </div>
              </div>
              
              <div className="form-group full-width">
                <label className="form-label">
                  Usual meal timing
                </label>
                <div className="checkbox-grid">
                  {[
                    'Early breakfast (6-8 AM)', 'Late breakfast (8-10 AM)', 
                    'Early lunch (11 AM-1 PM)', 'Late lunch (1-3 PM)',
                    'Early dinner (6-8 PM)', 'Late dinner (8-10 PM)', 'Very late dinner (after 10 PM)'
                  ].map(timing => (
                    <label key={timing} className="checkbox-item">
                      <input
                        type="checkbox"
                        checked={formData.mealTiming.includes(timing)}
                        onChange={(e) => handleCheckboxChange('mealTiming', timing, e.target.checked)}
                        className="checkbox-input"
                      />
                      <span className="checkbox-label">{timing}</span>
                    </label>
                  ))}
                </div>
              </div>
              
              <div className="form-group full-width">
                <label className="form-label">
                  Snacking habits
                </label>
                <div className="checkbox-grid">
                  {[
                    'Frequent snacking', 'Occasional snacking', 'No snacking', 
                    'Late night snacking', 'Healthy snacks', 'Junk food snacks'
                  ].map(snack => (
                    <label key={snack} className="checkbox-item">
                      <input
                        type="checkbox"
                        checked={formData.snackingHabits.includes(snack)}
                        onChange={(e) => handleCheckboxChange('snackingHabits', snack, e.target.checked)}
                        className="checkbox-input"
                      />
                      <span className="checkbox-label">{snack}</span>
                    </label>
                  ))}
                </div>
              </div>
              
              <div className="form-group full-width">
                <label className="form-label">
                  Food cravings
                </label>
                <div className="checkbox-grid">
                  {[
                    'Sweet foods', 'Salty foods', 'Fried foods', 'Spicy foods', 
                    'Chocolate', 'Ice cream', 'Bread/carbs', 'None'
                  ].map(craving => (
                    <label key={craving} className="checkbox-item">
                      <input
                        type="checkbox"
                        checked={formData.foodCravings.includes(craving)}
                        onChange={(e) => handleCheckboxChange('foodCravings', craving, e.target.checked)}
                        className="checkbox-input"
                      />
                      <span className="checkbox-label">{craving}</span>
                    </label>
                  ))}
                </div>
                <div className="form-group" style={{marginTop: '1rem'}}>
                  <label className="form-label">Other:</label>
                  <input
                    type="text"
                    name="otherFoodCraving"
                    value={formData.otherFoodCraving}
                    onChange={handleInputChange}
                    placeholder="Specify other food cravings..."
                    className="form-input"
                  />
                </div>
              </div>
              
              <div className="form-group full-width">
                <label className="form-label">
                  Energy levels throughout the day
                </label>
                <div className="radio-group">
                  {[
                    'High energy all day', 'High in morning, low in evening', 
                    'Low in morning, high in evening', 'Consistent moderate energy', 
                    'Low energy all day', 'Energy crashes after meals'
                  ].map(energy => (
                    <label key={energy} className="radio-item">
                      <input
                        type="radio"
                        name="energyLevels"
                        value={energy}
                        checked={formData.energyLevels === energy}
                        onChange={handleInputChange}
                        className="radio-input"
                      />
                      <span className="radio-label">{energy}</span>
                    </label>
                  ))}
                </div>
              </div>
              
              <div className="form-group full-width">
                <label className="form-label">
                  Sleep quality
                </label>
                <div className="radio-group">
                  {[
                    'Excellent', 'Good', 'Fair', 'Poor', 'Very poor'
                  ].map(quality => (
                    <label key={quality} className="radio-item">
                      <input
                        type="radio"
                        name="sleepQuality"
                        value={quality}
                        checked={formData.sleepQuality === quality}
                        onChange={handleInputChange}
                        className="radio-input"
                      />
                      <span className="radio-label">{quality}</span>
                    </label>
                  ))}
                </div>
              </div>
              
              <div className="form-group full-width">
                <label className="form-label">
                  Stress levels
                </label>
                <div className="radio-group">
                  {[
                    'Very low', 'Low', 'Moderate', 'High', 'Very high'
                  ].map(stress => (
                    <label key={stress} className="radio-item">
                      <input
                        type="radio"
                        name="stressLevels"
                        value={stress}
                        checked={formData.stressLevels === stress}
                        onChange={handleInputChange}
                        className="radio-input"
                      />
                      <span className="radio-label">{stress}</span>
                    </label>
                  ))}
                </div>
              </div>
              
              <div className="form-group full-width">
                <label className="form-label">
                  Exercise frequency
                </label>
                <div className="radio-group">
                  {[
                    'Daily', '5-6 times per week', '3-4 times per week', 
                    '1-2 times per week', 'Rarely', 'Never'
                  ].map(frequency => (
                    <label key={frequency} className="radio-item">
                      <input
                        type="radio"
                        name="exerciseFrequency"
                        value={frequency}
                        checked={formData.exerciseFrequency === frequency}
                        onChange={handleInputChange}
                        className="radio-input"
                      />
                      <span className="radio-label">{frequency}</span>
                    </label>
                  ))}
                </div>
              </div>
              
              <div className="form-grid">
                <div className="form-group">
                  <label className="form-label">
                    Current medications
                  </label>
                  <textarea
                    name="medications"
                    value={formData.medications}
                    onChange={handleInputChange}
                    rows={3}
                    placeholder="List any current medications..."
                    className="form-textarea"
                  />
                </div>
                
                <div className="form-group">
                  <label className="form-label">
                    Current supplements
                  </label>
                  <textarea
                    name="supplements"
                    value={formData.supplements}
                    onChange={handleInputChange}
                    rows={3}
                    placeholder="List any supplements you take..."
                    className="form-textarea"
                  />
                </div>
              </div>
              
              <div className="form-group full-width">
                <label className="form-label">
                  Previous diet experience
                </label>
                <div className="checkbox-grid">
                  {[
                    'Keto diet', 'Intermittent fasting', 'Low carb diet', 'Mediterranean diet',
                    'Paleo diet', 'Vegan diet', 'Weight Watchers', 'No previous experience'
                  ].map(diet => (
                    <label key={diet} className="checkbox-item">
                      <input
                        type="checkbox"
                        checked={formData.previousDietExperience.includes(diet)}
                        onChange={(e) => handleCheckboxChange('previousDietExperience', diet, e.target.checked)}
                        className="checkbox-input"
                      />
                      <span className="checkbox-label">{diet}</span>
                    </label>
                  ))}
                </div>
              </div>
              
              <div className="form-group full-width">
                <label className="form-label">
                  Weight loss/gain history
                </label>
                <textarea
                  name="weightHistory"
                  value={formData.weightHistory}
                  onChange={handleInputChange}
                  rows={3}
                  placeholder="Describe your weight loss/gain history..."
                  className="form-textarea"
                />
              </div>
              
              <div className="form-group full-width">
                <label className="form-label">
                  Family history of diseases
                </label>
                <div className="checkbox-grid">
                  {[
                    'Diabetes', 'Heart disease', 'High blood pressure', 'Obesity',
                    'Cancer', 'Thyroid disorders', 'Kidney disease', 'None'
                  ].map(disease => (
                    <label key={disease} className="checkbox-item">
                      <input
                        type="checkbox"
                        checked={formData.familyHistory.includes(disease)}
                        onChange={(e) => handleCheckboxChange('familyHistory', disease, e.target.checked)}
                        className="checkbox-input"
                      />
                      <span className="checkbox-label">{disease}</span>
                    </label>
                  ))}
                </div>
              </div>
              
              <div className="form-grid">
                <div className="form-group">
                  <label className="form-label">
                    Diet Type <span className="required">*</span>
                  </label>
                  <select
                    name="dietType"
                    value={formData.dietType}
                    onChange={handleInputChange}
                    required
                    className="form-select"
                  >
                    <option value="">Select Diet Type</option>
                    <option value="Vegetarian">Vegetarian</option>
                    <option value="Non-Vegetarian">Non-Vegetarian</option>
                    <option value="Vegan">Vegan</option>
                    <option value="Eggetarian">Eggetarian</option>
                    <option value="Jain">Jain</option>
                  </select>
                </div>
                
                <div className="form-group">
                  <label className="form-label">
                    Exercise Type
                  </label>
                  <select
                    name="exerciseType"
                    value={formData.exerciseType}
                    onChange={handleInputChange}
                    className="form-select"
                  >
                    <option value="">Select Exercise Type</option>
                    <option value="None">None</option>
                    <option value="Yoga">Yoga</option>
                    <option value="Walking">Walking</option>
                    <option value="Running">Running</option>
                    <option value="Gym/Weight Training">Gym/Weight Training</option>
                    <option value="Swimming">Swimming</option>
                    <option value="Cycling">Cycling</option>
                    <option value="Sports">Sports</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
                
                <div className="form-group">
                  <label className="form-label">
                    Sleep Hours
                  </label>
                  <select
                    name="sleepHours"
                    value={formData.sleepHours}
                    onChange={handleInputChange}
                    className="form-select"
                  >
                    <option value="">Select Sleep Hours</option>
                    <option value="Less than 5 hours">Less than 5 hours</option>
                    <option value="5-6 hours">5-6 hours</option>
                    <option value="6-7 hours">6-7 hours</option>
                    <option value="7-8 hours">7-8 hours</option>
                    <option value="8-9 hours">8-9 hours</option>
                    <option value="More than 9 hours">More than 9 hours</option>
                  </select>
                </div>
                
                <div className="form-group">
                  <label className="form-label">
                    Meals per Day <span className="required">*</span>
                  </label>
                  <select
                    name="mealsPerDay"
                    value={formData.mealsPerDay}
                    onChange={handleInputChange}
                    required
                    className="form-select"
                  >
                    <option value={2}>2 meals</option>
                    <option value={3}>3 meals</option>
                    <option value={4}>4 meals</option>
                    <option value={5}>5 meals</option>
                    <option value={6}>6 meals</option>
                  </select>
                </div>
              </div>
            </section>

            {/* Goals and Preferences */}
            <section className="form-section">
              <h3 className="section-title">Goals and Preferences</h3>
              
              <div className="form-group full-width">
                <label className="form-label">
                  Primary Goal <span className="required">*</span>
                </label>
                <select
                  name="primaryGoal"
                  value={formData.primaryGoal}
                  onChange={handleInputChange}
                  required
                  className="form-select"
                >
                  <option value="">Select Primary Goal</option>
                  <option value="Weight Loss">Weight Loss</option>
                  <option value="Weight Gain">Weight Gain</option>
                  <option value="Muscle Building">Muscle Building</option>
                  <option value="Health Improvement">Health Improvement</option>
                  <option value="Disease Management">Disease Management</option>
                  <option value="Energy Boost">Energy Boost</option>
                  <option value="Digestive Health">Digestive Health</option>
                  <option value="Maintenance">Maintenance</option>
                </select>
              </div>
              
              <div className="form-grid">
                <div className="form-group">
                  <label className="form-label">
                    Food Preferences
                  </label>
                  <textarea
                    name="foodPreferences"
                    value={formData.foodPreferences}
                    onChange={handleInputChange}
                    rows={3}
                    placeholder="Foods you love or prefer to include..."
                    className="form-textarea"
                  />
                </div>
                
                <div className="form-group">
                  <label className="form-label">
                    Food Dislikes
                  </label>
                  <textarea
                    name="foodDislikes"
                    value={formData.foodDislikes}
                    onChange={handleInputChange}
                    rows={3}
                    placeholder="Foods you dislike or want to avoid..."
                    className="form-textarea"
                  />
                </div>
                
                <div className="form-group">
                  <label className="form-label">
                    Cooking Time Available
                  </label>
                  <select
                    name="cookingTime"
                    value={formData.cookingTime}
                    onChange={handleInputChange}
                    className="form-select"
                  >
                    <option value="">Select Cooking Time</option>
                    <option value="Less than 15 minutes">Less than 15 minutes</option>
                    <option value="15-30 minutes">15-30 minutes</option>
                    <option value="30-45 minutes">30-45 minutes</option>
                    <option value="45-60 minutes">45-60 minutes</option>
                    <option value="More than 1 hour">More than 1 hour</option>
                  </select>
                </div>
                
                <div className="form-group">
                  <label className="form-label">
                    Budget Range
                  </label>
                  <select
                    name="budget"
                    value={formData.budget}
                    onChange={handleInputChange}
                    className="form-select"
                  >
                    <option value="">Select Budget Range</option>
                    <option value="Budget-friendly">Budget-friendly</option>
                    <option value="Moderate">Moderate</option>
                    <option value="Premium">Premium</option>
                    <option value="No constraints">No constraints</option>
                  </select>
                </div>
              </div>
            </section>

            {/* Additional Information */}
            <section className="form-section">
              <h3 className="section-title">Additional Information</h3>
              
              <div className="form-group full-width">
                <label className="form-label">
                  Additional Notes
                </label>
                <textarea
                  name="additionalNotes"
                  value={formData.additionalNotes}
                  onChange={handleInputChange}
                  rows={4}
                  placeholder="Any additional information, special requirements, or questions..."
                  className="form-textarea"
                />
              </div>
            </section>

            {/* Submit Button */}
            <div className="form-submit">
              <button
                type="submit"
                disabled={isSubmitting}
                className="submit-button"
              >
                {isSubmitting ? 'Submitting...' : 'Submit Diet Plan Request'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}