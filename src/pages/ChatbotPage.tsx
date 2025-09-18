import React, { useState } from 'react';
import { MessageSquare, Users, Clock, TrendingUp } from 'lucide-react';
import ConversationList from '../components/Chatbot/ConversationList';
import ChatInterface from '../components/Chatbot/ChatInterface';
import ContextPanel from '../components/Chatbot/ContextPanel';
import ChatModeToggle from '../components/Chatbot/ChatModeToggle';
import { useApp } from '../contexts/AppContext';

export default function ChatbotPage() {
  const { selectedConversation, chatMode } = useApp();
  const [showStats, setShowStats] = useState(false); // Default to false on mobile

  // Mock stats that persist throughout
  const chatStats = {
    totalConversations: 24,
    activeChats: 6,
    avgResponseTime: '2.3 min',
    todayResolved: 18
  };

  return (
    <div className="min-h-screen flex flex-col -m-4 md:-m-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-700 to-blue-900 border-b px-4 py-3 md:px-6 md:py-4 flex-shrink-0 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-xl md:text-2xl font-bold text-white">Chat Workspace</h1>
            <p className="text-xs md:text-sm text-blue-100">
              {chatMode.name} Mode • {chatStats.activeChats} active conversations
            </p>
          </div>
          <div className="flex items-center space-x-2 md:space-x-4">
            <ChatModeToggle />
            <button
              onClick={() => setShowStats(!showStats)}
              className="cu-btn-secondary text-xs md:text-sm px-2 py-1 md:px-3 md:py-2"
            >
              {showStats ? 'Hide Stats' : 'Show Stats'}
            </button>
          </div>
        </div>
        
        {/* Persistent Stats Bar */}
        {showStats && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-4 mt-3 md:mt-4">
            <div className="cu-card p-3 text-center">
              <div className="flex items-center justify-center space-x-1 md:space-x-2 mb-1 text-blue-700">
                <MessageSquare className="h-4 w-4" />
                <span className="text-xs md:text-sm font-medium">Total</span>
              </div>
              <div className="text-lg md:text-xl font-bold" style={{ color: 'var(--cu-gray-800)' }}>{chatStats.totalConversations}</div>
            </div>
            <div className="cu-card p-3 text-center">
              <div className="flex items-center justify-center space-x-1 md:space-x-2 mb-1 text-green-600">
                <Users className="h-4 w-4" />
                <span className="text-xs md:text-sm font-medium">Active</span>
              </div>
              <div className="text-lg md:text-xl font-bold" style={{ color: 'var(--cu-gray-800)' }}>{chatStats.activeChats}</div>
            </div>
            <div className="cu-card p-3 text-center">
              <div className="flex items-center justify-center space-x-1 md:space-x-2 mb-1 text-amber-600">
                <Clock className="h-4 w-4" />
                <span className="text-xs md:text-sm font-medium">Avg Response</span>
              </div>
              <div className="text-lg md:text-xl font-bold" style={{ color: 'var(--cu-gray-800)' }}>{chatStats.avgResponseTime}</div>
            </div>
            <div className="cu-card p-3 text-center">
              <div className="flex items-center justify-center space-x-1 md:space-x-2 mb-1 text-teal-600">
                <TrendingUp className="h-4 w-4" />
                <span className="text-xs md:text-sm font-medium">Resolved Today</span>
              </div>
              <div className="text-lg md:text-xl font-bold" style={{ color: 'var(--cu-gray-800)' }}>{chatStats.todayResolved}</div>
            </div>
          </div>
        )}
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col md:flex-row overflow-hidden -mt-4 md:-mt-6">
        {/* Conversation List */}
        <div className="w-full md:w-80 flex-shrink-0 cu-sidebar relative flex flex-col md:border-r border-slate-200 pt-4 md:pt-6">
          <ConversationList />
        </div>

        {/* Chat Interface */}
        <div className="flex-1 cu-sidebar relative flex flex-col">
          {selectedConversation ? (
            <ChatInterface />
          ) : (
            <div className="flex-1 flex items-center justify-center relative" style={{ backgroundColor: 'var(--cu-gray-50)' }}>
              <div className="text-center">
                <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4" style={{ backgroundColor: 'var(--cu-gray-200)' }}>
                  <span className="text-slate-500 text-2xl">💬</span>
                </div>
                <h3 className="text-lg font-medium mb-2" style={{ color: 'var(--cu-gray-800)' }}>Select a conversation</h3>
                <p className="mb-4" style={{ color: 'var(--cu-gray-600)' }}>Choose a conversation from the left to start chatting</p>
                
                {/* Quick Actions when no conversation selected */}
                <div className="flex flex-col space-y-2 max-w-xs mx-auto px-4">
                  <button className="cu-btn-primary">
                    Start New Conversation
                  </button>
                  <button className="cu-btn-secondary">
                    View All Customers
                  </button>
                </div>
              </div>
              
              {/* Persistent Mode Info */}
              <div className="absolute bottom-6 left-4 right-4 md:left-6 md:right-6">
                <div className="cu-card p-4">
                  <h4 className="font-medium mb-2" style={{ color: 'var(--cu-gray-800)' }}>Current Mode: {chatMode.name}</h4>
                  <p className="text-sm" style={{ color: 'var(--cu-gray-600)' }}>{chatMode.description}</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}