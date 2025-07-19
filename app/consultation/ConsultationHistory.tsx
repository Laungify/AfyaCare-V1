'use client';
import { useState } from 'react';

type Consultation = {
  id: string;
  patientId: string;
  patientName: string;
  age: number;
  gender: string;
  consultationDate: string;
  consultationTime: string;
  doctor: string;
  department: string;
  chiefComplaint: string;
  diagnosis: string;
  icdCodes: string[];
  treatmentPlan: string;
  prescriptions: string[];
  followUp: string;
  status: string;
  duration: string;
};

export default function ConsultationHistory() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterDoctor, setFilterDoctor] = useState('all');
  const [filterPeriod, setFilterPeriod] = useState('all');
  const [selectedConsultation, setSelectedConsultation] = useState<Consultation | null>(null);

  // Mock consultation history data
  const consultationHistory = [
    {
      id: 'CONS001',
      patientId: 'PID001',
      patientName: 'John Mwangi',
      age: 34,
      gender: 'Male',
      consultationDate: '2024-01-15',
      consultationTime: '14:30',
      doctor: 'Dr. Sarah Johnson',
      department: 'Cardiology',
      chiefComplaint: 'Chest pain and shortness of breath',
      diagnosis: 'Unstable Angina',
      icdCodes: ['I20.0'],
      treatmentPlan: 'Started on dual antiplatelet therapy, beta-blocker, and statin. Scheduled for cardiac catheterization.',
      prescriptions: [
        'Aspirin 100mg daily',
        'Clopidogrel 75mg daily',
        'Metoprolol 50mg BD',
        'Atorvastatin 40mg daily'
      ],
      followUp: 'Cardiology follow-up in 1 week',
      status: 'completed',
      duration: '45 minutes'
    },
    {
      id: 'CONS002',
      patientId: 'PID002',
      patientName: 'Mary Wanjiku',
      age: 28,
      gender: 'Female',
      consultationDate: '2024-01-15',
      consultationTime: '15:15',
      doctor: 'Dr. Grace Kiprotich',
      department: 'Obstetrics',
      chiefComplaint: 'Routine prenatal checkup',
      diagnosis: 'Normal pregnancy at 28 weeks',
      icdCodes: ['Z34.00'],
      treatmentPlan: 'Continue routine prenatal care. Increased iron supplementation for mild anemia.',
      prescriptions: [
        'Folic acid 5mg daily',
        'Iron sulfate 200mg BD',
        'Calcium carbonate 600mg daily'
      ],
      followUp: 'Prenatal visit in 4 weeks',
      status: 'completed',
      duration: '30 minutes'
    },
    {
      id: 'CONS003',
      patientId: 'PID003',
      patientName: 'David Ochieng',
      age: 45,
      gender: 'Male',
      consultationDate: '2024-01-14',
      consultationTime: '11:00',
      doctor: 'Dr. Peter Kamau',
      department: 'Surgery',
      chiefComplaint: 'Severe abdominal pain',
      diagnosis: 'Acute Cholecystitis',
      icdCodes: ['K80.0'],
      treatmentPlan: 'Emergency laparoscopic cholecystectomy performed. Post-operative care and monitoring.',
      prescriptions: [
        'Tramadol 50mg QDS PRN',
        'Omeprazole 20mg daily',
        'Cefuroxime 750mg BD'
      ],
      followUp: 'Surgical follow-up in 1 week',
      status: 'completed',
      duration: '60 minutes'
    },
    {
      id: 'CONS004',
      patientId: 'PID004',
      patientName: 'Grace Kiprotich',
      age: 32,
      gender: 'Female',
      consultationDate: '2024-01-14',
      consultationTime: '16:45',
      doctor: 'Dr. Alice Wanjiku',
      department: 'Internal Medicine',
      chiefComplaint: 'Allergic reaction and rash',
      diagnosis: 'Food Allergy - Shellfish',
      icdCodes: ['T78.1'],
      treatmentPlan: 'Antihistamine therapy, dietary avoidance counseling, prescribed EpiPen for emergencies.',
      prescriptions: [
        'Cetirizine 10mg daily',
        'Prednisolone 20mg for 5 days',
        'EpiPen Auto-injector'
      ],
      followUp: 'Allergy specialist referral',
      status: 'completed',
      duration: '25 minutes'
    },
    {
      id: 'CONS005',
      patientId: 'PID005',
      patientName: 'Samuel Muthoni',
      age: 67,
      gender: 'Male',
      consultationDate: '2024-01-13',
      consultationTime: '09:30',
      doctor: 'Dr. Sarah Johnson',
      department: 'Endocrinology',
      chiefComplaint: 'Diabetes follow-up',
      diagnosis: 'Type 2 Diabetes Mellitus - Well Controlled',
      icdCodes: ['E11.9'],
      treatmentPlan: 'Continue current diabetes management. Added ACE inhibitor for cardiovascular protection.',
      prescriptions: [
        'Metformin 1000mg BD',
        'Glibenclamide 5mg BD',
        'Lisinopril 10mg daily'
      ],
      followUp: 'Diabetes clinic in 3 months',
      status: 'completed',
      duration: '35 minutes'
    }
  ];

  const doctors = [
    'Dr. Sarah Johnson',
    'Dr. Peter Kamau',
    'Dr. Grace Kiprotich',
    'Dr. Alice Wanjiku'
  ];

  const filteredHistory = consultationHistory.filter(consultation => {
    const searchMatch = consultation.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                       consultation.diagnosis.toLowerCase().includes(searchTerm.toLowerCase()) ||
                       consultation.chiefComplaint.toLowerCase().includes(searchTerm.toLowerCase());
    
    const doctorMatch = filterDoctor === 'all' || consultation.doctor === filterDoctor;
    
    const periodMatch = filterPeriod === 'all' || 
                       (filterPeriod === 'today' && consultation.consultationDate === '2024-01-15') ||
                       (filterPeriod === 'week' && ['2024-01-13', '2024-01-14', '2024-01-15'].includes(consultation.consultationDate));
    
    return searchMatch && doctorMatch && periodMatch;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'text-green-600 bg-green-50';
      case 'in-progress': return 'text-blue-600 bg-blue-50';
      case 'scheduled': return 'text-orange-600 bg-orange-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  return (
    <div className="space-y-6">
      {/* Search and Filters */}
      <div className="bg-white rounded-lg p-6 shadow-sm">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-gray-900">Consultation History</h2>
          <div className="text-sm text-gray-600">
            Showing {filteredHistory.length} of {consultationHistory.length} consultations
          </div>
        </div>

        <div className="grid md:grid-cols-4 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Search</label>
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
              placeholder="Search by patient, diagnosis..."
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Doctor</label>
            <div className="relative">
              <select
                value={filterDoctor}
                onChange={(e) => setFilterDoctor(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm pr-8"
              >
                <option value="all">All Doctors</option>
                {doctors.map((doctor) => (
                  <option key={doctor} value={doctor}>{doctor}</option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Period</label>
            <div className="relative">
              <select
                value={filterPeriod}
                onChange={(e) => setFilterPeriod(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm pr-8"
              >
                <option value="all">All Time</option>
                <option value="today">Today</option>
                <option value="week">This Week</option>
                <option value="month">This Month</option>
              </select>
            </div>
          </div>

          <div className="flex items-end">
            <button className="w-full bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors cursor-pointer whitespace-nowrap">
              Export Report
            </button>
          </div>
        </div>
      </div>

      {/* Consultation History List */}
      <div className="space-y-4">
        {filteredHistory.map((consultation) => (
          <div
            key={consultation.id}
            className="bg-white rounded-lg p-6 shadow-sm border hover:shadow-md transition-shadow"
          >
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center space-x-3 mb-3">
                  <h3 className="text-lg font-semibold text-gray-900">{consultation.patientName}</h3>
                  <span className="text-sm text-gray-600">
                    {consultation.age}yo • {consultation.gender}
                  </span>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(consultation.status)}`}>
                    {consultation.status}
                  </span>
                </div>

                <div className="grid md:grid-cols-3 gap-4 mb-4">
                  <div>
                    <p className="text-sm text-gray-600">Consultation Date</p>
                    <p className="font-medium">{consultation.consultationDate} at {consultation.consultationTime}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Doctor</p>
                    <p className="font-medium">{consultation.doctor}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Department</p>
                    <p className="font-medium">{consultation.department}</p>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <p className="text-sm text-gray-600">Chief Complaint</p>
                    <p className="font-medium text-gray-900">{consultation.chiefComplaint}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Diagnosis</p>
                    <p className="font-medium text-gray-900">{consultation.diagnosis}</p>
                  </div>
                </div>

                {consultation.prescriptions.length > 0 && (
                  <div className="bg-blue-50 rounded-lg p-4 mb-4">
                    <h4 className="font-medium text-blue-900 mb-2">Prescriptions</h4>
                    <div className="grid md:grid-cols-2 gap-2">
                      {consultation.prescriptions.map((prescription, index) => (
                        <div key={index} className="text-sm text-blue-800">
                          • {prescription}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                <div className="flex items-center space-x-6 text-sm text-gray-500">
                  <span>Duration: {consultation.duration}</span>
                  <span>Follow-up: {consultation.followUp}</span>
                  <span>ICD: {consultation.icdCodes.join(', ')}</span>
                </div>
              </div>

              <div className="flex flex-col space-y-2 ml-4">
                <button
                  onClick={() => setSelectedConsultation(consultation)}
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors text-sm cursor-pointer whitespace-nowrap"
                >
                  View Details
                </button>
                <button className="bg-gray-100 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200 transition-colors text-sm cursor-pointer whitespace-nowrap">
                  Print Report
                </button>
                <button className="text-gray-400 hover:text-gray-600 cursor-pointer">
                  <i className="ri-more-2-fill text-xl"></i>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Detailed Consultation Modal */}
      {selectedConsultation && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-4xl w-full max-h-screen overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900">Consultation Details</h2>
                <button
                  onClick={() => setSelectedConsultation(null)}
                  className="text-gray-400 hover:text-gray-600 cursor-pointer"
                >
                  <i className="ri-close-line text-2xl"></i>
                </button>
              </div>

              <div className="space-y-6">
                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">Patient Information</h3>
                      <p><strong>Name:</strong> {selectedConsultation.patientName}</p>
                      <p><strong>Age:</strong> {selectedConsultation.age} years</p>
                      <p><strong>Gender:</strong> {selectedConsultation.gender}</p>
                      <p><strong>Patient ID:</strong> {selectedConsultation.patientId}</p>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">Consultation Details</h3>
                      <p><strong>Date:</strong> {selectedConsultation.consultationDate}</p>
                      <p><strong>Time:</strong> {selectedConsultation.consultationTime}</p>
                      <p><strong>Doctor:</strong> {selectedConsultation.doctor}</p>
                      <p><strong>Duration:</strong> {selectedConsultation.duration}</p>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Chief Complaint</h3>
                  <p className="text-gray-700">{selectedConsultation.chiefComplaint}</p>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Diagnosis</h3>
                  <p className="text-gray-700">{selectedConsultation.diagnosis}</p>
                  <p className="text-sm text-gray-600 mt-1">ICD-10: {selectedConsultation.icdCodes.join(', ')}</p>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Treatment Plan</h3>
                  <p className="text-gray-700">{selectedConsultation.treatmentPlan}</p>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Prescriptions</h3>
                  <ul className="list-disc list-inside space-y-1">
                    {selectedConsultation.prescriptions.map((prescription, index) => (
                      <li key={index} className="text-gray-700">{prescription}</li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Follow-up</h3>
                  <p className="text-gray-700">{selectedConsultation.followUp}</p>
                </div>

                <div className="flex justify-end space-x-4 pt-4 border-t">
                  <button
                    onClick={() => window.print()}
                    className="bg-gray-600 text-white px-6 py-2 rounded-lg hover:bg-gray-700 transition-colors cursor-pointer whitespace-nowrap"
                  >
                    Print
                  </button>
                  <button
                    onClick={() => setSelectedConsultation(null)}
                    className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors cursor-pointer whitespace-nowrap"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {filteredHistory.length === 0 && (
        <div className="text-center py-12">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <i className="ri-history-line text-gray-400 text-2xl"></i>
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">No consultation history found</h3>
          <p className="text-gray-600">
            No consultations match your search criteria.
          </p>
        </div>
      )}
    </div>
  );
}