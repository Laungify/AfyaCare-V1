'use client';

export default function Header() {
  return (
    <header className="bg-white shadow-sm border-b">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-8">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                <i className="ri-microscope-line text-white text-xl"></i>
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">AfyaCare Diagnostics</h1>
                <p className="text-sm text-gray-600">Advanced Laboratory & Imaging Services</p>
              </div>
            </div>
          </div>

          <div className="flex items-center space-x-6">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2 bg-green-50 px-3 py-2 rounded-lg">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-sm font-medium text-green-700">Lab Systems Online</span>
              </div>
              <div className="flex items-center space-x-2 bg-blue-50 px-3 py-2 rounded-lg">
                <i className="ri-wifi-line text-blue-600"></i>
                <span className="text-sm font-medium text-blue-700">Connected</span>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <button className="relative p-2 text-gray-600 hover:text-gray-800 cursor-pointer">
                <i className="ri-notification-line text-xl"></i>
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                  3
                </span>
              </button>
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
                  <i className="ri-user-line text-gray-600"></i>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium text-gray-900">Dr. Sarah Kimani</p>
                  <p className="text-xs text-gray-600">Lab Director</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}