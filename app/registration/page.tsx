'use client';
import { useState } from 'react';
import Link from 'next/link';
import Header from './Header';
import PatientSearch from './PatientSearch';
import RegistrationForm from './RegistrationForm';
import QueueStatus from './QueueStatus';

// Comprehensive Patient interface
export interface Patient {
  id: string;
  name: string;
  firstName?: string;
  lastName?: string;
  age: number;
  dateOfBirth: Date | string;
  gender: 'Male' | 'Female' | 'Other';
  phone: string;
  email?: string;
  address?: string;
  emergencyContact?: string;
  emergencyContactPhone?: string;
  nationalId?: string;
  occupation?: string;
  maritalStatus?: 'Single' | 'Married' | 'Divorced' | 'Widowed';
  nextOfKin?: string;
  nextOfKinPhone?: string;
  allergies?: string[];
  medicalHistory?: string[];
  currentMedications?: string[];
  insuranceProvider?: string;
  insuranceNumber?: string;
  registrationDate?: Date | string;
  registrationTime?: Date | string;
  lastVisit?: Date | string;
  patientType?: 'New' | 'Returning';
  priority?: 'Normal' | 'High' | 'Emergency';
  bloodGroup?: 'A+' | 'A-' | 'B+' | 'B-' | 'AB+' | 'AB-' | 'O+' | 'O-';
  weight?: number;
  height?: number;
  queuePosition?: number;
  vitals?: {
    bloodPressure?: string;
    heartRate?: number;
    temperature?: number;
    respiratoryRate?: number;
    oxygenSaturation?: number;
  };
}

// Search result interface for PatientSearch component
export interface PatientSearchResult {
  id: string;
  name: string;
  age: number;
  phone: string;
  lastVisit?: Date | string;
  patientType: 'New' | 'Returning';
}

// Registration form data interface
export interface RegistrationFormData {
  // Personal Information
  firstName: string;
  lastName: string;
  dateOfBirth: Date | string;
  gender: 'Male' | 'Female' | 'Other';
  phone: string;
  email?: string;
  address?: string;
  nationalId?: string;
  occupation?: string;
  maritalStatus?: 'Single' | 'Married' | 'Divorced' | 'Widowed';
  
  // Emergency Contact
  emergencyContact?: string;
  emergencyContactPhone?: string;
  nextOfKin?: string;
  nextOfKinPhone?: string;
  
  // Medical Information
  allergies?: string[];
  medicalHistory?: string[];
  currentMedications?: string[];
  bloodGroup?: 'A+' | 'A-' | 'B+' | 'B-' | 'AB+' | 'AB-' | 'O+' | 'O-';
  
  // Insurance Information
  insuranceProvider?: string;
  insuranceNumber?: string;
  
  // Visit Information
  visitReason?: string;
  priority?: 'Normal' | 'High' | 'Emergency';
  referredBy?: string;
  
  // Physical Measurements
  weight?: number;
  height?: number;
}

// Queue status interface
export interface QueueInfo {
  position: number;
  estimatedWaitTime: number;
  department: string;
  priority: 'Normal' | 'High' | 'Emergency';
  status: 'Waiting' | 'In Progress' | 'Completed' | 'Called';
  ticketNumber: string;
  timeRegistered: Date | string;
}

// Department status interface
export interface DepartmentStatus {
  id: string;
  name: string;
  waitingCount: number;
  averageWaitTime: number;
  status: 'Available' | 'Busy' | 'Full' | 'Closed';
  statusColor: 'green' | 'yellow' | 'red' | 'gray' | 'blue' | 'purple';
}

// Component Props Interfaces
export interface PatientSearchProps {
  onPatientFound: (patient: Patient) => void;
  onNewPatient: () => void;
}

export interface RegistrationFormProps {
  patient: Patient | null;
  isUpdate: boolean;
  onComplete: (patientData: Patient) => void;
  onBack: () => void;
}

export interface QueueStatusProps {
  patient: Patient;
  onNewRegistration: () => void;
}

// Statistics interface
export interface RegistrationStats {
  newPatients: number;
  returningPatients: number;
  emergencyCases: number;
  totalToday: number;
  totalThisWeek: number;
  totalThisMonth: number;
}

// Step type for the registration process
type RegistrationStep = 'search' | 'register' | 'update' | 'queue';

// Step configuration interface
interface StepConfig {
  id: RegistrationStep;
  title: string;
  description: string;
  icon: string;
}

