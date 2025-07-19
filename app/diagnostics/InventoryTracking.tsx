'use client';
import { useState } from 'react';

interface InventoryItem {
  id: string;
  name: string;
  category: string;
  sku: string;
  currentStock: number;
  minStock: number;
  maxStock: number;
  unit: string;
  costPerUnit: number;
  supplier: string;
  expiryDate: string;
  batchNumber: string;
  status: string;
  lastRestocked: string;
  usageRate: string;
  daysUntilReorder: number;
  nearExpiry?: boolean;
}

interface FilterOption {
  key: string;
  label: string;
  color: string;
}

// InventoryTracking component
// This component displays the inventory tracking dashboard with filters and item details
// It includes critical alerts, inventory overview, filters, and a list of inventory items
export default function InventoryTracking() {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [showLowStock, setShowLowStock] = useState<boolean>(false);

  // Mock inventory data with proper typing
  const inventoryItems: InventoryItem[] = [
    {
      id: 'INV001',
      name: 'CBC Reagent Pack',
      category: 'Laboratory Reagents',
      sku: 'CBC-REG-500',
      currentStock: 12,
      minStock: 15,
      maxStock: 50,
      unit: 'packs',
      costPerUnit: 850,
      supplier: 'BioLab Supplies Ltd',
      expiryDate: '2024-06-15',
      batchNumber: 'BL240115',
      status: 'Low Stock',
      lastRestocked: '2024-01-01',
      usageRate: '2.5 packs/day',
      daysUntilReorder: 3
    },
    {
      id: 'INV002',
      name: 'Glucose Test Strips',
      category: 'Point-of-Care',
      sku: 'GLC-STRIP-100',
      currentStock: 245,
      minStock: 50,
      maxStock: 300,
      unit: 'strips',
      costPerUnit: 25,
      supplier: 'MedTech Distributors',
      expiryDate: '2024-03-20',
      batchNumber: 'MT240110',
      status: 'Adequate',
      lastRestocked: '2024-01-08',
      usageRate: '18 strips/day',
      daysUntilReorder: 45
    },
    {
      id: 'INV003',
      name: 'Ultrasound Gel',
      category: 'Imaging Supplies',
      sku: 'US-GEL-5L',
      currentStock: 8,
      minStock: 10,
      maxStock: 25,
      unit: 'bottles',
      costPerUnit: 320,
      supplier: 'ImageCare Solutions',
      expiryDate: '2025-01-10',
      batchNumber: 'IC250110',
      status: 'Low Stock',
      lastRestocked: '2023-12-20',
      usageRate: '0.8 bottles/day',
      daysUntilReorder: 2
    },
    {
      id: 'INV004',
      name: 'Liver Function Test Kit',
      category: 'Laboratory Reagents',
      sku: 'LFT-KIT-200',
      currentStock: 25,
      minStock: 20,
      maxStock: 60,
      unit: 'kits',
      costPerUnit: 1200,
      supplier: 'BioLab Supplies Ltd',
      expiryDate: '2024-08-30',
      batchNumber: 'BL240830',
      status: 'Adequate',
      lastRestocked: '2024-01-10',
      usageRate: '1.2 kits/day',
      daysUntilReorder: 25
    },
    {
      id: 'INV005',
      name: 'X-Ray Film 14"x17"',
      category: 'Imaging Supplies',
      sku: 'XR-FILM-1417',
      currentStock: 180,
      minStock: 100,
      maxStock: 500,
      unit: 'sheets',
      costPerUnit: 45,
      supplier: 'RadiMed Supplies',
      expiryDate: '2024-12-31',
      batchNumber: 'RM241231',
      status: 'Adequate',
      lastRestocked: '2024-01-05',
      usageRate: '12 sheets/day',
      daysUntilReorder: 35
    },
    {
      id: 'INV006',
      name: 'Malaria Rapid Test Kits',
      category: 'Point-of-Care',
      sku: 'MAL-RDT-25',
      currentStock: 5,
      minStock: 20,
      maxStock: 100,
      unit: 'kits',
      costPerUnit: 480,
      supplier: 'TropMed Diagnostics',
      expiryDate: '2024-02-28',
      batchNumber: 'TM240228',
      status: 'Critical Low',
      lastRestocked: '2023-12-15',
      usageRate: '3.2 kits/day',
      daysUntilReorder: 0,
      nearExpiry: true
    },
    {
      id: 'INV007',
      name: 'Blood Collection Tubes (EDTA)',
      category: 'Sample Collection',
      sku: 'BCT-EDTA-100',
      currentStock: 450,
      minStock: 200,
      maxStock: 1000,
      unit: 'tubes',
      costPerUnit: 12,
      supplier: 'LabWare International',
      expiryDate: '2026-03-15',
      batchNumber: 'LW260315',
      status: 'Adequate',
      lastRestocked: '2024-01-12',
      usageRate: '35 tubes/day',
      daysUntilReorder: 60
    },
    {
      id: 'INV008',
      name: 'Contrast Medium (Iodine)',
      category: 'Imaging Supplies',
      sku: 'CM-IOD-500ML',
      currentStock: 15,
      minStock: 12,
      maxStock: 30,
      unit: 'vials',
      costPerUnit: 2800,
      supplier: 'PharmaMed Imaging',
      expiryDate: '2024-04-15',
      batchNumber: 'PM240415',
      status: 'Adequate',
      lastRestocked: '2024-01-08',
      usageRate: '0.6 vials/day',
      daysUntilReorder: 30
    }
  ];

  const filteredItems: InventoryItem[] = inventoryItems.filter(item => {
    const categoryMatch = selectedCategory === 'all' || item.category === selectedCategory;
    const stockMatch = !showLowStock || item.status.includes('Low') || item.status === 'Critical Low';
    return categoryMatch && stockMatch;
  });

  const getStatusColor = (status: string): string => {
    switch (status) {
      case 'Critical Low': return 'text-red-600 bg-red-50 border-red-200';
      case 'Low Stock': return 'text-orange-600 bg-orange-50 border-orange-200';
      case 'Adequate': return 'text-green-600 bg-green-50 border-green-200';
      case 'Overstocked': return 'text-blue-600 bg-blue-50 border-blue-200';
      default: return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  const getCategoryIcon = (category: string): string => {
    switch (category) {
      case 'Laboratory Reagents': return 'ri-flask-line';
      case 'Point-of-Care': return 'ri-heart-pulse-line';
      case 'Imaging Supplies': return 'ri-scan-line';
      case 'Sample Collection': return 'ri-test-tube-line';
      default: return 'ri-archive-line';
    }
  };

  const calculateStockPercentage = (current: number, min: number, max: number): number => {
    return ((current - min) / (max - min)) * 100;
  };

  const isNearExpiry = (expiryDate: string): boolean => {
    const today = new Date();
    const expiry = new Date(expiryDate);
    const diffTime = expiry.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays <= 90; // Within 90 days
  };

  const criticalItems: InventoryItem[] = inventoryItems.filter(item =>
    item.status === 'Critical Low' || item.status === 'Low Stock' || isNearExpiry(item.expiryDate)
  );

  const filterOptions: FilterOption[] = [
    { key: 'all', label: 'All', color: 'bg-gray-100 text-gray-700' },
    { key: 'Laboratory Reagents', label: 'Lab Reagents', color: 'bg-blue-100 text-blue-700' },
    { key: 'Point-of-Care', label: 'Point-of-Care', color: 'bg-green-100 text-green-700' },
    { key: 'Imaging Supplies', label: 'Imaging', color: 'bg-purple-100 text-purple-700' },
    { key: 'Sample Collection', label: 'Collection', color: 'bg-orange-100 text-orange-700' }
  ];

  return (
    <div className="space-y-6">
      {/* Critical Alerts */}
      {criticalItems.length > 0 && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-red-900 mb-4 flex items-center">
            <i className="ri-alarm-warning-line mr-2"></i>
            Inventory Alerts ({criticalItems.length})
          </h3>
          <div className="grid md:grid-cols-2 gap-4">
            {criticalItems.slice(0, 4).map((item) => (
              <div key={item.id} className="bg-white rounded-lg p-4 border border-red-200">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-medium text-gray-900">{item.name}</h4>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(item.status)}`}>
                    {item.status}
                  </span>
                </div>
                <div className="text-sm text-gray-600">
                  <p>Stock: {item.currentStock} {item.unit} (Min: {item.minStock})</p>
                  {isNearExpiry(item.expiryDate) && (
                    <p className="text-orange-600">Expires: {item.expiryDate}</p>
                  )}
                </div>
              </div>
            ))}
          </div>
          {criticalItems.length > 4 && (
            <p className="text-sm text-red-600 mt-3">
              +{criticalItems.length - 4} more items require attention
            </p>
          )}
        </div>
      )}

      {/* Inventory Overview */}
      <div className="grid md:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Items</p>
              <p className="text-2xl font-bold text-blue-600">{inventoryItems.length}</p>
            </div>
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <i className="ri-archive-line text-blue-600 text-xl"></i>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Low Stock Items</p>
              <p className="text-2xl font-bold text-orange-600">
                {inventoryItems.filter(i => i.status.includes('Low')).length}
              </p>
            </div>
            <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
              <i className="ri-alert-line text-orange-600 text-xl"></i>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Expiring Soon</p>
              <p className="text-2xl font-bold text-red-600">
                {inventoryItems.filter(i => isNearExpiry(i.expiryDate)).length}
              </p>
            </div>
            <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
              <i className="ri-time-line text-red-600 text-xl"></i>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Value</p>
              <p className="text-2xl font-bold text-purple-600">
                KSh {inventoryItems.reduce((sum, item) => sum + (item.currentStock * item.costPerUnit), 0).toLocaleString()}
              </p>
            </div>
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
              <i className="ri-money-dollar-circle-line text-purple-600 text-xl"></i>
            </div>
          </div>
        </div>
      </div>

      {/* Filters and Controls */}
      <div className="bg-white rounded-lg p-6 shadow-sm">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold text-gray-900">Inventory Management</h2>
          <div className="flex items-center space-x-4">
            <label className="flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={showLowStock}
                onChange={(e) => setShowLowStock(e.target.checked)}
                className="mr-2 rounded"
              />
              <span className="text-sm font-medium text-gray-700">Show Low Stock Only</span>
            </label>

            <div className="flex items-center space-x-2">
              <span className="text-sm text-gray-600">Category:</span>
              <div className="flex space-x-2">
                {[
                  { key: 'all', label: 'All', color: 'bg-gray-100 text-gray-700' },
                  { key: 'Laboratory Reagents', label: 'Lab Reagents', color: 'bg-blue-100 text-blue-700' },
                  { key: 'Point-of-Care', label: 'Point-of-Care', color: 'bg-green-100 text-green-700' },
                  { key: 'Imaging Supplies', label: 'Imaging', color: 'bg-purple-100 text-purple-700' },
                  { key: 'Sample Collection', label: 'Collection', color: 'bg-orange-100 text-orange-700' }
                ].map((filter) => (
                  <button
                    key={filter.key}
                    onClick={() => setSelectedCategory(filter.key)}
                    className={`px-3 py-1 rounded-full text-sm font-medium transition-colors cursor-pointer whitespace-nowrap ${selectedCategory === filter.key
                        ? filter.color
                        : 'bg-gray-100 text-gray-500 hover:bg-gray-200'
                      }`}
                  >
                    {filter.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Inventory Items */}
      <div className="grid md:grid-cols-2 gap-6">
        {filteredItems.map((item) => (
          <div key={item.id} className="bg-white rounded-lg p-6 shadow-sm border">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-start space-x-3">
                <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${item.category === 'Laboratory Reagents' ? 'bg-blue-100' :
                    item.category === 'Point-of-Care' ? 'bg-green-100' :
                      item.category === 'Imaging Supplies' ? 'bg-purple-100' : 'bg-orange-100'
                  }`}>
                  <i className={`${getCategoryIcon(item.category)} text-xl ${item.category === 'Laboratory Reagents' ? 'text-blue-600' :
                      item.category === 'Point-of-Care' ? 'text-green-600' :
                        item.category === 'Imaging Supplies' ? 'text-purple-600' : 'text-orange-600'
                    }`}></i>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">{item.name}</h3>
                  <p className="text-sm text-gray-600">SKU: {item.sku}</p>
                  <p className="text-xs text-gray-500">{item.category}</p>
                </div>
              </div>
              <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(item.status)}`}>
                {item.status}
              </span>
            </div>

            <div className="space-y-3">
              {/* Stock Level Indicator */}
              <div>
                <div className="flex justify-between items-center mb-1">
                  <span className="text-sm text-gray-600">Stock Level</span>
                  <span className="text-sm font-medium">
                    {item.currentStock} / {item.maxStock} {item.unit}
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className={`h-2 rounded-full transition-all ${item.currentStock <= item.minStock ? 'bg-red-500' :
                        item.currentStock <= item.minStock * 1.5 ? 'bg-orange-500' : 'bg-green-500'
                      }`}
                    style={{ width: `${Math.min((item.currentStock / item.maxStock) * 100, 100)}%` }}
                  ></div>
                </div>
                <div className="flex justify-between text-xs text-gray-500 mt-1">
                  <span>Min: {item.minStock}</span>
                  <span>Max: {item.maxStock}</span>
                </div>
              </div>

              {/* Item Details */}
              <div className="grid grid-cols-2 gap-3 text-sm">
                <div>
                  <p className="text-gray-600">Cost per Unit</p>
                  <p className="font-medium">KSh {item.costPerUnit.toLocaleString()}</p>
                </div>
                <div>
                  <p className="text-gray-600">Total Value</p>
                  <p className="font-medium">KSh {(item.currentStock * item.costPerUnit).toLocaleString()}</p>
                </div>
                <div>
                  <p className="text-gray-600">Usage Rate</p>
                  <p className="font-medium">{item.usageRate}</p>
                </div>
                <div>
                  <p className="text-gray-600">Reorder In</p>
                  <p className={`font-medium ${item.daysUntilReorder <= 7 ? 'text-red-600' : 'text-gray-900'}`}>
                    {item.daysUntilReorder} days
                  </p>
                </div>
              </div>

              {/* Expiry Information */}
              <div className={`p-3 rounded-lg ${isNearExpiry(item.expiryDate) ? 'bg-orange-50 border border-orange-200' : 'bg-gray-50'
                }`}>
                <div className="flex justify-between items-center text-sm">
                  <div>
                    <p className="text-gray-600">Expiry Date</p>
                    <p className={`font-medium ${isNearExpiry(item.expiryDate) ? 'text-orange-600' : 'text-gray-900'}`}>
                      {item.expiryDate}
                    </p>
                    <p className="text-xs text-gray-500">Batch: {item.batchNumber}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-gray-600">Supplier</p>
                    <p className="font-medium text-xs">{item.supplier}</p>
                  </div>
                </div>
                {isNearExpiry(item.expiryDate) && (
                  <div className="flex items-center mt-2 text-orange-600">
                    <i className="ri-time-line mr-1"></i>
                    <span className="text-xs">Expires within 90 days</span>
                  </div>
                )}
              </div>

              {/* Actions */}
              <div className="flex space-x-2 pt-2">
                {(item.status === 'Critical Low' || item.status === 'Low Stock') && (
                  <button className="flex-1 bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors text-sm cursor-pointer whitespace-nowrap">
                    Reorder Now
                  </button>
                )}
                <button className="flex-1 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors text-sm cursor-pointer whitespace-nowrap">
                  Update Stock
                </button>
                <button className="bg-gray-100 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200 transition-colors text-sm cursor-pointer whitespace-nowrap">
                  History
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredItems.length === 0 && (
        <div className="text-center py-12">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <i className="ri-archive-line text-gray-400 text-2xl"></i>
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">No inventory items found</h3>
          <p className="text-gray-600">
            No items match the selected filters.
          </p>
        </div>
      )}
    </div>
  );
}