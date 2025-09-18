import React, { useState } from 'react';
import { Search, Filter, Plus, MessageSquare } from 'lucide-react';
import { useApp } from '../../contexts/AppContext';
import { Conversation } from '../../types';
import { formatDistanceToNow } from 'date-fns';
import clsx from 'clsx';

// Enhanced mock conversations with more realistic data
const mockConversations: Conversation[] = [
  {
    id: '1',
    customerId: '1',
    customerName: 'Sarah Martinez',
    lastMessage: 'Can you help me reset my password? I\'ve been locked out for hours.',
    lastMessageTime: new Date('2024-01-15T11:45:00'),
    unreadCount: 0,
    status: 'active',
    assignedTo: 'Mike',
    tags: ['Technical', 'Account']
  },
  {
    id: '2',
    customerId: '2',
    customerName: 'David Chen',
    lastMessage: 'I\'m interested in upgrading to your enterprise plan. What are the benefits?',
    lastMessageTime: new Date('2024-01-15T10:20:00'),
    unreadCount: 1,
    status: 'pending',
    assignedTo: 'Lisa',
    tags: ['Sales', 'Enterprise', 'Upgrade']
  },
  {
    id: '3',
    customerId: '3',
    customerName: 'Emma Thompson',
    lastMessage: 'The invoice you sent has the wrong billing address. Please update it.',
    lastMessageTime: new Date('2024-01-15T09:30:00'),
    unreadCount: 3,
    status: 'active',
    tags: ['Billing', 'Invoice', 'Urgent']
  },
  {
    id: '4',
    customerId: '4',
    customerName: 'James Rodriguez',
    lastMessage: 'Perfect! The demo went great. When can we start the onboarding process?',
    unreadCount: 0,
    lastMessageTime: new Date('2024-01-14T16:15:00'),
    status: 'resolved',
    assignedTo: 'Sarah',
    tags: ['Demo', 'Onboarding', 'Closed']
  },
  {
    id: '5',
    customerId: '5',
    customerName: 'Lisa Wang',
    lastMessage: 'I need to cancel my subscription. The features don\'t match what I expected.',
    lastMessageTime: new Date('2024-01-14T14:45:00'),
    unreadCount: 2,
    status: 'active',
    assignedTo: 'Tom',
    tags: ['Cancellation', 'Retention', 'High Priority']
  },
  {
    id: '6',
    customerId: '6',
    customerName: 'Alex Johnson',
    lastMessage: 'Thanks for the training session! My team is excited to get started.',
    lastMessageTime: new Date('2024-01-13T15:30:00'),
    unreadCount: 0,
    status: 'resolved',
    assignedTo: 'Anna',
    tags: ['Training', 'Team', 'Success']
  },
  {
    id: '7',
    customerId: '7',
    customerName: 'Maria Garcia',
    lastMessage: 'The integration with our CRM is failing. Can someone look into this urgently?',
    lastMessageTime: new Date('2024-01-13T13:20:00'),
    unreadCount: 4,
    status: 'active',
    assignedTo: 'Dev Team',
    tags: ['Integration', 'CRM', 'Technical', 'Urgent']
  },
  {
    id: '8',
    customerId: '8',
    customerName: 'Robert Kim',
    lastMessage: 'Could you provide a quote for 50 additional user licenses?',
    lastMessageTime: new Date('2024-01-12T16:10:00'),
    unreadCount: 1,
    status: 'pending',
    assignedTo: 'Sales',
    tags: ['Quote', 'Expansion', 'Licenses']
  }
];

