'use client';
import { useState } from 'react';

export default function CommunicationHub({ patient }) {
  const [activeTab, setActiveTab] = useState('notifications');
  const [newMessage, setNewMessage] = useState({
    recipient: '',
    subject: '',
    message: '',
    priority: 'Normal',
    department: ''
  });
  const [notifications, setNotifications] = useState([]);
  const [messages, setMessages] = useState([]);
  const [handoffNotes, setHandoffNotes] = useState([]);

  // Mock data for demonstration
  const recentNotifications = [
    {
      id: 1,
      type: 'critical_value',
      title: 'Critical Lab Value Alert',
      message: 'Hemoglobin 6.2 g/dL for John Mwangi (PID001) - Severe Anemia',
      timestamp: '10 minutes ago',
      department: 'Laboratory',
      priority: 'Emergency',
      acknowledged: false
    },
    {
      id: 2,
      type: 'prescription',
      title: 'Prescription Filled',
      message: 'Prescription for Mary Wanjiku (PID002) ready for pickup',
      timestamp: '25 minutes ago',
      department: 'Pharmacy',
      priority: 'Normal',
      acknowledged: true
    },
    {
      id: 3,
      type: 'appointment',
      title: 'Imaging Appointment Scheduled',
      message: 'CT Head scheduled for David Ochieng (PID003) - Tomorrow 2:00 PM',
      timestamp: '1 hour ago',
      department: 'Radiology',
      priority: 'Normal',
      acknowledged: true
    },
    {
      id: 4,
      type: 'surgery',
      title: 'Theatre Slot Available',
      message: 'Emergency theatre slot available for appendectomy',
      timestamp: '2 hours ago',
      department: 'Surgery',
      priority: 'Urgent',
      acknowledged: false
    }
  ];

  const recentMessages = [
    {
      id: 1,
      from: 'Dr. Peter Kamau',
      to: 'Dr. Sarah Johnson',
      subject: 'Patient Transfer - ICU Admission',
      message: 'Patient John Mwangi requires ICU admission for severe anemia management. Please coordinate with ICU team.',
      timestamp: '30 minutes ago',
      priority: 'Urgent',
      read: false
    },
    {
      id: 2,
      from: 'Nurse Jane Wanjiru',
      to: 'Dr. Sarah Johnson',
      subject: 'Medication Clarification',
      message: 'Patient asking about side effects of prescribed Metformin. Please advise on counseling points.',
      timestamp: '1 hour ago',
      priority: 'Normal',
      read: true
    },
    {
      id: 3,
      from: 'Lab Technician',
      to: 'Dr. Sarah Johnson',
      subject: 'Sample Quality Issue',
      message: 'Blood sample for CBC appears hemolyzed. Please advise if recollection is needed.',
      timestamp: '2 hours ago',
      priority: 'Normal',
      read: true
    }
  ];

  const activeHandoffs = [
    {
      id: 1,
      patient: 'John Mwangi',
      from: 'Emergency Department',
      to: 'Internal Medicine',
      handoffTime: '14:30',
      summary: 'Severe anemia, stable vitals, started on iron therapy',
      outstandingOrders: ['CBC repeat in 6 hours', 'Type and cross-match'],
      criticalInfo: 'Patient is Jehovah\'s Witness - No blood transfusion',
      contactInfo: 'Dr. Sarah Johnson - Ext. 2345'
    },
    {
      id: 2,
      patient: 'Mary Wanjiku',
      from: 'Obstetrics',
      to: 'Postnatal Ward',
      handoffTime: '16:00',
      summary: 'Post C-section, stable, breastfeeding established',
      outstandingOrders: ['Wound check in 24hrs', 'Hemoglobin check'],
      criticalInfo: 'Previous PPH history, monitor bleeding',
      contactInfo: 'Dr. Grace Kiprotich - Ext. 3456'
    }
  ];

  const departments = [
    'Emergency Medicine',
    'Internal Medicine',
    'Surgery',
    'Obstetrics',
    'Pediatrics',
    'Radiology',
    'Laboratory',
    'Pharmacy',
    'ICU',
    'Nursing Station'
  ];

  const sendMessage = () => {
    if (!newMessage.recipient || !newMessage.subject || !newMessage.message) {
      alert('Please fill in all required fields');
      return;
    }

    const message = {
      id: Date.now(),
      from: 'Dr. Sarah Johnson',
      to: newMessage.recipient,
      subject: newMessage.subject,
      message: newMessage.message,
      timestamp: new Date().toLocaleString(),
      priority: newMessage.priority,
      read: false
    };

    setMessages(prev => [message, ...prev]);
    setNewMessage({
      recipient: '',
      subject: '',
      message: '',
      priority: 'Normal',
      department: ''
    });

    alert('Message sent successfully!');
  };

  const acknowledgeNotification = (id) => {
    setNotifications(prev => 
      prev.map(notif => 
        notif.id === id ? { ...notif, acknowledged: true } : notif
      )
    );
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'Emergency': return 'text-red-600 bg-red-50 border-red-200';
      case 'Urgent': return 'text-orange-600 bg-orange-50 border-orange-200';
      case 'Normal': return 'text-green-600 bg-green-50 border-green-200';
      default: return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  const getNotificationIcon = (type) => {
    switch (type) {
      case 'critical_value': return 'ri-alarm-warning-line text-red-500';
      case 'prescription': return 'ri-medicine-bottle-line text-green-500';
      case 'appointment': return 'ri-calendar-line text-blue-500';
      case 'surgery': return 'ri-surgical-mask-line text-purple-500';
      default: return 'ri-notification-line text-gray-500';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-lg p-6 shadow-sm">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Communication & Workflow Hub</h2>
        
        {patient && (
          <div className="bg-gray-50 rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold text-gray-900">{patient.name}</h3>
                <p className="text-gray-600">
                  {patient.age}yo • {patient.gender} • ID: {patient.id}
                </p>
              </div>
              <div className="flex space-x-4">
                <div className="text-center">
                  <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-1">
                    <span className="text-red-600 text-sm font-bold">3</span>
                  </div>
                  <span className="text-xs text-gray-600">Alerts</span>
                </div>
                <div className="text-center">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-1">
                    <span className="text-blue-600 text-sm font-bold">2</span>
                  </div>
                  <span className="text-xs text-gray-600">Messages</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Tab Navigation */}
      <div className="bg-white rounded-lg shadow-sm">
        <div className="flex border-b">
          {[
            { key: 'notifications', label: 'Notifications', icon: 'ri-notification-line', count: 2 },
            { key: 'messages', label: 'Messages', icon: 'ri-message-line', count: 1 },
            { key: 'handoffs', label: 'Handoffs', icon: 'ri-hand-heart-line', count: 2 },
            { key: 'compose', label: 'Compose', icon: 'ri-edit-line' }
          ].map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`flex items-center space-x-2 px-6 py-4 transition-colors cursor-pointer whitespace-nowrap ${
                activeTab === tab.key
                  ? 'bg-blue-50 text-blue-600 border-b-2 border-blue-600'
                  : 'text-gray-600 hover:text-gray-800 hover:bg-gray-50'
              }`}
            >
              <i className={`${tab.icon} text-lg`}></i>
              <span className="font-medium">{tab.label}</span>
              {tab.count && (
                <span className="bg-red-500 text-white text-xs rounded-full px-2 py-1 min-w-[20px] text-center">
                  {tab.count}
                </span>
              )}
            </button>
          ))}
        </div>

        <div className="p-6">
          {/* Notifications Tab */}
          {activeTab === 'notifications' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-900">Real-time Notifications</h3>
                <button className="text-sm text-blue-600 hover:text-blue-700 cursor-pointer">
                  Mark all as read
                </button>
              </div>
              
              <div className="space-y-3">
                {recentNotifications.map((notification) => (
                  <div
                    key={notification.id}
                    className={`border rounded-lg p-4 transition-colors ${
                      notification.acknowledged 
                        ? 'bg-gray-50 border-gray-200' 
                        : 'bg-white border-blue-200 shadow-sm'
                    }`}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex items-start space-x-3 flex-1">
                        <i className={`${getNotificationIcon(notification.type)} text-xl mt-1`}></i>
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-1">
                            <h4 className="font-semibold text-gray-900">{notification.title}</h4>
                            <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getPriorityColor(notification.priority)}`}>
                              {notification.priority}
                            </span>
                          </div>
                          <p className="text-gray-700 text-sm mb-2">{notification.message}</p>
                          <div className="flex items-center space-x-4 text-xs text-gray-500">
                            <span>{notification.department}</span>
                            <span>{notification.timestamp}</span>
                          </div>
                        </div>
                      </div>
                      
                      {!notification.acknowledged && (
                        <button
                          onClick={() => acknowledgeNotification(notification.id)}
                          className="bg-blue-600 text-white px-3 py-1 rounded text-sm hover:bg-blue-700 transition-colors cursor-pointer whitespace-nowrap"
                        >
                          Acknowledge
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Messages Tab */}
          {activeTab === 'messages' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-900">Secure Messages</h3>
                <button 
                  onClick={() => setActiveTab('compose')}
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2 cursor-pointer whitespace-nowrap"
                >
                  <i className="ri-add-line"></i>
                  <span>New Message</span>
                </button>
              </div>
              
              <div className="space-y-3">
                {[...recentMessages, ...messages].map((message) => (
                  <div
                    key={message.id}
                    className={`border rounded-lg p-4 transition-colors cursor-pointer hover:shadow-sm ${
                      message.read ? 'bg-gray-50' : 'bg-white border-blue-200'
                    }`}
                  >
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                          <i className="ri-user-line text-blue-600 text-sm"></i>
                        </div>
                        <div>
                          <h4 className="font-semibold text-gray-900">{message.from}</h4>
                          <p className="text-sm text-gray-600">{message.subject}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getPriorityColor(message.priority)}`}>
                          {message.priority}
                        </span>
                        <p className="text-xs text-gray-500 mt-1">{message.timestamp}</p>
                      </div>
                    </div>
                    <p className="text-gray-700 text-sm">{message.message}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Handoffs Tab */}
          {activeTab === 'handoffs' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-900">Patient Handoffs</h3>
                <button className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors flex items-center space-x-2 cursor-pointer whitespace-nowrap">
                  <i className="ri-add-line"></i>
                  <span>New Handoff</span>
                </button>
              </div>
              
              <div className="space-y-4">
                {activeHandoffs.map((handoff) => (
                  <div key={handoff.id} className="border border-gray-200 rounded-lg p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h4 className="text-lg font-semibold text-gray-900">{handoff.patient}</h4>
                        <p className="text-sm text-gray-600">
                          Transfer: {handoff.from} → {handoff.to} at {handoff.handoffTime}
                        </p>
                      </div>
                      <span className="px-3 py-1 bg-orange-100 text-orange-700 rounded-full text-sm font-medium">
                        Active
                      </span>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <h5 className="font-medium text-gray-900 mb-2">Handoff Summary</h5>
                        <p className="text-sm text-gray-700 mb-3">{handoff.summary}</p>
                        
                        <h5 className="font-medium text-gray-900 mb-2">Outstanding Orders</h5>
                        <ul className="text-sm text-gray-700 space-y-1">
                          {handoff.outstandingOrders.map((order, index) => (
                            <li key={index} className="flex items-center space-x-2">
                              <i className="ri-checkbox-blank-circle-line text-xs text-gray-400"></i>
                              <span>{order}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div>
                        <h5 className="font-medium text-gray-900 mb-2">Critical Information</h5>
                        <div className="bg-red-50 border border-red-200 rounded-lg p-3 mb-3">
                          <p className="text-sm text-red-800">{handoff.criticalInfo}</p>
                        </div>
                        
                        <h5 className="font-medium text-gray-900 mb-2">Contact Information</h5>
                        <p className="text-sm text-gray-700">{handoff.contactInfo}</p>
                      </div>
                    </div>

                    <div className="flex justify-end space-x-3 mt-4 pt-4 border-t">
                      <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors text-sm cursor-pointer whitespace-nowrap">
                        Update Handoff
                      </button>
                      <button className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors text-sm cursor-pointer whitespace-nowrap">
                        Complete Transfer
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Compose Tab */}
          {activeTab === 'compose' && (
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-gray-900">Compose New Message</h3>
              
              <div className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Recipient *
                    </label>
                    <input
                      type="text"
                      value={newMessage.recipient}
                      onChange={(e) => setNewMessage(prev => ({ ...prev, recipient: e.target.value }))}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                      placeholder="Enter recipient name or department"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Department
                    </label>
                    <div className="relative">
                      <select
                        value={newMessage.department}
                        onChange={(e) => setNewMessage(prev => ({ ...prev, department: e.target.value }))}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm pr-8"
                      >
                        <option value="">Select department</option>
                        {departments.map((dept) => (
                          <option key={dept} value={dept}>{dept}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Subject *
                    </label>
                    <input
                      type="text"
                      value={newMessage.subject}
                      onChange={(e) => setNewMessage(prev => ({ ...prev, subject: e.target.value }))}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                      placeholder="Message subject"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Priority
                    </label>
                    <div className="relative">
                      <select
                        value={newMessage.priority}
                        onChange={(e) => setNewMessage(prev => ({ ...prev, priority: e.target.value }))}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm pr-8"
                      >
                        <option value="Normal">Normal</option>
                        <option value="Urgent">Urgent</option>
                        <option value="Emergency">Emergency</option>
                      </select>
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Message *
                  </label>
                  <textarea
                    value={newMessage.message}
                    onChange={(e) => setNewMessage(prev => ({ ...prev, message: e.target.value }))}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                    rows="6"
                    placeholder="Type your message here..."
                    maxLength="1000"
                    required
                  ></textarea>
                  <p className="text-xs text-gray-500 mt-1">{newMessage.message.length}/1000 characters</p>
                </div>

                {patient && (
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <h4 className="font-medium text-blue-900 mb-2">Patient Context</h4>
                    <p className="text-sm text-blue-800">
                      This message will include context for patient: <strong>{patient.name}</strong> (ID: {patient.id})
                    </p>
                  </div>
                )}

                <div className="flex justify-end space-x-4">
                  <button
                    onClick={() => setActiveTab('messages')}
                    className="bg-gray-100 text-gray-700 px-6 py-3 rounded-lg hover:bg-gray-200 transition-colors cursor-pointer whitespace-nowrap"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={sendMessage}
                    className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2 cursor-pointer whitespace-nowrap"
                  >
                    <i className="ri-send-plane-line"></i>
                    <span>Send Message</span>
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {!patient && (
        <div className="text-center py-12">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <i className="ri-message-line text-gray-400 text-2xl"></i>
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Communication Hub Ready</h3>
          <p className="text-gray-600">
            Real-time notifications, secure messaging, and patient handoff management all in one place.
          </p>
        </div>
      )}
    </div>
  );
}