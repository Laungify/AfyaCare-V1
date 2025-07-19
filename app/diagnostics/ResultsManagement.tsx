'use client';
import { useState } from 'react';

// Mock results data
const testResults = [
  {
    id: 'RES001',
    orderId: 'ORD001',
    patientId: 'PID001',
    patientName: 'John Mwangi',
    age: 34,
    gender: 'Male',
    testDate: '2024-01-15',
    completionTime: '14:30',
    reportedBy: 'Mary Wanjiku, MLT',
    verifiedBy: 'Dr. Sarah Kimani',
    status: 'Critical - Notified',
    category: 'Laboratory',
    tests: {
      'CBC': {
        'Hemoglobin': { value: 6.2, unit: 'g/dL', normalRange: '12.0-15.5', status: 'critically_low' },
        'Hematocrit': { value: 18.5, unit: '%', normalRange: '36-46', status: 'low' },
        'WBC Count': { value: 15.2, unit: '×10³/μL', normalRange: '4.5-11.0', status: 'high' },
        'Platelet Count': { value: 450, unit: '×10³/μL', normalRange: '150-450', status: 'normal' }
      },
      'LFT': {
        'ALT (SGPT)': { value: 145, unit: 'U/L', normalRange: '7-35', status: 'high' },
        'AST (SGOT)': { value: 189, unit: 'U/L', normalRange: '10-40', status: 'high' },
        'Total Bilirubin': { value: 4.8, unit: 'mg/dL', normalRange: '0.3-1.2', status: 'high' }
      }
    },
    criticalValues: [
      { test: 'CBC', parameter: 'Hemoglobin', value: 6.2, type: 'critically_low' }
    ],
    clinicalInterpretation: 'Severe anemia with elevated liver enzymes suggests possible hemolytic anemia or liver disease. Immediate medical attention required.',
    physicianNotified: true,
    notificationTime: '14:32',
    patientNotified: false
  },
  {
    id: 'RES002',
    orderId: 'ORD002',
    patientId: 'PID002',
    patientName: 'Mary Wanjiku',
    age: 28,
    gender: 'Female',
    testDate: '2024-01-15',
    completionTime: '13:15',
    reportedBy: 'James Ochieng, RT',
    verifiedBy: 'Dr. Peter Kamau',
    status: 'Normal - Reported',
    category: 'Imaging',
    tests: {
      'US-ABD': {
        findings: 'Normal liver, gallbladder, kidneys, and spleen. No abnormal masses or fluid collections.',
        impression: 'Normal abdominal ultrasound'
      },
      'US-PEL': {
        findings: 'Single intrauterine pregnancy at 20 weeks gestation. Fetal biometry appropriate for gestational age. Normal amniotic fluid volume.',
        impression: 'Normal fetal development at 20 weeks'
      }
    },
    criticalValues: [],
    clinicalInterpretation: 'Normal prenatal ultrasound findings. Continue routine prenatal care.',
    physicianNotified: true,
    notificationTime: '13:17',
    patientNotified: true
  },
  {
    id: 'RES003',
    orderId: 'ORD003',
    patientId: 'PID003',
    patientName: 'David Ochieng',
    age: 45,
    gender: 'Male',
    testDate: '2024-01-15',
    completionTime: '11:25',
    reportedBy: 'Grace Kiprotich, MLT',
    verifiedBy: 'Dr. Samuel Muthoni',
    status: 'Critical - Emergency',
    category: 'Point-of-Care',
    tests: {
      'TROP-I': { value: 8.5, unit: 'ng/mL', normalRange: '<0.04', status: 'critically_high' },
      'BNP': { value: 1250, unit: 'pg/mL', normalRange: '<100', status: 'high' },
      'ECG': { findings: 'ST elevation in leads V2-V6. Q waves in leads II, III, aVF.' }
    },
    criticalValues: [
      { test: 'TROP-I', parameter: 'Troponin I', value: 8.5, type: 'critically_high' }
    ],
    clinicalInterpretation: 'Acute ST-elevation myocardial infarction (STEMI). Immediate cardiac catheterization indicated.',
    physicianNotified: true,
    notificationTime: '11:26',
    patientNotified: false,
    emergencyProtocol: 'STEMI Alert activated - Cath lab notified'
  },
  {
    id: 'RES004',
    orderId: 'ORD004',
    patientId: 'PID004',
    patientName: 'Grace Kiprotich',
    age: 32,
    gender: 'Female',
    testDate: '2024-01-15',
    completionTime: '12:45',
    reportedBy: 'Samuel Muthoni, MLT',
    verifiedBy: 'Dr. Alice Wanjiku',
    status: 'Positive - Treated',
    category: 'Point-of-Care',
    tests: {
      'MAL-RDT': { result: 'Positive', species: 'P. falciparum' },
      'TYPH-RDT': { result: 'Negative' },
      'WIDAL': {
        'Salmonella typhi O': { titer: '1:80', status: 'negative' },
        'Salmonella typhi H': { titer: '1:80', status: 'negative' }
      }
    },
    criticalValues: [],
    clinicalInterpretation: 'Malaria positive (P. falciparum). Typhoid negative. Start antimalarial treatment immediately.',
    physicianNotified: true,
    notificationTime: '12:47',
    patientNotified: true,
    treatmentStarted: true
  }
];

