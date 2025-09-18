import React, { useState } from 'react';
import { useApp } from '../../contexts/AppContext';
import { Phone, Mail, Calendar, ShoppingBag, DollarSign, Tag, FileText } from 'lucide-react';
import { format } from 'date-fns';

const tabs = [
  { id: 'overview', name: 'Overview' },
  { id: 'history', name: 'History' },
  { id: 'notes', name: 'Notes' }
];

export default function ContextPanel() {
  const { selectedConversation, customers } = useApp();
  const [activeTab, setActiveTab] = useState('overview');
  const [isPinned, setIsPinned] = useState(false);

  if (!selectedConversation) return null;

  const customer = customers.find(c => c.id === selectedConversation.customerId);

  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="p-4 border-b border-slate-200 flex-shrink-0">
        <div className="flex items-center justify-between">
          <h3 className="font-semibold text-slate-900">Customer Details</h3>
          <button
            onClick={() => setIsPinned(!isPinned)}
            className={`text-xs px-2 py-1 rounded transition-colors ${
              isPinned 
                ? 'bg-blue-100 text-blue-700' 
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            {isPinned ? 'Pinned' : 'Pin'}
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b border-slate-200 flex-shrink-0">
        <nav className="flex">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex-1 py-3 px-4 text-sm font-medium border-b-2 ${
                activeTab === tab.id
                  ? 'border-blue-600 text-blue-600'
                  : 'border-transparent text-slate-500 hover:text-slate-700'
              }`}
            >
              {tab.name}
            </button>
          ))}
        </nav>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-4">
        {activeTab === 'overview' && customer && (
          <div className="space-y-6">
            {/* Customer Info */}
            <div>
              <div className="w-16 h-16 bg-slate-300 rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-xl font-medium text-slate-700">
                  {customer.name.charAt(0)}
                </span>
              </div>
              <h4 className="text-lg font-semibold text-center text-slate-900">{customer.name}</h4>
              <div className="flex items-center justify-center mt-2">
                <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                  customer.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-slate-100 text-slate-800'
                }`}>
                  {customer.status}
                </span>
              </div>
            </div>

            {/* Contact Info */}
            <div className="space-y-3">
              <h5 className="font-medium text-slate-900">Contact Information</h5>
              <div className="space-y-2">
                <div className="flex items-center space-x-3 text-sm">
                  <Phone className="h-4 w-4 text-slate-400" />
                  <span className="text-slate-700">{customer.phone}</span>
                </div>
                {customer.email && (
                  <div className="flex items-center space-x-3 text-sm">
                    <Mail className="h-4 w-4 text-slate-400" />
                    <span className="text-slate-700">{customer.email}</span>
                  </div>
                )}
              </div>
            </div>

            {/* Quick Stats */}
            <div className="space-y-3">
              <h5 className="font-medium text-slate-900">Quick Stats</h5>
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-slate-50 rounded-lg p-3">
                  <div className="flex items-center space-x-2">
                    <ShoppingBag className="h-4 w-4 text-slate-400" />
                    <span className="text-xs text-slate-600">Total Orders</span>
                  </div>
                  <p className="text-lg font-semibold text-slate-900 mt-1">{customer.totalOrders}</p>
                </div>
                <div className="bg-slate-50 rounded-lg p-3">
                  <div className="flex items-center space-x-2">
                    <DollarSign className="h-4 w-4 text-slate-400" />
                    <span className="text-xs text-slate-600">Total Value</span>
                  </div>
                  <p className="text-lg font-semibold text-slate-900 mt-1">${customer.totalValue.toLocaleString()}</p>
                </div>
              </div>
            </div>

            {/* Tags */}
            <div className="space-y-3">
              <h5 className="font-medium text-slate-900">Tags</h5>
              <div className="flex flex-wrap gap-2">
                {customer.tags.map((tag) => (
                  <span
                    key={tag}
                    className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800"
                  >
                    <Tag className="h-3 w-3 mr-1" />
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Last Interaction */}
            <div className="space-y-3">
              <h5 className="font-medium text-slate-900">Last Interaction</h5>
              <div className="flex items-center space-x-3 text-sm">
                <Calendar className="h-4 w-4 text-slate-400" />
                <span className="text-slate-700">
                  {format(customer.lastInteraction, 'MMM dd, yyyy HH:mm')}
                </span>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'history' && (
          <div className="space-y-3">
            <h5 className="font-medium text-slate-900">Conversation History</h5>
            <p className="text-sm text-slate-600">Previous conversations and interactions will appear here.</p>
          </div>
        )}

        {activeTab === 'notes' && (
          <div className="space-y-3">
            <h5 className="font-medium text-slate-900">Notes</h5>
            {customer?.notes ? (
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
                <div className="flex items-start space-x-2">
                  <FileText className="h-4 w-4 text-yellow-600 mt-0.5" />
                  <p className="text-sm text-yellow-800">{customer.notes}</p>
                </div>
              </div>
            ) : (
              <p className="text-sm text-slate-600">No notes available for this customer.</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}