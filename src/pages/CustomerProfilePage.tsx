import React, { useState } from 'react';
import { 
  Building2, 
  Phone, 
  Mail, 
  Calendar, 
  Upload, 
  FileText, 
  DollarSign, 
  MapPin,
  Globe,
  Users,
  TrendingUp,
  Shield
} from 'lucide-react';
import { format } from 'date-fns';

const tabs = [
  { id: 'overview', name: 'Business Overview' },
  { id: 'compliance', name: 'Compliance & Legal' },
  { id: 'financial', name: 'Financial Information' },
  { id: 'documents', name: 'Documents' }
];

const mockInvoices = [
  {
    id: 'INV-001',
    amount: 2500,
    status: 'paid' as const,
    dueDate: new Date('2024-01-15'),
    createdAt: new Date('2024-01-01')
  },
  {
    id: 'INV-002',
    amount: 1200,
    status: 'overdue' as const,
    dueDate: new Date('2024-01-10'),
    createdAt: new Date('2023-12-15')
  }
];

export default function CustomerProfilePage() {
  const [activeTab, setActiveTab] = useState('overview');
  const [businessInfo, setBusinessInfo] = useState({
    companyName: 'ClariOps Demo Company',
    industry: 'Technology',
    foundedYear: '2020',
    employeeCount: '25-50',
    website: 'https://clariops.com',
    description: 'A leading technology company focused on business management solutions.',
    address: '123 Business Street, Tech City, TC 12345',
    phone: '+1 (555) 123-4567',
    email: 'contact@clariops.com',
    gstNumber: 'GST123456789',
    registrationDate: '2020-01-15',
    annualRevenue: '5000000',
    taxId: 'TAX987654321',
    businessLicense: 'BL2020001'
  });

  const handleBusinessInfoSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Business info updated:', businessInfo);
  };

  const businessStats = [
    {
      label: 'Years in Business',
      value: new Date().getFullYear() - parseInt(businessInfo.foundedYear),
      icon: Calendar,
      color: 'bg-blue-100 text-blue-700'
    },
    {
      label: 'Team Size',
      value: businessInfo.employeeCount,
      icon: Users,
      color: 'bg-green-100 text-green-700'
    },
    {
      label: 'Annual Revenue',
      value: `$${(parseInt(businessInfo.annualRevenue) / 1000000).toFixed(1)}M`,
      icon: TrendingUp,
      color: 'bg-purple-100 text-purple-700'
    },
    {
      label: 'Compliance Status',
      value: 'Verified',
      icon: Shield,
      color: 'bg-green-100 text-green-700'
    }
  ];

  const getInvoiceStatusColor = (status: string) => {
    switch (status) {
      case 'paid': return 'bg-green-100 text-green-800';
      case 'overdue': return 'bg-red-100 text-red-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-slate-100 text-slate-800';
    }
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'overview':
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              {businessStats.map((stat, index) => (
                <div key={index} className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-slate-600 text-sm font-medium">{stat.label}</p>
                      <p className="text-2xl font-bold text-slate-900 mt-1">{stat.value}</p>
                    </div>
                    <div className={`p-3 rounded-lg ${stat.color}`}>
                      <stat.icon className="h-6 w-6" />
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
              <h3 className="text-lg font-semibold text-slate-900 mb-4">Basic Information</h3>
              <form onSubmit={handleBusinessInfoSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">
                      Company Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={businessInfo.companyName}
                      onChange={(e) => setBusinessInfo({ ...businessInfo, companyName: e.target.value })}
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">
                      Industry <span className="text-red-500">*</span>
                    </label>
                    <select
                      required
                      value={businessInfo.industry}
                      onChange={(e) => setBusinessInfo({ ...businessInfo, industry: e.target.value })}
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                    >
                      <option value="technology">Technology</option>
                      <option value="retail">Retail</option>
                      <option value="manufacturing">Manufacturing</option>
                      <option value="services">Services</option>
                      <option value="healthcare">Healthcare</option>
                      <option value="finance">Finance</option>
                      <option value="education">Education</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">
                      Founded Year
                    </label>
                    <input
                      type="number"
                      min="1900"
                      max={new Date().getFullYear()}
                      value={businessInfo.foundedYear}
                      onChange={(e) => setBusinessInfo({ ...businessInfo, foundedYear: e.target.value })}
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">
                      Employee Count
                    </label>
                    <select
                      value={businessInfo.employeeCount}
                      onChange={(e) => setBusinessInfo({ ...businessInfo, employeeCount: e.target.value })}
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                    >
                      <option value="1-10">1-10</option>
                      <option value="11-25">11-25</option>
                      <option value="25-50">25-50</option>
                      <option value="51-100">51-100</option>
                      <option value="101-500">101-500</option>
                      <option value="500+">500+</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">
                      Website
                    </label>
                    <input
                      type="url"
                      value={businessInfo.website}
                      onChange={(e) => setBusinessInfo({ ...businessInfo, website: e.target.value })}
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                      placeholder="https://yourcompany.com"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">
                      Business Phone
                    </label>
                    <input
                      type="tel"
                      value={businessInfo.phone}
                      onChange={(e) => setBusinessInfo({ ...businessInfo, phone: e.target.value })}
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    Business Description
                  </label>
                  <textarea
                    value={businessInfo.description}
                    onChange={(e) => setBusinessInfo({ ...businessInfo, description: e.target.value })}
                    rows={3}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                    placeholder="Describe your business..."
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    Business Address
                  </label>
                  <textarea
                    value={businessInfo.address}
                    onChange={(e) => setBusinessInfo({ ...businessInfo, address: e.target.value })}
                    rows={2}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                    placeholder="Enter complete business address"
                  />
                </div>

                <button
                  type="submit"
                  className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Save Changes
                </button>
              </form>
            </div>
          </div>
        );

      case 'compliance':
        return (
          <div className="space-y-6">
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
              <h3 className="text-lg font-semibold text-slate-900 mb-4">Legal & Compliance Information</h3>
              <form onSubmit={handleBusinessInfoSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">
                      GST Number <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={businessInfo.gstNumber}
                      onChange={(e) => setBusinessInfo({ ...businessInfo, gstNumber: e.target.value })}
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                      placeholder="Enter GST number"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">
                      Registration Date <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="date"
                      required
                      value={businessInfo.registrationDate}
                      onChange={(e) => setBusinessInfo({ ...businessInfo, registrationDate: e.target.value })}
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">
                      Tax ID
                    </label>
                    <input
                      type="text"
                      value={businessInfo.taxId}
                      onChange={(e) => setBusinessInfo({ ...businessInfo, taxId: e.target.value })}
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                      placeholder="Enter tax identification number"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">
                      Business License Number
                    </label>
                    <input
                      type="text"
                      value={businessInfo.businessLicense}
                      onChange={(e) => setBusinessInfo({ ...businessInfo, businessLicense: e.target.value })}
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                      placeholder="Enter business license number"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Update Compliance Information
                </button>
              </form>
            </div>

            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <div className="flex items-start space-x-3">
                <Shield className="h-5 w-5 text-green-600 mt-0.5" />
                <div>
                  <h4 className="font-medium text-green-900">Compliance Status: Verified</h4>
                  <p className="text-green-700 text-sm mt-1">
                    Your business information has been verified and meets all compliance requirements.
                  </p>
                </div>
              </div>
            </div>
          </div>
        );

      case 'financial':
        return (
          <div className="space-y-6">
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
              <h3 className="text-lg font-semibold text-slate-900 mb-4">Financial Information</h3>
              <form onSubmit={handleBusinessInfoSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">
                      Annual Revenue <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="number"
                      required
                      value={businessInfo.annualRevenue}
                      onChange={(e) => setBusinessInfo({ ...businessInfo, annualRevenue: e.target.value })}
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                      placeholder="Enter annual revenue in USD"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">
                      Business Email
                    </label>
                    <input
                      type="email"
                      value={businessInfo.email}
                      onChange={(e) => setBusinessInfo({ ...businessInfo, email: e.target.value })}
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                      placeholder="Enter business email"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Update Financial Information
                </button>
              </form>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-blue-50 rounded-lg p-4">
                <div className="flex items-center space-x-2 text-blue-600 mb-2">
                  <DollarSign className="h-5 w-5" />
                  <span className="font-medium">Revenue Growth</span>
                </div>
                <p className="text-2xl font-bold text-blue-800">+23.5%</p>
                <p className="text-blue-700 text-sm">Year over year</p>
              </div>
              <div className="bg-green-50 rounded-lg p-4">
                <div className="flex items-center space-x-2 text-green-600 mb-2">
                  <TrendingUp className="h-5 w-5" />
                  <span className="font-medium">Profit Margin</span>
                </div>
                <p className="text-2xl font-bold text-green-800">18.2%</p>
                <p className="text-green-700 text-sm">Current quarter</p>
              </div>
              <div className="bg-purple-50 rounded-lg p-4">
                <div className="flex items-center space-x-2 text-purple-600 mb-2">
                  <Building2 className="h-5 w-5" />
                  <span className="font-medium">Market Position</span>
                </div>
                <p className="text-2xl font-bold text-purple-800">Top 10%</p>
                <p className="text-purple-700 text-sm">In industry</p>
              </div>
            </div>
          </div>
        );

      case 'documents':
        return (
          <div className="space-y-6">
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
              <h3 className="text-lg font-semibold text-slate-900 mb-4">Document Management</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div className="border-2 border-dashed border-slate-300 rounded-lg p-6 text-center hover:border-blue-400 transition-colors">
                  <Upload className="h-8 w-8 text-slate-400 mx-auto mb-2" />
                  <p className="text-slate-600 mb-2">Upload Business License</p>
                  <button className="bg-slate-100 text-slate-700 px-4 py-2 rounded-lg hover:bg-slate-200 transition-colors">
                    Choose File
                  </button>
                </div>
                <div className="border-2 border-dashed border-slate-300 rounded-lg p-6 text-center hover:border-blue-400 transition-colors">
                  <Upload className="h-8 w-8 text-slate-400 mx-auto mb-2" />
                  <p className="text-slate-600 mb-2">Upload Tax Documents</p>
                  <button className="bg-slate-100 text-slate-700 px-4 py-2 rounded-lg hover:bg-slate-200 transition-colors">
                    Choose File
                  </button>
                </div>
              </div>

              <div className="space-y-3">
                <h4 className="font-medium text-slate-900">Uploaded Documents</h4>
                <div className="space-y-2">
                  <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <FileText className="h-5 w-5 text-slate-500" />
                      <div>
                        <p className="font-medium text-slate-900">Business License.pdf</p>
                        <p className="text-sm text-slate-600">Uploaded on {format(new Date(), 'MMM dd, yyyy')}</p>
                      </div>
                    </div>
                    <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                      View
                    </button>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <FileText className="h-5 w-5 text-slate-500" />
                      <div>
                        <p className="font-medium text-slate-900">GST Certificate.pdf</p>
                        <p className="text-sm text-slate-600">Uploaded on {format(new Date(Date.now() - 86400000), 'MMM dd, yyyy')}</p>
                      </div>
                    </div>
                    <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                      View
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
              <div className="flex items-start space-x-3">
                <FileText className="h-5 w-5 text-yellow-600 mt-0.5" />
                <div>
                  <h4 className="font-medium text-yellow-900">Document Requirements</h4>
                  <p className="text-yellow-800 text-sm mt-1">
                    Please ensure all documents are clear, legible, and in PDF format. 
                    Maximum file size is 10MB per document.
                  </p>
                </div>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="p-6">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center space-x-4 mb-4">
          <div className="w-16 h-16 bg-gradient-to-r from-blue-900 to-blue-700 rounded-xl flex items-center justify-center">
            <Building2 className="h-8 w-8 text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-slate-900">{businessInfo.companyName}</h1>
            <p className="text-slate-600">Manage your business profile and compliance information</p>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200">
        <div className="border-b border-slate-200">
          <nav className="flex">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-6 py-4 text-sm font-medium border-b-2 transition-colors ${
                  activeTab === tab.id
                    ? 'border-blue-600 text-blue-600'
                    : 'border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300'
                }`}
              >
                {tab.name}
              </button>
            ))}
          </nav>
        </div>

        <div className="p-6">
          {renderTabContent()}
        </div>
      </div>
    </div>
  );
}