'use client';
import { useState, useEffect, useCallback } from 'react';

export default function SystemIntegration({ patient }: {
  patient: { id: string; name: string; age: number } | null;
}) {
  type SyncProgressType = {
    [key: string]: {
      status: string;
      progress: number;
      lastSync: string;
    }
  };

  type ConnectionHealthType = {
    [key: string]: {
      responseTime: number;
      uptime: number;
      lastHealthCheck: string;
      status: string;
    }
  };

  type IntegrationStatusType = {
    [key: string]: any;
  };

  type ExternalDataType = {
    [key: string]: any;
  };

  const [integrationStatus, setIntegrationStatus] = useState<IntegrationStatusType>({});
  const [syncProgress, setSyncProgress] = useState<SyncProgressType>({});
  const [externalData, setExternalData] = useState<ExternalDataType>({});
  const [connectionHealth, setConnectionHealth] = useState<ConnectionHealthType>({});

  // Mock integration systems
  const integrationSystems = [
    {
      id: 'emr',
      name: 'Electronic Medical Records',
      type: 'EMR/EHR System',
      status: 'connected',
      lastSync: '2024-01-15T14:45:00Z',
      dataFlow: 'bidirectional',
      version: 'v3.2.1',
      vendor: 'Epic Systems'
    },
    {
      id: 'his',
      name: 'Hospital Information System',
      type: 'Core HIS',
      status: 'connected',
      lastSync: '2024-01-15T14:44:30Z',
      dataFlow: 'bidirectional',
      version: 'v2.8.5',
      vendor: 'Cerner Corporation'
    },
    {
      id: 'billing',
      name: 'Billing Management System',
      type: 'Financial System',
      status: 'connected',
      lastSync: '2024-01-15T14:43:15Z',
      dataFlow: 'outbound',
      version: 'v4.1.2',
      vendor: 'McKesson'
    },
    {
      id: 'pharmacy',
      name: 'Pharmacy Management',
      type: 'Medication System',
      status: 'connected',
      lastSync: '2024-01-15T14:45:10Z',
      dataFlow: 'bidirectional',
      version: 'v5.3.0',
      vendor: 'Omnicell'
    },
    {
      id: 'laboratory',
      name: 'Laboratory Information System',
      type: 'Diagnostic System',
      status: 'connected',
      lastSync: '2024-01-15T14:44:45Z',
      dataFlow: 'bidirectional',
      version: 'v3.7.8',
      vendor: 'Roche Diagnostics'
    },
    {
      id: 'radiology',
      name: 'Radiology Information System',
      type: 'Imaging System',
      status: 'connected',
      lastSync: '2024-01-15T14:43:55Z',
      dataFlow: 'bidirectional',
      version: 'v6.2.1',
      vendor: 'GE Healthcare'
    },
    {
      id: 'insurance',
      name: 'Insurance Verification',
      type: 'External Service',
      status: 'connected',
      lastSync: '2024-01-15T14:42:20Z',
      dataFlow: 'inbound',
      version: 'API v2.1',
      vendor: 'CoverMyMeds'
    },
    {
      id: 'formulary',
      name: 'Drug Formulary Database',
      type: 'Reference System',
      status: 'connected',
      lastSync: '2024-01-15T14:41:30Z',
      dataFlow: 'inbound',
      version: 'v8.4.2',
      vendor: 'First Databank'
    },
    {
      id: 'guidelines',
      name: 'Clinical Guidelines Repository',
      type: 'Knowledge Base',
      status: 'connected',
      lastSync: '2024-01-15T14:40:15Z',
      dataFlow: 'inbound',
      version: 'v12.1.0',
      vendor: 'UpToDate'
    }
  ];

  // Mock external data
  const mockExternalData = {
    insuranceData: {
      provider: 'Jubilee Insurance',
      policyNumber: 'JUB-2024-789456',
      coverage: 'Comprehensive Health Plan',
      copay: 'KSh 500',
      deductible: 'KSh 10,000',
      status: 'Active',
      lastVerified: '2024-01-15T09:30:00Z'
    },
    pharmacyData: {
      preferredPharmacy: 'Goodlife Pharmacy - Westlands',
      lastFilled: '2024-01-10T16:20:00Z',
      pendingRefills: 2,
      adherenceScore: '85%',
      drugAllergies: ['Penicillin', 'Sulfa drugs']
    },
    labData: {
      lastResults: '2024-01-12T11:45:00Z',
      pendingTests: ['CBC', 'Lipid Profile'],
      criticalValues: 0,
      trendingValues: ['Glucose trending up', 'Cholesterol stable']
    },
    radiologyData: {
      lastImaging: '2024-01-08T14:30:00Z',
      studyType: 'Chest X-Ray',
      result: 'Normal findings',
      scheduledStudies: ['Abdominal Ultrasound - 2024-01-18']
    }
  };

  const updateConnectionHealth = useCallback(() => {
    const health: ConnectionHealthType = {};
    integrationSystems.forEach(system => {
      health[system.id] = {
        responseTime: Math.floor(Math.random() * 200) + 50, // 50-250ms
        uptime: 99.5 + Math.random() * 0.5, // 99.5-100%
        lastHealthCheck: new Date().toISOString(),
        status: Math.random() > 0.1 ? 'healthy' : 'warning' // 90% healthy
      };
    });
    setConnectionHealth(health);
  }, [integrationSystems]);

  const syncExternalData = useCallback(() => {
    if (!patient) return;

    const progress: SyncProgressType = {};
    integrationSystems.forEach(system => {
      progress[system.id] = {
        status: 'syncing',
        progress: Math.floor(Math.random() * 30) + 70, // 70-100%
        lastSync: new Date().toISOString()
      };
    });
    setSyncProgress(progress);

    // Complete sync after a delay
    setTimeout(() => {
      const completedProgress: SyncProgressType = {};
      integrationSystems.forEach(system => {
        completedProgress[system.id] = {
          status: 'completed',
          progress: 100,
          lastSync: new Date().toISOString()
        };
      });
      setSyncProgress(completedProgress);
    }, 3000);
  }, [patient, integrationSystems]);

  useEffect(() => {
    // Simulate real-time connection monitoring
    const interval = setInterval(() => {
      updateConnectionHealth();
      syncExternalData();
    }, 30000); // Update every 30 seconds

    return () => clearInterval(interval);
  }, [updateConnectionHealth, syncExternalData]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'connected': return 'text-green-600 bg-green-50';
      case 'disconnected': return 'text-red-600 bg-red-50';
      case 'warning': return 'text-yellow-600 bg-yellow-50';
      case 'maintenance': return 'text-blue-600 bg-blue-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  const getHealthColor = (status: string) => {
    switch (status) {
      case 'healthy': return 'text-green-600';
      case 'warning': return 'text-yellow-600';
      case 'critical': return 'text-red-600';
      default: return 'text-gray-600';
    }
  };

  const forceSync = (systemId: string) => {
    setSyncProgress(prev => ({
      ...prev,
      [systemId]: { status: 'syncing', progress: 0, lastSync: new Date().toISOString() }
    }));

    // Simulate sync progress
    let progress = 0;
    const interval = setInterval(() => {
      progress += Math.random() * 20 + 10;
      if (progress >= 100) {
        progress = 100;
        clearInterval(interval);
        setSyncProgress(prev => ({
          ...prev,
          [systemId]: { status: 'completed', progress: 100, lastSync: new Date().toISOString() }
        }));
      } else {
        setSyncProgress(prev => ({
          ...prev,
          [systemId]: { status: 'syncing', progress: Math.floor(progress), lastSync: new Date().toISOString() }
        }));
      }
    }, 500);
  };

  const testConnection = (systemId: string) => {
    alert(`Testing connection to ${integrationSystems.find(s => s.id === systemId)?.name}...\\n\\nConnection test: SUCCESSFUL\\nResponse time: ${Math.floor(Math.random() * 100) + 50}ms\\nAPI Status: OK`);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-lg p-6 shadow-sm">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">System Integration Dashboard</h2>

        {patient && (
          <div className="bg-gray-50 rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold text-gray-900">{patient.name}</h3>
                <p className="text-gray-600">
                  Real-time data synchronization across all integrated systems
                </p>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-sm text-green-600 font-medium">All Systems Connected</span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* System Status Grid */}
      <div className="grid md:grid-cols-3 gap-6">
        {integrationSystems.map((system) => (
          <div key={system.id} className="bg-white rounded-lg p-6 shadow-sm border">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="font-semibold text-gray-900">{system.name}</h3>
                <p className="text-sm text-gray-600">{system.type}</p>
                <p className="text-xs text-gray-500">{system.vendor} • {system.version}</p>
              </div>
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(system.status)}`}>
                {system.status}
              </span>
            </div>

            <div className="space-y-3">
              <div className="flex justify-between items-center text-sm">
                <span className="text-gray-600">Data Flow:</span>
                <span className="font-medium capitalize">{system.dataFlow}</span>
              </div>

              <div className="flex justify-between items-center text-sm">
                <span className="text-gray-600">Last Sync:</span>
                <span className="font-medium">{new Date(system.lastSync).toLocaleTimeString()}</span>
              </div>

              {connectionHealth[system.id] && (
                <div className="space-y-2">
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-gray-600">Response Time:</span>
                    <span className="font-medium">{connectionHealth[system.id].responseTime}ms</span>
                  </div>
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-gray-600">Uptime:</span>
                    <span className={`font-medium ${getHealthColor(connectionHealth[system.id].status)}`}>
                      {connectionHealth[system.id].uptime.toFixed(2)}%
                    </span>
                  </div>
                </div>
              )}

              {syncProgress[system.id] && syncProgress[system.id].status === 'syncing' && (
                <div className="space-y-2">
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-gray-600">Syncing:</span>
                    <span className="font-medium">{syncProgress[system.id].progress}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-blue-500 h-2 rounded-full transition-all duration-500"
                      style={{ width: `${syncProgress[system.id].progress}%` }}
                    ></div>
                  </div>
                </div>
              )}

              <div className="flex space-x-2 pt-2">
                <button
                  onClick={() => forceSync(system.id)}
                  className="flex-1 bg-blue-600 text-white px-3 py-2 rounded text-xs hover:bg-blue-700 transition-colors cursor-pointer whitespace-nowrap"
                >
                  Sync Now
                </button>
                <button
                  onClick={() => testConnection(system.id)}
                  className="flex-1 bg-gray-100 text-gray-700 px-3 py-2 rounded text-xs hover:bg-gray-200 transition-colors cursor-pointer whitespace-nowrap"
                >
                  Test
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* External Data Integration */}
      {patient && (
        <div className="space-y-6">
          <h3 className="text-lg font-semibold text-gray-900">Integrated Patient Data</h3>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white rounded-lg p-6 shadow-sm border">
              <div className="flex items-center space-x-3 mb-4">
                <i className="ri-shield-check-line text-blue-600 text-xl"></i>
                <h4 className="font-semibold text-gray-900">Insurance Information</h4>
              </div>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Provider:</span>
                  <span className="font-medium">{mockExternalData.insuranceData.provider}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Policy:</span>
                  <span className="font-medium">{mockExternalData.insuranceData.policyNumber}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Coverage:</span>
                  <span className="font-medium">{mockExternalData.insuranceData.coverage}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Copay:</span>
                  <span className="font-medium">{mockExternalData.insuranceData.copay}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Status:</span>
                  <span className="font-medium text-green-600">{mockExternalData.insuranceData.status}</span>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg p-6 shadow-sm border">
              <div className="flex items-center space-x-3 mb-4">
                <i className="ri-medicine-bottle-line text-green-600 text-xl"></i>
                <h4 className="font-semibold text-gray-900">Pharmacy Integration</h4>
              </div>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Preferred Pharmacy:</span>
                  <span className="font-medium">{mockExternalData.pharmacyData.preferredPharmacy}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Pending Refills:</span>
                  <span className="font-medium">{mockExternalData.pharmacyData.pendingRefills}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Adherence Score:</span>
                  <span className="font-medium text-blue-600">{mockExternalData.pharmacyData.adherenceScore}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Drug Allergies:</span>
                  <span className="font-medium text-red-600">{mockExternalData.pharmacyData.drugAllergies.join(', ')}</span>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg p-6 shadow-sm border">
              <div className="flex items-center space-x-3 mb-4">
                <i className="ri-test-tube-line text-purple-600 text-xl"></i>
                <h4 className="font-semibold text-gray-900">Laboratory Integration</h4>
              </div>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Last Results:</span>
                  <span className="font-medium">{new Date(mockExternalData.labData.lastResults).toLocaleDateString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Pending Tests:</span>
                  <span className="font-medium">{mockExternalData.labData.pendingTests.join(', ')}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Critical Values:</span>
                  <span className={`font-medium ${mockExternalData.labData.criticalValues === 0 ? 'text-green-600' : 'text-red-600'}`}>
                    {mockExternalData.labData.criticalValues}
                  </span>
                </div>
                <div className="col-span-2">
                  <span className="text-gray-600">Trends:</span>
                  <div className="mt-1">
                    {mockExternalData.labData.trendingValues.map((trend, index) => (
                      <div key={index} className="text-xs text-blue-600">• {trend}</div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg p-6 shadow-sm border">
              <div className="flex items-center space-x-3 mb-4">
                <i className="ri-scan-line text-orange-600 text-xl"></i>
                <h4 className="font-semibold text-gray-900">Radiology Integration</h4>
              </div>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Last Imaging:</span>
                  <span className="font-medium">{new Date(mockExternalData.radiologyData.lastImaging).toLocaleDateString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Study Type:</span>
                  <span className="font-medium">{mockExternalData.radiologyData.studyType}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Result:</span>
                  <span className="font-medium text-green-600">{mockExternalData.radiologyData.result}</span>
                </div>
                <div className="col-span-2">
                  <span className="text-gray-600">Scheduled:</span>
                  <div className="mt-1">
                    {mockExternalData.radiologyData.scheduledStudies.map((study, index) => (
                      <div key={index} className="text-xs text-blue-600">• {study}</div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* API Health Dashboard */}
      <div className="bg-white rounded-lg p-6 shadow-sm">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">API Health Dashboard</h3>

        <div className="grid md:grid-cols-4 gap-6">
          <div className="text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <i className="ri-links-line text-green-600 text-2xl"></i>
            </div>
            <h4 className="font-semibold text-gray-900">9/9</h4>
            <p className="text-sm text-gray-600">Systems Connected</p>
          </div>

          <div className="text-center">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <i className="ri-refresh-line text-blue-600 text-2xl"></i>
            </div>
            <h4 className="font-semibold text-gray-900">99.8%</h4>
            <p className="text-sm text-gray-600">Average Uptime</p>
          </div>

          <div className="text-center">
            <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <i className="ri-speed-line text-purple-600 text-2xl"></i>
            </div>
            <h4 className="font-semibold text-gray-900">125ms</h4>
            <p className="text-sm text-gray-600">Avg Response Time</p>
          </div>

          <div className="text-center">
            <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <i className="ri-exchange-line text-orange-600 text-2xl"></i>
            </div>
            <h4 className="font-semibold text-gray-900">247</h4>
            <p className="text-sm text-gray-600">API Calls Today</p>
          </div>
        </div>
      </div>

      {!patient && (
        <div className="text-center py-12">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <i className="ri-links-line text-gray-400 text-2xl"></i>
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">System Integration Hub</h3>
          <p className="text-gray-600">
            Seamless integration with EMR, HIS, pharmacy, laboratory, and external systems for comprehensive patient care.
          </p>
        </div>
      )}
    </div>
  );
}