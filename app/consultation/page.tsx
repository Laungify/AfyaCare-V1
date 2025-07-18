
'use client';
import { useState } from 'react';
import Link from 'next/link';
import Header from './Header';
import PatientQueue from './PatientQueue';
import ConsultationInterface from './ConsultationInterface';
import PrescriptionManager from './PrescriptionManager';
import TreatmentPlanning from './TreatmentPlanning';
import ConsultationHistory from './ConsultationHistory';
import DiagnosticOrders from './DiagnosticOrders';
import CommunicationHub from './CommunicationHub';
import PatientStatusManager from './PatientStatusManager';
import QualityAssurance from './QualityAssurance';
import SystemIntegration from './SystemIntegration';

export default function ConsultationPage() {
  const [activeTab, setActiveTab] = useState('queue');
  const [selectedPatient, setSelectedPatient] = useState(null);

  const handlePatientSelect = (patient) => {
    setSelectedPatient(patient);
    setActiveTab('interview');
  };

  const handleConsultationComplete = () => {
    setSelectedPatient(null);
    setActiveTab('queue');
  };

  const handlePatientStatusChange = (newStatus) => {
    if (selectedPatient) {
      setSelectedPatient(prev => ({ ...prev, status: newStatus }));
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Breadcrumb */}
        <nav className="flex items-center space-x-2 text-sm text-gray-600 mb-8">
          <Link href="/" className="hover:text-blue-600">Home</Link>
          <i className="ri-arrow-right-s-line"></i>
          <span className="text-gray-900">Advanced Consultation System</span>
        </nav>

        {/* Enhanced Stats Overview */}
        <div className="grid md:grid-cols-6 gap-4 mb-8">
          <div className="bg-white rounded-lg p-4 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Waiting Patients</p>
                <p className="text-xl font-bold text-blue-600">18</p>
              </div>
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                <i className="ri-team-line text-blue-600"></i>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg p-4 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">In Consultation</p>
                <p className="text-xl font-bold text-green-600">6</p>
              </div>
              <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                <i className="ri-user-voice-line text-green-600"></i>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg p-4 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Prescriptions</p>
                <p className="text-xl font-bold text-orange-600">89</p>
              </div>
              <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
                <i className="ri-medicine-bottle-line text-orange-600"></i>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg p-4 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Lab Orders</p>
                <p className="text-xl font-bold text-purple-600">23</p>
              </div>
              <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                <i className="ri-flask-line text-purple-600"></i>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg p-4 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Critical Alerts</p>
                <p className="text-xl font-bold text-red-600">3</p>
              </div>
              <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
                <i className="ri-alarm-warning-line text-red-600"></i>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg p-4 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">AI Assists</p>
                <p className="text-xl font-bold text-cyan-600">47</p>
              </div>
              <div className="w-10 h-10 bg-cyan-100 rounded-lg flex items-center justify-center">
                <i className="ri-robot-line text-cyan-600"></i>
              </div>
            </div>
          </div>
        </div>

        {/* Enhanced Tab Navigation */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex space-x-1 bg-gray-100 rounded-lg p-1 overflow-x-auto">
            <button
              onClick={() => setActiveTab('queue')}
              className={`px-4 py-2 rounded-md transition-colors cursor-pointer whitespace-nowrap flex items-center space-x-2 text-sm ${
                activeTab === 'queue'
                  ? 'bg-white text-blue-600 shadow-sm'
                  : 'text-gray-600 hover:text-gray-800'
              }`}
            >
              <i className="ri-team-line"></i>
              <span>Patient Queue</span>
            </button>
            <button
              onClick={() => setActiveTab('interview')}
              className={`px-4 py-2 rounded-md transition-colors cursor-pointer whitespace-nowrap flex items-center space-x-2 text-sm ${
                activeTab === 'interview'
                  ? 'bg-white text-blue-600 shadow-sm'
                  : 'text-gray-600 hover:text-gray-800'
              }`}
            >
              <i className="ri-user-voice-line"></i>
              <span>Consultation</span>
            </button>
            <button
              onClick={() => setActiveTab('prescription')}
              className={`px-4 py-2 rounded-md transition-colors cursor-pointer whitespace-nowrap flex items-center space-x-2 text-sm ${
                activeTab === 'prescription'
                  ? 'bg-white text-blue-600 shadow-sm'
                  : 'text-gray-600 hover:text-gray-800'
              }`}
            >
              <i className="ri-medicine-bottle-line"></i>
              <span>AI Prescriptions</span>
            </button>
            <button
              onClick={() => setActiveTab('diagnostics')}
              className={`px-4 py-2 rounded-md transition-colors cursor-pointer whitespace-nowrap flex items-center space-x-2 text-sm ${
                activeTab === 'diagnostics'
                  ? 'bg-white text-blue-600 shadow-sm'
                  : 'text-gray-600 hover:text-gray-800'
              }`}
            >
              <i className="ri-test-tube-line"></i>
              <span>Orders & Referrals</span>
            </button>
            <button
              onClick={() => setActiveTab('treatment')}
              className={`px-4 py-2 rounded-md transition-colors cursor-pointer whitespace-nowrap flex items-center space-x-2 text-sm ${
                activeTab === 'treatment'
                  ? 'bg-white text-blue-600 shadow-sm'
                  : 'text-gray-600 hover:text-gray-800'
              }`}
            >
              <i className="ri-heart-pulse-line"></i>
              <span>Treatment Plans</span>
            </button>
            <button
              onClick={() => setActiveTab('communication')}
              className={`px-4 py-2 rounded-md transition-colors cursor-pointer whitespace-nowrap flex items-center space-x-2 text-sm ${
                activeTab === 'communication'
                  ? 'bg-white text-blue-600 shadow-sm'
                  : 'text-gray-600 hover:text-gray-800'
              }`}
            >
              <i className="ri-message-line"></i>
              <span>Communication</span>
            </button>
            <button
              onClick={() => setActiveTab('history')}
              className={`px-4 py-2 rounded-md transition-colors cursor-pointer whitespace-nowrap flex items-center space-x-2 text-sm ${
                activeTab === 'history'
                  ? 'bg-white text-blue-600 shadow-sm'
                  : 'text-gray-600 hover:text-gray-800'
              }`}
            >
              <i className="ri-history-line"></i>
              <span>History</span>
            </button>
            <button
              onClick={() => setActiveTab('status')}
              className={`px-4 py-2 rounded-md transition-colors cursor-pointer whitespace-nowrap flex items-center space-x-2 text-sm ${
                activeTab === 'status'
                  ? 'bg-white text-blue-600 shadow-sm'
                  : 'text-gray-600 hover:text-gray-800'
              }`}
            >
              <i className="ri-user-settings-line"></i>
              <span>Patient Status</span>
            </button>
            <button
              onClick={() => setActiveTab('quality')}
              className={`px-4 py-2 rounded-md transition-colors cursor-pointer whitespace-nowrap flex items-center space-x-2 text-sm ${
                activeTab === 'quality'
                  ? 'bg-white text-blue-600 shadow-sm'
                  : 'text-gray-600 hover:text-gray-800'
              }`}
            >
              <i className="ri-shield-check-line"></i>
              <span>Quality & Compliance</span>
            </button>
            <button
              onClick={() => setActiveTab('integration')}
              className={`px-4 py-2 rounded-md transition-colors cursor-pointer whitespace-nowrap flex items-center space-x-2 text-sm ${
                activeTab === 'integration'
                  ? 'bg-white text-blue-600 shadow-sm'
                  : 'text-gray-600 hover:text-gray-800'
              }`}
            >
              <i className="ri-links-line"></i>
              <span>System Integration</span>
            </button>
          </div>

          <div className="flex items-center space-x-4">
            <div className="text-right text-sm">
              <p className="text-gray-600" suppressHydrationWarning={true}>
                {new Date().toLocaleDateString()} • {new Date().toLocaleTimeString()}
              </p>
              <p className="text-xs text-gray-500">AI Decision Support: Active</p>
            </div>
            <Link
              href="/diagnostics"
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2 cursor-pointer whitespace-nowrap"
            >
              <i className="ri-flask-line"></i>
              <span>Go to Diagnostics</span>
            </Link>
          </div>
        </div>

        {/* Tab Content */}
        {activeTab === 'queue' && (
          <PatientQueue onPatientSelect={handlePatientSelect} />
        )}

        {activeTab === 'interview' && (
          <ConsultationInterface
            patient={selectedPatient}
            onComplete={handleConsultationComplete}
            onBack={() => setActiveTab('queue')}
          />
        )}

        {activeTab === 'prescription' && (
          <PrescriptionManager patient={selectedPatient} />
        )}

        {activeTab === 'diagnostics' && (
          <DiagnosticOrders
            patient={selectedPatient}
            onComplete={() => alert('Diagnostic orders submitted successfully!')}
          />
        )}

        {activeTab === 'treatment' && (
          <TreatmentPlanning patient={selectedPatient} />
        )}

        {activeTab === 'communication' && (
          <CommunicationHub patient={selectedPatient} />
        )}

        {activeTab === 'history' && (
          <ConsultationHistory />
        )}

        {activeTab === 'status' && (
          <PatientStatusManager
            patient={selectedPatient}
            onStatusChange={handlePatientStatusChange}
          />
        )}

        {activeTab === 'quality' && (
          <QualityAssurance patient={selectedPatient} />
        )}

        {activeTab === 'integration' && (
          <SystemIntegration patient={selectedPatient} />
        )}
      </div>
    </div>
  );
}
