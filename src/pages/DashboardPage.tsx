import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell, AreaChart, Area } from 'recharts';
import { TrendingUp, TrendingDown, DollarSign, Users, ShoppingBag, Clock, AlertCircle, CheckCircle, Download, Filter, Calendar, RefreshCw } from 'lucide-react';

const revenueData = [
  { month: 'Jan', revenue: 12000, target: 15000, expenses: 8000 },
  { month: 'Feb', revenue: 15500, target: 15000, expenses: 9200 },
  { month: 'Mar', revenue: 18200, target: 15000, expenses: 10500 },
  { month: 'Apr', revenue: 16800, target: 15000, expenses: 9800 },
  { month: 'May', revenue: 21400, target: 15000, expenses: 11200 },
  { month: 'Jun', revenue: 25600, target: 15000, expenses: 12800 },
];

const dailyRevenueData = [
  { day: 'Mon', amount: 2400 },
  { day: 'Tue', amount: 1800 },
  { day: 'Wed', amount: 3200 },
  { day: 'Thu', amount: 2800 },
  { day: 'Fri', amount: 3600 },
  { day: 'Sat', amount: 4200 },
  { day: 'Sun', amount: 3800 },
];

const agingData = [
  { name: '0-30 days', value: 45, amount: 12500, color: '#10B981' },
  { name: '31-60 days', value: 30, amount: 8300, color: '#F59E0B' },
  { name: '61-90 days', value: 15, amount: 4200, color: '#EF4444' },
  { name: '90+ days', value: 10, amount: 2800, color: '#8B5CF6' },
];

const COLORS = ['#10B981', '#F59E0B', '#EF4444', '#8B5CF6'];

const stats = [
  {
    name: 'Total Revenue',
    value: '$109,500',
    change: '+12.3%',
    changeType: 'increase',
    icon: DollarSign,
    color: 'bg-blue-100 text-blue-700',
    description: 'vs last month'
  },
  {
    name: 'Active Customers',
    value: '1,247',
    change: '+5.7%',
    changeType: 'increase',
    icon: Users,
    color: 'bg-blue-100 text-blue-700',
    description: 'total customers'
  },
  {
    name: 'Total Orders',
    value: '423',
    change: '-2.1%',
    changeType: 'decrease',
    icon: ShoppingBag,
    color: 'bg-purple-100 text-purple-700',
    description: 'this month'
  },
  {
    name: 'Avg. DSO',
    value: '35 days',
    change: '-4.2%',
    changeType: 'increase',
    icon: Clock,
    color: 'bg-orange-100 text-orange-700',
    description: 'days sales outstanding'
  },
];

const overdueInvoices = [
  { id: 'INV-001', customer: 'Alice Johnson', amount: 2500, daysPastDue: 45, priority: 'high' },
  { id: 'INV-002', customer: 'Bob Wilson', amount: 1200, daysPastDue: 32, priority: 'medium' },
  { id: 'INV-003', customer: 'Carol Smith', amount: 3800, daysPastDue: 67, priority: 'high' },
  { id: 'INV-004', customer: 'David Brown', amount: 950, daysPastDue: 23, priority: 'low' },
  { id: 'INV-005', customer: 'Emma Davis', amount: 1800, daysPastDue: 89, priority: 'high' },
];

const recentPayments = [
  { id: 'PAY-001', customer: 'Alice Johnson', amount: 2500, method: 'Bank Transfer', date: '2024-01-15', status: 'completed' },
  { id: 'PAY-002', customer: 'Mike Chen', amount: 1200, method: 'UPI', date: '2024-01-14', status: 'completed' },
  { id: 'PAY-003', customer: 'Sarah Davis', amount: 800, method: 'Card', date: '2024-01-14', status: 'pending' },
  { id: 'PAY-004', customer: 'John Wilson', amount: 3200, method: 'Bank Transfer', date: '2024-01-13', status: 'completed' },
];

