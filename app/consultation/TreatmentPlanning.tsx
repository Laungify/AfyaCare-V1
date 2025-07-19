'use client';
import { useState } from 'react';

// Type definitions
interface Patient {
  name: string;
  age: number;
  gender: string;
  chiefComplaint: string;
}

interface TreatmentPlan {
  primaryDiagnosis: string;
  secondaryDiagnoses: string[];
  treatmentGoals: string[];
  interventions: string[];
  medications: string[];
  lifestyle: string;
  followUpPlan: string;
  emergencyInstructions: string;
  patientEducation: string;
  expectedOutcome: string;
  riskFactors: string[];
  contraindications: string;
}

interface TreatmentTemplate {
  name: string;
  goals: string[];
  interventions: string[];
  lifestyle: string;
  followUp: string;
}

interface TreatmentPlanningProps {
  patient?: Patient;
}

export default function TreatmentPlanning({ patient }: TreatmentPlanningProps) {
  const [treatmentPlan, setTreatmentPlan] = useState<TreatmentPlan>({
    primaryDiagnosis: '',
    secondaryDiagnoses: [],
    treatmentGoals: [],
    interventions: [],
    medications: [],
    lifestyle: '',
    followUpPlan: '',
    emergencyInstructions: '',
    patientEducation: '',
    expectedOutcome: '',
    riskFactors: [],
    contraindications: ''
  });

  const [newGoal, setNewGoal] = useState<string>('');
  const [newIntervention, setNewIntervention] = useState<string>('');

  const commonTreatmentGoals: string[] = [
    'Symptom relief',
    'Disease management',
    'Prevention of complications',
    'Improve quality of life',
    'Restore function',
    'Pain management',
    'Blood pressure control',
    'Blood sugar control',
    'Weight management',
    'Smoking cessation'
  ];

  const commonInterventions: string[] = [
    'Medication therapy',
    'Physical therapy',
    'Dietary modification',
    'Exercise program',
    'Patient education',
    'Regular monitoring',
    'Lifestyle counseling',
    'Wound care',
    'Pain management',
    'Psychological support'
  ];

  const treatmentTemplates: TreatmentTemplate[] = [
    {
      name: 'Hypertension Management',
      goals: ['Blood pressure control < 130/80', 'Cardiovascular risk reduction'],
      interventions: ['Antihypertensive medication', 'Dietary sodium restriction', 'Regular exercise', 'Weight management'],
      lifestyle: 'Low sodium diet, regular exercise 30min daily, weight management, stress reduction',
      followUp: 'Blood pressure check in 2 weeks, then monthly until controlled'
    },
    {
      name: 'Diabetes Management',
      goals: ['HbA1c < 7%', 'Prevent diabetic complications', 'Maintain healthy weight'],
      interventions: ['Glucose monitoring', 'Medication adherence', 'Diabetic diet', 'Regular exercise'],
      lifestyle: 'Diabetic diet, blood glucose monitoring, foot care, regular exercise',
      followUp: 'HbA1c every 3 months, annual eye exam, annual foot exam'
    },
    {
      name: 'Acute Infection Treatment',
      goals: ['Symptom resolution', 'Complete infection clearance', 'Prevent complications'],
      interventions: ['Antibiotic therapy', 'Symptom management', 'Rest and hydration'],
      lifestyle: 'Adequate rest, increased fluid intake, complete antibiotic course',
      followUp: 'Return if symptoms worsen or persist after treatment completion'
    }
  ];

  const applyTemplate = (template: TreatmentTemplate): void => {
    setTreatmentPlan(prev => ({
      ...prev,
      treatmentGoals: template.goals,
      interventions: template.interventions,
      lifestyle: template.lifestyle,
      followUpPlan: template.followUp
    }));
  };

  const addTreatmentGoal = (): void => {
    if (newGoal.trim()) {
      setTreatmentPlan(prev => ({
        ...prev,
        treatmentGoals: [...prev.treatmentGoals, newGoal.trim()]
      }));
      setNewGoal('');
    }
  };

  const addIntervention = (): void => {
    if (newIntervention.trim()) {
      setTreatmentPlan(prev => ({
        ...prev,
        interventions: [...prev.interventions, newIntervention.trim()]
      }));
      setNewIntervention('');
    }
  };

  const removeGoal = (index: number): void => {
    setTreatmentPlan(prev => ({
      ...prev,
      treatmentGoals: prev.treatmentGoals.filter((_, i) => i !== index)
    }));
  };

  const removeIntervention = (index: number): void => {
    setTreatmentPlan(prev => ({
      ...prev,
      interventions: prev.interventions.filter((_, i) => i !== index)
    }));
  };

  const saveTreatmentPlan = (): void => {
    console.log('Treatment Plan Saved:', treatmentPlan);
    alert('Treatment plan saved successfully!');
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>, action: () => void): void => {
    if (e.key === 'Enter') {
      action();
    }
  };

  const handleInputChange = (field: keyof TreatmentPlan, value: string): void => {
    setTreatmentPlan(prev => ({
      ...prev,
      [field]: value
    }));
  };

  return (
    <div className="space-y-6">
      {/* Patient Info */}
      {patient && (
        <div className="bg-white rounded-lg p-6 shadow-sm">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Treatment Planning</h2>
          <div className="bg-green-50 rounded-lg p-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                <i className="ri-user-fill text-green-600"></i>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">{patient.name}</h3>
                <p className="text-gray-600">{patient.age}yo • {patient.gender} • {patient.chiefComplaint}</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Treatment Templates */}
      <div className="bg-white rounded-lg p-6 shadow-sm">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Treatment Templates</h3>
        <div className="grid md:grid-cols-3 gap-4">
          {treatmentTemplates.map((template, index) => (
            <div key={index} className="border border-gray-200 rounded-lg p-4">
              <h4 className="font-medium text-gray-900 mb-2">{template.name}</h4>
              <p className="text-sm text-gray-600 mb-3">
                Goals: {template.goals.slice(0, 2).join(', ')}...
              </p>
              <button
                onClick={() => applyTemplate(template)}
                className="w-full bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors text-sm cursor-pointer whitespace-nowrap"
              >
                Apply Template
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Primary Diagnosis */}
      <div className="bg-white rounded-lg p-6 shadow-sm">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Primary Diagnosis</h3>
        <input
          type="text"
          value={treatmentPlan.primaryDiagnosis}
          onChange={(e) => handleInputChange('primaryDiagnosis', e.target.value)}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
          placeholder="Enter primary diagnosis..."
        />
      </div>

      {/* Treatment Goals */}
      <div className="bg-white rounded-lg p-6 shadow-sm">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Treatment Goals</h3>
        
        <div className="grid md:grid-cols-2 gap-4 mb-4">
          <div>
            <input
              type="text"
              value={newGoal}
              onChange={(e) => setNewGoal(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
              placeholder="Add treatment goal..."
              onKeyPress={(e) => handleKeyPress(e, addTreatmentGoal)}
            />
          </div>
          <div>
            <button
              onClick={addTreatmentGoal}
              className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors cursor-pointer whitespace-nowrap"
            >
              Add Goal
            </button>
          </div>
        </div>

        <div className="mb-4">
          <h4 className="text-sm font-medium text-gray-700 mb-2">Common Goals:</h4>
          <div className="flex flex-wrap gap-2">
            {commonTreatmentGoals.map((goal) => (
              <button
                key={goal}
                onClick={() => setNewGoal(goal)}
                className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm hover:bg-gray-200 transition-colors cursor-pointer"
              >
                {goal}
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-2">
          {treatmentPlan.treatmentGoals.map((goal, index) => (
            <div key={index} className="flex items-center justify-between bg-green-50 p-3 rounded-lg">
              <span className="text-gray-900">{goal}</span>
              <button
                onClick={() => removeGoal(index)}
                className="text-red-500 hover:text-red-700 cursor-pointer"
              >
                <i className="ri-close-line"></i>
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Interventions */}
      <div className="bg-white rounded-lg p-6 shadow-sm">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Interventions</h3>
        
        <div className="grid md:grid-cols-2 gap-4 mb-4">
          <div>
            <input
              type="text"
              value={newIntervention}
              onChange={(e) => setNewIntervention(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
              placeholder="Add intervention..."
              onKeyPress={(e) => handleKeyPress(e, addIntervention)}
            />
          </div>
          <div>
            <button
              onClick={addIntervention}
              className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors cursor-pointer whitespace-nowrap"
            >
              Add Intervention
            </button>
          </div>
        </div>

        <div className="mb-4">
          <h4 className="text-sm font-medium text-gray-700 mb-2">Common Interventions:</h4>
          <div className="flex flex-wrap gap-2">
            {commonInterventions.map((intervention) => (
              <button
                key={intervention}
                onClick={() => setNewIntervention(intervention)}
                className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm hover:bg-gray-200 transition-colors cursor-pointer"
              >
                {intervention}
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-2">
          {treatmentPlan.interventions.map((intervention, index) => (
            <div key={index} className="flex items-center justify-between bg-blue-50 p-3 rounded-lg">
              <span className="text-gray-900">{intervention}</span>
              <button
                onClick={() => removeIntervention(index)}
                className="text-red-500 hover:text-red-700 cursor-pointer"
              >
                <i className="ri-close-line"></i>
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Lifestyle & Follow-up */}
      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg p-6 shadow-sm">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Lifestyle Modifications</h3>
          <textarea
            value={treatmentPlan.lifestyle}
            onChange={(e) => handleInputChange('lifestyle', e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
            rows={5}
            placeholder="Diet, exercise, lifestyle changes..."
            maxLength={1000}
          />
        </div>

        <div className="bg-white rounded-lg p-6 shadow-sm">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Follow-up Plan</h3>
          <textarea
            value={treatmentPlan.followUpPlan}
            onChange={(e) => handleInputChange('followUpPlan', e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
            rows={5}
            placeholder="Follow-up appointments, monitoring schedule..."
            maxLength={1000}
          />
        </div>
      </div>

      {/* Patient Education & Emergency Instructions */}
      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg p-6 shadow-sm">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Patient Education</h3>
          <textarea
            value={treatmentPlan.patientEducation}
            onChange={(e) => handleInputChange('patientEducation', e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
            rows={4}
            placeholder="Key points to educate patient about their condition and treatment..."
            maxLength={1000}
          />
        </div>

        <div className="bg-white rounded-lg p-6 shadow-sm">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Emergency Instructions</h3>
          <textarea
            value={treatmentPlan.emergencyInstructions}
            onChange={(e) => handleInputChange('emergencyInstructions', e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
            rows={4}
            placeholder="When to seek immediate medical attention..."
            maxLength={1000}
          />
        </div>
      </div>

      {/* Expected Outcome */}
      <div className="bg-white rounded-lg p-6 shadow-sm">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Expected Outcome & Prognosis</h3>
        <textarea
          value={treatmentPlan.expectedOutcome}
          onChange={(e) => handleInputChange('expectedOutcome', e.target.value)}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
          rows={3}
          placeholder="Expected treatment outcomes, recovery timeline, prognosis..."
          maxLength={500}
        />
      </div>

      {/* Save Treatment Plan */}
      <div className="bg-white rounded-lg p-6 shadow-sm">
        <div className="flex justify-between items-center">
          <div>
            <h3 className="text-lg font-semibold text-gray-900">Treatment Plan Summary</h3>
            <p className="text-sm text-gray-600">
              {treatmentPlan.treatmentGoals.length} goals, {treatmentPlan.interventions.length} interventions planned
            </p>
          </div>
          <div className="flex space-x-4">
            <button
              onClick={() => window.print()}
              className="bg-gray-600 text-white px-6 py-3 rounded-lg hover:bg-gray-700 transition-colors flex items-center space-x-2 cursor-pointer whitespace-nowrap"
            >
              <i className="ri-printer-line"></i>
              <span>Print Plan</span>
            </button>
            <button
              onClick={saveTreatmentPlan}
              className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors flex items-center space-x-2 cursor-pointer whitespace-nowrap"
            >
              <i className="ri-save-line"></i>
              <span>Save Treatment Plan</span>
            </button>
          </div>
        </div>
      </div>

      {!patient && (
        <div className="text-center py-12">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <i className="ri-heart-pulse-line text-gray-400 text-2xl"></i>
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">No Patient Selected</h3>
          <p className="text-gray-600">
            Please select a patient from the consultation queue to create a treatment plan.
          </p>
        </div>
      )}
    </div>
  );
}