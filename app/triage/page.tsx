
'use client';
import { useState } from 'react';
import Link from 'next/link';
import Header from './Header';
import QueueManagement from './QueueManagement';
import TriageAssessment from './TriageAssessment';
import PatientList from './PatientList';

export default function TriagePage() {
  const [activeTab, setActiveTab] = useState('queue');
  // Define a Patient type or import it if already defined elsewhere
  type Patient = {
    id: string;
    name: string;
    // Add other relevant fields as needed
  };

  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null);

  const handlePatientSelect = (patient: Patient) => {
    setSelectedPatient(patient);
    setActiveTab('assessment');
  };

  const handleAssessmentComplete = () => {
    setSelectedPatient(null);
    setActiveTab('queue');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Breadcrumb */}
        <nav className="flex items-center space-x-2 text-sm text-gray-600 mb-8">
          <Link href="/" className="hover:text-blue-600">Home</Link>
          <i className="ri-arrow-right-s-line"></i>
          <span className="text-gray-900">Triage</span>
        </nav>

        {/* Tab Navigation */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex space-x-1 bg-gray-100 rounded-lg p-1">
            <button
              onClick={() => setActiveTab('queue')}
              className={`px-6 py-2 rounded-md transition-colors cursor-pointer whitespace-nowrap flex items-center space-x-2 ${
                activeTab === 'queue'
                  ? 'bg-white text-blue-600 shadow-sm'
                  : 'text-gray-600 hover:text-gray-800'
              }`}
            >
              <i className="ri-list-check-line"></i>
              <span>Queue Management</span>
            </button>
            <button
              onClick={() => setActiveTab('assessment')}
              className={`px-6 py-2 rounded-md transition-colors cursor-pointer whitespace-nowrap flex items-center space-x-2 ${
                activeTab === 'assessment'
                  ? 'bg-white text-blue-600 shadow-sm'
                  : 'text-gray-600 hover:text-gray-800'
              }`}
            >
              <i className="ri-stethoscope-line"></i>
              <span>Triage Assessment</span>
            </button>
            <button
              onClick={() => setActiveTab('patients')}
              className={`px-6 py-2 rounded-md transition-colors cursor-pointer whitespace-nowrap flex items-center space-x-2 ${
                activeTab === 'patients'
                  ? 'bg-white text-blue-600 shadow-sm'
                  : 'text-gray-600 hover:text-gray-800'
              }`}
            >
              <i className="ri-team-line"></i>
              <span>Patient List</span>
            </button>
          </div>

          <div className="flex items-center space-x-4">
            <div className="text-right">
              <p className="text-sm text-gray-600" suppressHydrationWarning={true}>
                {new Date().toLocaleDateString()} • {new Date().toLocaleTimeString()}
              </p>
            </div>
            <Link 
              href="/registration"
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2 cursor-pointer whitespace-nowrap"
            >
              <i className="ri-user-add-line"></i>
              <span>Register Patient</span>
            </Link>
          </div>
        </div>

        {/* Tab Content */}
        {activeTab === 'queue' && (
          <QueueManagement onPatientSelect={handlePatientSelect} />
        )}
        
        {activeTab === 'assessment' && (
          <TriageAssessment 
            patient={selectedPatient}
            onComplete={handleAssessmentComplete}
            onBack={() => setActiveTab('queue')}
          />
        )}
        
        {activeTab === 'patients' && (
          <PatientList onPatientSelect={handlePatientSelect} />
        )}
      </div>
    </div>
  );
}
