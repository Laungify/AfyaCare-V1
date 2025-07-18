
'use client';
import { useState } from 'react';

type Patient = {
  id: string;
  name: string;
  nationalId: string;
  phone: string;
  age: number;
  gender: string;
  lastVisit: string;
  photo: string;
};

interface PatientSearchProps {
  onPatientFound: (patient: Patient) => void;
  onNewPatient: () => void;
}

export default function PatientSearch({ onPatientFound, onNewPatient }: PatientSearchProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState<Patient[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [searchPerformed, setSearchPerformed] = useState(false);

  // Mock patient data
  const mockPatients = [
    {
      id: 'PID001',
      name: 'John Mwangi',
      nationalId: '12345678',
      phone: '+254712345678',
      age: 34,
      gender: 'Male',
      lastVisit: '2024-01-15',
      photo: 'https://readdy.ai/api/search-image?query=Professional%20headshot%20of%20an%20African%20man%20in%20his%20thirties%2C%20clean%20background%2C%20medical%20record%20photo%20style&width=80&height=80&seq=patient1&orientation=squarish'
    },
    {
      id: 'PID002',
      name: 'Mary Wanjiku',
      nationalId: '87654321',
      phone: '+254798765432',
      age: 28,
      gender: 'Female',
      lastVisit: '2024-01-10',
      photo: 'https://readdy.ai/api/search-image?query=Professional%20headshot%20of%20an%20African%20woman%20in%20her%20twenties%2C%20clean%20background%2C%20medical%20record%20photo%20style&width=80&height=80&seq=patient2&orientation=squarish'
    },
    {
      id: 'PID003',
      name: 'David Ochieng',
      nationalId: '11223344',
      phone: '+254723456789',
      age: 45,
      gender: 'Male',
      lastVisit: '2024-01-08',
      photo: 'https://readdy.ai/api/search-image?query=Professional%20headshot%20of%20an%20African%20man%20in%20his%20forties%2C%20clean%20background%2C%20medical%20record%20photo%20style&width=80&height=80&seq=patient3&orientation=squarish'
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
        patient.nationalId.includes(searchTerm) ||
        patient.phone.includes(searchTerm)
      );
      setSearchResults(results);
      setIsSearching(false);
    }, 1000);
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
                      <img
                        src={patient.photo}
                        alt={patient.name}
                        className="w-16 h-16 rounded-full object-cover object-top"
                      />
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <h4 className="font-semibold text-gray-900">{patient.name}</h4>
                          <span className="text-sm text-gray-500">ID: {patient.id}</span>
                        </div>
                        <div className="mt-1 text-sm text-gray-600 space-y-1">
                          <p>National ID: {patient.nationalId} • Phone: {patient.phone}</p>
                          <p>{patient.age} years old • {patient.gender} • Last visit: {patient.lastVisit}</p>
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
            <div className="text-center py-8">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <i className="ri-user-search-line text-gray-400 text-2xl"></i>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">No patients found</h3>
              <p className="text-gray-600 mb-4">No existing records match your search criteria.</p>
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
        <div className="text-center py-8 border-t">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">New Patient?</h3>
          <p className="text-gray-600 mb-4">If this is a first-time visit, register a new patient profile.</p>
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
  );
}
