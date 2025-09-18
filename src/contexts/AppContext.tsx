import React, { createContext, useContext, useState } from 'react';
import { Conversation, Customer, Lead, ChatMode } from '../types';

interface AppContextType {
  selectedConversation: Conversation | null;
  setSelectedConversation: (conversation: Conversation | null) => void;
  chatMode: ChatMode;
  setChatMode: (mode: ChatMode) => void;
  customers: Customer[];
  leads: Lead[];
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const mockCustomers: Customer[] = [
  {
    id: '1',
    name: 'Alice Johnson',
    phone: '+1 (555) 123-4567',
    email: 'alice@example.com',
    status: 'active',
    tags: ['Premium', 'VIP'],
    lastInteraction: new Date('2024-01-15T10:30:00'),
    totalOrders: 12,
    totalValue: 25000,
    notes: 'Prefers email communication'
  },
  {
    id: '2',
    name: 'Bob Wilson',
    phone: '+1 (555) 987-6543',
    email: 'bob@example.com',
    status: 'active',
    tags: ['Regular'],
    lastInteraction: new Date('2024-01-14T14:20:00'),
    totalOrders: 5,
    totalValue: 8500,
  }
];

const mockLeads: Lead[] = [
  {
    id: '1',
    name: 'Sarah Davis',
    phone: '+1 (555) 456-7890',
    email: 'sarah@example.com',
    status: 'new',
    source: 'Website',
    value: 5000,
    createdAt: new Date('2024-01-15T09:00:00'),
    updatedAt: new Date('2024-01-15T09:00:00')
  }
];

const chatModes: { [key: string]: ChatMode } = {
  customer_service: {
    id: 'customer_service',
    name: 'Customer Service',
    description: 'Handle support requests and customer inquiries',
    active: true
  },
  sales_lead: {
    id: 'sales_lead',
    name: 'Sales & Lead Management',
    description: 'Manage leads and sales conversations',
    active: false
  }
};

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [selectedConversation, setSelectedConversation] = useState<Conversation | null>(null);
  const [chatMode, setChatMode] = useState<ChatMode>(chatModes.customer_service);
  const [customers] = useState<Customer[]>(mockCustomers);
  const [leads] = useState<Lead[]>(mockLeads);

  return (
    <AppContext.Provider value={{
      selectedConversation,
      setSelectedConversation,
      chatMode,
      setChatMode,
      customers,
      leads
    }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}