type TestResult = typeof testResults[number];

export default function ResultsManagement() {
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedResult, setSelectedResult] = useState<TestResult | null>(null);



  const filteredResults = testResults.filter(result => {
    const matchesFilter = selectedFilter === 'all' || result.status.toLowerCase().includes(selectedFilter.toLowerCase());
    const matchesSearch = searchTerm === '' ||
      result.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      result.patientId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      result.id.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const getStatusColor = (status: string) => {
    if (status.includes('Critical')) return 'text-red-600 bg-red-50 border-red-200';
    if (status.includes('Positive')) return 'text-orange-600 bg-orange-50 border-orange-200';
    if (status.includes('Normal')) return 'text-green-600 bg-green-50 border-green-200';
    return 'text-blue-600 bg-blue-50 border-blue-200';
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'Laboratory': return 'ri-flask-line';
      case 'Imaging': return 'ri-scan-line';
      case 'Point-of-Care': return 'ri-heart-pulse-line';
      default: return 'ri-test-tube-line';
    }
  };

  const renderResultDetail = (result: any) => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg max-w-4xl w-full m-4 max-h-96 overflow-auto">
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold text-gray-900">Test Results - {result.id}</h3>
            <button
              onClick={() => setSelectedResult(null)}
              className="text-gray-400 hover:text-gray-600 cursor-pointer"
            >
              <i className="ri-close-line text-2xl"></i>
            </button>
          </div>

          <div className="grid md:grid-cols-2 gap-6 mb-6">
            <div>
              <h4 className="font-semibold text-gray-900 mb-3">Patient Information</h4>
              <div className="space-y-2 text-sm">
                <p><span className="text-gray-600">Name:</span> {result.patientName}</p>
                <p><span className="text-gray-600">ID:</span> {result.patientId}</p>
                <p><span className="text-gray-600">Age/Gender:</span> {result.age}yo {result.gender}</p>
                <p><span className="text-gray-600">Test Date:</span> {result.testDate} at {result.completionTime}</p>
              </div>
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 mb-3">Report Information</h4>
              <div className="space-y-2 text-sm">
                <p><span className="text-gray-600">Reported by:</span> {result.reportedBy}</p>
                <p><span className="text-gray-600">Verified by:</span> {result.verifiedBy}</p>
                <p><span className="text-gray-600">Status:</span>
                  <span className={`ml-2 px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(result.status)}`}>
                    {result.status}
                  </span>
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            {Object.entries(result.tests).map(([testCode, testData]) => (
              <div key={testCode} className="bg-gray-50 rounded-lg p-4">
                <h4 className="font-semibold text-gray-900 mb-3">{testCode}</h4>

                {testCode.includes('US-') ? (
                  <div className="space-y-2">
                    <div>
                      <p className="text-sm font-medium text-gray-700">Findings:</p>
                      <p className="text-sm text-gray-600">{(testData as { findings: string }).findings}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-700">Impression:</p>
                      <p className="text-sm text-gray-600">{(testData as { impression: string }).impression}</p>
                    </div>
                  </div>
                ) : testCode === 'ECG' ? (
                  <div>
                    <p className="text-sm font-medium text-gray-700">Findings:</p>
                    <p className="text-sm text-gray-600">{(testData as { findings: string }).findings}</p>
                  </div>
                ) : testCode.includes('RDT') ? (
                  <div className="space-y-2">
                    <p className="text-sm"><span className="font-medium">Result:</span> {(testData as { result: string }).result}</p>
                    {typeof testData === 'object' && testData !== null && 'species' in testData && (
                      <p className="text-sm">
                        <span className="font-medium">Species:</span> {(testData as { species: string }).species}
                      </p>
                    )}
                  </div>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead className="bg-gray-100">
                        <tr>
                          <th className="text-left p-2 font-medium">Parameter</th>
                          <th className="text-left p-2 font-medium">Result</th>
                          <th className="text-left p-2 font-medium">Unit</th>
                          <th className="text-left p-2 font-medium">Normal Range</th>
                          <th className="text-left p-2 font-medium">Status</th>
                        </tr>
                      </thead>
                      <tbody>
                        {Object.entries(testData as Record<string, any>).map(([param, data]) => (
                          <tr key={param} className="border-t">
                            <td className="p-2 font-medium">{param}</td>
                            <td className={`p-2 font-semibold ${data.status?.includes('critical') ? 'text-red-600' :
                                data.status === 'high' || data.status === 'low' ? 'text-orange-600' :
                                  'text-gray-900'
                              }`}>
                              {data.value || data.titer}
                            </td>
                            <td className="p-2 text-gray-600">{data.unit}</td>
                            <td className="p-2 text-gray-600">{data.normalRange}</td>
                            <td className="p-2">
                              <span className={`px-2 py-1 rounded-full text-xs font-medium ${data.status?.includes('critical') ? 'bg-red-100 text-red-700' :
                                  data.status === 'high' || data.status === 'low' ? 'bg-orange-100 text-orange-700' :
                                    data.status === 'normal' ? 'bg-green-100 text-green-700' :
                                      'bg-gray-100 text-gray-700'
                                }`}>
                                {data.status || 'normal'}
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            ))}
          </div>

          {result.criticalValues.length > 0 && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4 mt-6">
              <h4 className="font-semibold text-red-900 mb-2 flex items-center">
                <i className="ri-alarm-warning-line mr-2"></i>
                Critical Values Alert
              </h4>
              {result.criticalValues.map(
                (
                  cv: { test: string; parameter: string; value: number; type: string },
                  index: number
                ) => (
                  <p key={index} className="text-sm text-red-800">
                    {cv.test} - {cv.parameter}: {cv.value} ({cv.type.replace('_', ' ')})
                  </p>
                )
              )}
            </div>
          )}

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mt-4">
            <h4 className="font-semibold text-blue-900 mb-2">Clinical Interpretation</h4>
            <p className="text-sm text-blue-800">{result.clinicalInterpretation}</p>
          </div>

          <div className="flex justify-between items-center mt-6 pt-4 border-t">
            <div className="flex space-x-4">
              {!result.patientNotified && (
                <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors text-sm cursor-pointer whitespace-nowrap">
                  Notify Patient
                </button>
              )}
              <button className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors text-sm cursor-pointer whitespace-nowrap">
                Print Report
              </button>
              <button className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors text-sm cursor-pointer whitespace-nowrap">
                Share with Doctor
              </button>
            </div>
            <button
              onClick={() => setSelectedResult(null)}
              className="bg-gray-100 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200 transition-colors text-sm cursor-pointer whitespace-nowrap"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Search and Filters */}
      <div className="bg-white rounded-lg p-6 shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-gray-900">Test Results Management</h2>
          <div className="flex items-center space-x-4">
            <div className="relative">
              <input
                type="text"
                placeholder="Search by patient name, ID, or result ID..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm w-80"
              />
              <i className="ri-search-line absolute left-3 top-2.5 text-gray-400"></i>
            </div>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <span className="text-sm text-gray-600">Filter by status:</span>
          <div className="flex space-x-2">
            {[
              { key: 'all', label: 'All Results', color: 'bg-gray-100 text-gray-700' },
              { key: 'critical', label: 'Critical', color: 'bg-red-100 text-red-700' },
              { key: 'normal', label: 'Normal', color: 'bg-green-100 text-green-700' },
              { key: 'positive', label: 'Positive', color: 'bg-orange-100 text-orange-700' }
            ].map((filter) => (
              <button
                key={filter.key}
                onClick={() => setSelectedFilter(filter.key)}
                className={`px-3 py-1 rounded-full text-sm font-medium transition-colors cursor-pointer whitespace-nowrap ${selectedFilter === filter.key
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

      {/* Results List */}
      <div className="space-y-4">
        {filteredResults.map((result) => (
          <div
            key={result.id}
            className="bg-white rounded-lg p-6 shadow-sm border hover:shadow-md transition-shadow"
          >
            <div className="flex items-start justify-between">
              <div className="flex items-start space-x-4 flex-1">
                <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${result.category === 'Laboratory' ? 'bg-blue-100' :
                    result.category === 'Imaging' ? 'bg-purple-100' : 'bg-green-100'
                  }`}>
                  <i className={`${getCategoryIcon(result.category)} text-xl ${result.category === 'Laboratory' ? 'text-blue-600' :
                      result.category === 'Imaging' ? 'text-purple-600' : 'text-green-600'
                    }`}></i>
                </div>

                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <h3 className="text-lg font-semibold text-gray-900">
                      {result.patientName} • Result #{result.id}
                    </h3>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(result.status)}`}>
                      {result.status}
                    </span>
                    {result.criticalValues.length > 0 && (
                      <span className="px-2 py-1 rounded-full text-xs font-medium bg-red-100 text-red-700 border border-red-200 flex items-center">
                        <i className="ri-alarm-warning-line mr-1"></i>
                        Critical Values
                      </span>
                    )}
                  </div>

                  <div className="grid md:grid-cols-3 gap-4 mb-4 text-sm">
                    <div>
                      <p className="text-gray-600">Patient ID</p>
                      <p className="font-medium">{result.patientId} • {result.age}yo {result.gender}</p>
                    </div>
                    <div>
                      <p className="text-gray-600">Test Date</p>
                      <p className="font-medium">{result.testDate} at {result.completionTime}</p>
                    </div>
                    <div>
                      <p className="text-gray-600">Verified by</p>
                      <p className="font-medium">{result.verifiedBy}</p>
                    </div>
                  </div>

                  <div className="bg-gray-50 rounded-lg p-3 mb-3">
                    <p className="text-sm font-medium text-gray-700 mb-1">Clinical Interpretation</p>
                    <p className="text-sm text-gray-600">{result.clinicalInterpretation}</p>
                  </div>

                  <div className="flex items-center space-x-4 text-xs text-gray-500">
                    <div className="flex items-center space-x-1">
                      <i className={`ri-${result.physicianNotified ? 'check' : 'time'}-line`}></i>
                      <span>Physician {result.physicianNotified ? 'Notified' : 'Pending'}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <i className={`ri-${result.patientNotified ? 'check' : 'time'}-line`}></i>
                      <span>Patient {result.patientNotified ? 'Notified' : 'Pending'}</span>
                    </div>
                    {result.emergencyProtocol && (
                      <div className="flex items-center space-x-1 text-red-600">
                        <i className="ri-alarm-line"></i>
                        <span>{result.emergencyProtocol}</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <div className="flex flex-col space-y-2">
                <button
                  onClick={() => setSelectedResult(result)}
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors text-sm cursor-pointer whitespace-nowrap"
                >
                  View Full Report
                </button>

                <button className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors text-sm cursor-pointer whitespace-nowrap">
                  Print Report
                </button>

                {!result.patientNotified && (
                  <button className="bg-orange-600 text-white px-4 py-2 rounded-lg hover:bg-orange-700 transition-colors text-sm cursor-pointer whitespace-nowrap">
                    Notify Patient
                  </button>
                )}

                <button className="text-gray-400 hover:text-gray-600 cursor-pointer">
                  <i className="ri-more-2-fill text-xl"></i>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredResults.length === 0 && (
        <div className="text-center py-12">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <i className="ri-file-chart-line text-gray-400 text-2xl"></i>
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">No results found</h3>
          <p className="text-gray-600">
            No test results match your search criteria.
          </p>
        </div>
      )}

      {/* Result Detail Modal */}
      {selectedResult && renderResultDetail(selectedResult)}
    </div>
  );
}