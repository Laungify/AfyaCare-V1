
'use client';
import { useState } from 'react';

type Patient = {
  id: string;
  name: string;
  age: number;
  gender: string;
  triageCategory: string;
  department: string;
  status: string;
  arrivalTime: string;
  triageTime: string;
  assignedTo: string;
  priority: string;
  waitTime: string;
};

interface PatientListProps {
  onPatientSelect: (patient: Patient) => void;
}

export default function PatientList({ onPatientSelect }: PatientListProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');

  // Mock triaged patients data
  const patients = [
    {
      id: 'PID001',
      name: 'John Mwangi',
      age: 34,
      gender: 'Male',
      triageCategory: 'Level 2',
      department: 'Emergency Medicine',
      status: 'In Treatment',
      arrivalTime: '09:15',
      triageTime: '09:30',
      assignedTo: 'Dr. Peter Njoroge',
      priority: 'Emergency',
      waitTime: '1h 15min'
    },
    {
      id: 'PID002',
      name: 'Mary Wanjiku',
      age: 28,
      gender: 'Female',
      triageCategory: 'Level 3',
      department: 'Internal Medicine',
      status: 'Waiting for Doctor',
      arrivalTime: '09:30',
      triageTime: '09:45',
      assignedTo: 'Dr. Sarah Kimani',
      priority: 'Urgent',
      waitTime: '45min'
    },
    {
      id: 'PID003',
      name: 'David Ochieng',
      age: 45,
      gender: 'Male',
      triageCategory: 'Level 4',
      department: 'Internal Medicine',
      status: 'Completed',
      arrivalTime: '09:45',
      triageTime: '10:00',
      assignedTo: 'Dr. James Mutua',
      priority: 'Normal',
      waitTime: '30min'
    },
    {
      id: 'PID004',
      name: 'Grace Kiprotich',
      age: 32,
      gender: 'Female',
      triageCategory: 'Level 3',
      department: 'Emergency Medicine',
      status: 'In Treatment',
      arrivalTime: '10:00',
      triageTime: '10:10',
      assignedTo: 'Dr. Michael Otieno',
      priority: 'Urgent',
      waitTime: '20min'
    },
    {
      id: 'PID005',
      name: 'Samuel Muthoni',
      age: 67,
      gender: 'Male',
      triageCategory: 'Level 4',
      department: 'Cardiology',
      status: 'Waiting for Doctor',
      arrivalTime: '10:15',
      triageTime: '10:25',
      assignedTo: 'Dr. Ann Wanjiru',
      priority: 'Normal',
      waitTime: '15min'
    },
    {
      id: 'PID006',
      name: 'Lucy Achieng',
      age: 25,
      gender: 'Female',
      triageCategory: 'Level 5',
      department: 'Pediatrics',
      status: 'Discharged',
      arrivalTime: '08:30',
      triageTime: '08:45',
      assignedTo: 'Dr. Catherine Mwangi',
      priority: 'Normal',
      waitTime: '45min'
    }
  ];

  const filteredPatients = patients.filter(patient => {
    const matchesSearch = patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         patient.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'all' || patient.status === filterStatus;
    
    return matchesSearch && matchesStatus;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Waiting for Doctor': return 'text-yellow-600 bg-yellow-50 border-yellow-200';
      case 'In Treatment': return 'text-blue-600 bg-blue-50 border-blue-200';
      case 'Completed': return 'text-green-600 bg-green-50 border-green-200';
      case 'Discharged': return 'text-gray-600 bg-gray-50 border-gray-200';
      default: return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'Level 1': return 'text-red-600 bg-red-50';
      case 'Level 2': return 'text-orange-600 bg-orange-50';
      case 'Level 3': return 'text-yellow-600 bg-yellow-50';
      case 'Level 4': return 'text-blue-600 bg-blue-50';
      case 'Level 5': return 'text-green-600 bg-green-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  const statusCounts = {
    'Waiting for Doctor': patients.filter(p => p.status === 'Waiting for Doctor').length,
    'In Treatment': patients.filter(p => p.status === 'In Treatment').length,
    'Completed': patients.filter(p => p.status === 'Completed').length,
    'Discharged': patients.filter(p => p.status === 'Discharged').length
  };

  return (
    <div className="space-y-6">
      {/* Summary Cards */}
      <div className="grid md:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Waiting</p>
              <p className="text-2xl font-bold text-yellow-600">{statusCounts['Waiting for Doctor']}</p>
            </div>
            <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
              <i className="ri-time-line text-yellow-600 text-xl"></i>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">In Treatment</p>
              <p className="text-2xl font-bold text-blue-600">{statusCounts['In Treatment']}</p>
            </div>
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <i className="ri-stethoscope-line text-blue-600 text-xl"></i>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Completed</p>
              <p className="text-2xl font-bold text-green-600">{statusCounts['Completed']}</p>
            </div>
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <i className="ri-check-line text-green-600 text-xl"></i>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Discharged</p>
              <p className="text-2xl font-bold text-gray-600">{statusCounts['Discharged']}</p>
            </div>
            <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
              <i className="ri-home-line text-gray-600 text-xl"></i>
            </div>
          </div>
        </div>
      </div>

      {/* Search and Filter */}
      <div className="bg-white rounded-lg p-6 shadow-sm">
        <div className="flex flex-col sm:flex-row items-center justify-between space-y-4 sm:space-y-0 sm:space-x-4 mb-6">
          <h2 className="text-xl font-bold text-gray-900">Patient List</h2>
          
          <div className="flex items-center space-x-4">
            <div className="relative">
              <i className="ri-search-line absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
              <input
                type="text"
                placeholder="Search patients..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
              />
            </div>
            
            <div className="relative">
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm pr-8"
              >
                <option value="all">All Status</option>
                <option value="Waiting for Doctor">Waiting</option>
                <option value="In Treatment">In Treatment</option>
                <option value="Completed">Completed</option>
                <option value="Discharged">Discharged</option>
              </select>
            </div>
          </div>
        </div>

        {/* Patient List Table */}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 font-semibold text-gray-900">Patient</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-900">Triage</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-900">Department</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-900">Assigned Doctor</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-900">Status</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-900">Times</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-900">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredPatients.map((patient) => (
                <tr key={patient.id} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="py-4 px-4">
                    <div>
                      <div className="font-semibold text-gray-900">{patient.name}</div>
                      <div className="text-sm text-gray-600">
                        {patient.age}yo • {patient.gender} • {patient.id}
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getCategoryColor(patient.triageCategory)}`}>
                      {patient.triageCategory}
                    </span>
                  </td>
                  <td className="py-4 px-4">
                    <div className="text-sm font-medium text-gray-900">{patient.department}</div>
                  </td>
                  <td className="py-4 px-4">
                    <div className="text-sm text-gray-900">{patient.assignedTo}</div>
                  </td>
                  <td className="py-4 px-4">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(patient.status)}`}>
                      {patient.status}
                    </span>
                  </td>
                  <td className="py-4 px-4">
                    <div className="text-xs text-gray-600">
                      <div>Arrival: {patient.arrivalTime}</div>
                      <div>Triage: {patient.triageTime}</div>
                      <div>Wait: {patient.waitTime}</div>
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => onPatientSelect(patient)}
                        className="text-blue-600 hover:text-blue-800 cursor-pointer"
                        title="View Details"
                      >
                        <i className="ri-eye-line"></i>
                      </button>
                      <button
                        className="text-gray-600 hover:text-gray-800 cursor-pointer"
                        title="Edit"
                      >
                        <i className="ri-edit-line"></i>
                      </button>
                      <button
                        className="text-green-600 hover:text-green-800 cursor-pointer"
                        title="Print"
                      >
                        <i className="ri-printer-line"></i>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredPatients.length === 0 && (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <i className="ri-team-line text-gray-400 text-2xl"></i>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">No patients found</h3>
            <p className="text-gray-600">
              {searchTerm || filterStatus !== 'all' 
                ? 'No patients match your search criteria.' 
                : 'No patients have been triaged yet.'
              }
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
