
'use client';
import { useState } from 'react';

interface Patient {
  id?: string;
  name?: string;
  nationalId?: string;
  phone?: string;
  email?: string;
  dateOfBirth?: string;
  gender?: string;
  address?: string;
  emergencyContactName?: string;
  emergencyContactPhone?: string;
  bloodGroup?: string;
  allergies?: string;
  medicalHistory?: string;
  insuranceProvider?: string;
  insuranceNumber?: string;
  preferredLanguage?: string;
}

interface RegistrationFormProps {
  patient?: Patient;
  isUpdate?: boolean;
  onComplete: (patientData: any) => void;
  onBack: () => void;
}

export default function RegistrationForm({ patient, isUpdate, onComplete, onBack }: RegistrationFormProps) {
  const [formData, setFormData] = useState({
    firstName: patient?.name?.split(' ')[0] || '',
    lastName: patient?.name?.split(' ').slice(1).join(' ') || '',
    nationalId: patient?.nationalId || '',
    phone: patient?.phone || '',
    email: patient?.email || '',
    dateOfBirth: patient?.dateOfBirth || '',
    gender: patient?.gender || '',
    address: patient?.address || '',
    emergencyContactName: patient?.emergencyContactName || '',
    emergencyContactPhone: patient?.emergencyContactPhone || '',
    bloodGroup: patient?.bloodGroup || '',
    allergies: patient?.allergies || '',
    medicalHistory: patient?.medicalHistory || '',
    insuranceProvider: patient?.insuranceProvider || '',
    insuranceNumber: patient?.insuranceNumber || '',
    preferredLanguage: patient?.preferredLanguage || 'English',
    visitReason: '',
    priority: 'Normal'
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [currentTab, setCurrentTab] = useState('personal');

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call
    setTimeout(() => {
      const patientData = {
        id: patient?.id || `PID${Date.now()}`,
        name: `${formData.firstName} ${formData.lastName}`,
        ...formData,
        registrationTime: new Date().toISOString(),
        queuePosition: Math.floor(Math.random() * 10) + 1
      };
      
      onComplete(patientData);
      setIsSubmitting(false);
    }, 2000);
  };

  const tabButtons = [
    { key: 'personal', label: 'Personal Info', icon: 'ri-user-line' },
    { key: 'contact', label: 'Contact & Emergency', icon: 'ri-phone-line' },
    { key: 'medical', label: 'Medical Info', icon: 'ri-heart-pulse-line' },
    { key: 'visit', label: 'Visit Details', icon: 'ri-stethoscope-line' }
  ];

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-900">
          {isUpdate ? 'Update Patient Information' : 'Register New Patient'}
        </h2>
        <button
          onClick={onBack}
          className="text-gray-600 hover:text-gray-800 transition-colors flex items-center space-x-2 cursor-pointer"
        >
          <i className="ri-arrow-left-line"></i>
          <span>Back to Search</span>
        </button>
      </div>

      {/* Tab Navigation */}
      <div className="flex space-x-1 mb-6 bg-gray-100 rounded-lg p-1">
        {tabButtons.map((tab) => (
          <button
            key={tab.key}
            onClick={() => setCurrentTab(tab.key)}
            className={`flex-1 flex items-center justify-center space-x-2 px-4 py-2 rounded-md transition-colors cursor-pointer whitespace-nowrap ${
              currentTab === tab.key
                ? 'bg-white text-blue-600 shadow-sm'
                : 'text-gray-600 hover:text-gray-800'
            }`}
          >
            <i className={`${tab.icon} text-sm`}></i>
            <span className="text-sm font-medium">{tab.label}</span>
          </button>
        ))}
      </div>

      <form onSubmit={handleSubmit}>
        {/* Personal Information Tab */}
        {currentTab === 'personal' && (
          <div className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  First Name *
                </label>
                <input
                  type="text"
                  required
                  value={formData.firstName}
                  onChange={(e) => handleChange('firstName', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                  placeholder="Enter first name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Last Name *
                </label>
                <input
                  type="text"
                  required
                  value={formData.lastName}
                  onChange={(e) => handleChange('lastName', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                  placeholder="Enter last name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  National ID *
                </label>
                <input
                  type="text"
                  required
                  value={formData.nationalId}
                  onChange={(e) => handleChange('nationalId', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                  placeholder="Enter national ID"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Date of Birth *
                </label>
                <input
                  type="date"
                  required
                  value={formData.dateOfBirth}
                  onChange={(e) => handleChange('dateOfBirth', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Gender *
                </label>
                <div className="flex space-x-4">
                  {['Male', 'Female', 'Other'].map((gender) => (
                    <label key={gender} className="flex items-center cursor-pointer">
                      <input
                        type="radio"
                        name="gender"
                        value={gender}
                        checked={formData.gender === gender}
                        onChange={(e) => handleChange('gender', e.target.value)}
                        className="mr-2"
                      />
                      {gender}
                    </label>
                  ))}
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Preferred Language
                </label>
                <div className="relative">
                  <select
                    value={formData.preferredLanguage}
                    onChange={(e) => handleChange('preferredLanguage', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm pr-8"
                  >
                    <option value="English">English</option>
                    <option value="Swahili">Swahili</option>
                    <option value="Kikuyu">Kikuyu</option>
                    <option value="Luo">Luo</option>
                    <option value="Kalenjin">Kalenjin</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Contact & Emergency Tab */}
        {currentTab === 'contact' && (
          <div className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Phone Number *
                </label>
                <input
                  type="tel"
                  required
                  value={formData.phone}
                  onChange={(e) => handleChange('phone', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                  placeholder="+254712345678"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleChange('email', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                  placeholder="patient@example.com"
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Address
                </label>
                <textarea
                  value={formData.address}
                  onChange={(e) => handleChange('address', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                  rows={3}
                  placeholder="Enter home address"
                  maxLength={500}
                ></textarea>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Emergency Contact Name *
                </label>
                <input
                  type="text"
                  required
                  value={formData.emergencyContactName}
                  onChange={(e) => handleChange('emergencyContactName', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                  placeholder="Full name of emergency contact"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Emergency Contact Phone *
                </label>
                <input
                  type="tel"
                  required
                  value={formData.emergencyContactPhone}
                  onChange={(e) => handleChange('emergencyContactPhone', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                  placeholder="+254712345678"
                />
              </div>
            </div>
          </div>
        )}

        {/* Medical Information Tab */}
        {currentTab === 'medical' && (
          <div className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Blood Group
                </label>
                <div className="relative">
                  <select
                    value={formData.bloodGroup}
                    onChange={(e) => handleChange('bloodGroup', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm pr-8"
                  >
                    <option value="">Select blood group</option>
                    <option value="A+">A+</option>
                    <option value="A-">A-</option>
                    <option value="B+">B+</option>
                    <option value="B-">B-</option>
                    <option value="AB+">AB+</option>
                    <option value="AB-">AB-</option>
                    <option value="O+">O+</option>
                    <option value="O-">O-</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Insurance Provider
                </label>
                <input
                  type="text"
                  value={formData.insuranceProvider}
                  onChange={(e) => handleChange('insuranceProvider', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                  placeholder="e.g., NHIF, AAR, CIC"
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Insurance Number
                </label>
                <input
                  type="text"
                  value={formData.insuranceNumber}
                  onChange={(e) => handleChange('insuranceNumber', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                  placeholder="Enter insurance policy number"
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Known Allergies
                </label>
                <textarea
                  value={formData.allergies}
                  onChange={(e) => handleChange('allergies', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                  rows={3}
                  placeholder="List any known allergies (medications, food, environmental)"
                  maxLength={500}
                ></textarea>
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Medical History
                </label>
                <textarea
                  value={formData.medicalHistory}
                  onChange={(e) => handleChange('medicalHistory', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                  rows={4}
                  placeholder="Previous surgeries, chronic conditions, current medications"
                  maxLength={500}
                ></textarea>
              </div>
            </div>
          </div>
        )}

        {/* Visit Details Tab */}
        {currentTab === 'visit' && (
          <div className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Reason for Visit *
                </label>
                <textarea
                  required
                  value={formData.visitReason}
                  onChange={(e) => handleChange('visitReason', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                  rows={4}
                  placeholder="Describe the reason for today's visit, symptoms, or concerns"
                  maxLength={500}
                ></textarea>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Priority Level
                </label>
                <div className="space-y-2">
                  {[
                    { value: 'Emergency', color: 'text-red-600', bg: 'bg-red-50', label: 'Emergency - Immediate attention required' },
                    { value: 'Urgent', color: 'text-orange-600', bg: 'bg-orange-50', label: 'Urgent - Within 1 hour' },
                    { value: 'Normal', color: 'text-green-600', bg: 'bg-green-50', label: 'Normal - Standard queue' }
                  ].map((priority) => (
                    <label
                      key={priority.value}
                      className={`flex items-center p-3 rounded-lg border cursor-pointer ${
                        formData.priority === priority.value
                          ? `${priority.bg} border-current ${priority.color}`
                          : 'bg-white border-gray-300'
                      }`}
                    >
                      <input
                        type="radio"
                        name="priority"
                        value={priority.value}
                        checked={formData.priority === priority.value}
                        onChange={(e) => handleChange('priority', e.target.value)}
                        className="mr-3"
                      />
                      <div>
                        <div className="font-medium">{priority.value}</div>
                        <div className="text-sm text-gray-600">{priority.label}</div>
                      </div>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Form Actions */}
        <div className="flex justify-between items-center pt-8 border-t">
          <div className="flex space-x-2">
            {tabButtons.map((tab, index) => (
              <div
                key={tab.key}
                className={`w-2 h-2 rounded-full ${
                  currentTab === tab.key ? 'bg-blue-600' : 'bg-gray-300'
                }`}
              ></div>
            ))}
          </div>
          
          <div className="flex space-x-4">
            {currentTab !== 'personal' && (
              <button
                type="button"
                onClick={() => {
                  const currentIndex = tabButtons.findIndex(tab => tab.key === currentTab);
                  setCurrentTab(tabButtons[currentIndex - 1].key);
                }}
                className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer whitespace-nowrap"
              >
                Previous
              </button>
            )}
            
            {currentTab !== 'visit' ? (
              <button
                type="button"
                onClick={() => {
                  const currentIndex = tabButtons.findIndex(tab => tab.key === currentTab);
                  setCurrentTab(tabButtons[currentIndex + 1].key);
                }}
                className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors cursor-pointer whitespace-nowrap"
              >
                Next
              </button>
            ) : (
              <button
                type="submit"
                disabled={isSubmitting}
                className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center space-x-2 cursor-pointer whitespace-nowrap"
              >
                {isSubmitting ? (
                  <>
                    <i className="ri-loader-4-line animate-spin"></i>
                    <span>{isUpdate ? 'Updating...' : 'Registering...'}</span>
                  </>
                ) : (
                  <>
                    <i className="ri-check-line"></i>
                    <span>{isUpdate ? 'Update Patient' : 'Register Patient'}</span>
                  </>
                )}
              </button>
            )}
          </div>
        </div>
      </form>
    </div>
  );
}
