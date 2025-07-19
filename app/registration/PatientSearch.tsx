'use client';
import { useState } from 'react';
import Image from 'next/image';

// Import or redefine the Patient type to match the main interface
interface Patient {
  id: string;
  name: string;
  firstName?: string;
  lastName?: string;
  age: number;
  dateOfBirth: Date | string; // Match main interface
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
  registrationTime?: Date | string; // Fixed to match main interface
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

interface PatientSearchProps {
  onPatientFound: (patient: Patient) => void; // Fixed: removed null option to match main interface
  onNewPatient: () => void;
}

export default function PatientSearch({ onPatientFound, onNewPatient }: PatientSearchProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState<Patient[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [searchPerformed, setSearchPerformed] = useState(false);

  // Mock patient data - updated to match the full Patient interface
  const mockPatients: Patient[] = [
    {
      id: 'PID001',
      name: 'John Mwangi',
      firstName: 'John',
      lastName: 'Mwangi',
      nationalId: '12345678',
      phone: '+254712345678',
      age: 34,
      dateOfBirth: '1990-01-15',
      gender: 'Male',
      lastVisit: '2024-01-15',
      patientType: 'Returning',
      email: 'john.mwangi@email.com',
      address: '123 Nairobi Street, Nairobi',
      occupation: 'Engineer',
      maritalStatus: 'Married',
      emergencyContact: 'Jane Mwangi',
      emergencyContactPhone: '+254711111111',
      bloodGroup: 'A+',
      allergies: ['Penicillin'],
      medicalHistory: ['Hypertension'],
      currentMedications: ['Lisinopril'],
      insuranceProvider: 'NHIF',
      insuranceNumber: 'NHIF123456',
    },
    {
      id: 'PID002',
      name: 'Mary Wanjiku',
      firstName: 'Mary',
      lastName: 'Wanjiku',
      nationalId: '87654321',
      phone: '+254798765432',
      age: 28,
      dateOfBirth: '1996-03-22',
      gender: 'Female',
      lastVisit: '2024-01-10',
      patientType: 'Returning',
      email: 'mary.wanjiku@email.com',
      address: '456 Mombasa Road, Nairobi',
      occupation: 'Teacher',
      maritalStatus: 'Single',
      emergencyContact: 'Peter Wanjiku',
      emergencyContactPhone: '+254722222222',
      bloodGroup: 'B+',
      allergies: [],
      medicalHistory: ['Diabetes Type 2'],
      currentMedications: ['Metformin'],
      insuranceProvider: 'AAR',
      insuranceNumber: 'AAR789012',
    },
    {
      id: 'PID003',
      name: 'David Ochieng',
      firstName: 'David',
      lastName: 'Ochieng',
      nationalId: '11223344',
      phone: '+254723456789',
      age: 45,
      dateOfBirth: '1979-07-08',
      gender: 'Male',
      lastVisit: '2024-01-08',
      patientType: 'Returning',
      email: 'david.ochieng@email.com',
      address: '789 Kisumu Road, Kisumu',
      occupation: 'Doctor',
      maritalStatus: 'Married',
      emergencyContact: 'Grace Ochieng',
      emergencyContactPhone: '+254733333333',
      bloodGroup: 'O+',
      allergies: ['Aspirin', 'Shellfish'],
      medicalHistory: ['Asthma', 'High Cholesterol'],
      currentMedications: ['Albuterol', 'Atorvastatin'],
      insuranceProvider: 'Madison',
      insuranceNumber: 'MAD345678',
    }
  ];

  const handleSearch = () => {
    if (!searchTerm.trim()) return;

    setIsSearching(true);
    setSearchPerformed(true);

    // Simulate API call
    setTimeout(() => {
      const results = mockPatients.filter(patient =>
        patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        patient.nationalId?.includes(searchTerm) ||
        patient.phone.includes(searchTerm)
      );
      setSearchResults(results);
      setIsSearching(false);
    }, 1000);
  };

  const getPatientPhoto = (patientId: string, name: string) => {
    // Generate a consistent photo URL based on patient data
    const photoMap: Record<string, string> = {
      'PID001': 'https://readdy.ai/api/search-image?query=Professional%20headshot%20of%20an%20African%20man%20in%20his%20thirties%2C%20clean%20background%2C%20medical%20record%20photo%20style&width=80&height=80&seq=patient1&orientation=squarish',
      'PID002': 'https://readdy.ai/api/search-image?query=Professional%20headshot%20of%20an%20African%20woman%20in%20her%20twenties%2C%20clean%20background%2C%20medical%20record%20photo%20style&width=80&height=80&seq=patient2&orientation=squarish',
      'PID003': 'https://readdy.ai/api/search-image?query=Professional%20headshot%20of%20an%20African%20man%20in%20his%20forties%2C%20clean%20background%2C%20medical%20record%20photo%20style&width=80&height=80&seq=patient3&orientation=squarish'
    };
    return photoMap[patientId] || `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&size=80&background=f3f4f6&color=374151`;
  };

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString();
  };

  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Patient Search</h2>

      {/* Search Options */}
      <div className="grid md:grid-cols-3 gap-4 mb-8">
        <div className="text-center p-4 border-2 border-dashed border-gray-300 rounded-lg">
          <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-3">
            <i className="ri-user-search-line text-blue-600 text-xl"></i>
          </div>
          <h3 className="font-semibold text-gray-900 mb-2">Search by Name/ID</h3>
          <p className="text-sm text-gray-600">Find existing patient records</p>
        </div>

        <div className="text-center p-4 border-2 border-dashed border-gray-300 rounded-lg">
          <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-3">
            <i className="ri-fingerprint-line text-green-600 text-xl"></i>
          </div>
          <h3 className="font-semibold text-gray-900 mb-2">Biometric Scan</h3>
          <p className="text-sm text-gray-600">Use fingerprint to identify</p>
        </div>

        <div className="text-center p-4 border-2 border-dashed border-gray-300 rounded-lg">
          <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-3">
            <i className="ri-qr-scan-line text-purple-600 text-xl"></i>
          </div>
          <h3 className="font-semibold text-gray-900 mb-2">QR Code Scan</h3>
          <p className="text-sm text-gray-600">Scan patient QR code</p>
        </div>
      </div>

      {/* Search Form */}
      <div className="bg-gray-50 rounded-lg p-6 mb-6">
        <div className="flex space-x-4">
          <div className="flex-1">
            <input
              type="text"
              placeholder="Enter name, National ID, or phone number..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
            />
          </div>
          <button
            onClick={handleSearch}
            disabled={isSearching || !searchTerm.trim()}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center space-x-2 whitespace-nowrap cursor-pointer"
          >
            {isSearching ? (
              <>
                <i className="ri-loader-4-line animate-spin"></i>
                <span>Searching...</span>
              </>
            ) : (
              <>
                <i className="ri-search-line"></i>
                <span>Search</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Search Results */}
      {searchPerformed && (
        <div className="mb-6">
          {searchResults.length > 0 ? (
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Found {searchResults.length} patient{searchResults.length !== 1 ? 's' : ''}
              </h3>
              <div className="space-y-3">
                {searchResults.map((patient) => (
                  <div
                    key={patient.id}
                    className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow cursor-pointer"
                    onClick={() => onPatientFound(patient)}
                  >
                    <div className="flex items-center space-x-4">
                      <div className="relative w-16 h-16 rounded-full overflow-hidden bg-gray-200">
                        <Image
                          src={getPatientPhoto(patient.id, patient.name)}
                          alt={`${patient.name} profile photo`}
                          fill
                          sizes="64px"
                          className="object-cover object-center"
                          onError={(e) => {
                            const target = e.target as HTMLImageElement;
                            target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(patient.name)}&size=64&background=f3f4f6&color=374151`;
                          }}
                        />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <div>
                            <h4 className="font-semibold text-gray-900">{patient.name}</h4>
                            <div className="flex items-center space-x-2 mt-1">
                              <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${patient.patientType === 'New'
                                  ? 'bg-green-100 text-green-800'
                                  : 'bg-blue-100 text-blue-800'
                                }`}>
                                {patient.patientType}
                              </span>
                              {patient.priority && patient.priority !== 'Normal' && (
                                <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${patient.priority === 'Emergency'
                                    ? 'bg-red-100 text-red-800'
                                    : 'bg-yellow-100 text-yellow-800'
                                  }`}>
                                  {patient.priority}
                                </span>
                              )}
                            </div>
                          </div>
                          <span className="text-sm text-gray-500">ID: {patient.id}</span>
                        </div>
                        <div className="mt-2 text-sm text-gray-600 space-y-1">
                          <div className="flex items-center space-x-4">
                            <p>National ID: {patient.nationalId}</p>
                            <p>Phone: {patient.phone}</p>
                          </div>
                          <div className="flex items-center space-x-4">
                            <p>{patient.age} years old ({formatDate(patient.dateOfBirth as string)})</p>
                            <p>{patient.gender}</p>
                            {patient.lastVisit && <p>Last visit: {formatDate(patient.lastVisit as string)}</p>}
                          </div>
                          {patient.address && (
                            <p className="text-gray-500">{patient.address}</p>
                          )}
                        </div>
                      </div>
                      <div className="text-right">
                        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors text-sm whitespace-nowrap cursor-pointer">
                          Select Patient
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="text-center py-12 bg-gray-50 rounded-lg">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <i className="ri-user-search-line text-gray-400 text-2xl"></i>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">No patients found</h3>
              <p className="text-gray-600 mb-6">
                No existing records match &quot;{searchTerm}&quot;. Would you like to register a new patient?
              </p>
              <button
                onClick={onNewPatient}
                className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors flex items-center space-x-2 mx-auto whitespace-nowrap cursor-pointer"
              >
                <i className="ri-user-add-line"></i>
                <span>Register New Patient</span>
              </button>
            </div>
          )}
        </div>
      )}

      {/* New Patient Option */}
      {!searchPerformed && (
        <div className="text-center py-12 border-t border-gray-200">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <i className="ri-user-add-line text-green-600 text-2xl"></i>
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">New Patient Registration</h3>
          <p className="text-gray-600 mb-6">
            If this is a first-time visit, register a new patient profile to get started.
          </p>
          <button
            onClick={onNewPatient}
            className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors flex items-center space-x-2 mx-auto whitespace-nowrap cursor-pointer"
          >
            <i className="ri-user-add-line"></i>
            <span>Register New Patient</span>
          </button>
        </div>
      )}

      {/* Quick Search Tips */}
      <div className="mt-8 bg-blue-50 rounded-lg p-4">
        <h4 className="font-medium text-blue-900 mb-2">Search Tips:</h4>
        <ul className="text-sm text-blue-800 space-y-1">
          <li>• Search by full name (e.g., "John Mwangi")</li>
          <li>• Use National ID number for exact matches</li>
          <li>• Phone numbers work with or without country code</li>
          <li>• Partial names will show all matching results</li>
        </ul>
      </div>
    </div>
  );
}