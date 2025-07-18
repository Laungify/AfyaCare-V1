
'use client';
import { useState } from 'react';

export default function QueueManagement({ onPatientSelect }) {
  const [selectedPriority, setSelectedPriority] = useState('all');

  // Mock patient queue data
  const patients = [
    {
      id: 'PID001',
      name: 'John Mwangi',
      age: 34,
      gender: 'Male',
      priority: 'Emergency',
      arrivalTime: '09:15',
      waitTime: '45 min',
      reason: 'Chest pain and shortness of breath',
      vitals: { bp: '140/90', temp: '37.2°C', pulse: '95 bpm' },
      status: 'waiting'
    },
    {
      id: 'PID002',
      name: 'Mary Wanjiku',
      age: 28,
      gender: 'Female',
      priority: 'Urgent',
      arrivalTime: '09:30',
      waitTime: '30 min',
      reason: 'Severe headache and nausea',
      vitals: { bp: '120/80', temp: '36.8°C', pulse: '78 bpm' },
      status: 'in-progress'
    },
    {
      id: 'PID003',
      name: 'David Ochieng',
      age: 45,
      gender: 'Male',
      priority: 'Normal',
      arrivalTime: '09:45',
      waitTime: '15 min',
      reason: 'Regular checkup and medication refill',
      vitals: { bp: '118/75', temp: '36.5°C', pulse: '72 bpm' },
      status: 'waiting'
    },
    {
      id: 'PID004',
      name: 'Grace Kiprotich',
      age: 32,
      gender: 'Female',
      priority: 'Urgent',
      arrivalTime: '10:00',
      waitTime: '5 min',
      reason: 'Allergic reaction, swelling and rash',
      vitals: { bp: '125/82', temp: '37.0°C', pulse: '88 bpm' },
      status: 'waiting'
    },
    {
      id: 'PID005',
      name: 'Samuel Muthoni',
      age: 67,
      gender: 'Male',
      priority: 'Normal',
      arrivalTime: '10:15',
      waitTime: 'Just arrived',
      reason: 'Diabetes follow-up appointment',
      vitals: { bp: '130/85', temp: '36.7°C', pulse: '76 bpm' },
      status: 'waiting'
    }
  ];

  const filteredPatients = selectedPriority === 'all' 
    ? patients 
    : patients.filter(p => p.priority === selectedPriority);

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'Emergency': return 'text-red-600 bg-red-50 border-red-200';
      case 'Urgent': return 'text-orange-600 bg-orange-50 border-orange-200';
      case 'Normal': return 'text-green-600 bg-green-50 border-green-200';
      default: return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'waiting': return 'text-blue-600 bg-blue-50';
      case 'in-progress': return 'text-yellow-600 bg-yellow-50';
      case 'completed': return 'text-green-600 bg-green-50';
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
              <p className="text-sm text-gray-600">Total Queue</p>
              <p className="text-2xl font-bold text-blue-600">{patients.length}</p>
            </div>
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <i className="ri-team-fill text-blue-600 text-xl"></i>
            </div>
          </div>
        </div>
      </div>

      {/* Priority Filter */}
      <div className="bg-white rounded-lg p-6 shadow-sm">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-gray-900">Triage Queue</h2>
          <div className="flex items-center space-x-2">
            <span className="text-sm text-gray-600">Filter by priority:</span>
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

        {/* Patient Queue List */}
        <div className="space-y-4">
          {filteredPatients.map((patient, index) => (
            <div
              key={patient.id}
              className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow cursor-pointer"
              onClick={() => onPatientSelect(patient)}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
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
                      <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getPriorityColor(patient.priority)}`}>
                        {patient.priority}
                      </span>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(patient.status)}`}>
                        {patient.status.replace('-', ' ')}
                      </span>
                    </div>
                    
                    <p className="text-gray-600 text-sm mb-3">{patient.reason}</p>
                    
                    <div className="flex items-center space-x-6 text-sm text-gray-500">
                      <span>Arrived: {patient.arrivalTime}</span>
                      <span>Wait: {patient.waitTime}</span>
                      <span>BP: {patient.vitals.bp}</span>
                      <span>Temp: {patient.vitals.temp}</span>
                      <span>Pulse: {patient.vitals.pulse}</span>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center space-x-2">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onPatientSelect(patient);
                    }}
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors text-sm cursor-pointer whitespace-nowrap"
                  >
                    Start Triage
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
              {selectedPriority === 'all' 
                ? 'The triage queue is currently empty.' 
                : `No ${selectedPriority.toLowerCase()} priority patients in queue.`
              }
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
