'use client';
import { useState } from 'react';

export default function TestOrderManagement({ onOrderSelect }) {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedPriority, setSelectedPriority] = useState('all');

  // Mock test orders data
  const testOrders = [
    {
      id: 'ORD001',
      patientId: 'PID001',
      patientName: 'John Mwangi',
      age: 34,
      gender: 'Male',
      orderDate: '2024-01-15',
      orderTime: '09:30',
      orderedBy: 'Dr. Alice Wanjiku',
      department: 'Internal Medicine',
      priority: 'Urgent',
      status: 'Pending Payment',
      category: 'Laboratory',
      tests: [
        { code: 'CBC', name: 'Complete Blood Count', cost: 800, estimatedTime: '2 hours' },
        { code: 'LFT', name: 'Liver Function Tests', cost: 1200, estimatedTime: '3 hours' },
        { code: 'RBS', name: 'Random Blood Sugar', cost: 300, estimatedTime: '30 minutes' }
      ],
      totalCost: 2300,
      clinicalNotes: 'Patient presents with fatigue, jaundice, and elevated liver enzymes. Rule out hepatitis.',
      paymentStatus: 'pending',
      insuranceType: 'NHIF',
      insuranceCoverage: 70
    },
    {
      id: 'ORD002',
      patientId: 'PID002',
      patientName: 'Mary Wanjiku',
      age: 28,
      gender: 'Female',
      orderDate: '2024-01-15',
      orderTime: '10:15',
      orderedBy: 'Dr. Peter Kamau',
      department: 'Obstetrics',
      priority: 'Normal',
      status: 'Ready for Execution',
      category: 'Imaging',
      tests: [
        { code: 'US-ABD', name: 'Abdominal Ultrasound', cost: 2500, estimatedTime: '45 minutes' },
        { code: 'US-PEL', name: 'Pelvic Ultrasound', cost: 2000, estimatedTime: '30 minutes' }
      ],
      totalCost: 4500,
      clinicalNotes: 'Routine prenatal screening at 20 weeks gestation. Check fetal development.',
      paymentStatus: 'paid',
      insuranceType: 'Private',
      insuranceCoverage: 100
    },
    {
      id: 'ORD003',
      patientId: 'PID003',
      patientName: 'David Ochieng',
      age: 45,
      gender: 'Male',
      orderDate: '2024-01-15',
      orderTime: '11:00',
      orderedBy: 'Dr. Grace Kiprotich',
      department: 'Cardiology',
      priority: 'Emergency',
      status: 'In Progress',
      category: 'Point-of-Care',
      tests: [
        { code: 'TROP-I', name: 'Troponin I (Rapid)', cost: 1500, estimatedTime: '15 minutes' },
        { code: 'BNP', name: 'BNP Rapid Test', cost: 2000, estimatedTime: '20 minutes' },
        { code: 'ECG', name: 'Electrocardiogram', cost: 800, estimatedTime: '10 minutes' }
      ],
      totalCost: 4300,
      clinicalNotes: 'Chest pain with ST elevation. Rule out STEMI. Urgent cardiac markers needed.',
      paymentStatus: 'emergency_override',
      insuranceType: 'NHIF',
      insuranceCoverage: 80
    },
    {
      id: 'ORD004',
      patientId: 'PID004',
      patientName: 'Grace Kiprotich',
      age: 32,
      gender: 'Female',
      orderDate: '2024-01-15',
      orderTime: '12:30',
      orderedBy: 'Dr. Samuel Muthoni',
      department: 'Emergency',
      priority: 'Urgent',
      status: 'Ready for Execution',
      category: 'Laboratory',
      tests: [
        { code: 'MAL-RDT', name: 'Malaria Rapid Test', cost: 500, estimatedTime: '15 minutes' },
        { code: 'TYPH-RDT', name: 'Typhoid Rapid Test', cost: 600, estimatedTime: '15 minutes' },
        { code: 'WIDAL', name: 'Widal Test', cost: 800, estimatedTime: '2 hours' }
      ],
      totalCost: 1900,
      clinicalNotes: 'High fever, headache, and body aches. Rule out malaria and typhoid.',
      paymentStatus: 'paid',
      insuranceType: 'Cash',
      insuranceCoverage: 0
    }
  ];

  const filteredOrders = testOrders.filter(order => {
    const categoryMatch = selectedCategory === 'all' || order.category === selectedCategory;
    const priorityMatch = selectedPriority === 'all' || order.priority === selectedPriority;
    return categoryMatch && priorityMatch;
  });

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
      case 'Pending Payment': return 'text-orange-600 bg-orange-50';
      case 'Ready for Execution': return 'text-blue-600 bg-blue-50';
      case 'In Progress': return 'text-yellow-600 bg-yellow-50';
      case 'Completed': return 'text-green-600 bg-green-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  const getCategoryIcon = (category) => {
    switch (category) {
      case 'Laboratory': return 'ri-flask-line';
      case 'Imaging': return 'ri-scan-line';
      case 'Point-of-Care': return 'ri-heart-pulse-line';
      default: return 'ri-test-tube-line';
    }
  };

  return (
    <div className="space-y-6">
      {/* Filters */}
      <div className="bg-white rounded-lg p-6 shadow-sm">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold text-gray-900">Test Orders Management</h2>
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <span className="text-sm text-gray-600">Category:</span>
              <div className="flex space-x-2">
                {[
                  { key: 'all', label: 'All', color: 'bg-gray-100 text-gray-700' },
                  { key: 'Laboratory', label: 'Laboratory', color: 'bg-blue-100 text-blue-700' },
                  { key: 'Imaging', label: 'Imaging', color: 'bg-purple-100 text-purple-700' },
                  { key: 'Point-of-Care', label: 'Point-of-Care', color: 'bg-green-100 text-green-700' }
                ].map((filter) => (
                  <button
                    key={filter.key}
                    onClick={() => setSelectedCategory(filter.key)}
                    className={`px-3 py-1 rounded-full text-sm font-medium transition-colors cursor-pointer whitespace-nowrap ${
                      selectedCategory === filter.key
                        ? filter.color
                        : 'bg-gray-100 text-gray-500 hover:bg-gray-200'
                    }`}
                  >
                    {filter.label}
                  </button>
                ))}
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

      {/* Orders List */}
      <div className="space-y-4">
        {filteredOrders.map((order) => (
          <div
            key={order.id}
            className="bg-white rounded-lg p-6 shadow-sm border hover:shadow-md transition-shadow"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-start space-x-4">
                <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                  order.category === 'Laboratory' ? 'bg-blue-100' :
                  order.category === 'Imaging' ? 'bg-purple-100' : 'bg-green-100'
                }`}>
                  <i className={`${getCategoryIcon(order.category)} text-xl ${
                    order.category === 'Laboratory' ? 'text-blue-600' :
                    order.category === 'Imaging' ? 'text-purple-600' : 'text-green-600'
                  }`}></i>
                </div>
                
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <h3 className="text-lg font-semibold text-gray-900">Order #{order.id}</h3>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getPriorityColor(order.priority)}`}>
                      {order.priority}
                    </span>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
                      {order.status}
                    </span>
                  </div>
                  
                  <div className="grid md:grid-cols-2 gap-4 mb-4">
                    <div>
                      <p className="text-sm text-gray-600">Patient</p>
                      <p className="font-medium">{order.patientName} • {order.age}yo {order.gender}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Ordered by</p>
                      <p className="font-medium">{order.orderedBy} • {order.department}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Order Date & Time</p>
                      <p className="font-medium">{order.orderDate} at {order.orderTime}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Insurance</p>
                      <p className="font-medium">{order.insuranceType} ({order.insuranceCoverage}% coverage)</p>
                    </div>
                  </div>

                  <div className="bg-gray-50 rounded-lg p-4 mb-4">
                    <h4 className="font-medium text-gray-900 mb-3">Ordered Tests</h4>
                    <div className="space-y-2">
                      {order.tests.map((test, index) => (
                        <div key={index} className="flex items-center justify-between">
                          <div className="flex items-center space-x-3">
                            <span className="text-sm font-mono bg-gray-200 px-2 py-1 rounded">
                              {test.code}
                            </span>
                            <span className="text-sm font-medium">{test.name}</span>
                            <span className="text-xs text-gray-500">~{test.estimatedTime}</span>
                          </div>
                          <span className="text-sm font-semibold">KSh {test.cost.toLocaleString()}</span>
                        </div>
                      ))}
                      <div className="border-t pt-2 mt-3">
                        <div className="flex justify-between items-center">
                          <span className="font-semibold">Total Cost</span>
                          <span className="text-lg font-bold text-blue-600">
                            KSh {order.totalCost.toLocaleString()}
                          </span>
                        </div>
                        {order.insuranceCoverage > 0 && (
                          <div className="flex justify-between items-center text-sm text-gray-600">
                            <span>Patient Pays ({100 - order.insuranceCoverage}%)</span>
                            <span className="font-medium">
                              KSh {((order.totalCost * (100 - order.insuranceCoverage)) / 100).toLocaleString()}
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 mb-4">
                    <h5 className="font-medium text-yellow-800 mb-1">Clinical Notes</h5>
                    <p className="text-sm text-yellow-700">{order.clinicalNotes}</p>
                  </div>
                </div>
              </div>

              <div className="flex flex-col space-y-2">
                {order.status === 'Pending Payment' && (
                  <button className="bg-orange-600 text-white px-4 py-2 rounded-lg hover:bg-orange-700 transition-colors text-sm cursor-pointer whitespace-nowrap">
                    Process Payment
                  </button>
                )}
                
                {order.status === 'Ready for Execution' && (
                  <button
                    onClick={() => onOrderSelect(order)}
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors text-sm cursor-pointer whitespace-nowrap"
                  >
                    Start Testing
                  </button>
                )}
                
                {order.status === 'In Progress' && (
                  <button
                    onClick={() => onOrderSelect(order)}
                    className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors text-sm cursor-pointer whitespace-nowrap"
                  >
                    Continue Test
                  </button>
                )}
                
                <button className="bg-gray-100 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200 transition-colors text-sm cursor-pointer whitespace-nowrap">
                  View Details
                </button>
                
                <button className="text-gray-400 hover:text-gray-600 cursor-pointer">
                  <i className="ri-more-2-fill text-xl"></i>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredOrders.length === 0 && (
        <div className="text-center py-12">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <i className="ri-flask-line text-gray-400 text-2xl"></i>
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">No test orders found</h3>
          <p className="text-gray-600">
            No test orders match the selected filters.
          </p>
        </div>
      )}
    </div>
  );
}