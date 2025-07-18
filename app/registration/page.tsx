
'use client';
import { useState } from 'react';
import Link from 'next/link';
import Header from './Header';
import PatientSearch from './PatientSearch';
import RegistrationForm from './RegistrationForm';
import QueueStatus from './QueueStatus';

export default function RegistrationPage() {
  const [currentStep, setCurrentStep] = useState('search');
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [registrationComplete, setRegistrationComplete] = useState(false);

  const handlePatientFound = (patient) => {
    setSelectedPatient(patient);
    setCurrentStep('update');
  };

  const handleNewPatient = () => {
    setSelectedPatient(null);
    setCurrentStep('register');
  };

  const handleRegistrationComplete = (patientData) => {
    setSelectedPatient(patientData);
    setRegistrationComplete(true);
    setCurrentStep('queue');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Breadcrumb */}
        <nav className="flex items-center space-x-2 text-sm text-gray-600 mb-8">
          <Link href="/" className="hover:text-blue-600">Home</Link>
          <i className="ri-arrow-right-s-line"></i>
          <span className="text-gray-900">Patient Registration</span>
        </nav>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Registration Area */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-sm p-6">
              {/* Step Indicator */}
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center space-x-4">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${currentStep === 'search' ? 'bg-blue-600 text-white' : 'bg-green-600 text-white'}`}>
                    <i className="ri-search-line text-sm"></i>
                  </div>
                  <div className="w-16 h-0.5 bg-gray-300"></div>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${['register', 'update', 'queue'].includes(currentStep) ? 'bg-blue-600 text-white' : 'bg-gray-300'}`}>
                    <i className="ri-user-add-line text-sm"></i>
                  </div>
                  <div className="w-16 h-0.5 bg-gray-300"></div>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${currentStep === 'queue' ? 'bg-blue-600 text-white' : 'bg-gray-300'}`}>
                    <i className="ri-time-line text-sm"></i>
                  </div>
                </div>
                <div className="text-sm text-gray-600">
                  Step {currentStep === 'search' ? '1' : currentStep === 'register' || currentStep === 'update' ? '2' : '3'} of 3
                </div>
              </div>

              {/* Step Content */}
              {currentStep === 'search' && (
                <PatientSearch 
                  onPatientFound={handlePatientFound}
                  onNewPatient={handleNewPatient}
                />
              )}
              
              {(currentStep === 'register' || currentStep === 'update') && (
                <RegistrationForm 
                  patient={selectedPatient}
                  isUpdate={currentStep === 'update'}
                  onComplete={handleRegistrationComplete}
                  onBack={() => setCurrentStep('search')}
                />
              )}
              
              {currentStep === 'queue' && (
                <QueueStatus 
                  patient={selectedPatient}
                  onNewRegistration={() => {
                    setCurrentStep('search');
                    setSelectedPatient(null);
                    setRegistrationComplete(false);
                  }}
                />
              )}
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Stats */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="text-lg font-semibold mb-4">Today's Registration</h3>
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-gray-600">New Patients</span>
                  <span className="font-semibold text-blue-600">42</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Returning Patients</span>
                  <span className="font-semibold text-green-600">158</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Emergency Cases</span>
                  <span className="font-semibold text-red-600">7</span>
                </div>
                <div className="border-t pt-4 mt-4">
                  <div className="flex justify-between">
                    <span className="text-gray-900 font-semibold">Total Today</span>
                    <span className="font-bold text-lg">207</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Department Status */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="text-lg font-semibold mb-4">Department Status</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    <span className="text-sm">Triage</span>
                  </div>
                  <span className="text-sm text-gray-600">12 waiting</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                    <span className="text-sm">Consultation</span>
                  </div>
                  <span className="text-sm text-gray-600">25 waiting</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                    <span className="text-sm">Laboratory</span>
                  </div>
                  <span className="text-sm text-gray-600">8 waiting</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
                    <span className="text-sm">Pharmacy</span>
                  </div>
                  <span className="text-sm text-gray-600">15 waiting</span>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="text-lg font-semibold mb-4">Quick Actions</h3>
              <div className="space-y-3">
                <Link 
                  href="/triage" 
                  className="w-full bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center space-x-2 cursor-pointer whitespace-nowrap"
                >
                  <i className="ri-stethoscope-line"></i>
                  <span>Go to Triage</span>
                </Link>
                <button className="w-full bg-gray-100 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200 transition-colors flex items-center justify-center space-x-2 cursor-pointer whitespace-nowrap">
                  <i className="ri-file-text-line"></i>
                  <span>View Reports</span>
                </button>
                <button className="w-full bg-gray-100 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200 transition-colors flex items-center justify-center space-x-2 cursor-pointer whitespace-nowrap">
                  <i className="ri-settings-line"></i>
                  <span>Settings</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
