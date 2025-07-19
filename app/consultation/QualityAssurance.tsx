'use client';
import { useState } from 'react';

type Patient = {
  id: string;
  name: string;
  // Add other patient properties as needed
};

interface QualityAssuranceProps {
  patient?: Patient;
}

export default function QualityAssurance({ patient }: QualityAssuranceProps) {
  const [auditTrail, setAuditTrail] = useState([]);
  const [qualityMetrics, setQualityMetrics] = useState({});
  const [activeTab, setActiveTab] = useState('audit');
  const [complianceCheck, setComplianceCheck] = useState({});

  // Mock audit trail data
  const mockAuditTrail = [
    {
      id: 'AUD001',
      timestamp: '2024-01-15T14:30:15Z',
      user: 'Dr. Sarah Johnson',
      userId: 'DOC001',
      action: 'Patient Queue Access',
      details: 'Accessed patient queue and selected John Mwangi (PID001)',
      ipAddress: '192.168.1.45',
      sessionId: 'SES_20240115_143015',
      complianceFlag: 'HIPAA_COMPLIANT'
    },
    {
      id: 'AUD002',
      timestamp: '2024-01-15T14:32:20Z',
      user: 'Dr. Sarah Johnson',
      userId: 'DOC001',
      action: 'Medical History Review',
      details: 'Accessed and reviewed patient medical history and current medications',
      ipAddress: '192.168.1.45',
      sessionId: 'SES_20240115_143015',
      complianceFlag: 'AUTHORIZED_ACCESS'
    },
    {
      id: 'AUD003',
      timestamp: '2024-01-15T14:35:45Z',
      user: 'Dr. Sarah Johnson',
      userId: 'DOC001',
      action: 'Consultation Documentation',
      details: 'Created new consultation record with history of present illness',
      ipAddress: '192.168.1.45',
      sessionId: 'SES_20240115_143015',
      complianceFlag: 'DATA_ENTRY'
    },
    {
      id: 'AUD004',
      timestamp: '2024-01-15T14:40:12Z',
      user: 'Dr. Sarah Johnson',
      userId: 'DOC001',
      action: 'Prescription Created',
      details: 'Digital prescription created for Aspirin 100mg daily - Drug interaction check passed',
      ipAddress: '192.168.1.45',
      sessionId: 'SES_20240115_143015',
      complianceFlag: 'DRUG_SAFETY_VERIFIED'
    },
    {
      id: 'AUD005',
      timestamp: '2024-01-15T14:42:30Z',
      user: 'Dr. Sarah Johnson',
      userId: 'DOC001',
      action: 'Diagnostic Orders',
      details: 'Laboratory orders submitted: CBC, Basic Metabolic Panel - Clinical indication provided',
      ipAddress: '192.168.1.45',
      sessionId: 'SES_20240115_143015',
      complianceFlag: 'CLINICAL_JUSTIFICATION'
    },
    {
      id: 'AUD006',
      timestamp: '2024-01-15T14:45:55Z',
      user: 'System',
      userId: 'SYS001',
      action: 'Automatic Backup',
      details: 'Patient consultation data encrypted and backed up to secure servers',
      ipAddress: 'N/A',
      sessionId: 'SYSTEM_BACKUP',
      complianceFlag: 'DATA_ENCRYPTION'
    }
  ];

  // Mock quality metrics
  const mockQualityMetrics = {
    consultationMetrics: {
      averageConsultationTime: '35 minutes',
      totalConsultationsToday: 28,
      completedConsultations: 25,
      pendingConsultations: 3,
      consultationCompletionRate: '89.3%',
      averageWaitTime: '22 minutes',
      patientSatisfactionScore: 4.7
    },
    clinicalMetrics: {
      prescriptionAccuracy: '98.5%',
      drugInteractionAlerts: 12,
      allergyAlertsPrevented: 3,
      diagnosticOrdersWithIndication: '100%',
      followUpComplianceRate: '85.2%',
      clinicalGuidelineAdherence: '94.1%'
    },
    complianceMetrics: {
      hipaaCompliantSessions: '100%',
      dataEncryptionStatus: 'Active',
      unauthorizedAccessAttempts: 0,
      auditTrailCompleteness: '100%',
      userAuthenticationFailures: 1,
      systemUptimeToday: '99.8%'
    },
    outcomesMetrics: {
      patientReadmissionRate: '8.2%',
      treatmentEffectivenessScore: 4.5,
      medicationAdherenceRate: '78.9%',
      patientEducationCompletionRate: '92.3%',
      adverseEventRate: '1.2%',
      patientReportedOutcomes: 4.3
    }
  };

  // Compliance checks
  const mockComplianceChecks = [
    {
      category: 'HIPAA Compliance',
      checks: [
        { name: 'Patient consent verification', status: 'passed', details: 'Patient consent verified at registration' },
        { name: 'Data access authorization', status: 'passed', details: 'User authorized for patient data access' },
        { name: 'Minimum necessary standard', status: 'passed', details: 'Only necessary data accessed for treatment' },
        { name: 'Data encryption in transit', status: 'passed', details: 'All data transmission encrypted with TLS 1.3' },
        { name: 'Data encryption at rest', status: 'passed', details: 'Patient data encrypted with AES-256' }
      ]
    },
    {
      category: 'Clinical Documentation',
      checks: [
        { name: 'Complete patient identification', status: 'passed', details: 'Patient ID, name, DOB verified' },
        { name: 'Clinical indication for orders', status: 'passed', details: 'All diagnostic orders have clinical justification' },
        { name: 'Medication reconciliation', status: 'warning', details: 'Current medications list needs updating' },
        { name: 'Allergy documentation', status: 'passed', details: 'Known allergies documented and verified' },
        { name: 'Electronic signature', status: 'passed', details: 'All prescriptions digitally signed' }
      ]
    },
    {
      category: 'Quality Standards',
      checks: [
        { name: 'Evidence-based treatment', status: 'passed', details: 'Treatment follows clinical guidelines' },
        { name: 'Drug interaction screening', status: 'passed', details: 'All prescriptions screened for interactions' },
        { name: 'Patient safety alerts reviewed', status: 'passed', details: 'Critical values and alerts acknowledged' },
        { name: 'Consultation completeness', status: 'warning', details: 'Physical examination documentation incomplete' },
        { name: 'Follow-up plan documented', status: 'passed', details: 'Clear follow-up instructions provided' }
      ]
    }
  ];

  const getActionIcon = (action: string) => {
    switch (action) {
      case 'Patient Queue Access': return 'ri-team-line text-blue-500';
      case 'Medical History Review': return 'ri-history-line text-green-500';
      case 'Consultation Documentation': return 'ri-file-text-line text-purple-500';
      case 'Prescription Created': return 'ri-medicine-bottle-line text-orange-500';
      case 'Diagnostic Orders': return 'ri-test-tube-line text-cyan-500';
      case 'Automatic Backup': return 'ri-cloud-line text-gray-500';
      default: return 'ri-information-line text-gray-500';
    }
  };

  const getComplianceColor = (flag: string) => {
    switch (flag) {
      case 'HIPAA_COMPLIANT': return 'text-green-600 bg-green-50';
      case 'AUTHORIZED_ACCESS': return 'text-blue-600 bg-blue-50';
      case 'DATA_ENTRY': return 'text-purple-600 bg-purple-50';
      case 'DRUG_SAFETY_VERIFIED': return 'text-orange-600 bg-orange-50';
      case 'CLINICAL_JUSTIFICATION': return 'text-cyan-600 bg-cyan-50';
      case 'DATA_ENCRYPTION': return 'text-gray-600 bg-gray-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'passed': return 'ri-check-line text-green-500';
      case 'warning': return 'ri-alert-line text-yellow-500';
      case 'failed': return 'ri-close-line text-red-500';
      default: return 'ri-information-line text-gray-500';
    }
  };

  const exportAuditReport = () => {
    const reportData = {
      reportType: 'Audit Trail Report',
      generatedBy: 'Dr. Sarah Johnson',
      generatedAt: new Date().toISOString(),
      patientId: patient?.id,
      auditEntries: mockAuditTrail,
      complianceStatus: 'COMPLIANT'
    };
    
    console.log('Audit report exported:', reportData);
    alert('Audit trail report exported successfully!');
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-lg p-6 shadow-sm">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Quality Assurance & Compliance Dashboard</h2>
        
        {patient && (
          <div className="bg-gray-50 rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold text-gray-900">{patient.name}</h3>
                <p className="text-gray-600">
                  Session ID: SES_20240115_143015 • Compliance Status: <span className="text-green-600 font-medium">COMPLIANT</span>
                </p>
              </div>
              <div className="flex space-x-2">
                <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-medium">
                  <i className="ri-shield-check-line mr-1"></i>
                  HIPAA Compliant
                </span>
                <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium">
                  <i className="ri-lock-line mr-1"></i>
                  Encrypted
                </span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Tab Navigation */}
      <div className="bg-white rounded-lg shadow-sm">
        <div className="flex border-b">
          {[
            { key: 'audit', label: 'Audit Trail', icon: 'ri-history-line' },
            { key: 'metrics', label: 'Quality Metrics', icon: 'ri-bar-chart-line' },
            { key: 'compliance', label: 'Compliance Check', icon: 'ri-shield-check-line' },
            { key: 'security', label: 'Security Status', icon: 'ri-lock-line' }
          ].map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`flex items-center space-x-2 px-6 py-4 transition-colors cursor-pointer whitespace-nowrap ${
                activeTab === tab.key
                  ? 'bg-blue-50 text-blue-600 border-b-2 border-blue-600'
                  : 'text-gray-600 hover:text-gray-800 hover:bg-gray-50'
              }`}
            >
              <i className={`${tab.icon} text-lg`}></i>
              <span className="font-medium">{tab.label}</span>
            </button>
          ))}
        </div>

        <div className="p-6">
          {/* Audit Trail Tab */}
          {activeTab === 'audit' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-900">Complete Documentation Trail</h3>
                <div className="flex space-x-2">
                  <button
                    onClick={exportAuditReport}
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2 cursor-pointer whitespace-nowrap"
                  >
                    <i className="ri-download-line"></i>
                    <span>Export Report</span>
                  </button>
                </div>
              </div>

              <div className="space-y-3">
                {mockAuditTrail.map((entry) => (
                  <div key={entry.id} className="border border-gray-200 rounded-lg p-4">
                    <div className="flex items-start justify-between">
                      <div className="flex items-start space-x-3 flex-1">
                        <i className={`${getActionIcon(entry.action)} text-xl mt-1`}></i>
                        <div className="flex-1">
                          <div className="flex items-center space-x-3 mb-2">
                            <h4 className="font-semibold text-gray-900">{entry.action}</h4>
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${getComplianceColor(entry.complianceFlag)}`}>
                              {entry.complianceFlag.replace(/_/g, ' ')}
                            </span>
                          </div>
                          <p className="text-gray-700 text-sm mb-2">{entry.details}</p>
                          <div className="flex items-center space-x-4 text-xs text-gray-500">
                            <span>User: {entry.user} ({entry.userId})</span>
                            <span>Time: {new Date(entry.timestamp).toLocaleString()}</span>
                            <span>IP: {entry.ipAddress}</span>
                            <span>Session: {entry.sessionId}</span>
                          </div>
                        </div>
                      </div>
                      <div className="text-xs text-gray-400">
                        ID: {entry.id}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Quality Metrics Tab */}
          {activeTab === 'metrics' && (
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-gray-900">Performance & Quality Metrics</h3>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-blue-50 rounded-lg p-6">
                  <h4 className="font-semibold text-blue-900 mb-4">Consultation Metrics</h4>
                  <div className="space-y-3">
                    {Object.entries(mockQualityMetrics.consultationMetrics).map(([key, value]) => (
                      <div key={key} className="flex justify-between">
                        <span className="text-blue-800 capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}:</span>
                        <span className="font-medium text-blue-900">{value}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-green-50 rounded-lg p-6">
                  <h4 className="font-semibold text-green-900 mb-4">Clinical Quality</h4>
                  <div className="space-y-3">
                    {Object.entries(mockQualityMetrics.clinicalMetrics).map(([key, value]) => (
                      <div key={key} className="flex justify-between">
                        <span className="text-green-800 capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}:</span>
                        <span className="font-medium text-green-900">{value}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-purple-50 rounded-lg p-6">
                  <h4 className="font-semibold text-purple-900 mb-4">Compliance Metrics</h4>
                  <div className="space-y-3">
                    {Object.entries(mockQualityMetrics.complianceMetrics).map(([key, value]) => (
                      <div key={key} className="flex justify-between">
                        <span className="text-purple-800 capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}:</span>
                        <span className="font-medium text-purple-900">{value}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-orange-50 rounded-lg p-6">
                  <h4 className="font-semibold text-orange-900 mb-4">Patient Outcomes</h4>
                  <div className="space-y-3">
                    {Object.entries(mockQualityMetrics.outcomesMetrics).map(([key, value]) => (
                      <div key={key} className="flex justify-between">
                        <span className="text-orange-800 capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}:</span>
                        <span className="font-medium text-orange-900">{value}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Compliance Check Tab */}
          {activeTab === 'compliance' && (
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-gray-900">Regulatory Compliance Assessment</h3>
              
              {mockComplianceChecks.map((category, categoryIndex) => (
                <div key={categoryIndex} className="bg-white border border-gray-200 rounded-lg p-6">
                  <h4 className="font-semibold text-gray-900 mb-4">{category.category}</h4>
                  <div className="space-y-3">
                    {category.checks.map((check, checkIndex) => (
                      <div key={checkIndex} className="flex items-start space-x-3 p-3 rounded-lg bg-gray-50">
                        <i className={`${getStatusIcon(check.status)} text-xl mt-1`}></i>
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-1">
                            <h5 className="font-medium text-gray-900">{check.name}</h5>
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                              check.status === 'passed' ? 'bg-green-100 text-green-700' :
                              check.status === 'warning' ? 'bg-yellow-100 text-yellow-700' :
                              'bg-red-100 text-red-700'
                            }`}>
                              {check.status.toUpperCase()}
                            </span>
                          </div>
                          <p className="text-sm text-gray-600">{check.details}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Security Status Tab */}
          {activeTab === 'security' && (
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-gray-900">Security & Data Protection Status</h3>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-green-50 border border-green-200 rounded-lg p-6">
                  <div className="flex items-center space-x-3 mb-4">
                    <i className="ri-shield-check-line text-green-600 text-2xl"></i>
                    <h4 className="font-semibold text-green-900">Data Encryption</h4>
                  </div>
                  <div className="space-y-2 text-sm">
                    <p className="text-green-800">✓ AES-256 encryption at rest</p>
                    <p className="text-green-800">✓ TLS 1.3 encryption in transit</p>
                    <p className="text-green-800">✓ End-to-end secure communication</p>
                    <p className="text-green-800">✓ Encrypted database backups</p>
                  </div>
                </div>

                <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
                  <div className="flex items-center space-x-3 mb-4">
                    <i className="ri-user-settings-line text-blue-600 text-2xl"></i>
                    <h4 className="font-semibold text-blue-900">Access Control</h4>
                  </div>
                  <div className="space-y-2 text-sm">
                    <p className="text-blue-800">✓ Multi-factor authentication active</p>
                    <p className="text-blue-800">✓ Role-based access permissions</p>
                    <p className="text-blue-800">✓ Session timeout configured</p>
                    <p className="text-blue-800">✓ Failed login attempt monitoring</p>
                  </div>
                </div>

                <div className="bg-purple-50 border border-purple-200 rounded-lg p-6">
                  <div className="flex items-center space-x-3 mb-4">
                    <i className="ri-file-shield-line text-purple-600 text-2xl"></i>
                    <h4 className="font-semibold text-purple-900">Data Integrity</h4>
                  </div>
                  <div className="space-y-2 text-sm">
                    <p className="text-purple-800">✓ Digital signatures verified</p>
                    <p className="text-purple-800">✓ Data modification tracking</p>
                    <p className="text-purple-800">✓ Checksum validation</p>
                    <p className="text-purple-800">✓ Backup integrity verified</p>
                  </div>
                </div>

                <div className="bg-orange-50 border border-orange-200 rounded-lg p-6">
                  <div className="flex items-center space-x-3 mb-4">
                    <i className="ri-eye-line text-orange-600 text-2xl"></i>
                    <h4 className="font-semibold text-orange-900">Monitoring & Alerts</h4>
                  </div>
                  <div className="space-y-2 text-sm">
                    <p className="text-orange-800">✓ Real-time security monitoring</p>
                    <p className="text-orange-800">✓ Intrusion detection active</p>
                    <p className="text-orange-800">✓ Automated security alerts</p>
                    <p className="text-orange-800">✓ 24/7 system monitoring</p>
                  </div>
                </div>
              </div>

              <div className="bg-gray-50 rounded-lg p-6">
                <h4 className="font-semibold text-gray-900 mb-4">Current Security Status</h4>
                <div className="grid md:grid-cols-3 gap-6">
                  <div className="text-center">
                    <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-2">
                      <i className="ri-shield-check-line text-green-600 text-xl"></i>
                    </div>
                    <p className="font-semibold text-green-600">SECURE</p>
                    <p className="text-sm text-gray-600">System Status</p>
                  </div>
                  <div className="text-center">
                    <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-2">
                      <span className="font-bold text-green-600">0</span>
                    </div>
                    <p className="font-semibold text-green-600">NO THREATS</p>
                    <p className="text-sm text-gray-600">Security Incidents</p>
                  </div>
                  <div className="text-center">
                    <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-2">
                      <span className="font-bold text-green-600">100%</span>
                    </div>
                    <p className="font-semibold text-green-600">COMPLIANT</p>
                    <p className="text-sm text-gray-600">Regulatory Standards</p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {!patient && (
        <div className="text-center py-12">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <i className="ri-shield-check-line text-gray-400 text-2xl"></i>
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Quality Assurance Dashboard</h3>
          <p className="text-gray-600">
            Complete audit trail, compliance monitoring, and quality metrics tracking for all patient interactions.
          </p>
        </div>
      )}
    </div>
  );
}