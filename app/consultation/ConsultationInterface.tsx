'use client';
import { useState } from 'react';

interface Patient {
  id: string;
  name: string;
  age: number;
  gender: string;
  chiefComplaint: string;
  triageLevel: string;
  vitals: {
    bp?: string;
    temp?: string;
    pulse?: string;
    spo2?: string;
    [key: string]: any;
  };
  [key: string]: any;
}

interface ConsultationInterfaceProps {
  patient: Patient;
  onComplete: () => void;
  onBack: () => void;
}

export default function ConsultationInterface({ patient, onComplete, onBack }: ConsultationInterfaceProps) {
  type IcdCode = { code: string; description: string };

  const [consultation, setConsultation] = useState<{
    historyOfPresentIllness: string;
    pastMedicalHistory: string;
    familyHistory: string;
    socialHistory: string;
    systemsReview: {
      cardiovascular: boolean;
      respiratory: boolean;
      gastrointestinal: boolean;
      genitourinary: boolean;
      neurological: boolean;
      musculoskeletal: boolean;
      dermatological: boolean;
      psychiatric: boolean;
      [key: string]: boolean;
    };
    physicalExamination: {
      general: string;
      vitals: typeof patient.vitals;
      cardiovascular: string;
      respiratory: string;
      abdomen: string;
      neurological: string;
      musculoskeletal: string;
      skin: string;
    };
    assessment: string;
    differentialDiagnosis: string[];
    icdCodes: IcdCode[];
    plan: string;
    followUp: string;
    referrals: string;
    investigations: string[];
    prescriptions: string[];
    patientEducation: string;
    disposition: string;
  }>({
    historyOfPresentIllness: '',
    pastMedicalHistory: '',
    familyHistory: '',
    socialHistory: '',
    systemsReview: {
      cardiovascular: false,
      respiratory: false,
      gastrointestinal: false,
      genitourinary: false,
      neurological: false,
      musculoskeletal: false,
      dermatological: false,
      psychiatric: false
    },
    physicalExamination: {
      general: '',
      vitals: patient?.vitals || {},
      cardiovascular: '',
      respiratory: '',
      abdomen: '',
      neurological: '',
      musculoskeletal: '',
      skin: ''
    },
    assessment: '',
    differentialDiagnosis: [],
    icdCodes: [],
    plan: '',
    followUp: '',
    referrals: '',
    investigations: [],
    prescriptions: [],
    patientEducation: '',
    disposition: 'discharge'
  });

  const [activeSection, setActiveSection] = useState('history');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [icdSearch, setIcdSearch] = useState('');

  // Mock ICD-10 codes
  const icdCodes = [
    { code: 'I20.9', description: 'Angina pectoris, unspecified' },
    { code: 'I25.10', description: 'Atherosclerotic heart disease' },
    { code: 'J44.1', description: 'Chronic obstructive pulmonary disease with exacerbation' },
    { code: 'E11.9', description: 'Type 2 diabetes mellitus without complications' },
    { code: 'I10', description: 'Essential hypertension' },
    { code: 'R50.9', description: 'Fever, unspecified' },
    { code: 'R06.02', description: 'Shortness of breath' },
    { code: 'R10.9', description: 'Unspecified abdominal pain' }
  ];

  const commonInvestigations = [
    'Complete Blood Count (CBC)',
    'Basic Metabolic Panel',
    'Liver Function Tests',
    'Lipid Profile',
    'Chest X-Ray',
    'ECG',
    'Echocardiogram',
    'Urinalysis',
    'Blood Glucose',
    'HbA1c',
    'Thyroid Function Tests',
    'Inflammatory Markers (ESR/CRP)'
  ];

  const sections = [
    { key: 'history', label: 'History', icon: 'ri-file-text-line' },
    { key: 'examination', label: 'Examination', icon: 'ri-stethoscope-line' },
    { key: 'assessment', label: 'Assessment', icon: 'ri-heart-pulse-line' },
    { key: 'plan', label: 'Plan', icon: 'ri-clipboard-line' }
  ];

  type SystemsReviewKey =
    | 'cardiovascular'
    | 'respiratory'
    | 'gastrointestinal'
    | 'genitourinary'
    | 'neurological'
    | 'musculoskeletal'
    | 'dermatological'
    | 'psychiatric';

  const handleSystemsReviewChange = (system: SystemsReviewKey) => {
    setConsultation(prev => ({
      ...prev,
      systemsReview: {
        ...prev.systemsReview,
        [system]: !prev.systemsReview[system]
      }
    }));
  };

  const handleIcdSelect = (code: { code: string; description: string }) => {
    if (!consultation.icdCodes.find(icd => icd.code === code.code)) {
      setConsultation(prev => ({
        ...prev,
        icdCodes: [...prev.icdCodes, code]
      }));
    }
    setIcdSearch('');
  };

  const handleInvestigationToggle = (investigation: string) => {
    setConsultation(prev => ({
      ...prev,
      investigations: prev.investigations.includes(investigation)
        ? prev.investigations.filter(inv => inv !== investigation)
        : [...prev.investigations, investigation]
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      const completedConsultation = {
        ...consultation,
        patientId: patient.id,
        consultationDate: new Date().toISOString(),
        consultingDoctor: 'Dr. Sarah Johnson',
        duration: '45 minutes'
      };
      
      console.log('Consultation Complete:', completedConsultation);
      onComplete();
      setIsSubmitting(false);
    }, 2000);
  };

  if (!patient) {
    return (
      <div className="text-center py-12">
        <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <i className="ri-user-voice-line text-gray-400 text-2xl"></i>
        </div>
        <h3 className="text-lg font-semibold text-gray-900 mb-2">No Patient Selected</h3>
        <p className="text-gray-600 mb-6">Please select a patient from the queue to begin consultation.</p>
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
          <h2 className="text-2xl font-bold text-gray-900">Consultation Interface</h2>
          <button
            onClick={onBack}
            className="text-gray-600 hover:text-gray-800 transition-colors flex items-center space-x-2 cursor-pointer"
          >
            <i className="ri-arrow-left-line"></i>
            <span>Back to Queue</span>
          </button>
        </div>
        
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-blue-50 rounded-lg p-4">
            <div className="flex items-center space-x-3 mb-3">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                <i className="ri-user-fill text-blue-600 text-xl"></i>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900">{patient.name}</h3>
                <p className="text-gray-600">{patient.age}yo • {patient.gender} • ID: {patient.id}</p>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-gray-600">Chief Complaint:</span>
                <p className="font-medium text-gray-900">{patient.chiefComplaint}</p>
              </div>
              <div>
                <span className="text-gray-600">Triage Level:</span>
                <p className="font-medium text-gray-900">{patient.triageLevel}</p>
              </div>
            </div>
          </div>

          <div className="bg-green-50 rounded-lg p-4">
            <h4 className="font-semibold text-gray-900 mb-3">Current Vitals</h4>
            <div className="grid grid-cols-2 gap-3 text-sm">
              <div>
                <span className="text-gray-600">BP:</span>
                <span className="font-medium ml-2">{patient.vitals.bp}</span>
              </div>
              <div>
                <span className="text-gray-600">Temp:</span>
                <span className="font-medium ml-2">{patient.vitals.temp}</span>
              </div>
              <div>
                <span className="text-gray-600">Pulse:</span>
                <span className="font-medium ml-2">{patient.vitals.pulse}</span>
              </div>
              <div>
                <span className="text-gray-600">SpO2:</span>
                <span className="font-medium ml-2">{patient.vitals.spo2}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Section Navigation */}
      <div className="bg-white rounded-lg p-6 shadow-sm">
        <div className="flex space-x-1 bg-gray-100 rounded-lg p-1">
          {sections.map((section) => (
            <button
              key={section.key}
              onClick={() => setActiveSection(section.key)}
              className={`flex-1 flex items-center justify-center space-x-2 px-4 py-2 rounded-md transition-colors cursor-pointer whitespace-nowrap ${
                activeSection === section.key
                  ? 'bg-white text-blue-600 shadow-sm'
                  : 'text-gray-600 hover:text-gray-800'
              }`}
            >
              <i className={`${section.icon} text-sm`}></i>
              <span className="text-sm font-medium">{section.label}</span>
            </button>
          ))}
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        {/* History Section */}
        {activeSection === 'history' && (
          <div className="space-y-6">
            <div className="bg-white rounded-lg p-6 shadow-sm">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">History of Present Illness</h3>
              <textarea
                value={consultation.historyOfPresentIllness}
                onChange={(e) => setConsultation(prev => ({ ...prev, historyOfPresentIllness: e.target.value }))}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                rows={6}
                placeholder="Describe the onset, duration, character, location, radiation, severity, and aggravating/relieving factors of the presenting complaint..."
                maxLength={1000}
              ></textarea>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white rounded-lg p-6 shadow-sm">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Past Medical History</h3>
                <textarea
                  value={consultation.pastMedicalHistory}
                  onChange={(e) => setConsultation(prev => ({ ...prev, pastMedicalHistory: e.target.value }))}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                  rows={6}
                  placeholder="Previous illnesses, surgeries, hospitalizations..."
                  maxLength={500}
                ></textarea>
              </div>

              <div className="bg-white rounded-lg p-6 shadow-sm">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Family History</h3>
                <textarea
                  value={consultation.familyHistory}
                  onChange={(e) => setConsultation(prev => ({ ...prev, familyHistory: e.target.value }))}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                  rows={4}
                  placeholder="Family history of significant diseases..."
                  maxLength={500}
                ></textarea>
              </div>
            </div>

            <div className="bg-white rounded-lg p-6 shadow-sm">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Systems Review</h3>
              <div className="grid md:grid-cols-4 gap-4">
                {Object.keys(consultation.systemsReview).map((system) => (
                  <label
                    key={system}
                    className={`flex items-center p-3 rounded-lg border cursor-pointer transition-colors ${
                      consultation.systemsReview[system]
                        ? 'bg-blue-50 border-blue-500 text-blue-700'
                        : 'border-gray-300 hover:border-gray-400'
                    }`}
                  >
                    <input
                      type="checkbox"
                      checked={consultation.systemsReview[system]}
                      onChange={() => handleSystemsReviewChange( system as SystemsReviewKey)}
                      className="mr-2"
                    />
                    <span className="text-sm capitalize">{system}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Physical Examination Section */}
        {activeSection === 'examination' && (
          <div className="space-y-6">
            <div className="bg-white rounded-lg p-6 shadow-sm">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">General Examination</h3>
              <textarea
                value={consultation.physicalExamination.general}
                onChange={(e) => setConsultation(prev => ({
                  ...prev,
                  physicalExamination: { ...prev.physicalExamination, general: e.target.value }
                }))}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                rows={3}
                placeholder="General appearance, mental state, nutrition, hydration..."
                maxLength={500}
              ></textarea>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white rounded-lg p-6 shadow-sm">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Cardiovascular</h3>
                <textarea
                  value={consultation.physicalExamination.cardiovascular}
                  onChange={(e) => setConsultation(prev => ({
                    ...prev,
                    physicalExamination: { ...prev.physicalExamination, cardiovascular: e.target.value }
                  }))}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                  rows={3}
                  placeholder="Heart sounds, murmurs, peripheral pulses..."
                  maxLength={300}
                ></textarea>
              </div>

              <div className="bg-white rounded-lg p-6 shadow-sm">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Respiratory</h3>
                <textarea
                  value={consultation.physicalExamination.respiratory}
                  onChange={(e) => setConsultation(prev => ({
                    ...prev,
                    physicalExamination: { ...prev.physicalExamination, respiratory: e.target.value }
                  }))}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                  rows={3}
                  placeholder="Inspection, palpation, percussion, auscultation..."
                  maxLength={300}
                ></textarea>
              </div>

              <div className="bg-white rounded-lg p-6 shadow-sm">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Abdomen</h3>
                <textarea
                  value={consultation.physicalExamination.abdomen}
                  onChange={(e) => setConsultation(prev => ({
                    ...prev,
                    physicalExamination: { ...prev.physicalExamination, abdomen: e.target.value }
                  }))}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                  rows={3}
                  placeholder="Inspection, palpation, bowel sounds, organomegaly..."
                  maxLength={300}
                ></textarea>
              </div>

              <div className="bg-white rounded-lg p-6 shadow-sm">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Neurological</h3>
                <textarea
                  value={consultation.physicalExamination.neurological}
                  onChange={(e) => setConsultation(prev => ({
                    ...prev,
                    physicalExamination: { ...prev.physicalExamination, neurological: e.target.value }
                  }))}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                  rows={3}
                  placeholder="Cranial nerves, motor, sensory, reflexes..."
                  maxLength={300}
                ></textarea>
              </div>
            </div>
          </div>
        )}

        {/* Assessment Section */}
        {activeSection === 'assessment' && (
          <div className="space-y-6">
            <div className="bg-white rounded-lg p-6 shadow-sm">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Clinical Assessment</h3>
              <textarea
                value={consultation.assessment}
                onChange={(e) => setConsultation(prev => ({ ...prev, assessment: e.target.value }))}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                rows={4}
                placeholder="Clinical impression and reasoning..."
                maxLength={500}
              ></textarea>
            </div>

            <div className="bg-white rounded-lg p-6 shadow-sm">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">ICD-10 Diagnosis Codes</h3>
              <div className="mb-4">
                <input
                  type="text"
                  value={icdSearch}
                  onChange={(e) => setIcdSearch(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                  placeholder="Search ICD-10 codes..."
                />
                {icdSearch && (
                  <div className="mt-2 border border-gray-300 rounded-lg max-h-48 overflow-y-auto">
                    {icdCodes
                      .filter(code => 
                        code.code.toLowerCase().includes(icdSearch.toLowerCase()) ||
                        code.description.toLowerCase().includes(icdSearch.toLowerCase())
                      )
                      .map((code) => (
                        <button
                          key={code.code}
                          type="button"
                          onClick={() => handleIcdSelect(code)}
                          className="w-full text-left px-4 py-2 hover:bg-gray-50 border-b border-gray-100 cursor-pointer"
                        >
                          <div className="font-medium text-blue-600">{code.code}</div>
                          <div className="text-sm text-gray-600">{code.description}</div>
                        </button>
                      ))}
                  </div>
                )}
              </div>
              
              <div className="space-y-2">
                {consultation.icdCodes.map((code, index) => (
                  <div key={index} className="flex items-center justify-between bg-blue-50 p-3 rounded-lg">
                    <div>
                      <span className="font-medium text-blue-600">{code.code}</span>
                      <span className="text-gray-700 ml-2">{code.description}</span>
                    </div>
                    <button
                      type="button"
                      onClick={() => setConsultation(prev => ({
                        ...prev,
                        icdCodes: prev.icdCodes.filter((_, i) => i !== index)
                      }))}
                      className="text-red-500 hover:text-red-700 cursor-pointer"
                    >
                      <i className="ri-close-line"></i>
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Plan Section */}
        {activeSection === 'plan' && (
          <div className="space-y-6">
            <div className="bg-white rounded-lg p-6 shadow-sm">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Treatment Plan</h3>
              <textarea
                value={consultation.plan}
                onChange={(e) => setConsultation(prev => ({ ...prev, plan: e.target.value }))}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                rows={4}
                placeholder="Treatment plan and management approach..."
                maxLength={500}
              ></textarea>
            </div>

            <div className="bg-white rounded-lg p-6 shadow-sm">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Investigations Required</h3>
              <div className="grid md:grid-cols-3 gap-3">
                {commonInvestigations.map((investigation) => (
                  <label
                    key={investigation}
                    className={`flex items-center p-3 rounded-lg border cursor-pointer transition-colors ${
                      consultation.investigations.includes(investigation)
                        ? 'bg-blue-50 border-blue-500 text-blue-700'
                        : 'border-gray-300 hover:border-gray-400'
                    }`}
                  >
                    <input
                      type="checkbox"
                      checked={consultation.investigations.includes(investigation)}
                      onChange={() => handleInvestigationToggle(investigation)}
                      className="mr-2"
                    />
                    <span className="text-sm">{investigation}</span>
                  </label>
                ))}
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white rounded-lg p-6 shadow-sm">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Follow-up Instructions</h3>
                <textarea
                  value={consultation.followUp}
                  onChange={(e) => setConsultation(prev => ({ ...prev, followUp: e.target.value }))}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                  rows={3}
                  placeholder="Follow-up appointments, monitoring requirements..."
                  maxLength={300}
                ></textarea>
              </div>

              <div className="bg-white rounded-lg p-6 shadow-sm">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Patient Disposition</h3>
                <div className="space-y-2">
                  {[
                    { value: 'discharge', label: 'Discharge Home' },
                    { value: 'admit', label: 'Admit to Ward' },
                    { value: 'observation', label: 'Observation Unit' },
                    { value: 'icu', label: 'ICU Admission' },
                    { value: 'refer', label: 'Refer to Specialist' }
                  ].map((option) => (
                    <label key={option.value} className="flex items-center cursor-pointer">
                      <input
                        type="radio"
                        name="disposition"
                        value={option.value}
                        checked={consultation.disposition === option.value}
                        onChange={(e) => setConsultation(prev => ({ ...prev, disposition: e.target.value }))}
                        className="mr-2"
                      />
                      <span>{option.label}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Form Actions */}
        <div className="bg-white rounded-lg p-6 shadow-sm">
          <div className="flex justify-between items-center">
            <div className="text-sm text-gray-600">
              <p>Consultation will be saved and patient will be processed according to the treatment plan.</p>
              {consultation.investigations.length > 0 && (
                <p className="mt-1">Selected investigations will be sent to diagnostics department.</p>
              )}
            </div>
            <button
              type="submit"
              disabled={isSubmitting || !consultation.assessment}
              className="bg-green-600 text-white px-8 py-3 rounded-lg hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center space-x-2 cursor-pointer whitespace-nowrap"
            >
              {isSubmitting ? (
                <>
                  <i className="ri-loader-4-line animate-spin"></i>
                  <span>Saving...</span>
                </>
              ) : (
                <>
                  <i className="ri-check-line"></i>
                  <span>Complete Consultation</span>
                </>
              )}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}