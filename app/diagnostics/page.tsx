'use client';
import { useState } from 'react';
import Link from 'next/link';
import Header from './Header';
import TestOrderManagement from './TestOrderManagement';
import LabExecution from './LabExecution';
import ResultsManagement from './ResultsManagement';
import QualityControl from './QualityControl';
import InventoryTracking from './InventoryTracking';

// Core Order Types
export interface Patient {
  id: string;
  name: string;
  age: number;
  gender: 'Male' | 'Female' | 'Other';
  phone: string;
  email?: string;
  address?: string;
  emergencyContact?: string;
}

export interface TestType {
  id: string;
  name: string;
  code: string;
  category: string;
  price: number;
  turnaroundTime: number; // in hours
  sampleType: 'Blood' | 'Urine' | 'Stool' | 'Swab' | 'Other';
  normalRange?: {
    min?: number;
    max?: number;
    unit: string;
  };
}

// Unified Order interface that matches all component expectations
export interface TestOrder {
  id: string;
  patient: Patient;
  patientId: string;
  patientName: string;
  age: number;
  gender: string;
  tests: TestType[];
  orderDate: Date | string;
  orderTime: string;
  orderedBy: string;
  department: string;
  priority: 'Routine' | 'Urgent' | 'STAT';
  status: 'Pending' | 'In Progress' | 'Sample Collected' | 'Completed' | 'Cancelled';
  category: string;
  orderingPhysician: string;
  totalAmount: number;
  totalCost: number; // Added for LabExecution compatibility
  paymentStatus: 'Pending' | 'Partial' | 'Paid';
  sampleId?: string;
  collectionDate?: Date;
  expectedCompletionDate: Date;
  insuranceCoverage: number;
  notes?: string;
}

// Alternative: Create a separate Order type for LabExecution if needed
export interface Order {
  id: string;
  patientId: string;
  patientName: string;
  age: number;
  gender: string;
  orderDate: string;
  orderTime: string;
  orderedBy: string;
  department: string;
  priority: string;
  status: string;
  category: string;
  totalCost: number;
  paymentStatus: string;
  insuranceCoverage: number;
  tests: TestType[];
  patient: Patient;
  orderingPhysician: string;
  expectedCompletionDate: Date;
  sampleId?: string;
  collectionDate?: Date;
  notes?: string;
}

// Lab Execution Types
export interface LabResult {
  testId: string;
  testName: string;
  value: string | number;
  unit: string;
  normalRange?: {
    min?: number;
    max?: number;
  };
  flag?: 'Normal' | 'High' | 'Low' | 'Critical';
  method?: string;
  technician: string;
  completedDate: Date;
  verified: boolean;
  verifiedBy?: string;
  notes?: string;
}

export interface LabExecution {
  orderId: string;
  status: 'Not Started' | 'In Progress' | 'Completed' | 'On Hold';
  assignedTechnician: string;
  startDate?: Date;
  completionDate?: Date;
  results: LabResult[];
  qualityControlPassed: boolean;
  instruments: string[];
  notes?: string;
}

// Quality Control Types
export interface QualityControlTest {
  id: string;
  testType: string;
  controlLevel: 'Low' | 'Normal' | 'High';
  expectedValue: number;
  actualValue: number;
  unit: string;
  tolerance: number;
  passed: boolean;
  date: Date;
  technician: string;
  instrument: string;
  lotNumber: string;
}

// Inventory Types
export interface InventoryItem {
  id: string;
  name: string;
  category: 'Reagent' | 'Consumable' | 'Equipment' | 'Control';
  currentStock: number;
  unit: string;
  minThreshold: number;
  maxThreshold: number;
  cost: number;
  supplier: string;
  expiryDate: Date;
  lotNumber: string;
  storageConditions: string;
  lastRestocked: Date;
}

// Updated Component Props Types to match expected interfaces
export interface TestOrderManagementProps {
  onOrderSelect: (order: {
    id: string;
    patientId: string;
    patientName: string;
    age: number;
    gender: string;
    orderDate: string;
    orderTime: string;
    orderedBy: string;
    department: string;
    priority: string;
    status: string;
    category: string;
    totalCost: number;
    paymentStatus: string;
    insuranceCoverage: number;
  }) => void;
}

export interface LabExecutionProps {
  order: Order | null;
  onComplete: () => void;
  onBack: () => void;
}

