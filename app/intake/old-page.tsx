"use client";

import React, { useState } from "react";
import { saveAs } from "file-saver";
import * as XLSX from "xlsx";

interface FormData {
  // Personal Information
  fullName: string;
  age: number;
  gender: string;
  height: number;
  currentWeight: number;
  targetWeight: number;
  
  // Health Information
  medicalConditions: string[];
  allergies: string[];
  allergyNotes: string;
  medications: string;
  
  // Lifestyle Information
  dietType: string;
  occupation: string[];
  occupationOther: string;
  whoCooksMeals: string;
  sleepHours: string;
  exerciseType: string;
  stepsPerDay: string;
  mealsPerDay: number;
  
  // Goals and Preferences
  primaryGoal: string;
  foodPreferences: string;
  foodDislikes: string;
  cookingTime: string;
  budget: string;
  
  // Food Delivery & Meal Prep
  mealPrepPreference: string;
  deliveryLocation: string;
  deliveryFrequency: string;
  mealTiming: string[];
  kitchenAccess: string;
  mealPrepExperience: string;
  
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
  medicalConditions: [],
  allergies: [],
  allergyNotes: "",
  medications: "",
  dietType: "",
  occupation: [],
  occupationOther: "",
  whoCooksMeals: "",
  sleepHours: "",
  exerciseType: "",
  stepsPerDay: "",
  mealsPerDay: 3,
  primaryGoal: "",
  foodPreferences: "",
  foodDislikes: "",
  cookingTime: "",
  budget: "",
  mealPrepPreference: "",
  deliveryLocation: "",
  deliveryFrequency: "",
  mealTiming: [],
  kitchenAccess: "",
  mealPrepExperience: "",
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

  const handleCheckboxChange = (condition: string, checked: boolean) => {
    setFormData(prev => ({
      ...prev,
      medicalConditions: checked 
        ? [...prev.medicalConditions, condition]
        : prev.medicalConditions.filter(c => c !== condition)
    }));
  };

  const handleMealTimingChange = (timing: string, checked: boolean) => {
    setFormData(prev => ({
      ...prev,
      mealTiming: checked 
        ? [...prev.mealTiming, timing]
        : prev.mealTiming.filter(t => t !== timing)
    }));
  };

  const handleAllergyChange = (allergy: string, checked: boolean) => {
    setFormData(prev => ({
      ...prev,
      allergies: checked 
        ? [...prev.allergies, allergy]
        : prev.allergies.filter(a => a !== allergy)
    }));
  };

