'use client';
import { useState } from 'react';

export default function QualityControl() {
  const [selectedMetric, setSelectedMetric] = useState('alerts');

  // Mock quality control data
  const qualityMetrics = {
    alerts: [
      {
        id: 'QC001',
        type: 'Critical Result Delay',
        severity: 'High',
        equipment: 'Hematology Analyzer HA-2000',
        testType: 'CBC',
        patientId: 'PID005',
        issue: 'Hemoglobin result of 5.8 g/dL not communicated to physician within 30 minutes',
        detectedAt: '2024-01-15 15:45',
        status: 'Active',
        actionTaken: 'Manual notification sent to Dr. Kamau',
        resolvedAt: null
      },
      {
        id: 'QC002',
        type: 'Equipment Calibration',
        severity: 'Medium',
        equipment: 'Chemistry Analyzer CA-3000',
        testType: 'Glucose',
        issue: 'Control sample results outside acceptable range - requires recalibration',
        detectedAt: '2024-01-15 09:15',
        status: 'Resolved',
        actionTaken: 'Equipment recalibrated, control samples retested',
        resolvedAt: '2024-01-15 09:45'
      },
      {
        id: 'QC003',
        type: 'Result Verification',
        severity: 'Medium',
        equipment: 'Point-of-Care Device',
        testType: 'Troponin I',
        patientId: 'PID003',
        issue: 'Extremely high troponin result requires secondary confirmation',
        detectedAt: '2024-01-15 11:20',
        status: 'Resolved',
        actionTaken: 'Result confirmed by laboratory reference method',
        resolvedAt: '2024-01-15 11:35'
      },
      {
        id: 'QC004',
        type: 'Sample Quality',
        severity: 'Low',
        testType: 'Blood Culture',
        patientId: 'PID006',
        issue: 'Hemolyzed sample may affect accuracy of certain parameters',
        detectedAt: '2024-01-15 08:30',
        status: 'Pending',
        actionTaken: 'Sample recollection requested',
        resolvedAt: null
      }
    ],
    equipmentStatus: [
      {
        equipment: 'Hematology Analyzer HA-2000',
        status: 'Online',
        lastCalibration: '2024-01-14 06:00',
        nextCalibration: '2024-01-16 06:00',
        controlResults: { morning: 'Pass', afternoon: 'Pass' },
        testsToday: 127,
        errorRate: 0.8,
        averageProcessingTime: '3.2 minutes'
      },
      {
        equipment: 'Chemistry Analyzer CA-3000',
        status: 'Online',
        lastCalibration: '2024-01-15 09:45',
        nextCalibration: '2024-01-17 06:00',
        controlResults: { morning: 'Pass', afternoon: 'Pass' },
        testsToday: 89,
        errorRate: 1.2,
        averageProcessingTime: '4.1 minutes'
      },
      {
        equipment: 'Ultrasound Machine US-Pro',
        status: 'Online',
        lastMaintenance: '2024-01-10 14:00',
        nextMaintenance: '2024-02-10 14:00',
        qualityChecks: 'Pass',
        scansToday: 23,
        averageExamTime: '18 minutes'
      },
      {
        equipment: 'X-Ray System XR-Digital',
        status: 'Maintenance',
        lastMaintenance: '2024-01-15 16:00',
        issue: 'Detector calibration in progress',
        estimatedUptime: '17:30',
        imagesProcessed: 45,
        qualityScore: 98.5
      }
    ],
    performanceMetrics: [
      {
        metric: 'Turnaround Time',
        target: '< 2 hours',
        current: '1.8 hours',
        trend: 'improving',
        details: {
          'CBC': '1.2 hours',
          'Basic Metabolic Panel': '1.5 hours',
          'Liver Function Tests': '2.1 hours',
          'Lipid Panel': '1.7 hours'
        }
      },
      {
        metric: 'Critical Value Notification',
        target: '< 30 minutes',
        current: '18 minutes',
        trend: 'stable',
        details: {
          'Average notification time': '18 minutes',
          'Compliance rate': '94%',
          'Delayed notifications': '3 this week'
        }
      },
      {
        metric: 'Result Accuracy',
        target: '> 99%',
        current: '99.3%',
        trend: 'stable',
        details: {
          'Proficiency testing': '100%',
          'Inter-lab comparison': '99.1%',
          'Internal QC': '99.5%'
        }
      },
      {
        metric: 'Sample Rejection Rate',
        target: '< 2%',
        current: '1.4%',
        trend: 'improving',
        details: {
          'Hemolysis': '0.8%',
          'Insufficient volume': '0.3%',
          'Labeling errors': '0.2%',
          'Clotted samples': '0.1%'
        }
      }
    ]
  };

  const getSeverityColor = (severity) => {
    switch (severity) {
      case 'High': return 'text-red-600 bg-red-50 border-red-200';
      case 'Medium': return 'text-orange-600 bg-orange-50 border-orange-200';
      case 'Low': return 'text-yellow-600 bg-yellow-50 border-yellow-200';
      default: return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Active': return 'text-red-600 bg-red-50';
      case 'Resolved': return 'text-green-600 bg-green-50';
      case 'Pending': return 'text-orange-600 bg-orange-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  const getEquipmentStatusColor = (status) => {
    switch (status) {
      case 'Online': return 'text-green-600 bg-green-50';
      case 'Maintenance': return 'text-orange-600 bg-orange-50';
      case 'Offline': return 'text-red-600 bg-red-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  const getTrendIcon = (trend) => {
    switch (trend) {
      case 'improving': return 'ri-arrow-up-line text-green-600';
      case 'declining': return 'ri-arrow-down-line text-red-600';
      case 'stable': return 'ri-subtract-line text-blue-600';
      default: return 'ri-subtract-line text-gray-600';
    }
  };

  return (
    <div className="space-y-6">
      {/* Overview Cards */}
      <div className="grid md:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Active Alerts</p>
              <p className="text-2xl font-bold text-red-600">
                {qualityMetrics.alerts.filter(a => a.status === 'Active').length}
              </p>
            </div>
            <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
              <i className="ri-alarm-warning-line text-red-600 text-xl"></i>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Equipment Online</p>
              <p className="text-2xl font-bold text-green-600">
                {qualityMetrics.equipmentStatus.filter(e => e.status === 'Online').length}/
                {qualityMetrics.equipmentStatus.length}
              </p>
            </div>
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <i className="ri-settings-line text-green-600 text-xl"></i>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Avg Turnaround</p>
              <p className="text-2xl font-bold text-blue-600">1.8h</p>
            </div>
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <i className="ri-time-line text-blue-600 text-xl"></i>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Quality Score</p>
              <p className="text-2xl font-bold text-purple-600">99.3%</p>
            </div>
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
              <i className="ri-shield-check-line text-purple-600 text-xl"></i>
            </div>
          </div>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="bg-white rounded-lg p-6 shadow-sm">
        <div className="flex space-x-1 bg-gray-100 rounded-lg p-1 mb-6">
          {[
            { key: 'alerts', label: 'Quality Alerts', icon: 'ri-alarm-warning-line' },
            { key: 'equipment', label: 'Equipment Status', icon: 'ri-settings-line' },
            { key: 'performance', label: 'Performance Metrics', icon: 'ri-bar-chart-line' }
          ].map((tab) => (
            <button
              key={tab.key}
              onClick={() => setSelectedMetric(tab.key)}
              className={`flex-1 flex items-center justify-center space-x-2 px-4 py-2 rounded-md transition-colors cursor-pointer ${
                selectedMetric === tab.key
                  ? 'bg-white text-blue-600 shadow-sm'
                  : 'text-gray-600 hover:text-gray-800'
              }`}
            >
              <i className={`${tab.icon} text-sm`}></i>
              <span className="text-sm font-medium">{tab.label}</span>
            </button>
          ))}
        </div>

        {/* Quality Alerts */}
        {selectedMetric === 'alerts' && (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900">Quality Control Alerts</h3>
            {qualityMetrics.alerts.map((alert) => (
              <div key={alert.id} className="border border-gray-200 rounded-lg p-4">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-start space-x-3">
                    <div className={`w-3 h-3 rounded-full mt-1 ${
                      alert.severity === 'High' ? 'bg-red-500' :
                      alert.severity === 'Medium' ? 'bg-orange-500' : 'bg-yellow-500'
                    }`}></div>
                    <div>
                      <h4 className="font-semibold text-gray-900">{alert.type}</h4>
                      <p className="text-sm text-gray-600 mt-1">{alert.issue}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getSeverityColor(alert.severity)}`}>
                      {alert.severity}
                    </span>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(alert.status)}`}>
                      {alert.status}
                    </span>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-gray-600">Equipment</p>
                    <p className="font-medium">{alert.equipment || 'N/A'}</p>
                  </div>
                  <div>
                    <p className="text-gray-600">Test Type</p>
                    <p className="font-medium">{alert.testType}</p>
                  </div>
                  <div>
                    <p className="text-gray-600">Detected At</p>
                    <p className="font-medium">{alert.detectedAt}</p>
                  </div>
                  <div>
                    <p className="text-gray-600">Patient ID</p>
                    <p className="font-medium">{alert.patientId || 'N/A'}</p>
                  </div>
                </div>

                <div className="mt-3 p-3 bg-gray-50 rounded-lg">
                  <p className="text-sm text-gray-700">
                    <strong>Action Taken:</strong> {alert.actionTaken}
                  </p>
                  {alert.resolvedAt && (
                    <p className="text-sm text-gray-600 mt-1">
                      <strong>Resolved:</strong> {alert.resolvedAt}
                    </p>
                  )}
                </div>

                {alert.status === 'Active' && (
                  <div className="flex justify-end mt-3 space-x-2">
                    <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors text-sm cursor-pointer whitespace-nowrap">
                      Take Action
                    </button>
                    <button className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors text-sm cursor-pointer whitespace-nowrap">
                      Mark Resolved
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Equipment Status */}
        {selectedMetric === 'equipment' && (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900">Equipment Status Monitor</h3>
            <div className="grid md:grid-cols-2 gap-6">
              {qualityMetrics.equipmentStatus.map((equipment, index) => (
                <div key={index} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="font-semibold text-gray-900">{equipment.equipment}</h4>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getEquipmentStatusColor(equipment.status)}`}>
                      {equipment.status}
                    </span>
                  </div>

                  <div className="space-y-3 text-sm">
                    {equipment.lastCalibration && (
                      <div className="flex justify-between">
                        <span className="text-gray-600">Last Calibration</span>
                        <span className="font-medium">{new Date(equipment.lastCalibration).toLocaleDateString()}</span>
                      </div>
                    )}
                    
                    {equipment.nextCalibration && (
                      <div className="flex justify-between">
                        <span className="text-gray-600">Next Calibration</span>
                        <span className="font-medium">{new Date(equipment.nextCalibration).toLocaleDateString()}</span>
                      </div>
                    )}
                    
                    {equipment.controlResults && (
                      <div className="flex justify-between">
                        <span className="text-gray-600">QC Results</span>
                        <span className="font-medium">
                          AM: {equipment.controlResults.morning}, PM: {equipment.controlResults.afternoon}
                        </span>
                      </div>
                    )}
                    
                    {equipment.testsToday && (
                      <div className="flex justify-between">
                        <span className="text-gray-600">Tests Today</span>
                        <span className="font-medium">{equipment.testsToday}</span>
                      </div>
                    )}
                    
                    {equipment.errorRate !== undefined && (
                      <div className="flex justify-between">
                        <span className="text-gray-600">Error Rate</span>
                        <span className={`font-medium ${equipment.errorRate > 2 ? 'text-red-600' : 'text-green-600'}`}>
                          {equipment.errorRate}%
                        </span>
                      </div>
                    )}
                    
                    {equipment.averageProcessingTime && (
                      <div className="flex justify-between">
                        <span className="text-gray-600">Avg Processing Time</span>
                        <span className="font-medium">{equipment.averageProcessingTime}</span>
                      </div>
                    )}

                    {equipment.issue && (
                      <div className="bg-orange-50 border border-orange-200 rounded-lg p-2 mt-2">
                        <p className="text-orange-800 text-xs">{equipment.issue}</p>
                        {equipment.estimatedUptime && (
                          <p className="text-orange-700 text-xs mt-1">
                            Estimated back online: {equipment.estimatedUptime}
                          </p>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Performance Metrics */}
        {selectedMetric === 'performance' && (
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-gray-900">Laboratory Performance Metrics</h3>
            <div className="grid md:grid-cols-2 gap-6">
              {qualityMetrics.performanceMetrics.map((metric, index) => (
                <div key={index} className="border border-gray-200 rounded-lg p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="font-semibold text-gray-900">{metric.metric}</h4>
                    <div className="flex items-center space-x-2">
                      <i className={getTrendIcon(metric.trend)}></i>
                      <span className="text-sm text-gray-600 capitalize">{metric.trend}</span>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Target</span>
                      <span className="font-medium text-gray-900">{metric.target}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Current</span>
                      <span className={`font-semibold text-lg ${
                        metric.trend === 'improving' ? 'text-green-600' :
                        metric.trend === 'declining' ? 'text-red-600' : 'text-blue-600'
                      }`}>
                        {metric.current}
                      </span>
                    </div>
                  </div>

                  <div className="bg-gray-50 rounded-lg p-3 mt-4">
                    <h5 className="font-medium text-gray-900 mb-2">Details</h5>
                    <div className="space-y-1 text-sm">
                      {Object.entries(metric.details).map(([key, value]) => (
                        <div key={key} className="flex justify-between">
                          <span className="text-gray-600">{key}</span>
                          <span className="font-medium">{value}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}