export default function DashboardPage() {
  const [selectedPeriod, setSelectedPeriod] = useState('month');
  const [showFilters, setShowFilters] = useState(false);

  const handleSendReminder = (invoiceId: string) => {
    console.log(`Sending reminder for invoice ${invoiceId}`);
    // Mock reminder functionality
  };

  const handleExportData = () => {
    console.log('Exporting dashboard data...');
    // Mock export functionality
  };

  const handleRefreshData = () => {
    console.log('Refreshing dashboard data...');
    // Mock refresh functionality
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Financial Dashboard</h1>
          <p className="mt-1 text-slate-600">Monitor your business performance and key financial metrics</p>
        </div>
        <div className="flex items-center space-x-3">
          <select
            value={selectedPeriod}
            onChange={(e) => setSelectedPeriod(e.target.value)}
            className="cu-input"
          >
            <option value="week">This Week</option>
            <option value="month">This Month</option>
            <option value="quarter">This Quarter</option>
            <option value="year">This Year</option>
          </select>
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="cu-btn-secondary"
          >
            <Filter className="h-5 w-5" />
          </button>
          <button
            onClick={handleRefreshData}
            className="cu-btn-secondary"
          >
            <RefreshCw className="h-5 w-5" />
          </button>
          <button
            onClick={handleExportData}
            className="cu-btn-primary"
          >
            <Download className="h-4 w-4" />
            <span>Export</span>
          </button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <div key={stat.name} className="cu-card p-6">
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <p className="text-sm font-medium" style={{ color: 'var(--cu-gray-600)' }}>{stat.name}</p>
                <p className="text-2xl font-bold mt-1" style={{ color: 'var(--cu-gray-800)' }}>{stat.value}</p>
                <div className="flex items-center mt-2">
                  {stat.changeType === 'increase' ? (
                    <TrendingUp className="h-4 w-4" style={{ color: 'var(--cu-success)' }} />
                  ) : (
                    <TrendingDown className="h-4 w-4" style={{ color: 'var(--cu-danger)' }} />
                  )}
                  <span 
                    className="ml-1 text-sm font-medium"
                    style={{ color: stat.changeType === 'increase' ? 'var(--cu-success)' : 'var(--cu-danger)' }}
                  >
                    {stat.change}
                  </span>
                </div>
                <p className="text-xs mt-1" style={{ color: 'var(--cu-gray-500)' }}>{stat.description}</p>
              </div>
              <div className={`p-3 rounded-lg ${stat.color}`}>
                <stat.icon className="h-6 w-6" />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Revenue Trends */}
        <div className="cu-card p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold" style={{ color: 'var(--cu-gray-800)' }}>Revenue Trends</h3>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 rounded-full bg-blue-600"></div>
                <span className="text-sm" style={{ color: 'var(--cu-gray-600)' }}>Revenue</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: 'var(--cu-gray-300)' }}></div>
                <span className="text-sm" style={{ color: 'var(--cu-gray-600)' }}>Target</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: 'var(--cu-danger)' }}></div>
                <span className="text-sm" style={{ color: 'var(--cu-gray-600)' }}>Expenses</span>
              </div>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={revenueData}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--cu-gray-200)" />
              <XAxis dataKey="month" stroke="var(--cu-gray-500)" />
              <YAxis stroke="var(--cu-gray-500)" />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#fff', 
                  border: '1px solid var(--cu-gray-200)',
                  borderRadius: '8px'
                }} 
              />
              <Area type="monotone" dataKey="expenses" stackId="1" stroke="var(--cu-danger)" fill="rgba(225, 112, 85, 0.2)" />
              <Area type="monotone" dataKey="revenue" stackId="2" stroke="#1e40af" fill="rgba(30, 64, 175, 0.2)" />
              <Line type="monotone" dataKey="target" stroke="var(--cu-gray-500)" strokeDasharray="5 5" />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Daily Revenue */}
        <div className="cu-card p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold" style={{ color: 'var(--cu-gray-800)' }}>Daily Revenue (This Week)</h3>
            <span className="text-sm" style={{ color: 'var(--cu-gray-600)' }}>Total: $22,800</span>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={dailyRevenueData}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--cu-gray-200)" />
              <XAxis dataKey="day" stroke="var(--cu-gray-500)" />
              <YAxis stroke="var(--cu-gray-500)" />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#fff', 
                  border: '1px solid var(--cu-gray-200)',
                  borderRadius: '8px'
                }} 
              />
              <Bar dataKey="amount" fill="#059669" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Second Row Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Receivables Aging */}
        <div className="cu-card p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold" style={{ color: 'var(--cu-gray-800)' }}>Receivables Aging</h3>
            <span className="text-sm" style={{ color: 'var(--cu-gray-600)' }}>Total: $27,800</span>
          </div>
          <div className="flex items-center justify-center">
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie
                  data={agingData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={2}
                  dataKey="value"
                >
                  {agingData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip 
                  formatter={(value, name, props) => [
                    `${value}% ($${props.payload.amount.toLocaleString()})`, 
                    props.payload.name
                  ]}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="grid grid-cols-2 gap-4 mt-4">
            {agingData.map((item, index) => (
              <div key={item.name} className="flex items-center space-x-2">
                <div 
                  className="w-3 h-3 rounded-full" 
                  style={{ backgroundColor: COLORS[index] }}
                ></div>
                <div>
                  <p className="text-xs" style={{ color: 'var(--cu-gray-600)' }}>{item.name}</p>
                  <p className="text-sm font-medium" style={{ color: 'var(--cu-gray-800)' }}>${item.amount.toLocaleString()}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Payments */}
        <div className="cu-card p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold" style={{ color: 'var(--cu-gray-800)' }}>Recent Payments</h3>
            <button className="text-sm font-medium" style={{ color: 'var(--cu-primary)' }}>
              View All
            </button>
          </div>
          <div className="space-y-4">
            {recentPayments.map((payment) => (
              <div key={payment.id} className="flex items-center justify-between p-3 rounded-lg" style={{ backgroundColor: 'var(--cu-gray-100)' }}>
                <div className="flex items-center space-x-3">
                  <div 
                    className="w-8 h-8 rounded-full flex items-center justify-center"
                    style={{ backgroundColor: payment.status === 'completed' ? 'var(--cu-success)' : 'var(--cu-warning)' }}
                  >
                    {payment.status === 'completed' ? (
                      <CheckCircle className="h-4 w-4 text-white" />
                    ) : (
                      <Clock className="h-4 w-4 text-white" />
                    )}
                  </div>
                  <div>
                    <p className="font-medium" style={{ color: 'var(--cu-gray-800)' }}>{payment.customer}</p>
                    <p className="text-sm" style={{ color: 'var(--cu-gray-600)' }}>{payment.method} • {payment.date}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-medium" style={{ color: 'var(--cu-gray-800)' }}>${payment.amount.toLocaleString()}</p>
                  <span className={`cu-badge ${
                    payment.status === 'completed' 
                      ? 'cu-badge-success' 
                      : 'cu-badge-warning'
                  }`}>
                    {payment.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Overdue Invoices */}
      <div className="cu-card">
        <div className="p-6 border-b" style={{ borderColor: 'var(--cu-gray-200)' }}>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <AlertCircle className="h-5 w-5" style={{ color: 'var(--cu-danger)' }} />
              <h3 className="text-lg font-semibold" style={{ color: 'var(--cu-gray-800)' }}>Overdue Invoices</h3>
            </div>
            <div className="flex items-center space-x-3">
              <span className="text-sm" style={{ color: 'var(--cu-gray-600)' }}>{overdueInvoices.length} invoices • ${overdueInvoices.reduce((sum, inv) => sum + inv.amount, 0).toLocaleString()} total</span>
              <button className="cu-badge-danger">
                Send All Reminders
              </button>
            </div>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b" style={{ borderColor: 'var(--cu-gray-200)' }}>
                <th className="text-left p-4 text-sm font-medium" style={{ color: 'var(--cu-gray-600)' }}>Invoice</th>
                <th className="text-left p-4 text-sm font-medium" style={{ color: 'var(--cu-gray-600)' }}>Customer</th>
                <th className="text-left p-4 text-sm font-medium" style={{ color: 'var(--cu-gray-600)' }}>Amount</th>
                <th className="text-left p-4 text-sm font-medium" style={{ color: 'var(--cu-gray-600)' }}>Days Past Due</th>
                <th className="text-left p-4 text-sm font-medium" style={{ color: 'var(--cu-gray-600)' }}>Priority</th>
                <th className="text-left p-4 text-sm font-medium" style={{ color: 'var(--cu-gray-600)' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {overdueInvoices.map((invoice) => (
                <tr key={invoice.id} className="border-b hover:bg-gray-50 transition-colors" style={{ borderColor: 'var(--cu-gray-100)' }}>
                  <td className="p-4 text-sm font-medium" style={{ color: 'var(--cu-gray-800)' }}>{invoice.id}</td>
                  <td className="p-4 text-sm" style={{ color: 'var(--cu-gray-700)' }}>{invoice.customer}</td>
                  <td className="p-4 text-sm font-medium text-slate-900">
                    ${invoice.amount.toLocaleString()}
                  </td>
                  <td className="p-4">
                    <span className={`cu-badge ${
                      invoice.daysPastDue > 60 
                        ? 'cu-badge-danger' 
                        : invoice.daysPastDue > 30 
                        ? 'cu-badge-warning'
                        : 'cu-badge-warning'
                    }`}>
                      {invoice.daysPastDue} days
                    </span>
                  </td>
                  <td className="p-4">
                    <span className={`cu-badge ${
                      invoice.priority === 'high' 
                        ? 'cu-badge-danger' 
                        : invoice.priority === 'medium'
                        ? 'cu-badge-warning'
                        : 'cu-badge-success'
                    }`}>
                      {invoice.priority}
                    </span>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center space-x-2">
                      <button 
                        onClick={() => handleSendReminder(invoice.id)}
                        className="text-sm font-medium hover:underline"
                        style={{ color: 'var(--cu-primary)' }}
                      >
                        Send Reminder
                      </button>
                      <button className="text-sm font-medium hover:underline" style={{ color: 'var(--cu-gray-600)' }}>
                        View
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}