  const handleOccupationChange = (occupation: string, checked: boolean) => {
    setFormData(prev => ({
      ...prev,
      occupation: checked 
        ? [...prev.occupation, occupation]
        : prev.occupation.filter(o => o !== occupation)
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
      // Export to Excel
      exportToExcel();
      
      // Here you can add API call to save to database
      // await fetch('/api/save-intake', { method: 'POST', body: JSON.stringify(formData) });
      
      alert("Diet plan intake form submitted successfully! Excel file downloaded.");
      
      // Reset form
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
                        onChange={(e) => handleCheckboxChange(condition, e.target.checked)}
                        className="checkbox-input"
                      />
                      <span className="checkbox-label">{condition}</span>
                    </label>
                  ))}
                </div>
              </div>
              
              <div className="form-group full-width">
                <label className="form-label">
                  Any food allergies? (Select all that apply)
                </label>
                <div className="checkbox-grid">
                  {[
                    'Dairy', 'Gluten', 'Nuts', 'Soy', 'Seafood', 'Eggs', 
                    'Shellfish', 'Sesame', 'Peanuts', 'Tree Nuts', 'None'
                  ].map(allergy => (
                    <label key={allergy} className="checkbox-item">
                      <input
                        type="checkbox"
                        checked={formData.allergies.includes(allergy)}
                        onChange={(e) => handleAllergyChange(allergy, e.target.checked)}
                        className="checkbox-input"
                      />
                      <span className="checkbox-label">{allergy}</span>
                    </label>
                  ))}
                </div>
              </div>
              
              <div className="form-grid">
                <div className="form-group">
                  <label className="form-label">
                    Other Allergies / Additional Notes
                  </label>
                  <textarea
                    name="allergyNotes"
                    value={formData.allergyNotes}
                    onChange={handleInputChange}
                    rows={3}
                    placeholder="Please specify any other allergies or additional details..."
                    className="form-textarea"
                  />
                </div>
                
                <div className="form-group">
                  <label className="form-label">
                    Current Medications
                  </label>
                  <textarea
                    name="medications"
                    value={formData.medications}
                    onChange={handleInputChange}
                    rows={3}
                    placeholder="List current medications..."
                    className="form-textarea"
                  />
                </div>
              </div>
            </section>

            {/* Lifestyle Information */}
            <section className="form-section">
              <h3 className="section-title">Lifestyle Information</h3>
              
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
              </div>
              
              <div className="form-group full-width">
                <label className="form-label">
                  Occupation (Select all that apply)
                </label>
                <div className="checkbox-grid">
                  {[
                    'Desk Job', 'Field Work', 'Homemaker', 'Student', 'Healthcare Worker',
                    'Teacher', 'Business Owner', 'Freelancer', 'Retired'
                  ].map(occupationType => (
                    <label key={occupationType} className="checkbox-item">
                      <input
                        type="checkbox"
                        checked={formData.occupation.includes(occupationType)}
                        onChange={(e) => handleOccupationChange(occupationType, e.target.checked)}
                        className="checkbox-input"
                      />
                      <span className="checkbox-label">{occupationType}</span>
                    </label>
                  ))}
                </div>
              </div>
              
              <div className="form-grid">
                <div className="form-group">
                  <label className="form-label">
                    Other Occupation
                  </label>
                  <input
                    type="text"
                    name="occupationOther"
                    value={formData.occupationOther}
                    onChange={handleInputChange}
                    placeholder="Please specify if other..."
                    className="form-input"
                  />
                </div>
                
                <div className="form-group">
                  <label className="form-label">
                    Who cooks your meals? <span className="required">*</span>
                  </label>
                  <div className="radio-group">
                    <label className="radio-item">
                      <input
                        type="radio"
                        name="whoCooksMeals"
                        value="Self"
                        checked={formData.whoCooksMeals === "Self"}
                        onChange={handleInputChange}
                        required
                        className="radio-input"
                      />
                      <span className="radio-label">Self</span>
                    </label>
                    <label className="radio-item">
                      <input
                        type="radio"
                        name="whoCooksMeals"
                        value="Family member"
                        checked={formData.whoCooksMeals === "Family member"}
                        onChange={handleInputChange}
                        className="radio-input"
                      />
                      <span className="radio-label">Family member</span>
                    </label>
                    <label className="radio-item">
                      <input
                        type="radio"
                        name="whoCooksMeals"
                        value="Cook"
                        checked={formData.whoCooksMeals === "Cook"}
                        onChange={handleInputChange}
                        className="radio-input"
                      />
                      <span className="radio-label">Cook</span>
                    </label>
                    <label className="radio-item">
                      <input
                        type="radio"
                        name="whoCooksMeals"
                        value="Mixed"
                        checked={formData.whoCooksMeals === "Mixed"}
                        onChange={handleInputChange}
                        className="radio-input"
                      />
                      <span className="radio-label">Mixed</span>
                    </label>
                  </div>
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
                    Steps per Day
                  </label>
                  <select
                    name="stepsPerDay"
                    value={formData.stepsPerDay}
                    onChange={handleInputChange}
                    className="form-select"
                  >
                    <option value="">Select Steps per Day</option>
                    <option value="Less than 2000">Less than 2000</option>
                    <option value="2000-5000">2000-5000</option>
                    <option value="5000-8000">5000-8000</option>
                    <option value="8000-10000">8000-10000</option>
                    <option value="More than 10000">More than 10000</option>
                    <option value="Not tracked">Not tracked</option>
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

            {/* Food Delivery & Meal Preparation */}
            <section className="form-section">
              <h3 className="section-title">Food Delivery & Meal Preparation</h3>
              
              <div className="form-grid">
                <div className="form-group">
                  <label className="form-label">
                    Meal Preparation Preference <span className="required">*</span>
                  </label>
                  <select
                    name="mealPrepPreference"
                    value={formData.mealPrepPreference}
                    onChange={handleInputChange}
                    required
                    className="form-select"
                  >
                    <option value="">Select Preference</option>
                    <option value="Cook at home">Cook at home</option>
                    <option value="Meal delivery service">Meal delivery service</option>
                    <option value="Mix of both">Mix of both</option>
                    <option value="Pre-prepared meal kits">Pre-prepared meal kits</option>
                    <option value="Dining out frequently">Dining out frequently</option>
                  </select>
                </div>
                
                <div className="form-group">
                  <label className="form-label">
                    Kitchen Access & Facilities
                  </label>
                  <select
                    name="kitchenAccess"
                    value={formData.kitchenAccess}
                    onChange={handleInputChange}
                    className="form-select"
                  >
                    <option value="">Select Kitchen Access</option>
                    <option value="Full kitchen with all appliances">Full kitchen with all appliances</option>
                    <option value="Basic kitchen (stove, fridge)">Basic kitchen (stove, fridge)</option>
                    <option value="Microwave and fridge only">Microwave and fridge only</option>
                    <option value="Limited/shared kitchen">Limited/shared kitchen</option>
                    <option value="No kitchen access">No kitchen access</option>
                  </select>
                </div>
                
                <div className="form-group">
                  <label className="form-label">
                    Delivery Location (if applicable)
                  </label>
                  <input
                    type="text"
                    name="deliveryLocation"
                    value={formData.deliveryLocation}
                    onChange={handleInputChange}
                    placeholder="e.g., Home, Office, Hostel, Area name..."
                    className="form-input"
                  />
                </div>
                
                <div className="form-group">
                  <label className="form-label">
                    Delivery Frequency (if applicable)
                  </label>
                  <select
                    name="deliveryFrequency"
                    value={formData.deliveryFrequency}
                    onChange={handleInputChange}
                    className="form-select"
                  >
                    <option value="">Select Frequency</option>
                    <option value="Daily">Daily</option>
                    <option value="Every 2 days">Every 2 days</option>
                    <option value="3 times a week">3 times a week</option>
                    <option value="Weekly">Weekly</option>
                    <option value="Bi-weekly">Bi-weekly</option>
                    <option value="As needed">As needed</option>
                  </select>
                </div>
                
                <div className="form-group">
                  <label className="form-label">
                    Meal Preparation Experience
                  </label>
                  <select
                    name="mealPrepExperience"
                    value={formData.mealPrepExperience}
                    onChange={handleInputChange}
                    className="form-select"
                  >
                    <option value="">Select Experience Level</option>
                    <option value="Beginner - need simple recipes">Beginner - need simple recipes</option>
                    <option value="Intermediate - can follow recipes">Intermediate - can follow recipes</option>
                    <option value="Advanced - comfortable with cooking">Advanced - comfortable with cooking</option>
                    <option value="Expert - love experimenting">Expert - love experimenting</option>
                    <option value="Prefer not to cook">Prefer not to cook</option>
                  </select>
                </div>
              </div>
              
              <div className="form-group full-width">
                <label className="form-label">
                  Preferred Meal Delivery Times (Select all that apply)
                </label>
                <div className="checkbox-grid">
                  {[
                    'Early Morning (6-8 AM)', 'Morning (8-10 AM)', 'Late Morning (10-12 PM)', 
                    'Lunch Time (12-2 PM)', 'Afternoon (2-4 PM)', 'Evening (4-6 PM)', 
                    'Dinner Time (6-8 PM)', 'Late Evening (8-10 PM)', 'Night (10 PM onwards)'
                  ].map(timing => (
                    <label key={timing} className="checkbox-item">
                      <input
                        type="checkbox"
                        checked={formData.mealTiming.includes(timing)}
                        onChange={(e) => handleMealTimingChange(timing, e.target.checked)}
                        className="checkbox-input"
                      />
                      <span className="checkbox-label">{timing}</span>
                    </label>
                  ))}
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