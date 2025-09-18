export interface User {
  id: string;
  name: string;
  email: string;
  role: 'owner' | 'manager' | 'staff';
  avatar?: string;
  businessId: string;
}

export interface Business {
  id: string;
  name: string;
  gstNumber?: string;
  registrationDate?: Date;
  annualRevenue?: number;
  industry?: string;
  address?: string;
  phone?: string;
  email?: string;
}

export interface Customer {
  id: string;
  name: string;
  phone: string;
  email?: string;
  status: 'active' | 'inactive' | 'blocked';
  tags: string[];
  lastInteraction: Date;
  totalOrders: number;
  totalValue: number;
  notes?: string;
}

export interface Lead {
  id: string;
  name: string;
  phone: string;
  email?: string;
  status: 'new' | 'contacted' | 'qualified' | 'converted' | 'lost';
  source: string;
  value?: number;
  assignedTo?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Conversation {
  id: string;
  customerId: string;
  customerName: string;
  lastMessage: string;
  lastMessageTime: Date;
  unreadCount: number;
  status: 'active' | 'resolved' | 'pending';
  assignedTo?: string;
  tags: string[];
}

export interface Message {
  id: string;
  conversationId: string;
  content: string;
  type: 'text' | 'image' | 'document' | 'system';
  sender: 'customer' | 'agent' | 'system';
  timestamp: Date;
  status?: 'sent' | 'delivered' | 'read';
}

export interface Invoice {
  id: string;
  customerId: string;
  amount: number;
  status: 'draft' | 'sent' | 'paid' | 'overdue' | 'cancelled';
  dueDate: Date;
  createdAt: Date;
  items: InvoiceItem[];
}

export interface InvoiceItem {
  id: string;
  name: string;
  quantity: number;
  rate: number;
  total: number;
}

export interface Payment {
  id: string;
  invoiceId: string;
  amount: number;
  method: 'cash' | 'bank_transfer' | 'card' | 'upi';
  status: 'pending' | 'completed' | 'failed';
  date: Date;
}

export interface Subscription {
  id: string;
  name: string;
  features: string[];
  limitations?: string[];
  popular?: boolean;
}

export interface ChatMode {
  id: 'customer_service' | 'sales_lead';
  name: string;
  description: string;
  active: boolean;
}