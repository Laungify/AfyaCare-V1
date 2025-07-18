'use client';
import { useState } from 'react';

export default function PatientStatusManager({ patient, onStatusChange }) {
  const [statusDecision, setStatusDecision] = useState({
    disposition: '',
    admissionType: '',
    ward: '',
    bedNumber: '',
    dischargeDate: '',
    followUpRequired: false,
    followUpDate: '',
    followUpType: '',
    referralRequired: false,
    referralSpecialty: '',
    referralUrgency: '',
    dischargeInstructions: '',
    medications: [],
    restrictions: '',
    emergencyContacts: '',
    transportArrangements: ''
  });

  const [availableBeds, setAvailableBeds] = useState([]);
  const [appointmentSlots, setAppointmentSlots] = useState([]);
  const [showDischargeModal, setShowDischargeModal] = useState(false);
  const [showAdmissionModal, setShowAdmissionModal] = useState(false);

  // Mock hospital bed data
  const bedData = [
    { ward: 'Medical Ward A', bedNumber: 'A-12', type: 'General', available: true, cost: 3000 },
    { ward: 'Medical Ward A', bedNumber: 'A-15', type: 'General', available: true, cost: 3000 },
    { ward: 'Medical Ward B', bedNumber: 'B-08', type: 'General', available: true, cost: 3000 },
    { ward: 'Surgical Ward', bedNumber: 'S-05', type: 'Post-Op', available: true, cost: 4000 },
    { ward: 'ICU', bedNumber: 'ICU-03', type: 'Critical Care', available: true, cost: 15000 },
    { ward: 'Maternity Ward', bedNumber: 'MAT-07', type: 'Obstetric', available: true, cost: 5000 },
    { ward: 'Pediatric Ward', bedNumber: 'PED-11', type: 'Pediatric', available: true, cost: 3500 },
    { ward: 'Private Wing', bedNumber: 'PVT-02', type: 'Private', available: true, cost: 8000 }
  ];

  // Specialist departments for referrals
  const specialties = [
    'Cardiology', 'Endocrinology', 'Gastroenterology', 'Nephrology',
    'Neurology', 'Oncology', 'Orthopedics', 'Psychiatry',
    'Pulmonology', 'Rheumatology', 'Dermatology', 'Ophthalmology'
  ];

  // Mock appointment slots
  const mockAppointmentSlots = [
    { date: '2024-01-18', time: '09:00', doctor: 'Dr. Sarah Johnson', available: true },
    { date: '2024-01-18', time: '10:30', doctor: 'Dr. Peter Kamau', available: true },
    { date: '2024-01-19', time: '14:00', doctor: 'Dr. Grace Kiprotich', available: true },
    { date: '2024-01-20', time: '11:15', doctor: 'Dr. Alice Wanjiku', available: true },
    { date: '2024-01-22', time: '15:30', doctor: 'Dr. Sarah Johnson', available: true }
  ];

  const handleDispositionChange = (disposition) => {
    setStatusDecision(prev => ({ ...prev, disposition }));
    
    if (disposition === 'admit') {
      setAvailableBeds(bedData.filter(bed => bed.available));
      setShowAdmissionModal(true);
    } else if (disposition === 'discharge') {
      setShowDischargeModal(true);
    }
  };

  const handleBedAssignment = (bed) => {
    setStatusDecision(prev => ({
      ...prev,
      ward: bed.ward,
      bedNumber: bed.bedNumber,
      admissionType: bed.type
    }));
  };

  const scheduleFollowUp = () => {
    if (!statusDecision.followUpDate || !statusDecision.followUpType) {
      alert('Please select follow-up date and type');
      return;
    }

    const followUpData = {
      patientId: patient?.id,
      patientName: patient?.name,
      appointmentDate: statusDecision.followUpDate,
      appointmentType: statusDecision.followUpType,
      scheduledBy: 'Dr. Sarah Johnson',
      scheduledAt: new Date().toISOString(),
      status: 'Scheduled'
    };

    console.log('Follow-up scheduled:', followUpData);
    alert('Follow-up appointment scheduled successfully!');
  };

  const processReferral = () => {
    if (!statusDecision.referralSpecialty) {
      alert('Please select referral specialty');
      return;
    }

    const referralData = {
      patientId: patient?.id,
      patientName: patient?.name,
      fromDoctor: 'Dr. Sarah Johnson',
      toSpecialty: statusDecision.referralSpecialty,
      urgency: statusDecision.referralUrgency,
      referralDate: new Date().toISOString(),
      clinicalSummary: `Patient requires ${statusDecision.referralSpecialty} consultation`,
      status: 'Pending'
    };

    console.log('Referral processed:', referralData);
    alert('Specialist referral processed successfully!');
  };

  const completeAdmission = () => {
    if (!statusDecision.ward || !statusDecision.bedNumber) {
      alert('Please select a bed for admission');
      return;
    }

    const admissionData = {
      patientId: patient?.id,
      patientName: patient?.name,
      admissionDate: new Date().toISOString(),
      ward: statusDecision.ward,
      bedNumber: statusDecision.bedNumber,
      admissionType: statusDecision.admissionType,
      admittingDoctor: 'Dr. Sarah Johnson',
      status: 'Admitted'
    };

    console.log('Patient admitted:', admissionData);
    onStatusChange?.('admitted');
    setShowAdmissionModal(false);
    alert('Patient admitted successfully!');
  };

  const completeDischarge = () => {
    if (!statusDecision.dischargeInstructions) {
      alert('Please provide discharge instructions');
      return;
    }

    const dischargeData = {
      patientId: patient?.id,
      patientName: patient?.name,
      dischargeDate: new Date().toISOString(),
      dischargingDoctor: 'Dr. Sarah Johnson',
      instructions: statusDecision.dischargeInstructions,
      medications: statusDecision.medications,
      followUpScheduled: statusDecision.followUpRequired,
      status: 'Discharged'
    };

    console.log('Patient discharged:', dischargeData);
    onStatusChange?.('discharged');
    setShowDischargeModal(false);
    alert('Patient discharged successfully!');
  };

  if (!patient) {
    return (
      <div className="text-center py-12">
        <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <i className="ri-user-settings-line text-gray-400 text-2xl"></i>
        </div>
        <h3 className="text-lg font-semibold text-gray-900 mb-2">Patient Status Management</h3>
        <p className="text-gray-600">
          Please select a patient to manage admission, discharge, and follow-up decisions.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Patient Header */}
      <div className="bg-white rounded-lg p-6 shadow-sm">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Patient Status & Disposition Management</h2>
        <div className="bg-gray-50 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold text-gray-900">{patient.name}</h3>
              <p className="text-gray-600">
                {patient.age}yo • {patient.gender} • {patient.chiefComplaint}
              </p>
            </div>
            <div className="text-right">
              <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium">
                Current Status: {patient.status || 'In Consultation'}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Disposition Decision */}
      <div className="bg-white rounded-lg p-6 shadow-sm">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Patient Disposition Decision</h3>
        <div className="grid md:grid-cols-4 gap-4">
          {[
            { value: 'discharge', label: 'Discharge Home', icon: 'ri-home-line', color: 'green' },
            { value: 'admit', label: 'Admit to Ward', icon: 'ri-hotel-bed-line', color: 'blue' },
            { value: 'observation', label: 'Observation Unit', icon: 'ri-eye-line', color: 'yellow' },
            { value: 'transfer', label: 'Transfer to ICU', icon: 'ri-heart-pulse-line', color: 'red' }
          ].map((option) => (
            <button
              key={option.value}
              onClick={() => handleDispositionChange(option.value)}
              className={`p-6 rounded-lg border-2 text-center transition-colors cursor-pointer ${
                statusDecision.disposition === option.value
                  ? `bg-${option.color}-50 border-${option.color}-500 text-${option.color}-700`
                  : 'border-gray-300 hover:border-gray-400'
              }`}
            >
              <i className={`${option.icon} text-3xl mb-3 block`}></i>
              <span className="font-medium">{option.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Follow-up Scheduling */}
      <div className="bg-white rounded-lg p-6 shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900">Follow-up Scheduling</h3>
          <label className="flex items-center space-x-2 cursor-pointer">
            <input
              type="checkbox"
              checked={statusDecision.followUpRequired}
              onChange={(e) => setStatusDecision(prev => ({ ...prev, followUpRequired: e.target.checked }))}
              className="rounded"
            />
            <span className="text-sm font-medium">Follow-up Required</span>
          </label>
        </div>

        {statusDecision.followUpRequired && (
          <div className="space-y-4">
            <div className="grid md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Follow-up Date</label>
                <input
                  type="date"
                  value={statusDecision.followUpDate}
                  onChange={(e) => setStatusDecision(prev => ({ ...prev, followUpDate: e.target.value }))}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                  min={new Date().toISOString().split('T')[0]}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Follow-up Type</label>
                <div className="relative">
                  <select
                    value={statusDecision.followUpType}
                    onChange={(e) => setStatusDecision(prev => ({ ...prev, followUpType: e.target.value }))}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm pr-8"
                  >
                    <option value="">Select type</option>
                    <option value="routine">Routine Check-up</option>
                    <option value="medication">Medication Review</option>
                    <option value="investigation">Investigation Follow-up</option>
                    <option value="symptom">Symptom Monitoring</option>
                    <option value="specialist">Specialist Consultation</option>
                  </select>
                </div>
              </div>

              <div className="flex items-end">
                <button
                  onClick={scheduleFollowUp}
                  className="w-full bg-green-600 text-white px-4 py-3 rounded-lg hover:bg-green-700 transition-colors cursor-pointer whitespace-nowrap"
                >
                  Schedule Appointment
                </button>
              </div>
            </div>

            <div>
              <h4 className="font-medium text-gray-900 mb-3">Available Appointment Slots</h4>
              <div className="grid md:grid-cols-2 gap-3">
                {mockAppointmentSlots.slice(0, 4).map((slot, index) => (
                  <div
                    key={index}
                    className="flex justify-between items-center bg-green-50 border border-green-200 rounded-lg p-3 cursor-pointer hover:bg-green-100"
                    onClick={() => setStatusDecision(prev => ({ ...prev, followUpDate: slot.date }))}
                  >
                    <div>
                      <p className="font-medium text-green-900">{slot.date} at {slot.time}</p>
                      <p className="text-sm text-green-700">{slot.doctor}</p>
                    </div>
                    <i className="ri-calendar-check-line text-green-600"></i>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Specialist Referral */}
      <div className="bg-white rounded-lg p-6 shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900">Specialist Referral</h3>
          <label className="flex items-center space-x-2 cursor-pointer">
            <input
              type="checkbox"
              checked={statusDecision.referralRequired}
              onChange={(e) => setStatusDecision(prev => ({ ...prev, referralRequired: e.target.checked }))}
              className="rounded"
            />
            <span className="text-sm font-medium">Referral Required</span>
          </label>
        </div>

        {statusDecision.referralRequired && (
          <div className="space-y-4">
            <div className="grid md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Specialty</label>
                <div className="relative">
                  <select
                    value={statusDecision.referralSpecialty}
                    onChange={(e) => setStatusDecision(prev => ({ ...prev, referralSpecialty: e.target.value }))}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm pr-8"
                  >
                    <option value="">Select specialty</option>
                    {specialties.map((specialty) => (
                      <option key={specialty} value={specialty}>{specialty}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Urgency</label>
                <div className="relative">
                  <select
                    value={statusDecision.referralUrgency}
                    onChange={(e) => setStatusDecision(prev => ({ ...prev, referralUrgency: e.target.value }))}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm pr-8"
                  >
                    <option value="">Select urgency</option>
                    <option value="routine">Routine (2-4 weeks)</option>
                    <option value="urgent">Urgent (1 week)</option>
                    <option value="emergency">Emergency (Same day)</option>
                  </select>
                </div>
              </div>

              <div className="flex items-end">
                <button
                  onClick={processReferral}
                  className="w-full bg-purple-600 text-white px-4 py-3 rounded-lg hover:bg-purple-700 transition-colors cursor-pointer whitespace-nowrap"
                >
                  Process Referral
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Admission Modal */}
      {showAdmissionModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg max-w-4xl w-full m-4 max-h-96 overflow-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-gray-900">Patient Admission & Bed Assignment</h3>
                <button
                  onClick={() => setShowAdmissionModal(false)}
                  className="text-gray-400 hover:text-gray-600 cursor-pointer"
                >
                  <i className="ri-close-line text-2xl"></i>
                </button>
              </div>

              <div className="space-y-6">
                <div className="bg-blue-50 rounded-lg p-4">
                  <h4 className="font-semibold text-blue-900 mb-2">Patient Information</h4>
                  <p className="text-blue-800">
                    <strong>{patient.name}</strong> • {patient.age}yo {patient.gender} • {patient.chiefComplaint}
                  </p>
                </div>

                <div>
                  <h4 className="font-semibold text-gray-900 mb-4">Available Beds</h4>
                  <div className="grid md:grid-cols-2 gap-4">
                    {availableBeds.map((bed, index) => (
                      <div
                        key={index}
                        className={`border-2 rounded-lg p-4 cursor-pointer transition-colors ${
                          statusDecision.bedNumber === bed.bedNumber
                            ? 'border-blue-500 bg-blue-50'
                            : 'border-gray-300 hover:border-gray-400'
                        }`}
                        onClick={() => handleBedAssignment(bed)}
                      >
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <h5 className="font-medium text-gray-900">{bed.ward}</h5>
                            <p className="text-sm text-gray-600">Bed: {bed.bedNumber}</p>
                          </div>
                          <span className="px-2 py-1 bg-green-100 text-green-700 rounded-full text-xs font-medium">
                            {bed.type}
                          </span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-gray-500">Available Now</span>
                          <span className="font-semibold text-blue-600">KSh {bed.cost.toLocaleString()}/day</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex justify-between items-center pt-6 border-t">
                  <div className="text-sm text-gray-600">
                    {statusDecision.bedNumber && (
                      <p>Selected: <strong>{statusDecision.ward} - {statusDecision.bedNumber}</strong></p>
                    )}
                  </div>
                  <div className="flex space-x-4">
                    <button
                      onClick={() => setShowAdmissionModal(false)}
                      className="bg-gray-100 text-gray-700 px-6 py-3 rounded-lg hover:bg-gray-200 transition-colors cursor-pointer whitespace-nowrap"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={completeAdmission}
                      disabled={!statusDecision.bedNumber}
                      className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors cursor-pointer whitespace-nowrap"
                    >
                      Admit Patient
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Discharge Modal */}
      {showDischargeModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg max-w-4xl w-full m-4 max-h-96 overflow-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-gray-900">Patient Discharge Planning</h3>
                <button
                  onClick={() => setShowDischargeModal(false)}
                  className="text-gray-400 hover:text-gray-600 cursor-pointer"
                >
                  <i className="ri-close-line text-2xl"></i>
                </button>
              </div>

              <div className="space-y-6">
                <div className="bg-green-50 rounded-lg p-4">
                  <h4 className="font-semibold text-green-900 mb-2">Patient Ready for Discharge</h4>
                  <p className="text-green-800">
                    <strong>{patient.name}</strong> • {patient.age}yo {patient.gender}
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Discharge Instructions *
                  </label>
                  <textarea
                    value={statusDecision.dischargeInstructions}
                    onChange={(e) => setStatusDecision(prev => ({ ...prev, dischargeInstructions: e.target.value }))}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                    rows="4"
                    placeholder="Provide detailed discharge instructions including medication compliance, activity restrictions, warning signs to watch for..."
                    maxLength="1000"
                    required
                  ></textarea>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Activity Restrictions
                    </label>
                    <textarea
                      value={statusDecision.restrictions}
                      onChange={(e) => setStatusDecision(prev => ({ ...prev, restrictions: e.target.value }))}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                      rows="3"
                      placeholder="Physical activity limitations, work restrictions, driving restrictions..."
                      maxLength="500"
                    ></textarea>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Emergency Contacts
                    </label>
                    <textarea
                      value={statusDecision.emergencyContacts}
                      onChange={(e) => setStatusDecision(prev => ({ ...prev, emergencyContacts: e.target.value }))}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                      rows="3"
                      placeholder="When to seek immediate medical attention, emergency contact numbers..."
                      maxLength="500"
                    ></textarea>
                  </div>
                </div>

                <div className="flex justify-between items-center pt-6 border-t">
                  <div className="text-sm text-gray-600">
                    <p>Discharge summary will be generated and sent to patient's primary care physician</p>
                  </div>
                  <div className="flex space-x-4">
                    <button
                      onClick={() => setShowDischargeModal(false)}
                      className="bg-gray-100 text-gray-700 px-6 py-3 rounded-lg hover:bg-gray-200 transition-colors cursor-pointer whitespace-nowrap"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={completeDischarge}
                      disabled={!statusDecision.dischargeInstructions}
                      className="bg-green-600 text-white px-8 py-3 rounded-lg hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors cursor-pointer whitespace-nowrap"
                    >
                      Discharge Patient
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}