export default function ConversationList() {
  const { selectedConversation, setSelectedConversation, chatMode } = useApp();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [conversations] = useState<Conversation[]>(mockConversations);
  const [showMobileView, setShowMobileView] = useState(false);

  const filteredConversations = conversations.filter(conv => {
    const matchesSearch = conv.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         conv.lastMessage.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === 'all' || conv.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'resolved': return 'bg-slate-100 text-slate-800';
      default: return 'bg-slate-100 text-slate-800';
    }
  };

  const handleNewConversation = () => {
    // Mock new conversation creation
    console.log('Creating new conversation...');
  };

  return (
    <div className="h-full flex flex-col relative">
      {/* Header */}
      <div className="p-3 md:p-4 border-b relative z-10" style={{ borderColor: 'var(--cu-gray-200)' }}>
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-lg md:text-base font-semibold" style={{ color: 'var(--cu-gray-800)' }}>Conversations</h2>
          <button 
            onClick={handleNewConversation}
            className="cu-btn-secondary p-2 md:p-2"
            title="Start new conversation"
          >
            <Plus className="h-4 w-4" />
          </button>
        </div>
        
        {/* Search */}
        <div className="relative mb-3">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4" style={{ color: 'var(--cu-gray-400)' }} />
          <input
            type="text"
            placeholder="Search conversations..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="cu-input pl-9 text-sm w-full"
          />
        </div>

        {/* Filter */}
        <div className="flex items-center space-x-2">
          <Filter className="h-4 w-4" style={{ color: 'var(--cu-gray-400)' }} />
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="text-sm bg-transparent border-none focus:outline-none"
            style={{ color: 'var(--cu-gray-600)' }}
          >
            <option value="all">All Status</option>
            <option value="active">Active</option>
            <option value="pending">Pending</option>
            <option value="resolved">Resolved</option>
          </select>
        </div>
      </div>

      {/* Conversation List */}
      <div className="flex-1 overflow-y-auto">
        {filteredConversations.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-64 text-center p-4">
            <MessageSquare className="h-12 w-12 mb-3" style={{ color: 'var(--cu-gray-300)' }} />
            <h3 className="font-medium mb-1 text-sm md:text-base" style={{ color: 'var(--cu-gray-600)' }}>No conversations found</h3>
            <p className="text-sm" style={{ color: 'var(--cu-gray-500)' }}>
              {searchTerm ? 'Try adjusting your search terms' : 'Start a new conversation to get started'}
            </p>
          </div>
        ) : (
          filteredConversations.map((conversation) => (
            <div
              key={conversation.id}
              onClick={() => {
                setSelectedConversation(conversation);
              }}
              className={clsx(
                'p-3 md:p-4 border-b cursor-pointer transition-all duration-200 active:bg-slate-100',
                selectedConversation?.id === conversation.id 
                  ? 'border-2' 
                  : 'border-b hover:bg-gray-50'
              )}
              style={{
                borderColor: selectedConversation?.id === conversation.id 
                  ? 'var(--cu-primary)' 
                  : 'var(--cu-gray-100)',
                backgroundColor: selectedConversation?.id === conversation.id 
                  ? 'rgba(123, 104, 238, 0.05)' 
                  : 'transparent'
              }}
            >
              <div className="flex items-start justify-between mb-2">
                <h3 className="font-medium truncate flex-1" style={{ color: 'var(--cu-gray-800)' }}>{conversation.customerName}</h3>
                <div className="flex items-center space-x-1 ml-2">
                  {conversation.unreadCount > 0 && (
                    <span className="cu-badge-primary min-w-[18px] h-[18px] text-xs font-bold flex items-center justify-center">
                      {conversation.unreadCount}
                    </span>
                  )}
                </div>
              </div>
              
              <p className="text-sm truncate mb-2 leading-relaxed" style={{ color: 'var(--cu-gray-600)' }}>{conversation.lastMessage}</p>
              
              <div className="flex items-center justify-between text-xs">
                <span className="text-xs" style={{ color: 'var(--cu-gray-500)' }}>
                  {formatDistanceToNow(conversation.lastMessageTime, { addSuffix: true })}
                </span>
                <div className="flex items-center space-x-1 md:space-x-2">
                  {conversation.tags.slice(0, 1).map((tag) => (
                    <span 
                      key={tag}
                      className="cu-badge-gray text-xs hidden md:inline-flex"
                    >
                      {tag}
                    </span>
                  ))}
                  <span className={`cu-badge text-xs ${
                    conversation.status === 'active' ? 'cu-badge-success' :
                    conversation.status === 'pending' ? 'cu-badge-warning' :
                    'cu-badge-gray'
                  }`}>
                    {conversation.status}
                  </span>
                </div>
              </div>
              
              {conversation.assignedTo && (
                <div className="mt-2 text-xs hidden md:block" style={{ color: 'var(--cu-gray-500)' }}>
                  Assigned to {conversation.assignedTo}
                </div>
              )}
            </div>
          ))
        )}
      </div>

      {/* Stats Footer */}
      <div className="p-3 md:p-4 border-t flex-shrink-0" style={{ borderColor: 'var(--cu-gray-200)', backgroundColor: 'var(--cu-gray-100)' }}>
        <div className="grid grid-cols-3 gap-2 md:gap-4 text-center">
          <div>
            <div className="text-base md:text-lg font-semibold" style={{ color: 'var(--cu-gray-800)' }}>{conversations.filter(c => c.status === 'active').length}</div>
            <div className="text-xs" style={{ color: 'var(--cu-gray-600)' }}>Active</div>
          </div>
          <div>
            <div className="text-base md:text-lg font-semibold" style={{ color: 'var(--cu-gray-800)' }}>{conversations.filter(c => c.status === 'pending').length}</div>
            <div className="text-xs" style={{ color: 'var(--cu-gray-600)' }}>Pending</div>
          </div>
          <div>
            <div className="text-base md:text-lg font-semibold" style={{ color: 'var(--cu-gray-800)' }}>{conversations.reduce((sum, c) => sum + c.unreadCount, 0)}</div>
            <div className="text-xs" style={{ color: 'var(--cu-gray-600)' }}>Unread</div>
          </div>
        </div>
        
        {/* Additional persistent info */}
        <div className="mt-2 md:mt-3 pt-2 md:pt-3 border-t text-center" style={{ borderColor: 'var(--cu-gray-200)' }}>
          <p className="text-xs" style={{ color: 'var(--cu-gray-500)' }}>
            Last updated: {new Date().toLocaleTimeString()}
          </p>
        </div>
      </div>
    </div>
  );
}