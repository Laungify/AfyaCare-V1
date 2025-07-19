
'use client';
import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                <i className="ri-hospital-fill text-white text-xl"></i>
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">AfyaCare</h1>
                <p className="text-sm text-gray-600">Doctor Consultation</p>
              </div>
            </div>
            <nav className="flex items-center space-x-6">
              <Link href="/registration" className="text-gray-700 hover:text-blue-600 transition-colors">
                Registration
              </Link>
              <Link href="/triage" className="text-gray-700 hover:text-blue-600 transition-colors">
                Triage
              </Link>
              <Link href="/consultation" className="text-blue-600 font-medium">
                Consultation
              </Link>
              <Link href="/diagnostics" className="text-gray-700 hover:text-blue-600 transition-colors">
                Diagnostics
              </Link>
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <i className="ri-user-line"></i>
                <span>Dr. Sarah Johnson</span>
              </div>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <div className="relative">
        <div
          className="h-96 bg-cover bg-center"
          style={{
            backgroundImage: `linear-gradient(rgba(37, 99, 235, 0.8), rgba(16, 185, 129, 0.8)), url('https://readdy.ai/api/search-image?query=Modern%20hospital%20reception%20area%20with%20friendly%20medical%20staff%20welcoming%20patients%2C%20clean%20white%20and%20blue%20interior%20design%2C%20natural%20lighting%20through%20large%20windows%2C%20professional%20healthcare%20environment%20with%20comfortable%20seating%20and%20digital%20displays&width=1200&height=400&seq=hero1&orientation=landscape')`
          }}
        >
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center text-white max-w-4xl px-6">
              <h1 className="text-5xl font-bold mb-6">AfyaCare Clinical Module</h1>
              <p className="text-xl mb-8 opacity-90">Streamlined patient registration and triage system with real-time visibility across all departments</p>
              <div className="flex justify-center space-x-4">
                <Link
                  href="/registration"
                  className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors whitespace-nowrap cursor-pointer"
                >
                  Start Registration
                </Link>
                <Link
                  href="/triage"
                  className="bg-blue-700 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-800 transition-colors whitespace-nowrap cursor-pointer"
                >
                  Triage Queue
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-16 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Clinical Workflow Features</h2>
            <p className="text-lg text-gray-600">Comprehensive patient management from registration to treatment</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white rounded-lg p-6 shadow-lg">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                <i className="ri-user-add-fill text-blue-600 text-xl"></i>
              </div>
              <h3 className="text-xl font-semibold mb-3">Patient Registration</h3>
              <p className="text-gray-600 mb-4">Centralized registration with real-time visibility across all departments including reception, triage, consultation, lab, and pharmacy.</p>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Master Patient Index (MPI)</li>
                <li>• Biometric Support</li>
                <li>• Multi-Language Interface</li>
                <li>• Offline Capability</li>
              </ul>
            </div>

            <div className="bg-white rounded-lg p-6 shadow-lg">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                <i className="ri-stethoscope-fill text-green-600 text-xl"></i>
              </div>
              <h3 className="text-xl font-semibold mb-3">Smart Triage</h3>
              <p className="text-gray-600 mb-4">Intelligent patient prioritization system with color-coded queues and automated status tracking.</p>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Color-Coded Queue System</li>
                <li>• Priority Assessment</li>
                <li>• Real-time Updates</li>
                <li>• Emergency Fast-Track</li>
              </ul>
            </div>

            <div className="bg-white rounded-lg p-6 shadow-lg">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                <i className="ri-file-text-fill text-purple-600 text-xl"></i>
              </div>
              <h3 className="text-xl font-semibold mb-3">Digital Health Records</h3>
              <p className="text-gray-600 mb-4">Comprehensive digital records with medical history, allergies, and family history accessible to authorized users.</p>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Medical History Tracking</li>
                <li>• Allergy Management</li>
                <li>• Cost Tracking</li>
                <li>• Department Sync</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="bg-white py-16">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-3xl font-bold text-blue-600 mb-2">250+</div>
              <p className="text-gray-600">Patients Registered Daily</p>
            </div>
            <div>
              <div className="text-3xl font-bold text-green-600 mb-2">15min</div>
              <p className="text-gray-600">Average Triage Time</p>
            </div>
            <div>
              <div className="text-3xl font-bold text-purple-600 mb-2">99.9%</div>
              <p className="text-gray-600">System Uptime</p>
            </div>
            <div>
              <div className="text-3xl font-bold text-orange-600 mb-2">24/7</div>
              <p className="text-gray-600">Emergency Support</p>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <div className="flex items-center justify-center space-x-3 mb-4">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <i className="ri-hospital-fill text-white"></i>
            </div>
            <span className="text-lg font-semibold">AfyaCare Clinical Module</span>
          </div>
          <p className="text-gray-400">Streamlining healthcare workflows for better patient care</p>
        </div>
      </footer>
    </div>
  );
}
