'use client';
import { useState } from 'react';

interface Patient {
  id: string;
  name: string;
  age: number;
  gender: string;
  reason?: string;
  arrivalTime?: string;
  waitTime?: string;
  vitals?: {
    bp?: string;
    temp?: string;
    pulse?: string;
  };
}

interface TriageAssessmentProps {
  patient: Patient | null; // Allow null patient
  onComplete: () => void;
  onBack: () => void;
}

export default function TriageAssessment({ patient, onComplete, onBack }: TriageAssessmentProps) {
  interface AssessmentState {
    chiefComplaint: string;
    painLevel: string | number;
    vitalSigns: {
      bloodPressure: string;
      temperature: string;
      pulse: string;
      respiratoryRate: string;
      oxygenSaturation: string;
      weight: string;
      height: string;
    };
    symptoms: string[];
    mentalStatus: string;
    mobility: string;
    allergies: string;
    currentMedications: string;
    triageCategory: string;
    department: string;
    notes: string;
    urgencyScore: number;
  }

  const [assessment, setAssessment] = useState<AssessmentState>({
    chiefComplaint: patient?.reason || '',
    painLevel: '',
    vitalSigns: {
      bloodPressure: patient?.vitals?.bp || '',
      temperature: patient?.vitals?.temp || '',
      pulse: patient?.vitals?.pulse || '',
      respiratoryRate: '',
      oxygenSaturation: '',
      weight: '',
      height: ''
    },
    symptoms: [],
    mentalStatus: 'Alert',
    mobility: 'Independent',
    allergies: '',
    currentMedications: '',
    triageCategory: '',
    department: '',
    notes: '',
    urgencyScore: 0
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const symptomsList = [
    'Fever', 'Headache', 'Nausea', 'Vomiting', 'Dizziness', 'Fatigue',
    'Chest Pain', 'Shortness of Breath', 'Abdominal Pain', 'Back Pain',
    'Cough', 'Sore Throat', 'Rash', 'Swelling', 'Numbness', 'Confusion'
  ];

  const triageCategories = [
    { value: 'Level 1', label: 'Resuscitation - Immediate', color: 'text-red-600', urgency: 1 },
    { value: 'Level 2', label: 'Emergency - 10 minutes', color: 'text-orange-600', urgency: 2 },
    { value: 'Level 3', label: 'Urgent - 30 minutes', color: 'text-yellow-600', urgency: 3 },
    { value: 'Level 4', label: 'Semi-urgent - 1 hour', color: 'text-blue-600', urgency: 4 },
    { value: 'Level 5', label: 'Non-urgent - 2 hours', color: 'text-green-600', urgency: 5 }
  ];

  const departments = [
    'Emergency Medicine', 'Internal Medicine', 'Pediatrics', 'Surgery',
    'Orthopedics', 'Cardiology', 'Neurology', 'Psychiatry', 'Obstetrics'
  ];

  const handleSymptomToggle = (symptom: string) => {
    setAssessment(prev => ({
      ...prev,
      symptoms: prev.symptoms.includes(symptom)
        ? prev.symptoms.filter(s => s !== symptom)
        : [...prev.symptoms, symptom]
    }));
  };

  const calculateUrgencyScore = () => {
    let score = 0;
    
    // Pain level scoring
    const painLevelNum = typeof assessment.painLevel === 'number' ? assessment.painLevel : parseInt(assessment.painLevel, 10) || 0;
    if (painLevelNum >= 8) score += 3;
    else if (painLevelNum >= 5) score += 2;
    else if (painLevelNum >= 3) score += 1;
    
    // Vital signs scoring
    const bp = assessment.vitalSigns.bloodPressure;
    const temp = parseFloat(assessment.vitalSigns.temperature);
    const pulse = parseInt(assessment.vitalSigns.pulse);
    
    if (temp >= 39 || temp <= 35) score += 2;
    if (pulse >= 120 || pulse <= 50) score += 2;
    
    // Symptoms scoring
    const criticalSymptoms = ['Chest Pain', 'Shortness of Breath', 'Confusion', 'Severe Pain'];
    const hasCriticalSymptoms = assessment.symptoms.some(s => criticalSymptoms.includes(s));
    if (hasCriticalSymptoms) score += 3;
    
    return Math.min(score, 10);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!patient) return; // Type guard
    
    setIsSubmitting(true);
    
    const urgencyScore = calculateUrgencyScore();
    
    // Simulate API call
    setTimeout(() => {
      const completedAssessment = {
        ...assessment,
        urgencyScore,
        patientId: patient.id,
        assessmentTime: new Date().toISOString(),
        assessedBy: 'Nurse Jane Wanjiru'
      };
      
      console.log('Triage Assessment Complete:', completedAssessment);
      onComplete();
      setIsSubmitting(false);
    }, 2000);
  };

  if (!patient) {
    return (
      <div className="text-center py-12">
        <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <i className="ri-stethoscope-line text-gray-400 text-2xl"></i>
        </div>
        <h3 className="text-lg font-semibold text-gray-900 mb-2">No Patient Selected</h3>
        <p className="text-gray-600 mb-6">Please select a patient from the queue to begin triage assessment.</p>
        <button
          onClick={onBack}
          className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors cursor-pointer whitespace-nowrap"
        >
          Go to Queue
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Patient Header */}
      <div className="bg-white rounded-lg p-6 shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold text-gray-900">Triage Assessment</h2>
          <button
            onClick={onBack}
            className="text-gray-600 hover:text-gray-800 transition-colors flex items-center space-x-2 cursor-pointer"
          >
            <i className="ri-arrow-left-line"></i>
            <span>Back to Queue</span>
          </button>
        </div>
        
        <div className="bg-gray-50 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold text-gray-900">{patient.name}</h3>
              <p className="text-gray-600">
                {patient.age} years old • {patient.gender} • ID: {patient.id}
              </p>
            </div>
            <div className="text-right text-sm text-gray-600">
              <p>Arrival: {patient.arrivalTime}</p>
              <p>Wait time: {patient.waitTime}</p>
            </div>
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Chief Complaint */}
        <div className="bg-white rounded-lg p-6 shadow-sm">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Chief Complaint</h3>
          <textarea
            value={assessment.chiefComplaint}
            onChange={(e) => setAssessment(prev => ({ ...prev, chiefComplaint: e.target.value }))}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
            rows={3}
            placeholder="Patient's primary concern or reason for visit"
            maxLength={500}
            required
          ></textarea>
        </div>

        {/* Pain Assessment */}
        <div className="bg-white rounded-lg p-6 shadow-sm">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Pain Assessment</h3>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Pain Level (0-10 scale)
            </label>
            <div className="flex space-x-2">
              {[...Array(11)].map((_, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => setAssessment(prev => ({ ...prev, painLevel: i }))}
                  className={`w-10 h-10 rounded-lg border-2 font-semibold transition-colors cursor-pointer ${
                    assessment.painLevel === i
                      ? i <= 3 ? 'bg-green-500 text-white border-green-500'
                        : i <= 6 ? 'bg-yellow-500 text-white border-yellow-500'
                        : 'bg-red-500 text-white border-red-500'
                      : 'border-gray-300 hover:border-gray-400'
                  }`}
                >
                  {i}
                </button>
              ))}
            </div>
            <div className="flex justify-between text-xs text-gray-500 mt-2">
              <span>No Pain</span>
              <span>Moderate</span>
              <span>Severe</span>
            </div>
          </div>
        </div>

        {/* Vital Signs */}
        <div className="bg-white rounded-lg p-6 shadow-sm">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Vital Signs</h3>
          <div className="grid md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Blood Pressure (mmHg)
              </label>
              <input
                type="text"
                value={assessment.vitalSigns.bloodPressure}
                onChange={(e) => setAssessment(prev => ({
                  ...prev,
                  vitalSigns: { ...prev.vitalSigns, bloodPressure: e.target.value }
                }))}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                placeholder="120/80"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Temperature (°C)
              </label>
              <input
                type="number"
                step="0.1"
                value={assessment.vitalSigns.temperature}
                onChange={(e) => setAssessment(prev => ({
                  ...prev,
                  vitalSigns: { ...prev.vitalSigns, temperature: e.target.value }
                }))}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                placeholder="36.5"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Pulse (bpm)
              </label>
              <input
                type="number"
                value={assessment.vitalSigns.pulse}
                onChange={(e) => setAssessment(prev => ({
                  ...prev,
                  vitalSigns: { ...prev.vitalSigns, pulse: e.target.value }
                }))}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                placeholder="72"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Respiratory Rate (/min)
              </label>
              <input
                type="number"
                value={assessment.vitalSigns.respiratoryRate}
                onChange={(e) => setAssessment(prev => ({
                  ...prev,
                  vitalSigns: { ...prev.vitalSigns, respiratoryRate: e.target.value }
                }))}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                placeholder="16"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                O2 Saturation (%)
              </label>
              <input
                type="number"
                value={assessment.vitalSigns.oxygenSaturation}
                onChange={(e) => setAssessment(prev => ({
                  ...prev,
                  vitalSigns: { ...prev.vitalSigns, oxygenSaturation: e.target.value }
                }))}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                placeholder="98"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Weight (kg)
              </label>
              <input
                type="number"
                value={assessment.vitalSigns.weight}
                onChange={(e) => setAssessment(prev => ({
                  ...prev,
                  vitalSigns: { ...prev.vitalSigns, weight: e.target.value }
                }))}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                placeholder="70"
              />
            </div>
          </div>
        </div>

        {/* Symptoms */}
        <div className="bg-white rounded-lg p-6 shadow-sm">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Symptoms</h3>
          <div className="grid md:grid-cols-4 gap-3">
            {symptomsList.map((symptom) => (
              <label
                key={symptom}
                className={`flex items-center p-3 rounded-lg border cursor-pointer transition-colors ${
                  assessment.symptoms.includes(symptom)
                    ? 'bg-blue-50 border-blue-500 text-blue-700'
                    : 'border-gray-300 hover:border-gray-400'
                }`}
              >
                <input
                  type="checkbox"
                  checked={assessment.symptoms.includes(symptom)}
                  onChange={() => handleSymptomToggle(symptom)}
                  className="mr-2"
                />
                <span className="text-sm">{symptom}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Triage Category */}
        <div className="bg-white rounded-lg p-6 shadow-sm">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Triage Category</h3>
          <div className="space-y-3">
            {triageCategories.map((category) => (
              <label
                key={category.value}
                className={`flex items-center p-4 rounded-lg border cursor-pointer transition-colors ${
                  assessment.triageCategory === category.value
                    ? 'bg-gray-50 border-gray-500'
                    : 'border-gray-300 hover:border-gray-400'
                }`}
              >
                <input
                  type="radio"
                  name="triageCategory"
                  value={category.value}
                  checked={assessment.triageCategory === category.value}
                  onChange={(e) => setAssessment(prev => ({ 
                    ...prev, 
                    triageCategory: e.target.value,
                    urgencyScore: category.urgency
                  }))}
                  className="mr-3"
                />
                <div>
                  <div className={`font-semibold ${category.color}`}>{category.value}</div>
                  <div className="text-sm text-gray-600">{category.label}</div>
                </div>
              </label>
            ))}
          </div>
        </div>

        {/* Department Assignment */}
        <div className="bg-white rounded-lg p-6 shadow-sm">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Department Assignment</h3>
          <div className="relative">
            <select
              value={assessment.department}
              onChange={(e) => setAssessment(prev => ({ ...prev, department: e.target.value }))}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm pr-8"
              required
            >
              <option value="">Select department</option>
              {departments.map((dept) => (
                <option key={dept} value={dept}>{dept}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Additional Notes */}
        <div className="bg-white rounded-lg p-6 shadow-sm">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Additional Notes</h3>
          <textarea
            value={assessment.notes}
            onChange={(e) => setAssessment(prev => ({ ...prev, notes: e.target.value }))}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
            rows={4}
            placeholder="Any additional observations, concerns, or instructions"
            maxLength={500}
          ></textarea>
        </div>

        {/* Submit Button */}
        <div className="bg-white rounded-lg p-6 shadow-sm">
          <div className="flex justify-between items-center">
            <div className="text-sm text-gray-600">
              <p>Assessment will be saved and patient will be transferred to: <strong>{assessment.department || 'Selected Department'}</strong></p>
              {assessment.triageCategory && (
                <p className="mt-1">Priority: <strong className={triageCategories.find(c => c.value === assessment.triageCategory)?.color}>
                  {assessment.triageCategory}
                </strong></p>
              )}
            </div>
            <button
              type="submit"
              disabled={isSubmitting || !assessment.triageCategory || !assessment.department}
              className="bg-green-600 text-white px-8 py-3 rounded-lg hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center space-x-2 cursor-pointer whitespace-nowrap"
            >
              {isSubmitting ? (
                <>
                  <i className="ri-loader-4-line animate-spin"></i>
                  <span>Completing...</span>
                </>
              ) : (
                <>
                  <i className="ri-check-line"></i>
                  <span>Complete Triage</span>
                </>
              )}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}