export interface ResultsManagementProps {}
export interface QualityControlProps {}
export interface InventoryTrackingProps {}

// Tab Type
type TabType = 'orders' | 'execution' | 'results' | 'quality' | 'inventory';

// Tab Configuration Interface
interface TabConfig {
  id: TabType;
  icon: string;
  label: string;
}

// Stats Card Interface
interface StatsCard {
  label: string;
  value: string | number;
  color: 'orange' | 'blue' | 'green' | 'red' | 'purple';
  icon: string;
}

export default function DiagnosticsPage() {
  const [activeTab, setActiveTab] = useState<TabType>('orders');
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  const handleOrderSelect = (order: {
    id: string;
    patientId: string;
    patientName: string;
    age: number;
    gender: string;
    orderDate: string;
    orderTime: string;
    orderedBy: string;
    department: string;
    priority: string;
    status: string;
    category: string;
    totalCost: number;
    paymentStatus: string;
    insuranceCoverage: number;
  }): void => {
    // Convert the order from TestOrderManagement to Order type
    const convertedOrder: Order = {
      ...order,
      totalCost: order.totalCost,
      tests: [], // You may need to populate this from your data source
      patient: {
        id: order.patientId,
        name: order.patientName,
        age: order.age,
        gender: order.gender as 'Male' | 'Female' | 'Other',
        phone: '', // You may need to get this from your data source
      },
      orderingPhysician: '', // You may need to get this from your data source
      expectedCompletionDate: new Date(), // You may need to calculate this
    };
    
    setSelectedOrder(convertedOrder);
    setActiveTab('execution');
  };

  const handleResultComplete = (): void => {
    setSelectedOrder(null);
    setActiveTab('results');
  };

  const handleTabClick = (tab: TabType): void => {
    setActiveTab(tab);
  };

  const tabConfigs: TabConfig[] = [
    { id: 'orders', icon: 'ri-file-list-line', label: 'Test Orders' },
    { id: 'execution', icon: 'ri-microscope-line', label: 'Lab Execution' },
    { id: 'results', icon: 'ri-bar-chart-line', label: 'Results' },
    { id: 'quality', icon: 'ri-shield-check-line', label: 'Quality Control' },
    { id: 'inventory', icon: 'ri-archive-line', label: 'Inventory' }
  ];

  const statsData: StatsCard[] = [
    { label: 'Pending Tests', value: 24, color: 'orange', icon: 'ri-flask-line' },
    { label: 'In Progress', value: 12, color: 'blue', icon: 'ri-time-line' },
    { label: 'Completed Today', value: 87, color: 'green', icon: 'ri-check-line' },
    { label: 'Critical Results', value: 3, color: 'red', icon: 'ri-alarm-warning-line' },
    { label: 'Revenue Today', value: 'KSh 89,500', color: 'purple', icon: 'ri-money-dollar-circle-line' }
  ];

  const getColorClasses = (color: StatsCard['color']) => {
    const colorMap = {
      orange: 'text-orange-600 bg-orange-100',
      blue: 'text-blue-600 bg-blue-100',
      green: 'text-green-600 bg-green-100',
      red: 'text-red-600 bg-red-100',
      purple: 'text-purple-600 bg-purple-100'
    };
    return colorMap[color];
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
          {statsData.map((stat, index) => (
            <div key={index} className="bg-white rounded-lg p-6 shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">{stat.label}</p>
                  <p className={`text-2xl font-bold ${getColorClasses(stat.color)}`}>{stat.value}</p>
                </div>
                <div className={`w-12 h-12 ${getColorClasses(stat.color)} rounded-lg flex items-center justify-center`}>
                  <i className={`${stat.icon} text-xl`}></i>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Tab Navigation */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex space-x-1 bg-gray-100 rounded-lg p-1">
            {tabConfigs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => handleTabClick(tab.id)}
                className={`px-6 py-2 rounded-md transition-colors cursor-pointer whitespace-nowrap flex items-center space-x-2 ${
                  activeTab === tab.id
                    ? 'bg-white text-blue-600 shadow-sm'
                    : 'text-gray-600 hover:text-gray-800'
                }`}
              >
                <i className={tab.icon}></i>
                <span>{tab.label}</span>
              </button>
            ))}
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
            onBack={() => handleTabClick('orders')}
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