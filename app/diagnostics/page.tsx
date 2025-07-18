'use client';
import { useState } from 'react';
import Link from 'next/link';
import Header from './Header';
import TestOrderManagement from './TestOrderManagement';
import LabExecution from './LabExecution';
import ResultsManagement from './ResultsManagement';
import QualityControl from './QualityControl';
import InventoryTracking from './InventoryTracking';

export default function DiagnosticsPage() {
  const [activeTab, setActiveTab] = useState('orders');
  const [selectedOrder, setSelectedOrder] = useState(null);

  const handleOrderSelect = (order) => {
    setSelectedOrder(order);
    setActiveTab('execution');
  };

  const handleResultComplete = () => {
    setSelectedOrder(null);
    setActiveTab('results');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Breadcrumb */}
        <nav className="flex items-center space-x-2 text-sm text-gray-600 mb-8">
          <Link href="/" className="hover:text-blue-600">Home</Link>
          <i className="ri-arrow-right-s-line"></i>
          <span className="text-gray-900">Diagnostics</span>
        </nav>

        {/* Stats Overview */}
        <div className="grid md:grid-cols-5 gap-6 mb-8">
          <div className="bg-white rounded-lg p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Pending Tests</p>
                <p className="text-2xl font-bold text-orange-600">24</p>
              </div>
              <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                <i className="ri-flask-line text-orange-600 text-xl"></i>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">In Progress</p>
                <p className="text-2xl font-bold text-blue-600">12</p>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <i className="ri-time-line text-blue-600 text-xl"></i>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Completed Today</p>
                <p className="text-2xl font-bold text-green-600">87</p>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <i className="ri-check-line text-green-600 text-xl"></i>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Critical Results</p>
                <p className="text-2xl font-bold text-red-600">3</p>
              </div>
              <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
                <i className="ri-alarm-warning-line text-red-600 text-xl"></i>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Revenue Today</p>
                <p className="text-2xl font-bold text-purple-600">KSh 89,500</p>
              </div>
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <i className="ri-money-dollar-circle-line text-purple-600 text-xl"></i>
              </div>
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex space-x-1 bg-gray-100 rounded-lg p-1">
            <button
              onClick={() => setActiveTab('orders')}
              className={`px-6 py-2 rounded-md transition-colors cursor-pointer whitespace-nowrap flex items-center space-x-2 ${
                activeTab === 'orders'
                  ? 'bg-white text-blue-600 shadow-sm'
                  : 'text-gray-600 hover:text-gray-800'
              }`}
            >
              <i className="ri-file-list-line"></i>
              <span>Test Orders</span>
            </button>
            <button
              onClick={() => setActiveTab('execution')}
              className={`px-6 py-2 rounded-md transition-colors cursor-pointer whitespace-nowrap flex items-center space-x-2 ${
                activeTab === 'execution'
                  ? 'bg-white text-blue-600 shadow-sm'
                  : 'text-gray-600 hover:text-gray-800'
              }`}
            >
              <i className="ri-microscope-line"></i>
              <span>Lab Execution</span>
            </button>
            <button
              onClick={() => setActiveTab('results')}
              className={`px-6 py-2 rounded-md transition-colors cursor-pointer whitespace-nowrap flex items-center space-x-2 ${
                activeTab === 'results'
                  ? 'bg-white text-blue-600 shadow-sm'
                  : 'text-gray-600 hover:text-gray-800'
              }`}
            >
              <i className="ri-bar-chart-line"></i>
              <span>Results</span>
            </button>
            <button
              onClick={() => setActiveTab('quality')}
              className={`px-6 py-2 rounded-md transition-colors cursor-pointer whitespace-nowrap flex items-center space-x-2 ${
                activeTab === 'quality'
                  ? 'bg-white text-blue-600 shadow-sm'
                  : 'text-gray-600 hover:text-gray-800'
              }`}
            >
              <i className="ri-shield-check-line"></i>
              <span>Quality Control</span>
            </button>
            <button
              onClick={() => setActiveTab('inventory')}
              className={`px-6 py-2 rounded-md transition-colors cursor-pointer whitespace-nowrap flex items-center space-x-2 ${
                activeTab === 'inventory'
                  ? 'bg-white text-blue-600 shadow-sm'
                  : 'text-gray-600 hover:text-gray-800'
              }`}
            >
              <i className="ri-archive-line"></i>
              <span>Inventory</span>
            </button>
          </div>

          <div className="flex items-center space-x-4">
            <div className="text-right">
              <p className="text-sm text-gray-600" suppressHydrationWarning={true}>
                {new Date().toLocaleDateString()} • {new Date().toLocaleTimeString()}
              </p>
            </div>
            <Link 
              href="/triage"
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2 cursor-pointer whitespace-nowrap"
            >
              <i className="ri-stethoscope-line"></i>
              <span>Back to Triage</span>
            </Link>
          </div>
        </div>

        {/* Tab Content */}
        {activeTab === 'orders' && (
          <TestOrderManagement onOrderSelect={handleOrderSelect} />
        )}
        
        {activeTab === 'execution' && (
          <LabExecution 
            order={selectedOrder}
            onComplete={handleResultComplete}
            onBack={() => setActiveTab('orders')}
          />
        )}
        
        {activeTab === 'results' && (
          <ResultsManagement />
        )}
        
        {activeTab === 'quality' && (
          <QualityControl />
        )}
        
        {activeTab === 'inventory' && (
          <InventoryTracking />
        )}
      </div>
    </div>
  );
}