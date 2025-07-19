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
  registrationTime?: Date | string; // Make this optional
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

// Update the QueueStatusProps interface:
export interface QueueStatusProps {
  patient: Patient;
  onNewRegistration: () => void;
}

export default function QueueStatus({ patient, onNewRegistration }: QueueStatusProps) {
  return (
    <div className="text-center py-8">
      {/* Success Icon */}
      <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
        <i className="ri-check-line text-green-600 text-3xl"></i>
      </div>

      {/* Success Message */}
      <h2 className="text-2xl font-bold text-gray-900 mb-4">Registration Complete!</h2>
      <p className="text-gray-600 mb-8">
        {patient.name} has been successfully registered and added to the triage queue.
      </p>

      {/* Patient Info Card */}
      <div className="bg-gray-50 rounded-lg p-6 mb-8 text-left max-w-md mx-auto">
        <div className="flex items-center space-x-4 mb-4">
          <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
            <i className="ri-user-fill text-blue-600 text-xl"></i>
          </div>
          <div>
            <h3 className="font-semibold text-gray-900">{patient.name}</h3>
            <p className="text-sm text-gray-600">Patient ID: {patient.id}</p>
          </div>
        </div>

        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-gray-600">Registration Time:</span>
            <div className="flex justify-between">
              <span className="text-gray-600">Registration Time:</span>
              <span className="font-medium">
                {patient.registrationTime
                  ? new Date(patient.registrationTime).toLocaleTimeString()
                  : 'N/A'}
              </span>
            </div>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Queue Position:</span>
            <span className="font-medium text-blue-600">#{patient.queuePosition}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Priority Level:</span>
            <span className={`font-medium ${patient.priority === 'Emergency' ? 'text-red-600' :
              patient.priority === 'High' ? 'text-orange-600' : 'text-green-600'
              }`}>
              {patient.priority || 'Normal'} {/* Fallback for undefined */}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Status:</span>
            <span className="font-medium text-orange-600">Waiting for Triage</span>
          </div>
        </div>
      </div>

      {/* Queue Status */}
      <div className="bg-white border border-gray-200 rounded-lg p-6 mb-8 max-w-md mx-auto">
        <h3 className="font-semibold text-gray-900 mb-4">Current Queue Status</h3>
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-red-500 rounded-full"></div>
              <span className="text-sm">Emergency</span>
            </div>
            <span className="text-sm font-medium">2 patients</span>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
              <span className="text-sm">Urgent</span>
            </div>
            <span className="text-sm font-medium">5 patients</span>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              <span className="text-sm">Normal</span>
            </div>
            <span className="text-sm font-medium">12 patients</span>
          </div>
        </div>

        <div className="mt-4 pt-4 border-t">
          <p className="text-sm text-gray-600">
            Estimated wait time: <span className="font-medium">25-30 minutes</span>
          </p>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
        <button
          onClick={() => window.print()}
          className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center space-x-2 cursor-pointer whitespace-nowrap"
        >
          <i className="ri-printer-line"></i>
          <span>Print Queue Ticket</span>
        </button>

        <button
          onClick={onNewRegistration}
          className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors flex items-center justify-center space-x-2 cursor-pointer whitespace-nowrap"
        >
          <i className="ri-user-add-line"></i>
          <span>Register Another Patient</span>
        </button>
      </div>

      {/* Additional Info */}
      <div className="mt-8 text-sm text-gray-600">
        <p>The patient will be called for triage when their turn arrives.</p>
        <p className="mt-2">Queue updates are displayed in real-time across all departments.</p>
      </div>
    </div>
  );
}