export default function RegistrationPage() {
  const [currentStep, setCurrentStep] = useState<RegistrationStep>('search');
  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null);
  const [registrationComplete, setRegistrationComplete] = useState<boolean>(false);

  const handlePatientFound = (patient: Patient): void => {
    setSelectedPatient(patient);
    setCurrentStep('update');
  };

  const handleNewPatient = (): void => {
    setSelectedPatient(null);
    setCurrentStep('register');
  };

  const handleRegistrationComplete = (patientData: Patient): void => {
    // Ensure all required fields are present for QueueStatus component
    const completePatientData: Patient = {
      ...patientData,
      dateOfBirth: patientData.dateOfBirth || new Date().toISOString(),
      registrationTime: new Date().toISOString(),
      queuePosition: Math.floor(Math.random() * 20) + 1, // Mock queue position
    };
    
    setSelectedPatient(completePatientData);
    setRegistrationComplete(true);
    setCurrentStep('queue');
  };

  const handleBackToSearch = (): void => {
    setCurrentStep('search');
  };

  const handleNewRegistration = (): void => {
    setCurrentStep('search');
    setSelectedPatient(null);
    setRegistrationComplete(false);
  };

  // Step configurations
  const stepConfigs: StepConfig[] = [
    {
      id: 'search',
      title: 'Patient Search',
      description: 'Search for existing patient or create new',
      icon: 'ri-search-line'
    },
    {
      id: 'register',
      title: 'New Registration',
      description: 'Register new patient',
      icon: 'ri-user-add-line'
    },
    {
      id: 'update',
      title: 'Update Information',
      description: 'Update existing patient information',
      icon: 'ri-user-settings-line'
    },
    {
      id: 'queue',
      title: 'Queue Status',
      description: 'Patient added to queue',
      icon: 'ri-time-line'
    }
  ];

  // Mock data for statistics (replace with actual data fetching)
  const registrationStats: RegistrationStats = {
    newPatients: 42,
    returningPatients: 158,
    emergencyCases: 7,
    totalToday: 207,
    totalThisWeek: 1250,
    totalThisMonth: 5890
  };

  // Mock data for department status (replace with actual data fetching)
  const departmentStatuses: DepartmentStatus[] = [
    {
      id: 'triage',
      name: 'Triage',
      waitingCount: 12,
      averageWaitTime: 15,
      status: 'Available',
      statusColor: 'green'
    },
    {
      id: 'consultation',
      name: 'Consultation',
      waitingCount: 25,
      averageWaitTime: 45,
      status: 'Busy',
      statusColor: 'yellow'
    },
    {
      id: 'laboratory',
      name: 'Laboratory',
      waitingCount: 8,
      averageWaitTime: 30,
      status: 'Available',
      statusColor: 'blue'
    },
    {
      id: 'pharmacy',
      name: 'Pharmacy',
      waitingCount: 15,
      averageWaitTime: 20,
      status: 'Available',
      statusColor: 'purple'
    }
  ];

  const getStepNumber = (step: RegistrationStep): number => {
    switch (step) {
      case 'search':
        return 1;
      case 'register':
      case 'update':
        return 2;
      case 'queue':
        return 3;
      default:
        return 1;
    }
  };

  const getStatusColorClass = (color: DepartmentStatus['statusColor']): string => {
    const colorMap: Record<DepartmentStatus['statusColor'], string> = {
      green: 'bg-green-500',
      yellow: 'bg-yellow-500',
      red: 'bg-red-500',
      blue: 'bg-blue-500',
      purple: 'bg-purple-500',
      gray: 'bg-gray-500'
    };
    return colorMap[color];
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
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    currentStep === 'search' 
                      ? 'bg-blue-600 text-white' 
                      : 'bg-green-600 text-white'
                  }`}>
                    <i className="ri-search-line text-sm"></i>
                  </div>
                  <div className="w-16 h-0.5 bg-gray-300"></div>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    ['register', 'update', 'queue'].includes(currentStep) 
                      ? 'bg-blue-600 text-white' 
                      : 'bg-gray-300'
                  }`}>
                    <i className={`${
                      currentStep === 'update' 
                        ? 'ri-user-settings-line' 
                        : 'ri-user-add-line'
                    } text-sm`}></i>
                  </div>
                  <div className="w-16 h-0.5 bg-gray-300"></div>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    currentStep === 'queue' 
                      ? 'bg-blue-600 text-white' 
                      : 'bg-gray-300'
                  }`}>
                    <i className="ri-time-line text-sm"></i>
                  </div>
                </div>
                <div className="text-sm text-gray-600">
                  Step {getStepNumber(currentStep)} of 3
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
                  onBack={handleBackToSearch}
                />
              )}
              
              {currentStep === 'queue' && selectedPatient && (
                <QueueStatus 
                  patient={selectedPatient}
                  onNewRegistration={handleNewRegistration}
                />
              )}
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Stats */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="text-lg font-semibold mb-4">Today&apos;s Registration</h3>
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-gray-600">New Patients</span>
                  <span className="font-semibold text-blue-600">{registrationStats.newPatients}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Returning Patients</span>
                  <span className="font-semibold text-green-600">{registrationStats.returningPatients}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Emergency Cases</span>
                  <span className="font-semibold text-red-600">{registrationStats.emergencyCases}</span>
                </div>
                <div className="border-t pt-4 mt-4">
                  <div className="flex justify-between">
                    <span className="text-gray-900 font-semibold">Total Today</span>
                    <span className="font-bold text-lg">{registrationStats.totalToday}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Department Status */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="text-lg font-semibold mb-4">Department Status</h3>
              <div className="space-y-3">
                {departmentStatuses.map((department) => (
                  <div key={department.id} className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <div className={`w-3 h-3 ${getStatusColorClass(department.statusColor)} rounded-full`}></div>
                      <span className="text-sm">{department.name}</span>
                    </div>
                    <span className="text-sm text-gray-600">{department.waitingCount} waiting</span>
                  </div>
                ))}
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
                <button 
                  type="button"
                  className="w-full bg-gray-100 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200 transition-colors flex items-center justify-center space-x-2 cursor-pointer whitespace-nowrap"
                >
                  <i className="ri-file-text-line"></i>
                  <span>View Reports</span>
                </button>
                <button 
                  type="button"
                  className="w-full bg-gray-100 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200 transition-colors flex items-center justify-center space-x-2 cursor-pointer whitespace-nowrap"
                >
                  <i className="ri-settings-line"></i>
                  <span>Settings</span>
                </button>
              </div>
            </div>

            {/* Additional Statistics */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="text-lg font-semibold mb-4">Registration Trends</h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">This Week</span>
                  <span className="font-semibold">{registrationStats.totalThisWeek}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">This Month</span>
                  <span className="font-semibold">{registrationStats.totalThisMonth}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Average/Day</span>
                  <span className="font-semibold">{Math.round(registrationStats.totalThisMonth / 30)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}