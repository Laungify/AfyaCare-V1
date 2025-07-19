'use client';
import { useState } from 'react';



// Define types
type Patient = {
  id: string;
  name: string;
  age: number;
  gender: string;
  triageTime: string;
  waitTime: string;
  priority: 'Emergency' | 'Urgent' | 'Normal';
  triageLevel: string;
  chiefComplaint: string;
  vitals: {
    bp: string;
    temp: string;
    pulse: string;
    spo2: string;
    rr: string;
  };
  triageNotes: string;
  allergies: string[];
  currentMeds: string[];
  assignedDoctor: string;
  department: string;
  riskFlags: string[];
  status: 'waiting' | 'emergency' | 'in-consultation';
};

type PatientQueueProps = {
  onPatientSelect: (patient: Patient) => void;
};

export default function PatientQueue({ onPatientSelect }: PatientQueueProps) {
  const [selectedDoctor, setSelectedDoctor] = useState('all');
  const [selectedPriority, setSelectedPriority] = useState('all');

  // Mock patients from triage
  const patients = [
    {
      id: 'PID001',
      name: 'John Mwangi',
      age: 34,
      gender: 'Male',
      triageTime: '09:15',
      waitTime: '1h 30min',
      priority: 'Urgent',
      triageLevel: 'Level 2',
      chiefComplaint: 'Chest pain and shortness of breath',
      vitals: {
        bp: '150/95',
        temp: '37.8°C',
        pulse: '102 bpm',
        spo2: '96%',
        rr: '22/min'
      },
      triageNotes: 'Patient reports severe chest pain radiating to left arm. Diaphoretic and anxious.',
      allergies: ['Penicillin'],
      currentMeds: ['Aspirin 100mg daily', 'Metformin 500mg BD'],
      assignedDoctor: 'Dr. Sarah Johnson',
      department: 'Cardiology',
      riskFlags: ['Hypertension', 'Diabetes'],
      status: 'waiting'
    },
    {
      id: 'PID002',
      name: 'Mary Wanjiku',
      age: 28,
      gender: 'Female',
      triageTime: '09:45',
      waitTime: '1h 10min',
      priority: 'Normal',
      triageLevel: 'Level 4',
      chiefComplaint: 'Prenatal checkup and fatigue',
      vitals: {
        bp: '110/70',
        temp: '36.5°C',
        pulse: '78 bpm',
        spo2: '99%',
        rr: '16/min'
      },
      triageNotes: '28 weeks pregnant, routine checkup. Reports increased fatigue.',
      allergies: [],
      currentMeds: ['Folic acid', 'Iron supplements'],
      assignedDoctor: 'Dr. Grace Kiprotich',
      department: 'Obstetrics',
      riskFlags: ['Pregnancy'],
      status: 'waiting'
    },
    {
      id: 'PID003',
      name: 'David Ochieng',
      age: 45,
      gender: 'Male',
      triageTime: '10:20',
      waitTime: '45min',
      priority: 'Emergency',
      triageLevel: 'Level 1',
      chiefComplaint: 'Severe abdominal pain and vomiting',
      vitals: {
        bp: '90/60',
        temp: '38.5°C',
        pulse: '115 bpm',
        spo2: '97%',
        rr: '24/min'
      },
      triageNotes: 'Acute onset severe RUQ pain, guarding present. Possible acute cholangitis.',
      allergies: ['Codeine'],
      currentMeds: [],
      assignedDoctor: 'Dr. Peter Kamau',
      department: 'Surgery',
      riskFlags: ['Hypotension', 'Fever'],
      status: 'emergency'
    },
    {
      id: 'PID004',
      name: 'Grace Kiprotich',
      age: 32,
      gender: 'Female',
      triageTime: '10:45',
      waitTime: '25min',
      priority: 'Urgent',
      triageLevel: 'Level 3',
      chiefComplaint: 'Allergic reaction and rash',
      vitals: {
        bp: '125/80',
        temp: '37.2°C',
        pulse: '88 bpm',
        spo2: '98%',
        rr: '18/min'
      },
      triageNotes: 'Generalized urticaria after eating seafood. No respiratory distress.',
      allergies: ['Shellfish', 'Nuts'],
      currentMeds: ['Antihistamine as needed'],
      assignedDoctor: 'Dr. Alice Wanjiku',
      department: 'Internal Medicine',
      riskFlags: ['Food Allergies'],
      status: 'waiting'
    },
    {
      id: 'PID005',
      name: 'Samuel Muthoni',
      age: 67,
      gender: 'Male',
      triageTime: '11:00',
      waitTime: '15min',
      priority: 'Normal',
      triageLevel: 'Level 4',
      chiefComplaint: 'Diabetes follow-up and medication review',
      vitals: {
        bp: '140/85',
        temp: '36.7°C',
        pulse: '76 bpm',
        spo2: '99%',
        rr: '16/min'
      },
      triageNotes: 'Routine diabetes follow-up. Patient reports good glucose control.',
      allergies: [],
      currentMeds: ['Metformin 1000mg BD', 'Glibenclamide 5mg BD', 'Atorvastatin 20mg'],
      assignedDoctor: 'Dr. Sarah Johnson',
      department: 'Endocrinology',
      riskFlags: ['Diabetes', 'Hypertension'],
      status: 'waiting'
    }
  ];

  const doctors = [
    'Dr. Sarah Johnson',
    'Dr. Peter Kamau', 
    'Dr. Grace Kiprotich',
    'Dr. Alice Wanjiku'
  ];

  const filteredPatients = patients.filter(patient => {
    const doctorMatch = selectedDoctor === 'all' || patient.assignedDoctor === selectedDoctor;
    const priorityMatch = selectedPriority === 'all' || patient.priority === selectedPriority;
    return doctorMatch && priorityMatch;
  });

  const getPriorityColor = (priority: Patient['priority']) => {
    switch (priority) {
      case 'Emergency': return 'text-red-600 bg-red-50 border-red-200';
      case 'Urgent': return 'text-orange-600 bg-orange-50 border-orange-200';
      case 'Normal': return 'text-green-600 bg-green-50 border-green-200';
      default: return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  const getStatusColor = (status: Patient['status']) => {
    switch (status) {
      case 'waiting': return 'text-blue-600 bg-blue-50';
      case 'emergency': return 'text-red-600 bg-red-50';
      case 'in-consultation': return 'text-green-600 bg-green-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  return (
    <div className="space-y-6">
      {/* Queue Overview */}
      <div className="grid md:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Emergency</p>
              <p className="text-2xl font-bold text-red-600">
                {patients.filter(p => p.priority === 'Emergency').length}
              </p>
            </div>
            <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
              <i className="ri-alarm-warning-fill text-red-600 text-xl"></i>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Urgent</p>
              <p className="text-2xl font-bold text-orange-600">
                {patients.filter(p => p.priority === 'Urgent').length}
              </p>
            </div>
            <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
              <i className="ri-time-fill text-orange-600 text-xl"></i>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Normal</p>
              <p className="text-2xl font-bold text-green-600">
                {patients.filter(p => p.priority === 'Normal').length}
              </p>
            </div>
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <i className="ri-calendar-check-fill text-green-600 text-xl"></i>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Average Wait</p>
              <p className="text-2xl font-bold text-blue-600">38min</p>
            </div>
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <i className="ri-timer-line text-blue-600 text-xl"></i>
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg p-6 shadow-sm">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold text-gray-900">Consultation Queue</h2>
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <span className="text-sm text-gray-600">Doctor:</span>
              <div className="relative">
                <select
                  value={selectedDoctor}
                  onChange={(e) => setSelectedDoctor(e.target.value)}
                  className="px-3 py-1 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent pr-8"
                >
                  <option value="all">All Doctors</option>
                  {doctors.map((doctor) => (
                    <option key={doctor} value={doctor}>{doctor}</option>
                  ))}
                </select>
              </div>
            </div>
            
            <div className="flex items-center space-x-2">
              <span className="text-sm text-gray-600">Priority:</span>
              <div className="flex space-x-2">
                {[
                  { key: 'all', label: 'All', color: 'bg-gray-100 text-gray-700' },
                  { key: 'Emergency', label: 'Emergency', color: 'bg-red-100 text-red-700' },
                  { key: 'Urgent', label: 'Urgent', color: 'bg-orange-100 text-orange-700' },
                  { key: 'Normal', label: 'Normal', color: 'bg-green-100 text-green-700' }
                ].map((filter) => (
                  <button
                    key={filter.key}
                    onClick={() => setSelectedPriority(filter.key)}
                    className={`px-3 py-1 rounded-full text-sm font-medium transition-colors cursor-pointer whitespace-nowrap ${
                      selectedPriority === filter.key
                        ? filter.color
                        : 'bg-gray-100 text-gray-500 hover:bg-gray-200'
                    }`}
                  >
                    {filter.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Patient Queue List */}
      <div className="space-y-4">
        {filteredPatients.map((patient, index) => (
          <div
            key={patient.id}
            className="bg-white rounded-lg p-6 shadow-sm border hover:shadow-md transition-shadow"
          >
            <div className="flex items-start justify-between">
              <div className="flex items-start space-x-4 flex-1">
                <div className="text-center">
                  <div className="text-2xl font-bold text-gray-400">#{index + 1}</div>
                  <div className="text-xs text-gray-500">Queue</div>
                </div>
                
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <h3 className="text-lg font-semibold text-gray-900">{patient.name}</h3>
                    <span className="text-sm text-gray-600">
                      {patient.age}yo • {patient.gender}
                    </span>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getPriorityColor(patient.priority as Patient['priority'])}`}>
                      {patient.priority} • {patient.triageLevel}
                    </span>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(patient.status as Patient['status'])}`}>
                      {patient.status.replace('-', ' ')}
                    </span>
                  </div>
                  
                  <div className="grid md:grid-cols-2 gap-4 mb-4">
                    <div>
                      <p className="text-sm text-gray-600">Chief Complaint</p>
                      <p className="font-medium text-gray-900">{patient.chiefComplaint}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Assigned Doctor</p>
                      <p className="font-medium text-gray-900">{patient.assignedDoctor}</p>
                    </div>
                  </div>

                  <div className="bg-gray-50 rounded-lg p-4 mb-4">
                    <div className="grid md:grid-cols-5 gap-4 text-sm">
                      <div>
                        <span className="text-gray-600">BP:</span>
                        <span className="font-medium ml-1">{patient.vitals.bp}</span>
                      </div>
                      <div>
                        <span className="text-gray-600">Temp:</span>
                        <span className="font-medium ml-1">{patient.vitals.temp}</span>
                      </div>
                      <div>
                        <span className="text-gray-600">Pulse:</span>
                        <span className="font-medium ml-1">{patient.vitals.pulse}</span>
                      </div>
                      <div>
                        <span className="text-gray-600">SpO2:</span>
                        <span className="font-medium ml-1">{patient.vitals.spo2}</span>
                      </div>
                      <div>
                        <span className="text-gray-600">RR:</span>
                        <span className="font-medium ml-1">{patient.vitals.rr}</span>
                      </div>
                    </div>
                  </div>

                  {patient.riskFlags.length > 0 && (
                    <div className="flex items-center space-x-2 mb-3">
                      <i className="ri-alarm-warning-line text-orange-500"></i>
                      <span className="text-sm font-medium text-orange-700">Risk Factors:</span>
                      <div className="flex space-x-1">
                        {patient.riskFlags.map((flag, flagIndex) => (
                          <span
                            key={flagIndex}
                            className="px-2 py-1 bg-orange-100 text-orange-700 text-xs rounded-full"
                          >
                            {flag}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="flex items-center space-x-6 text-sm text-gray-500">
                    <span>Triage: {patient.triageTime}</span>
                    <span>Wait: {patient.waitTime}</span>
                    <span>Department: {patient.department}</span>
                  </div>
                </div>
              </div>

              <div className="flex flex-col space-y-2">
                <button
                  onClick={() => onPatientSelect(patient as Patient)}
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors text-sm cursor-pointer whitespace-nowrap"
                >
                  Start Consultation
                </button>
                
                <button className="bg-gray-100 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200 transition-colors text-sm cursor-pointer whitespace-nowrap">
                  View History
                </button>
                
                <button className="text-gray-400 hover:text-gray-600 cursor-pointer">
                  <i className="ri-more-2-fill text-xl"></i>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredPatients.length === 0 && (
        <div className="text-center py-12">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <i className="ri-team-line text-gray-400 text-2xl"></i>
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">No patients in queue</h3>
          <p className="text-gray-600">
            No patients match the selected filters.
          </p>
        </div>
      )}
    </div>
  );
}