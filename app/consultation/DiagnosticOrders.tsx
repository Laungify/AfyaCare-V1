'use client';
import { useState } from 'react';

export default function DiagnosticOrders({ patient, onComplete }) {
  const [selectedCategory, setSelectedCategory] = useState('laboratory');
  const [orders, setOrders] = useState([]);
  const [showOrderModal, setShowOrderModal] = useState(false);
  const [currentOrder, setCurrentOrder] = useState({
    category: '',
    tests: [],
    urgency: 'Normal',
    clinicalIndication: '',
    department: '',
    requestingDoctor: 'Dr. Sarah Johnson',
    specialInstructions: ''
  });

  // Laboratory Test Panels and Individual Tests
  const laboratoryTests = {
    panels: [
      {
        id: 'basic_metabolic',
        name: 'Basic Metabolic Panel',
        tests: ['Glucose', 'BUN', 'Creatinine', 'Sodium', 'Potassium', 'Chloride', 'CO2'],
        cost: 1500,
        turnaroundTime: '2-4 hours',
        indication: 'Routine metabolic assessment'
      },
      {
        id: 'liver_function',
        name: 'Liver Function Tests',
        tests: ['ALT', 'AST', 'Bilirubin Total', 'Bilirubin Direct', 'ALP', 'Total Protein', 'Albumin'],
        cost: 2000,
        turnaroundTime: '3-6 hours',
        indication: 'Liver disease evaluation'
      },
      {
        id: 'lipid_profile',
        name: 'Lipid Profile',
        tests: ['Total Cholesterol', 'HDL', 'LDL', 'Triglycerides'],
        cost: 1200,
        turnaroundTime: '2-4 hours',
        indication: 'Cardiovascular risk assessment'
      },
      {
        id: 'thyroid_function',
        name: 'Thyroid Function Tests',
        tests: ['TSH', 'Free T4', 'Free T3'],
        cost: 2500,
        turnaroundTime: '4-8 hours',
        indication: 'Thyroid disease evaluation'
      },
      {
        id: 'cardiac_markers',
        name: 'Cardiac Markers',
        tests: ['Troponin I', 'CK-MB', 'BNP'],
        cost: 3500,
        turnaroundTime: '1-2 hours',
        indication: 'Acute coronary syndrome'
      }
    ],
    individual: [
      { id: 'cbc', name: 'Complete Blood Count', cost: 800, turnaroundTime: '1-2 hours' },
      { id: 'esr', name: 'ESR', cost: 300, turnaroundTime: '1 hour' },
      { id: 'crp', name: 'C-Reactive Protein', cost: 600, turnaroundTime: '2 hours' },
      { id: 'hba1c', name: 'HbA1c', cost: 1000, turnaroundTime: '2-4 hours' },
      { id: 'psa', name: 'PSA', cost: 1500, turnaroundTime: '4-6 hours' },
      { id: 'vitamin_d', name: 'Vitamin D', cost: 2000, turnaroundTime: '4-8 hours' },
      { id: 'malaria_rdt', name: 'Malaria Rapid Test', cost: 500, turnaroundTime: '15 minutes' },
      { id: 'hiv_test', name: 'HIV Test', cost: 800, turnaroundTime: '30 minutes' },
      { id: 'pregnancy_test', name: 'Pregnancy Test', cost: 400, turnaroundTime: '15 minutes' }
    ]
  };

  // Imaging Studies
  const imagingStudies = [
    {
      id: 'chest_xray',
      name: 'Chest X-Ray',
      views: ['PA', 'Lateral', 'PA & Lateral'],
      cost: 1500,
      duration: '15 minutes',
      preparation: 'Remove jewelry and metal objects'
    },
    {
      id: 'abdominal_xray',
      name: 'Abdominal X-Ray',
      views: ['Supine', 'Upright', 'Lateral'],
      cost: 1200,
      duration: '10 minutes',
      preparation: 'No special preparation required'
    },
    {
      id: 'ultrasound_abdomen',
      name: 'Abdominal Ultrasound',
      views: ['Complete', 'Upper Abdomen', 'Pelvis'],
      cost: 2500,
      duration: '30 minutes',
      preparation: 'Fasting for 6 hours required'
    },
    {
      id: 'ultrasound_pregnancy',
      name: 'Obstetric Ultrasound',
      views: ['Dating Scan', 'Anomaly Scan', 'Growth Scan'],
      cost: 3000,
      duration: '30 minutes',
      preparation: 'Full bladder recommended'
    },
    {
      id: 'echocardiogram',
      name: 'Echocardiogram',
      views: ['Transthoracic', 'Stress Echo'],
      cost: 5000,
      duration: '45 minutes',
      preparation: 'No special preparation'
    },
    {
      id: 'ct_head',
      name: 'CT Head',
      views: ['Plain', 'With Contrast'],
      cost: 8000,
      duration: '20 minutes',
      preparation: 'Remove metal objects'
    },
    {
      id: 'mri_brain',
      name: 'MRI Brain',
      views: ['Plain', 'With Contrast'],
      cost: 15000,
      duration: '45 minutes',
      preparation: 'MRI safety questionnaire required'
    }
  ];

  // Theatre/Surgical Procedures
  const surgicalProcedures = [
    {
      id: 'appendectomy',
      name: 'Appendectomy',
      type: 'Emergency',
      duration: '60-90 minutes',
      anesthesia: 'General',
      preparation: 'NPO, Pre-op assessment'
    },
    {
      id: 'cholecystectomy',
      name: 'Laparoscopic Cholecystectomy',
      type: 'Elective',
      duration: '90-120 minutes',
      anesthesia: 'General',
      preparation: 'Pre-op assessment, Consent'
    },
    {
      id: 'hernia_repair',
      name: 'Inguinal Hernia Repair',
      type: 'Elective',
      duration: '60 minutes',
      anesthesia: 'Spinal/General',
      preparation: 'Pre-op assessment'
    },
    {
      id: 'caesarean_section',
      name: 'Caesarean Section',
      type: 'Emergency/Elective',
      duration: '45-60 minutes',
      anesthesia: 'Spinal/General',
      preparation: 'Fetal monitoring, Consent'
    },
    {
      id: 'tonsillectomy',
      name: 'Tonsillectomy',
      type: 'Elective',
      duration: '30-45 minutes',
      anesthesia: 'General',
      preparation: 'ENT evaluation'
    }
  ];

  const urgencyLevels = [
    { value: 'Emergency', label: 'Emergency - STAT', color: 'text-red-600 bg-red-50', time: 'Immediate' },
    { value: 'Urgent', label: 'Urgent', color: 'text-orange-600 bg-orange-50', time: 'Within 2 hours' },
    { value: 'Normal', label: 'Routine', color: 'text-green-600 bg-green-50', time: 'Within 24 hours' }
  ];

  const handleTestSelect = (test, category) => {
    const testData = {
      ...test,
      category: category,
      selectedAt: new Date().toISOString()
    };
    
    setCurrentOrder(prev => ({
      ...prev,
      category: category,
      tests: [...prev.tests.filter(t => t.id !== test.id), testData]
    }));
  };

  const handleRemoveTest = (testId) => {
    setCurrentOrder(prev => ({
      ...prev,
      tests: prev.tests.filter(t => t.id !== testId)
    }));
  };

  const calculateTotalCost = () => {
    return currentOrder.tests.reduce((total, test) => total + (test.cost || 0), 0);
  };

  const submitOrder = () => {
    if (currentOrder.tests.length === 0 || !currentOrder.clinicalIndication) {
      alert('Please select at least one test and provide clinical indication');
      return;
    }

    const newOrder = {
      ...currentOrder,
      id: `ORD${Date.now()}`,
      patientId: patient?.id,
      patientName: patient?.name,
      orderDate: new Date().toISOString(),
      status: 'Pending',
      totalCost: calculateTotalCost()
    };

    setOrders(prev => [...prev, newOrder]);
    setCurrentOrder({
      category: '',
      tests: [],
      urgency: 'Normal',
      clinicalIndication: '',
      department: '',
      requestingDoctor: 'Dr. Sarah Johnson',
      specialInstructions: ''
    });
    setShowOrderModal(false);
    
    alert('Diagnostic order submitted successfully!');
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Pending': return 'text-orange-600 bg-orange-50';
      case 'In Progress': return 'text-blue-600 bg-blue-50';
      case 'Completed': return 'text-green-600 bg-green-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  if (!patient) {
    return (
      <div className="text-center py-12">
        <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <i className="ri-test-tube-line text-gray-400 text-2xl"></i>
        </div>
        <h3 className="text-lg font-semibold text-gray-900 mb-2">Diagnostic Orders System</h3>
        <p className="text-gray-600">
          Please select a patient to begin ordering laboratory tests, imaging studies, or surgical procedures.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Patient Header */}
      <div className="bg-white rounded-lg p-6 shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold text-gray-900">Diagnostic Orders & Referrals</h2>
          <button
            onClick={() => setShowOrderModal(true)}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2 cursor-pointer whitespace-nowrap"
          >
            <i className="ri-add-line"></i>
            <span>New Order</span>
          </button>
        </div>
        
        <div className="bg-gray-50 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold text-gray-900">{patient.name}</h3>
              <p className="text-gray-600">
                {patient.age}yo • {patient.gender} • ID: {patient.id}
              </p>
            </div>
            <div className="text-right text-sm text-gray-600">
              <p>Consultation Date: {new Date().toLocaleDateString()}</p>
              <p>Requesting Doctor: Dr. Sarah Johnson</p>
            </div>
          </div>
        </div>
      </div>

      {/* Current Orders */}
      {orders.length > 0 && (
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-900">Current Orders</h3>
          {orders.map((order) => (
            <div key={order.id} className="bg-white rounded-lg p-6 shadow-sm border">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h4 className="text-lg font-semibold text-gray-900">Order #{order.id}</h4>
                  <p className="text-sm text-gray-600">
                    {new Date(order.orderDate).toLocaleDateString()} • {order.urgency} Priority
                  </p>
                </div>
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(order.status)}`}>
                  {order.status}
                </span>
              </div>

              <div className="grid md:grid-cols-2 gap-6 mb-4">
                <div>
                  <h5 className="font-medium text-gray-900 mb-2">Ordered Tests/Procedures</h5>
                  <div className="space-y-2">
                    {order.tests.map((test, index) => (
                      <div key={index} className="flex justify-between items-center bg-gray-50 rounded-lg p-3">
                        <div>
                          <p className="font-medium text-gray-900">{test.name}</p>
                          <p className="text-sm text-gray-600">{test.category}</p>
                        </div>
                        <span className="text-sm font-semibold">KSh {test.cost?.toLocaleString()}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h5 className="font-medium text-gray-900 mb-2">Clinical Information</h5>
                  <div className="bg-yellow-50 rounded-lg p-3">
                    <p className="text-sm text-yellow-800">
                      <strong>Indication:</strong> {order.clinicalIndication}
                    </p>
                    {order.specialInstructions && (
                      <p className="text-sm text-yellow-800 mt-2">
                        <strong>Instructions:</strong> {order.specialInstructions}
                      </p>
                    )}
                  </div>
                </div>
              </div>

              <div className="flex justify-between items-center pt-4 border-t">
                <div className="text-sm text-gray-600">
                  Total Cost: <strong className="text-lg text-gray-900">KSh {order.totalCost?.toLocaleString()}</strong>
                </div>
                <div className="flex space-x-2">
                  <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors text-sm cursor-pointer whitespace-nowrap">
                    View Details
                  </button>
                  <button className="bg-gray-100 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200 transition-colors text-sm cursor-pointer whitespace-nowrap">
                    Print Order
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Order Modal */}
      {showOrderModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg max-w-6xl w-full m-4 max-h-96 overflow-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-gray-900">New Diagnostic Order</h3>
                <button
                  onClick={() => setShowOrderModal(false)}
                  className="text-gray-400 hover:text-gray-600 cursor-pointer"
                >
                  <i className="ri-close-line text-2xl"></i>
                </button>
              </div>

              {/* Category Selection */}
              <div className="mb-6">
                <h4 className="font-semibold text-gray-900 mb-3">Select Category</h4>
                <div className="flex space-x-4">
                  {[
                    { key: 'laboratory', label: 'Laboratory Tests', icon: 'ri-flask-line' },
                    { key: 'imaging', label: 'Imaging Studies', icon: 'ri-scan-line' },
                    { key: 'surgery', label: 'Theatre/Surgery', icon: 'ri-surgical-mask-line' }
                  ].map((category) => (
                    <button
                      key={category.key}
                      onClick={() => setSelectedCategory(category.key)}
                      className={`flex items-center space-x-2 px-4 py-3 rounded-lg border-2 transition-colors cursor-pointer whitespace-nowrap ${
                        selectedCategory === category.key
                          ? 'bg-blue-50 border-blue-500 text-blue-700'
                          : 'border-gray-300 hover:border-gray-400'
                      }`}
                    >
                      <i className={`${category.icon} text-xl`}></i>
                      <span className="font-medium">{category.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Laboratory Tests */}
              {selectedCategory === 'laboratory' && (
                <div className="space-y-6">
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-3">Laboratory Panels</h4>
                    <div className="grid md:grid-cols-2 gap-4">
                      {laboratoryTests.panels.map((panel) => (
                        <div
                          key={panel.id}
                          className="border border-gray-300 rounded-lg p-4 hover:border-blue-500 transition-colors cursor-pointer"
                          onClick={() => handleTestSelect(panel, 'Laboratory Panel')}
                        >
                          <div className="flex justify-between items-start mb-2">
                            <h5 className="font-medium text-gray-900">{panel.name}</h5>
                            <span className="text-sm font-semibold text-blue-600">KSh {panel.cost.toLocaleString()}</span>
                          </div>
                          <p className="text-sm text-gray-600 mb-2">{panel.indication}</p>
                          <div className="flex justify-between text-xs text-gray-500">
                            <span>Tests: {panel.tests.length}</span>
                            <span>TAT: {panel.turnaroundTime}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="font-semibold text-gray-900 mb-3">Individual Tests</h4>
                    <div className="grid md:grid-cols-3 gap-4">
                      {laboratoryTests.individual.map((test) => (
                        <div
                          key={test.id}
                          className="border border-gray-300 rounded-lg p-3 hover:border-blue-500 transition-colors cursor-pointer"
                          onClick={() => handleTestSelect(test, 'Laboratory')}
                        >
                          <div className="flex justify-between items-center">
                            <span className="font-medium text-gray-900">{test.name}</span>
                            <span className="text-sm font-semibold text-blue-600">KSh {test.cost.toLocaleString()}</span>
                          </div>
                          <p className="text-xs text-gray-500 mt-1">TAT: {test.turnaroundTime}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Imaging Studies */}
              {selectedCategory === 'imaging' && (
                <div>
                  <h4 className="font-semibold text-gray-900 mb-3">Imaging Studies</h4>
                  <div className="grid md:grid-cols-2 gap-4">
                    {imagingStudies.map((study) => (
                      <div
                        key={study.id}
                        className="border border-gray-300 rounded-lg p-4 hover:border-blue-500 transition-colors cursor-pointer"
                        onClick={() => handleTestSelect(study, 'Imaging')}
                      >
                        <div className="flex justify-between items-start mb-2">
                          <h5 className="font-medium text-gray-900">{study.name}</h5>
                          <span className="text-sm font-semibold text-blue-600">KSh {study.cost.toLocaleString()}</span>
                        </div>
                        <p className="text-sm text-gray-600 mb-2">Duration: {study.duration}</p>
                        <p className="text-xs text-gray-500">{study.preparation}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Surgery/Theatre */}
              {selectedCategory === 'surgery' && (
                <div>
                  <h4 className="font-semibold text-gray-900 mb-3">Surgical Procedures</h4>
                  <div className="grid md:grid-cols-2 gap-4">
                    {surgicalProcedures.map((procedure) => (
                      <div
                        key={procedure.id}
                        className="border border-gray-300 rounded-lg p-4 hover:border-blue-500 transition-colors cursor-pointer"
                        onClick={() => handleTestSelect(procedure, 'Surgery')}
                      >
                        <div className="flex justify-between items-start mb-2">
                          <h5 className="font-medium text-gray-900">{procedure.name}</h5>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                            procedure.type === 'Emergency' ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'
                          }`}>
                            {procedure.type}
                          </span>
                        </div>
                        <div className="text-sm text-gray-600 space-y-1">
                          <p>Duration: {procedure.duration}</p>
                          <p>Anesthesia: {procedure.anesthesia}</p>
                          <p className="text-xs text-gray-500">{procedure.preparation}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Selected Tests */}
              {currentOrder.tests.length > 0 && (
                <div className="mt-6 bg-gray-50 rounded-lg p-4">
                  <h4 className="font-semibold text-gray-900 mb-3">Selected Tests/Procedures</h4>
                  <div className="space-y-2 mb-4">
                    {currentOrder.tests.map((test, index) => (
                      <div key={index} className="flex justify-between items-center bg-white rounded-lg p-3">
                        <div>
                          <span className="font-medium text-gray-900">{test.name}</span>
                          <span className="text-sm text-gray-600 ml-2">• {test.category}</span>
                        </div>
                        <div className="flex items-center space-x-3">
                          <span className="text-sm font-semibold">KSh {test.cost?.toLocaleString()}</span>
                          <button
                            onClick={() => handleRemoveTest(test.id)}
                            className="text-red-500 hover:text-red-700 cursor-pointer"
                          >
                            <i className="ri-close-line"></i>
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="text-right">
                    <span className="text-lg font-bold text-gray-900">
                      Total: KSh {calculateTotalCost().toLocaleString()}
                    </span>
                  </div>
                </div>
              )}

              {/* Order Details */}
              <div className="mt-6 space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Priority/Urgency Level
                  </label>
                  <div className="flex space-x-3">
                    {urgencyLevels.map((level) => (
                      <label
                        key={level.value}
                        className={`flex items-center p-3 rounded-lg border cursor-pointer transition-colors ${
                          currentOrder.urgency === level.value
                            ? level.color + ' border-current'
                            : 'border-gray-300 hover:border-gray-400'
                        }`}
                      >
                        <input
                          type="radio"
                          name="urgency"
                          value={level.value}
                          checked={currentOrder.urgency === level.value}
                          onChange={(e) => setCurrentOrder(prev => ({ ...prev, urgency: e.target.value }))}
                          className="mr-3"
                        />
                        <div>
                          <div className="font-medium">{level.label}</div>
                          <div className="text-xs">{level.time}</div>
                        </div>
                      </label>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Clinical Indication *
                  </label>
                  <textarea
                    value={currentOrder.clinicalIndication}
                    onChange={(e) => setCurrentOrder(prev => ({ ...prev, clinicalIndication: e.target.value }))}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                    rows="3"
                    placeholder="Provide clinical indication and relevant history for the requested tests/procedures"
                    maxLength="500"
                    required
                  ></textarea>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Special Instructions
                  </label>
                  <textarea
                    value={currentOrder.specialInstructions}
                    onChange={(e) => setCurrentOrder(prev => ({ ...prev, specialInstructions: e.target.value }))}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                    rows="2"
                    placeholder="Any special instructions for the laboratory, imaging, or surgical team"
                    maxLength="300"
                  ></textarea>
                </div>
              </div>

              {/* Submit Actions */}
              <div className="flex justify-between items-center mt-6 pt-6 border-t">
                <button
                  onClick={() => setShowOrderModal(false)}
                  className="bg-gray-100 text-gray-700 px-6 py-3 rounded-lg hover:bg-gray-200 transition-colors cursor-pointer whitespace-nowrap"
                >
                  Cancel
                </button>
                <button
                  onClick={submitOrder}
                  disabled={currentOrder.tests.length === 0 || !currentOrder.clinicalIndication}
                  className="bg-green-600 text-white px-8 py-3 rounded-lg hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center space-x-2 cursor-pointer whitespace-nowrap"
                >
                  <i className="ri-send-plane-line"></i>
                  <span>Submit Order</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {orders.length === 0 && (
        <div className="text-center py-12">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <i className="ri-test-tube-line text-gray-400 text-2xl"></i>
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">No Diagnostic Orders</h3>
          <p className="text-gray-600">
            Click "New Order" to request laboratory tests, imaging studies, or surgical procedures.
          </p>
        </div>
      )}
    </div>
  );
}