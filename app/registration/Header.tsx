
'use client';
import Link from 'next/link';

export default function Header() {
  return (
    <header className="bg-white shadow-sm border-b">
      <div className="px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Link href="/" className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                <i className="ri-hospital-fill text-white text-xl"></i>
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">AfyaCare</h1>
                <p className="text-sm text-gray-600">Patient Registration</p>
              </div>
            </Link>
          </div>
          
          <nav className="flex items-center space-x-6">
            <Link href="/registration" className="text-blue-600 font-medium">
              Registration
            </Link>
            <Link href="/triage" className="text-gray-700 hover:text-blue-600 transition-colors">
              Triage
            </Link>
            <Link href="/dashboard" className="text-gray-700 hover:text-blue-600 transition-colors">
              Dashboard
            </Link>
          </nav>

          <div className="flex items-center space-x-4">
            <div className="text-right">
              <p className="text-sm font-medium text-gray-900">Dr. Sarah Kimani</p>
              <p className="text-xs text-gray-600">Reception Staff</p>
            </div>
            <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
              <i className="ri-user-fill text-gray-600"></i>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
