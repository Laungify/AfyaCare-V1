'use client';
import { useState } from 'react';

export default function LabExecution({ order, onComplete, onBack }) {
  const [executionData, setExecutionData] = useState({
    technician: 'Mary Wanjiku, MLT',
    startTime: new Date().toISOString(),
    currentTest: 0,
    testResults: {},
    qualityControlPassed: false,
    equipmentUsed: {},
    consumablesUsed: {},
    notes: '',
    criticalValues: [],
    flaggedResults: []
  });

  const [currentStep, setCurrentStep] = useState('preparation');
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!order) {
    return (
      <div className="text-center py-12">
        <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <i className="ri-microscope-line text-gray-400 text-2xl"></i>
        </div>
        <h3 className="text-lg font-semibold text-gray-900 mb-2">No Test Order Selected</h3>
        <p className="text-gray-600 mb-6">Please select a test order to begin execution.</p>
        <button
          onClick={onBack}
          className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors cursor-pointer whitespace-nowrap"
        >
          Back to Orders
        </button>
      </div>
    );
  }

  const testTemplates = {
    'CBC': {
      parameters: [
        { name: 'Hemoglobin', unit: 'g/dL', normalRange: '12.0-15.5', criticalLow: 7, criticalHigh: 20 },
        { name: 'Hematocrit', unit: '%', normalRange: '36-46', criticalLow: 20, criticalHigh: 60 },
        { name: 'WBC Count', unit: '×10³/μL', normalRange: '4.5-11.0', criticalLow: 2, criticalHigh: 30 },
        { name: 'Platelet Count', unit: '×10³/μL', normalRange: '150-450', criticalLow: 50, criticalHigh: 1000 },
        { name: 'Neutrophils', unit: '%', normalRange: '50-70', criticalLow: 30, criticalHigh: 85 },
        { name: 'Lymphocytes', unit: '%', normalRange: '20-40', criticalLow: 10, criticalHigh: 60 }
      ],
      equipment: 'Hematology Analyzer - HA-2000',
      consumables: ['CBC Reagent Pack', 'Calibration Solution', 'Sample Tubes']
    },
    'LFT': {
      parameters: [
        { name: 'ALT (SGPT)', unit: 'U/L', normalRange: '7-35', criticalLow: 0, criticalHigh: 300 },
        { name: 'AST (SGOT)', unit: 'U/L', normalRange: '10-40', criticalLow: 0, criticalHigh: 400 },
        { name: 'Total Bilirubin', unit: 'mg/dL', normalRange: '0.3-1.2', criticalLow: 0, criticalHigh: 25 },
        { name: 'Direct Bilirubin', unit: 'mg/dL', normalRange: '0.0-0.3', criticalLow: 0, criticalHigh: 15 },
        { name: 'Alkaline Phosphatase', unit: 'U/L', normalRange: '44-147', criticalLow: 0, criticalHigh: 500 },
        { name: 'Total Protein', unit: 'g/dL', normalRange: '6.0-8.0', criticalLow: 3, criticalHigh: 12 }
      ],
      equipment: 'Chemistry Analyzer - CA-3000',
      consumables: ['LFT Reagent Kit', 'Quality Control Serum', 'Cuvettes']
    },
    'RBS': {
      parameters: [
        { name: 'Glucose', unit: 'mg/dL', normalRange: '70-140', criticalLow: 40, criticalHigh: 400 }
      ],
      equipment: 'Glucometer Pro-X',
      consumables: ['Glucose Test Strips', 'Lancets', 'Control Solution']
    }
  };

  const handleParameterChange = (testCode, parameterName, value) => {
    setExecutionData(prev => ({
      ...prev,
      testResults: {
        ...prev.testResults,
        [testCode]: {
          ...prev.testResults[testCode],
          [parameterName]: value
        }
      }
    }));

    // Check for critical values
    const template = testTemplates[testCode];
    const parameter = template?.parameters.find(p => p.name === parameterName);
    if (parameter && value) {
      const numValue = parseFloat(value);
      if (numValue <= parameter.criticalLow || numValue >= parameter.criticalHigh) {
        setExecutionData(prev => ({
          ...prev,
          criticalValues: [...prev.criticalValues.filter(cv => cv.test !== testCode || cv.parameter !== parameterName), {
            test: testCode,
            parameter: parameterName,
            value: numValue,
            type: numValue <= parameter.criticalLow ? 'critically_low' : 'critically_high'
          }]
        }));
      }
    }
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    
    // Simulate result processing
    setTimeout(() => {
      const completedResults = {
        ...executionData,
        orderId: order.id,
        completionTime: new Date().toISOString(),
        status: 'completed',
        autoFlags: executionData.criticalValues.length > 0 ? 'critical_values_detected' : 'normal'
      };
      
      console.log('Test Results Completed:', completedResults);
      onComplete();
      setIsSubmitting(false);
    }, 2000);
  };

  const renderPreparationStep = () => (
    <div className="space-y-6">
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-blue-900 mb-4">Pre-Testing Checklist</h3>
        <div className="space-y-3">
          {[
            'Verify patient identity and test orders',
            'Check sample quality and labeling',
            'Calibrate equipment if required',
            'Prepare reagents and consumables',
            'Review clinical notes and urgency'
          ].map((item, index) => (
            <label key={index} className="flex items-center space-x-3 cursor-pointer">
              <input type="checkbox" className="rounded" />
              <span className="text-sm text-blue-800">{item}</span>
            </label>
          ))}
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-white border rounded-lg p-4">
          <h4 className="font-semibold text-gray-900 mb-3">Equipment Status</h4>
          <div className="space-y-2">
            {order.tests.map((test) => {
              const template = testTemplates[test.code];
              return template ? (
                <div key={test.code} className="flex items-center justify-between">
                  <span className="text-sm">{template.equipment}</span>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="text-xs text-green-600">Ready</span>
                  </div>
                </div>
              ) : null;
            })}
          </div>
        </div>

        <div className="bg-white border rounded-lg p-4">
          <h4 className="font-semibold text-gray-900 mb-3">Consumables Check</h4>
          <div className="space-y-2">
            {order.tests.flatMap(test => testTemplates[test.code]?.consumables || []).map((consumable, index) => (
              <div key={index} className="flex items-center justify-between">
                <span className="text-sm">{consumable}</span>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-xs text-green-600">Available</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="flex justify-end">
        <button
          onClick={() => setCurrentStep('execution')}
          className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors cursor-pointer whitespace-nowrap"
        >
          Begin Testing
        </button>
      </div>
    </div>
  );

  const renderExecutionStep = () => (
    <div className="space-y-6">
      {order.tests.map((test, testIndex) => {
        const template = testTemplates[test.code];
        if (!template) return null;

        return (
          <div key={test.code} className="bg-white border rounded-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-lg font-semibold text-gray-900">{test.name}</h3>
                <p className="text-sm text-gray-600">Code: {test.code} • Equipment: {template.equipment}</p>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-blue-500 rounded-full animate-pulse"></div>
                <span className="text-sm font-medium text-blue-600">In Progress</span>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              {template.parameters.map((parameter) => {
                const currentValue = executionData.testResults[test.code]?.[parameter.name];
                const isCritical = executionData.criticalValues.some(
                  cv => cv.test === test.code && cv.parameter === parameter.name
                );

                return (
                  <div key={parameter.name} className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">
                      {parameter.name}
                    </label>
                    <div className="relative">
                      <input
                        type="number"
                        step="0.01"
                        value={currentValue || ''}
                        onChange={(e) => handleParameterChange(test.code, parameter.name, e.target.value)}
                        className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:border-transparent text-sm ${
                          isCritical 
                            ? 'border-red-500 bg-red-50 focus:ring-red-500' 
                            : 'border-gray-300 focus:ring-blue-500'
                        }`}
                        placeholder="Enter result"
                      />
                      <div className="absolute right-3 top-2 text-xs text-gray-500">
                        {parameter.unit}
                      </div>
                    </div>
                    <div className="flex justify-between text-xs">
                      <span className="text-gray-500">Normal: {parameter.normalRange}</span>
                      {isCritical && (
                        <span className="text-red-600 font-medium flex items-center">
                          <i className="ri-alert-line mr-1"></i>
                          Critical Value
                        </span>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        );
      })}

      {executionData.criticalValues.length > 0 && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-6">
          <h4 className="text-lg font-semibold text-red-900 mb-4 flex items-center">
            <i className="ri-alarm-warning-line mr-2"></i>
            Critical Values Detected
          </h4>
          <div className="space-y-2">
            {executionData.criticalValues.map((cv, index) => (
              <div key={index} className="flex items-center justify-between bg-white rounded-lg p-3">
                <div>
                  <span className="font-medium text-red-900">{cv.test} - {cv.parameter}</span>
                  <span className="text-sm text-red-700 ml-2">Value: {cv.value}</span>
                </div>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                  cv.type === 'critically_low' 
                    ? 'bg-red-100 text-red-800' 
                    : 'bg-red-200 text-red-900'
                }`}>
                  {cv.type === 'critically_low' ? 'Critically Low' : 'Critically High'}
                </span>
              </div>
            ))}
          </div>
          <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
            <p className="text-sm text-yellow-800">
              <i className="ri-information-line mr-1"></i>
              Critical values require immediate physician notification. Auto-alert has been triggered.
            </p>
          </div>
        </div>
      )}

      <div className="bg-white border rounded-lg p-6">
        <h4 className="font-semibold text-gray-900 mb-3">Additional Notes</h4>
        <textarea
          value={executionData.notes}
          onChange={(e) => setExecutionData(prev => ({ ...prev, notes: e.target.value }))}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
          rows="4"
          placeholder="Any observations, technical notes, or comments about the testing process"
          maxLength="500"
        ></textarea>
      </div>

      <div className="flex justify-between">
        <button
          onClick={() => setCurrentStep('preparation')}
          className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer whitespace-nowrap"
        >
          Back to Preparation
        </button>
        <button
          onClick={() => setCurrentStep('review')}
          className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors cursor-pointer whitespace-nowrap"
        >
          Review Results
        </button>
      </div>
    </div>
  );

  const renderReviewStep = () => (
    <div className="space-y-6">
      <div className="bg-white border rounded-lg p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">Results Review & Validation</h3>
        
        {order.tests.map((test) => {
          const template = testTemplates[test.code];
          const results = executionData.testResults[test.code] || {};
          
          return template ? (
            <div key={test.code} className="mb-8 last:mb-0">
              <h4 className="font-semibold text-gray-800 mb-4">{test.name} ({test.code})</h4>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="text-left p-3 font-medium text-gray-700">Parameter</th>
                      <th className="text-left p-3 font-medium text-gray-700">Result</th>
                      <th className="text-left p-3 font-medium text-gray-700">Unit</th>
                      <th className="text-left p-3 font-medium text-gray-700">Normal Range</th>
                      <th className="text-left p-3 font-medium text-gray-700">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {template.parameters.map((parameter) => {
                      const value = results[parameter.name];
                      const isCritical = executionData.criticalValues.some(
                        cv => cv.test === test.code && cv.parameter === parameter.name
                      );
                      
                      return (
                        <tr key={parameter.name} className="border-t">
                          <td className="p-3 font-medium">{parameter.name}</td>
                          <td className={`p-3 font-semibold ${isCritical ? 'text-red-600' : 'text-gray-900'}`}>
                            {value || '—'}
                          </td>
                          <td className="p-3 text-gray-600">{parameter.unit}</td>
                          <td className="p-3 text-gray-600">{parameter.normalRange}</td>
                          <td className="p-3">
                            {value ? (
                              <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                                isCritical 
                                  ? 'bg-red-100 text-red-700' 
                                  : 'bg-green-100 text-green-700'
                              }`}>
                                {isCritical ? 'Critical' : 'Normal'}
                              </span>
                            ) : (
                              <span className="text-gray-400">Pending</span>
                            )}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          ) : null;
        })}

        <div className="border-t pt-6">
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h5 className="font-medium text-gray-900 mb-2">Quality Control</h5>
              <label className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={executionData.qualityControlPassed}
                  onChange={(e) => setExecutionData(prev => ({ 
                    ...prev, 
                    qualityControlPassed: e.target.checked 
                  }))}
                  className="rounded"
                />
                <span className="text-sm">Quality control measures passed</span>
              </label>
            </div>
            
            <div>
              <h5 className="font-medium text-gray-900 mb-2">Technician Verification</h5>
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                  <i className="ri-user-line text-blue-600"></i>
                </div>
                <div>
                  <p className="text-sm font-medium">{executionData.technician}</p>
                  <p className="text-xs text-gray-500">Medical Laboratory Technologist</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-between">
        <button
          onClick={() => setCurrentStep('execution')}
          className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer whitespace-nowrap"
        >
          Back to Results
        </button>
        <button
          onClick={handleSubmit}
          disabled={isSubmitting || !executionData.qualityControlPassed}
          className="bg-green-600 text-white px-8 py-3 rounded-lg hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center space-x-2 cursor-pointer whitespace-nowrap"
        >
          {isSubmitting ? (
            <>
              <i className="ri-loader-4-line animate-spin"></i>
              <span>Finalizing Results...</span>
            </>
          ) : (
            <>
              <i className="ri-check-line"></i>
              <span>Finalize & Send Results</span>
            </>
          )}
        </button>
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-lg p-6 shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold text-gray-900">Lab Test Execution</h2>
          <button
            onClick={onBack}
            className="text-gray-600 hover:text-gray-800 transition-colors flex items-center space-x-2 cursor-pointer"
          >
            <i className="ri-arrow-left-line"></i>
            <span>Back to Orders</span>
          </button>
        </div>
        
        <div className="bg-gray-50 rounded-lg p-4">
          <div className="grid md:grid-cols-3 gap-4">
            <div>
              <p className="text-sm text-gray-600">Patient</p>
              <p className="font-semibold">{order.patientName}</p>
              <p className="text-sm text-gray-500">{order.age}yo {order.gender} • ID: {order.patientId}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Order Details</p>
              <p className="font-semibold">#{order.id} • {order.priority}</p>
              <p className="text-sm text-gray-500">Ordered by {order.orderedBy}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Tests</p>
              <p className="font-semibold">{order.tests.length} test(s)</p>
              <p className="text-sm text-gray-500">Total: KSh {order.totalCost.toLocaleString()}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Step Progress */}
      <div className="bg-white rounded-lg p-6 shadow-sm">
        <div className="flex items-center justify-between">
          {[
            { key: 'preparation', label: 'Preparation', icon: 'ri-settings-line' },
            { key: 'execution', label: 'Execution', icon: 'ri-flask-line' },
            { key: 'review', label: 'Review', icon: 'ri-check-line' }
          ].map((step, index) => (
            <div key={step.key} className="flex items-center">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                currentStep === step.key 
                  ? 'bg-blue-600 text-white' 
                  : index < ['preparation', 'execution', 'review'].indexOf(currentStep)
                    ? 'bg-green-600 text-white'
                    : 'bg-gray-200 text-gray-500'
              }`}>
                <i className={`${step.icon} text-lg`}></i>
              </div>
              <div className="ml-3">
                <p className="font-medium text-gray-900">{step.label}</p>
              </div>
              {index < 2 && (
                <div className={`w-16 h-0.5 mx-4 ${
                  index < ['preparation', 'execution', 'review'].indexOf(currentStep)
                    ? 'bg-green-600'
                    : 'bg-gray-300'
                }`}></div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Step Content */}
      {currentStep === 'preparation' && renderPreparationStep()}
      {currentStep === 'execution' && renderExecutionStep()}
      {currentStep === 'review' && renderReviewStep()}
    </div>
  );
}