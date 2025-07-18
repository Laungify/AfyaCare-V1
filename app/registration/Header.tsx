'use client';
import Link from 'next/link';

export default function ConsultationHeader() {
  return (
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
  );
}