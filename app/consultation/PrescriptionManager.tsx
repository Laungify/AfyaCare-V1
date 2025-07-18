
'use client';
import { useState } from 'react';

export default function PrescriptionManager({ patient }) {
  const [prescriptions, setPrescriptions] = useState([]);
  const [currentPrescription, setCurrentPrescription] = useState({
    medication: '',
    dosage: '',
    frequency: '',
    duration: '',
    instructions: '',
    quantity: ''
  });
  const [drugSearch, setDrugSearch] = useState('');
  const [showDrugDatabase, setShowDrugDatabase] = useState(false);
  const [showInteractionAlert, setShowInteractionAlert] = useState(false);
  const [showAllergyAlert, setShowAllergyAlert] = useState(false);
  const [prescriptionHistory, setPrescriptionHistory] = useState([]);
  const [qrCode, setQrCode] = useState(null);
  const [isGeneratingQR, setIsGeneratingQR] = useState(false);

  // Enhanced drug database with comprehensive information
  const drugDatabase = [
    {
      name: 'Paracetamol',
      genericName: 'Acetaminophen',
      brandNames: ['Tylenol', 'Panadol', 'Calpol'],
      strength: ['500mg', '1000mg'],
      forms: ['Tablet', 'Syrup', 'Suspension', 'IV'],
      category: 'Analgesic/Antipyretic',
      contraindications: ['Severe liver disease', 'Alcohol abuse'],
      interactions: ['Warfarin', 'Alcohol', 'Carbamazepine'],
      maxDose: '4g/day',
      pediatricDose: '10-15mg/kg/dose',
      geriatricConsiderations: 'Reduce dose in liver impairment',
      renalAdjustment: 'No adjustment needed',
      hepaticAdjustment: 'Contraindicated in severe liver disease',
      pregnancy: 'Category B - Safe',
      lactation: 'Safe',
      sideEffects: ['Rare: Hepatotoxicity with overdose', 'Skin rash'],
      alternatives: ['Ibuprofen', 'Aspirin', 'Diclofenac']
    },
    {
      name: 'Amoxicillin',
      genericName: 'Amoxicillin',
      brandNames: ['Augmentin', 'Trimox', 'Amoxil'],
      strength: ['250mg', '500mg', '875mg'],
      forms: ['Capsule', 'Tablet', 'Suspension', 'IV'],
      category: 'Beta-lactam Antibiotic',
      contraindications: ['Penicillin allergy', 'Severe renal impairment'],
      interactions: ['Warfarin', 'Methotrexate', 'Oral contraceptives'],
      maxDose: '3g/day',
      pediatricDose: '20-40mg/kg/day divided',
      geriatricConsiderations: 'Monitor renal function',
      renalAdjustment: 'Reduce dose if CrCl <30',
      hepaticAdjustment: 'No adjustment needed',
      pregnancy: 'Category B - Safe',
      lactation: 'Safe with monitoring',
      sideEffects: ['GI upset', 'Diarrhea', 'Allergic reactions'],
      alternatives: ['Cephalexin', 'Azithromycin', 'Doxycycline']
    },
    {
      name: 'Metformin',
      genericName: 'Metformin HCl',
      brandNames: ['Glucophage', 'Diabex', 'Diaformin'],
      strength: ['500mg', '850mg', '1000mg'],
      forms: ['Tablet', 'Extended Release', 'Oral Solution'],
      category: 'Antidiabetic - Biguanide',
      contraindications: ['Severe kidney disease', 'Heart failure', 'Lactic acidosis history'],
      interactions: ['Contrast media', 'Alcohol', 'Diuretics'],
      maxDose: '2550mg/day',
      pediatricDose: 'Not recommended <10 years',
      geriatricConsiderations: 'Monitor renal function closely',
      renalAdjustment: 'Contraindicated if eGFR <30',
      hepaticAdjustment: 'Use with caution',
      pregnancy: 'Category B - Monitor glucose',
      lactation: 'Use with caution',
      sideEffects: ['GI upset', 'Metallic taste', 'Lactic acidosis (rare)'],
      alternatives: ['Glipizide', 'Pioglitazone', 'Insulin']
    },
    {
      name: 'Amlodipine',
      genericName: 'Amlodipine besylate',
      brandNames: ['Norvasc', 'Istin', 'Amcard'],
      strength: ['2.5mg', '5mg', '10mg'],
      forms: ['Tablet'],
      category: 'Calcium Channel Blocker',
      contraindications: ['Severe aortic stenosis', 'Cardiogenic shock'],
      interactions: ['Simvastatin', 'Clarithromycin', 'Grapefruit juice'],
      maxDose: '10mg/day',
      pediatricDose: '0.1-0.6mg/kg/day',
      geriatricConsiderations: 'Start with 2.5mg daily',
      renalAdjustment: 'No adjustment needed',
      hepaticAdjustment: 'Start with 2.5mg daily',
      pregnancy: 'Category C - Use if benefit outweighs risk',
      lactation: 'Unknown excretion in breast milk',
      sideEffects: ['Peripheral edema', 'Dizziness', 'Flushing'],
      alternatives: ['Nifedipine', 'Diltiazem', 'ACE inhibitors']
    },
    {
      name: 'Warfarin',
      genericName: 'Warfarin sodium',
      brandNames: ['Coumadin', 'Jantoven', 'Marevan'],
      strength: ['1mg', '2mg', '5mg', '10mg'],
      forms: ['Tablet'],
      category: 'Anticoagulant',
      contraindications: ['Active bleeding', 'Pregnancy', 'Recent surgery'],
      interactions: ['Aspirin', 'Antibiotics', 'Alcohol', 'NSAIDs', 'Many others'],
      maxDose: 'Variable - INR guided',
      pediatricDose: '0.1mg/kg/day initially',
      geriatricConsiderations: 'Start low, monitor closely',
      renalAdjustment: 'Monitor more frequently',
      hepaticAdjustment: 'Reduced dose needed',
      pregnancy: 'Category X - Contraindicated',
      lactation: 'Safe - does not cross into milk',
      sideEffects: ['Bleeding', 'Bruising', 'Hair loss'],
      alternatives: ['Dabigatran', 'Rivaroxaban', 'Apixaban']
    }
  ];

  const commonFrequencies = [
    'Once daily (OD)',
    'Twice daily (BD)',
    'Three times daily (TDS)',
    'Four times daily (QDS)',
    'Every 4 hours',
    'Every 6 hours',
    'Every 8 hours',
    'As needed (PRN)',
    'Before meals',
    'After meals',
    'At bedtime'
  ];

  // AI Decision Support Functions
  const checkDrugInteractions = (newDrug) => {
    const interactions = [];
    prescriptions.forEach(prescription => {
      const existingDrug = drugDatabase.find(drug => 
        prescription.medication.includes(drug.name)
      );
      if (existingDrug && existingDrug.interactions.some(interaction => 
        newDrug.interactions.includes(interaction))) {
        interactions.push({
          drug1: existingDrug.name,
          drug2: newDrug.name,
          severity: 'Moderate',
          description: 'Monitor for enhanced effects'
        });
      }
    });
    return interactions;
  };

  const checkAllergies = (drug) => {
    if (!patient?.allergies) return [];
    
    const allergyAlerts = [];
    patient.allergies.forEach(allergy => {
      if (drug.category.toLowerCase().includes(allergy.toLowerCase()) ||
          drug.name.toLowerCase().includes(allergy.toLowerCase())) {
        allergyAlerts.push({
          allergy: allergy,
          drug: drug.name,
          severity: 'High',
          recommendation: 'Choose alternative medication'
        });
      }
    });
    return allergyAlerts;
  };

  const calculatePediatricDose = (drug, weight) => {
    if (!drug.pediatricDose || !weight) return null;
    
    const doseRange = drug.pediatricDose.match(/(\d+)-?(\d+)?mg\/kg/);
    if (doseRange) {
      const minDose = parseInt(doseRange[1]) * weight;
      const maxDose = doseRange[2] ? parseInt(doseRange[2]) * weight : minDose;
      return `${minDose}-${maxDose}mg`;
    }
    return null;
  };

  const handleDrugSelect = (drug) => {
    // Check for interactions
    const interactions = checkDrugInteractions(drug);
    if (interactions.length > 0) {
      setShowInteractionAlert(true);
    }

    // Check for allergies
    const allergyAlerts = checkAllergies(drug);
    if (allergyAlerts.length > 0) {
      setShowAllergyAlert(true);
      return; // Don't add drug if allergy detected
    }

    // Calculate pediatric dose if applicable
    let dosageRecommendation = '';
    if (patient?.age < 18 && patient?.weight) {
      const pediatricDose = calculatePediatricDose(drug, patient.weight);
      if (pediatricDose) {
        dosageRecommendation = `Pediatric dose: ${pediatricDose}`;
      }
    }

    setCurrentPrescription(prev => ({
      ...prev,
      medication: `${drug.name} ${drug.strength[0]}`,
      dosage: dosageRecommendation || '1 tablet'
    }));
    setDrugSearch('');
    setShowDrugDatabase(false);
  };

  const addPrescription = () => {
    if (currentPrescription.medication && currentPrescription.dosage && currentPrescription.frequency) {
      const newPrescription = {
        ...currentPrescription,
        id: Date.now(),
        prescribedDate: new Date().toISOString(),
        status: 'Pending',
        prescriber: 'Dr. Sarah Johnson',
        digitalSignature: true
      };
      
      setPrescriptions(prev => [...prev, newPrescription]);
      setPrescriptionHistory(prev => [...prev, newPrescription]);
      
      setCurrentPrescription({
        medication: '',
        dosage: '',
        frequency: '',
        duration: '',
        instructions: '',
        quantity: ''
      });
    }
  };

  const removePrescription = (id) => {
    setPrescriptions(prev => prev.filter(p => p.id !== id));
  };

  const generateQRCode = async () => {
    if (prescriptions.length === 0) return;
    
    setIsGeneratingQR(true);
    
    // Simulate QR code generation
    setTimeout(() => {
      const prescriptionData = {
        patientId: patient?.id,
        prescriptions: prescriptions,
        prescriber: 'Dr. Sarah Johnson',
        timestamp: new Date().toISOString(),
        hospitalId: 'HSP001',
        securityHash: 'ABC123XYZ789'
      };
      
      setQrCode(`https://hospital-system.com/verify-prescription?data=${btoa(JSON.stringify(prescriptionData))}`);
      setIsGeneratingQR(false);
    }, 2000);
  };

  const sendToPharmacy = async () => {
    if (prescriptions.length === 0) return;
    
    // Update prescription status
    const updatedPrescriptions = prescriptions.map(p => ({
      ...p,
      status: 'Sent to Pharmacy',
      sentTime: new Date().toISOString()
    }));
    
    setPrescriptions(updatedPrescriptions);
    
    // Generate QR code automatically
    await generateQRCode();
    
    console.log('Prescriptions sent to pharmacy:', updatedPrescriptions);
    alert('Prescriptions sent to pharmacy successfully with QR code!');
  };

  const getDrugInfo = (drugName) => {
    return drugDatabase.find(drug => 
      drugName.toLowerCase().includes(drug.name.toLowerCase())
    );
  };

  return (
    <div className="space-y-6">
      {/* Patient Info with Enhanced Details */}
      {patient && (
        <div className="bg-white rounded-lg p-6 shadow-sm">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Digital Prescription System</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-blue-50 rounded-lg p-4">
              <div className="flex items-center space-x-3 mb-3">
                <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                  <i className="ri-user-fill text-blue-600"></i>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">{patient.name}</h3>
                  <p className="text-gray-600">{patient.age}yo • {patient.gender} • ID: {patient.id}</p>
                  {patient.weight && <p className="text-sm text-gray-500">Weight: {patient.weight}kg</p>}
                </div>
              </div>
              
              {patient.allergies && patient.allergies.length > 0 && (
                <div className="mt-3 flex items-center space-x-2">
                  <i className="ri-alarm-warning-line text-red-500"></i>
                  <span className="text-sm font-medium text-red-700">Allergies:</span>
                  <div className="flex space-x-1">
                    {patient.allergies.map((allergy, index) => (
                      <span key={index} className="px-2 py-1 bg-red-100 text-red-700 text-xs rounded-full">
                        {allergy}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div className="bg-green-50 rounded-lg p-4">
              <h4 className="font-semibold text-gray-900 mb-3">Current Medications</h4>
              {patient.currentMedications && patient.currentMedications.length > 0 ? (
                <div className="space-y-1">
                  {patient.currentMedications.map((med, index) => (
                    <div key={index} className="text-sm text-green-800">• {med}</div>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-gray-500">No current medications recorded</p>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Enhanced Drug Search with AI Suggestions */}
      <div className="bg-white rounded-lg p-6 shadow-sm">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Add New Prescription</h3>
        
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Medication Search
            </label>
            <div className="relative">
              <input
                type="text"
                value={currentPrescription.medication}
                onChange={(e) => {
                  setCurrentPrescription(prev => ({ ...prev, medication: e.target.value }));
                  setDrugSearch(e.target.value);
                  setShowDrugDatabase(e.target.value.length > 2);
                }}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                placeholder="Search by generic or brand name..."
              />
              
              {showDrugDatabase && drugSearch.length > 2 && (
                <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-80 overflow-y-auto">
                  {drugDatabase
                    .filter(drug => 
                      drug.name.toLowerCase().includes(drugSearch.toLowerCase()) ||
                      drug.genericName.toLowerCase().includes(drugSearch.toLowerCase()) ||
                      drug.brandNames.some(brand => brand.toLowerCase().includes(drugSearch.toLowerCase()))
                    )
                    .map((drug, index) => (
                      <button
                        key={index}
                        type="button"
                        onClick={() => handleDrugSelect(drug)}
                        className="w-full text-left px-4 py-4 hover:bg-gray-50 border-b border-gray-100 cursor-pointer"
                      >
                        <div className="flex justify-between items-start">
                          <div className="flex-1">
                            <div className="font-medium text-gray-900">{drug.name}</div>
                            <div className="text-sm text-gray-600">{drug.genericName} • {drug.category}</div>
                            <div className="text-xs text-gray-500">
                              Brands: {drug.brandNames.join(', ')}
                            </div>
                            <div className="text-xs text-gray-500">
                              Strengths: {drug.strength.join(', ')} • Forms: {drug.forms.join(', ')}
                            </div>
                          </div>
                          {patient?.age < 18 && (
                            <span className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded-full">
                              Pediatric
                            </span>
                          )}
                        </div>
                      </button>
                    ))}
                </div>
              )}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Dosage with AI Calculation
            </label>
            <input
              type="text"
              value={currentPrescription.dosage}
              onChange={(e) => setCurrentPrescription(prev => ({ ...prev, dosage: e.target.value }))}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
              placeholder="AI-calculated or custom dosage"
            />
            {patient?.age < 18 && (
              <p className="text-xs text-blue-600 mt-1">
                <i className="ri-information-line"></i> Pediatric dosing calculated based on weight
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Frequency
            </label>
            <div className="relative">
              <select
                value={currentPrescription.frequency}
                onChange={(e) => setCurrentPrescription(prev => ({ ...prev, frequency: e.target.value }))}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm pr-8"
              >
                <option value="">Select frequency</option>
                {commonFrequencies.map((freq) => (
                  <option key={freq} value={freq}>{freq}</option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Duration
            </label>
            <input
              type="text"
              value={currentPrescription.duration}
              onChange={(e) => setCurrentPrescription(prev => ({ ...prev, duration: e.target.value }))}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
              placeholder="e.g., 7 days, 2 weeks, 1 month"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Quantity to Dispense
            </label>
            <input
              type="text"
              value={currentPrescription.quantity}
              onChange={(e) => setCurrentPrescription(prev => ({ ...prev, quantity: e.target.value }))}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
              placeholder="e.g., 14 tablets, 100ml, 1 bottle"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Special Instructions
            </label>
            <textarea
              value={currentPrescription.instructions}
              onChange={(e) => setCurrentPrescription(prev => ({ ...prev, instructions: e.target.value }))}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
              rows="3"
              placeholder="Patient counseling points, special instructions..."
              maxLength="300"
            ></textarea>
          </div>
        </div>

        <div className="mt-6">
          <button
            type="button"
            onClick={addPrescription}
            disabled={!currentPrescription.medication || !currentPrescription.dosage || !currentPrescription.frequency}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center space-x-2 cursor-pointer whitespace-nowrap"
          >
            <i className="ri-add-line"></i>
            <span>Add to Prescription</span>
          </button>
        </div>
      </div>

      {/* Current Prescriptions with Enhanced Features */}
      {prescriptions.length > 0 && (
        <div className="bg-white rounded-lg p-6 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Current Prescription List</h3>
            <div className="flex space-x-2">
              <button
                onClick={() => window.print()}
                className="bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors flex items-center space-x-2 cursor-pointer whitespace-nowrap"
              >
                <i className="ri-printer-line"></i>
                <span>Print</span>
              </button>
              <button
                onClick={generateQRCode}
                disabled={isGeneratingQR}
                className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors flex items-center space-x-2 cursor-pointer whitespace-nowrap"
              >
                {isGeneratingQR ? (
                  <i className="ri-loader-4-line animate-spin"></i>
                ) : (
                  <i className="ri-qr-code-line"></i>
                )}
                <span>Generate QR</span>
              </button>
              <button
                onClick={sendToPharmacy}
                className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors flex items-center space-x-2 cursor-pointer whitespace-nowrap"
              >
                <i className="ri-send-plane-line"></i>
                <span>Send to Pharmacy</span>
              </button>
            </div>
          </div>

          <div className="space-y-4">
            {prescriptions.map((prescription, index) => {
              const drugInfo = getDrugInfo(prescription.medication);
              
              return (
                <div key={prescription.id} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="grid md:grid-cols-4 gap-4 mb-3">
                        <div>
                          <span className="text-sm text-gray-600">Medication:</span>
                          <p className="font-medium text-gray-900">{prescription.medication}</p>
                          {drugInfo && (
                            <p className="text-xs text-gray-500">{drugInfo.genericName}</p>
                          )}
                        </div>
                        <div>
                          <span className="text-sm text-gray-600">Dosage & Frequency:</span>
                          <p className="font-medium text-gray-900">{prescription.dosage}</p>
                          <p className="text-sm text-gray-600">{prescription.frequency}</p>
                        </div>
                        <div>
                          <span className="text-sm text-gray-600">Duration & Quantity:</span>
                          <p className="font-medium text-gray-900">{prescription.duration}</p>
                          <p className="text-sm text-gray-600">{prescription.quantity}</p>
                        </div>
                        <div>
                          <span className="text-sm text-gray-600">Status:</span>
                          <p className={`font-medium text-sm ${
                            prescription.status === 'Pending' ? 'text-orange-600' :
                            prescription.status === 'Sent to Pharmacy' ? 'text-blue-600' :
                            'text-green-600'
                          }`}>{prescription.status}</p>
                        </div>
                      </div>
                      
                      {prescription.instructions && (
                        <div className="bg-blue-50 rounded-lg p-3 mb-3">
                          <span className="text-sm font-medium text-blue-900">Instructions:</span>
                          <p className="text-sm text-blue-800">{prescription.instructions}</p>
                        </div>
                      )}

                      {drugInfo && (
                        <div className="bg-gray-50 rounded-lg p-3 mb-3">
                          <div className="grid md:grid-cols-2 gap-4 text-xs text-gray-600">
                            <div>
                              <span className="font-medium">Max Daily Dose:</span> {drugInfo.maxDose}
                            </div>
                            <div>
                              <span className="font-medium">Category:</span> {drugInfo.category}
                            </div>
                            {drugInfo.sideEffects && (
                              <div className="col-span-2">
                                <span className="font-medium">Common Side Effects:</span> {drugInfo.sideEffects.join(', ')}
                              </div>
                            )}
                          </div>
                        </div>
                      )}

                      <div className="flex items-center space-x-4 text-xs text-gray-500">
                        <span>Prescribed: {new Date(prescription.prescribedDate).toLocaleDateString()}</span>
                        <span>By: {prescription.prescriber}</span>
                        {prescription.digitalSignature && (
                          <span className="flex items-center space-x-1 text-green-600">
                            <i className="ri-shield-check-line"></i>
                            <span>Digitally Signed</span>
                          </span>
                        )}
                      </div>
                    </div>
                    
                    <button
                      onClick={() => removePrescription(prescription.id)}
                      className="text-red-500 hover:text-red-700 ml-4 cursor-pointer"
                    >
                      <i className="ri-delete-bin-line text-xl"></i>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* QR Code Display */}
      {qrCode && (
        <div className="bg-white rounded-lg p-6 shadow-sm">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Secure Prescription QR Code</h3>
          <div className="flex items-center justify-center bg-gray-50 rounded-lg p-8">
            <div className="text-center">
              <div className="w-48 h-48 bg-white border-2 border-gray-300 rounded-lg flex items-center justify-center mb-4">
                <div className="text-gray-400 text-sm">QR Code Generated</div>
              </div>
              <p className="text-sm text-gray-600 mb-2">Scan to verify prescription authenticity</p>
              <p className="text-xs text-gray-500 font-mono">{qrCode.substring(0, 50)}...</p>
            </div>
          </div>
        </div>
      )}

      {/* Drug Interaction Alert */}
      {showInteractionAlert && (
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
          <div className="flex items-center space-x-2 mb-3">
            <i className="ri-warning-line text-yellow-600 text-xl"></i>
            <h3 className="text-lg font-semibold text-yellow-800">Drug Interaction Alert</h3>
          </div>
          <p className="text-yellow-700 text-sm mb-4">
            Potential drug interaction detected. Please review before prescribing.
          </p>
          <div className="flex space-x-3">
            <button 
              onClick={() => setShowInteractionAlert(false)}
              className="bg-yellow-600 text-white px-4 py-2 rounded-lg hover:bg-yellow-700 transition-colors cursor-pointer whitespace-nowrap"
            >
              Review Interaction
            </button>
            <button 
              onClick={() => setShowInteractionAlert(false)}
              className="bg-gray-100 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200 transition-colors cursor-pointer whitespace-nowrap"
            >
              Dismiss
            </button>
          </div>
        </div>
      )}

      {/* Allergy Alert */}
      {showAllergyAlert && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-6">
          <div className="flex items-center space-x-2 mb-3">
            <i className="ri-alarm-warning-line text-red-600 text-xl"></i>
            <h3 className="text-lg font-semibold text-red-800">Allergy Alert - Contraindicated</h3>
          </div>
          <p className="text-red-700 text-sm mb-4">
            This medication is contraindicated due to patient allergies. Please select an alternative.
          </p>
          <button 
            onClick={() => setShowAllergyAlert(false)}
            className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors cursor-pointer whitespace-nowrap"
          >
            Select Alternative
          </button>
        </div>
      )}

      {/* Prescription History */}
      {prescriptionHistory.length > 0 && (
        <div className="bg-white rounded-lg p-6 shadow-sm">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Prescription History Tracking</h3>
          <div className="space-y-2">
            {prescriptionHistory.slice(-5).map((prescription, index) => (
              <div key={index} className="flex justify-between items-center py-2 border-b border-gray-100 last:border-b-0">
                <div>
                  <span className="font-medium text-gray-900">{prescription.medication}</span>
                  <span className="text-sm text-gray-600 ml-2">• {prescription.frequency}</span>
                </div>
                <span className="text-sm text-gray-500">
                  {new Date(prescription.prescribedDate).toLocaleDateString()}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {prescriptions.length === 0 && !patient && (
        <div className="text-center py-12">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <i className="ri-medicine-bottle-line text-gray-400 text-2xl"></i>
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Advanced Prescription System Ready</h3>
          <p className="text-gray-600">
            Please select a patient from the consultation queue to begin prescribing with AI-powered drug interaction checking, allergy alerts, and digital signatures.
          </p>
        </div>
      )}
    </div>
  );
}
