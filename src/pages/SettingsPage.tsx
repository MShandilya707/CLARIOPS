import React, { useState } from 'react';
import { 
  Building2, 
  Users, 
  Plug, 
  Shield, 
  Download,
  Eye,
  EyeOff,
  Check,
  X,
  MessageSquare,
  Calendar,
  FileSpreadsheet,
  CreditCard,
  Save,
  Upload,
  Trash2,
  Edit,
  Plus
} from 'lucide-react';

const settingsTabs = [
  { id: 'business', name: 'Business Profile', icon: Building2 },
  { id: 'team', name: 'Team & Permissions', icon: Users },
  { id: 'integrations', name: 'Integrations', icon: Plug },
  { id: 'security', name: 'Security & Compliance', icon: Shield },
  { id: 'data', name: 'Data & Export', icon: Download },
];

const integrations = [
  {
    id: 'whatsapp',
    name: 'WhatsApp Business',
    description: 'Connect your WhatsApp Business account for chat management',
    icon: MessageSquare,
    connected: true,
    status: 'Active',
    lastSync: '2 minutes ago',
    config: { phoneNumber: '+1 555-123-4567', businessName: 'ClariOps Demo' }
  },
  {
    id: 'calendar',
    name: 'Google Calendar',
    description: 'Sync appointments and schedule meetings',
    icon: Calendar,
    connected: false,
    status: 'Not Connected',
    lastSync: null,
    config: null
  },
  {
    id: 'sheets',
    name: 'Google Sheets',
    description: 'Export data and sync with spreadsheets',
    icon: FileSpreadsheet,
    connected: true,
    status: 'Active',
    lastSync: '1 hour ago',
    config: { sheetId: 'abc123', sheetName: 'ClariOps Data' }
  },
  {
    id: 'payments',
    name: 'Payment Gateway',
    description: 'Process payments and manage transactions',
    icon: CreditCard,
    connected: false,
    status: 'Not Connected',
    lastSync: null,
    config: null
  }
];

const teamMembers = [
  {
    id: '1',
    name: 'John Smith',
    email: 'john@company.com',
    role: 'owner',
    status: 'active',
    lastActive: 'Currently active',
    permissions: ['all']
  },
  {
    id: '2',
    name: 'Sarah Johnson',
    email: 'sarah@company.com',
    role: 'manager',
    status: 'active',
    lastActive: '2 hours ago',
    permissions: ['chat', 'customers', 'reports']
  },
  {
    id: '3',
    name: 'Mike Wilson',
    email: 'mike@company.com',
    role: 'staff',
    status: 'active',
    lastActive: '1 day ago',
    permissions: ['chat', 'customers']
  }
];

const permissions = [
  { id: 'chat', name: 'Chat Management', description: 'Handle customer conversations' },
  { id: 'customers', name: 'Customer Management', description: 'View and edit customer profiles' },
  { id: 'invoices', name: 'Invoice Management', description: 'Create and manage invoices' },
  { id: 'reports', name: 'Reports & Analytics', description: 'View business reports and analytics' },
  { id: 'broadcasts', name: 'Broadcast Messages', description: 'Send bulk messages to customers' },
  { id: 'settings', name: 'Settings Management', description: 'Modify business settings' },
  { id: 'team', name: 'Team Management', description: 'Manage team members and permissions' }
];

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState('business');
  const [showApiKey, setShowApiKey] = useState(false);
  const [businessProfile, setBusinessProfile] = useState({
    companyName: 'ClariOps Demo Company',
    industry: 'Technology',
    website: 'https://clariops.com',
    timezone: 'America/New_York',
    language: 'en',
    currency: 'USD',
    logo: null,
    brandColor: '#3B82F6',
    businessHours: {
      monday: { open: '09:00', close: '17:00', enabled: true },
      tuesday: { open: '09:00', close: '17:00', enabled: true },
      wednesday: { open: '09:00', close: '17:00', enabled: true },
      thursday: { open: '09:00', close: '17:00', enabled: true },
      friday: { open: '09:00', close: '17:00', enabled: true },
      saturday: { open: '10:00', close: '14:00', enabled: false },
      sunday: { open: '10:00', close: '14:00', enabled: false }
    }
  });

  const [editingMember, setEditingMember] = useState<string | null>(null);
  const [newMember, setNewMember] = useState({ name: '', email: '', role: 'staff' });
  const [showInviteForm, setShowInviteForm] = useState(false);

  const handleSaveProfile = () => {
    console.log('Saving business profile:', businessProfile);
    // Mock save functionality
  };

  const handleToggleIntegration = (integrationId: string) => {
    console.log(`Toggling integration: ${integrationId}`);
    // Mock integration toggle
  };

  const handleInviteMember = () => {
    console.log('Inviting new member:', newMember);
    setNewMember({ name: '', email: '', role: 'staff' });
    setShowInviteForm(false);
  };

  const handleUpdateMemberRole = (memberId: string, newRole: string) => {
    console.log(`Updating member ${memberId} role to ${newRole}`);
  };

  const handleExportData = (type: string) => {
    console.log(`Exporting ${type} data...`);
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'business':
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-slate-900 mb-4">Business Profile</h3>
              <form className="space-y-6">
                {/* Logo Upload */}
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Company Logo
                  </label>
                  <div className="flex items-center space-x-4">
                    <div className="w-16 h-16 bg-gradient-to-r from-blue-900 to-blue-700 rounded-lg flex items-center justify-center">
                      <span className="text-white font-bold text-xl">CO</span>
                    </div>
                    <div>
                      <button className="px-4 py-2 bg-slate-100 text-slate-700 rounded-lg hover:bg-slate-200 transition-colors">
                        <Upload className="h-4 w-4 inline mr-2" />
                        Upload Logo
                      </button>
                      <p className="text-sm text-slate-500 mt-1">PNG, JPG up to 2MB</p>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">
                      Company Name
                    </label>
                    <input
                      type="text"
                      value={businessProfile.companyName}
                      onChange={(e) => setBusinessProfile({ ...businessProfile, companyName: e.target.value })}
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">
                      Industry
                    </label>
                    <select
                      value={businessProfile.industry}
                      onChange={(e) => setBusinessProfile({ ...businessProfile, industry: e.target.value })}
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                    >
                      <option value="technology">Technology</option>
                      <option value="retail">Retail</option>
                      <option value="manufacturing">Manufacturing</option>
                      <option value="services">Services</option>
                      <option value="healthcare">Healthcare</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">
                      Website
                    </label>
                    <input
                      type="url"
                      value={businessProfile.website}
                      onChange={(e) => setBusinessProfile({ ...businessProfile, website: e.target.value })}
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">
                      Brand Color
                    </label>
                    <div className="flex items-center space-x-2">
                      <input
                        type="color"
                        value="#3B82F6"
                        onChange={(e) => setBusinessProfile({ ...businessProfile, brandColor: e.target.value })}
                        className="w-12 h-10 border border-slate-300 rounded-lg"
                      />
                      <input
                        type="text"
                        value="#3B82F6"
                        onChange={(e) => setBusinessProfile({ ...businessProfile, brandColor: e.target.value })}
                        className="flex-1 px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">
                      Timezone
                    </label>
                    <select
                      value={businessProfile.timezone}
                      onChange={(e) => setBusinessProfile({ ...businessProfile, timezone: e.target.value })}
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                    >
                      <option value="America/New_York">Eastern Time</option>
                      <option value="America/Chicago">Central Time</option>
                      <option value="America/Denver">Mountain Time</option>
                      <option value="America/Los_Angeles">Pacific Time</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">
                      Currency
                    </label>
                    <select
                      value={businessProfile.currency}
                      onChange={(e) => setBusinessProfile({ ...businessProfile, currency: e.target.value })}
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                    >
                      <option value="USD">USD - US Dollar</option>
                      <option value="EUR">EUR - Euro</option>
                      <option value="GBP">GBP - British Pound</option>
                      <option value="INR">INR - Indian Rupee</option>
                    </select>
                  </div>
                </div>

                {/* Business Hours */}
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-3">
                    Business Hours
                  </label>
                  <div className="space-y-3">
                    {Object.entries(businessProfile.businessHours).map(([day, hours]) => (
                      <div key={day} className="flex items-center space-x-4">
                        <div className="w-20">
                          <span className="text-sm font-medium text-slate-700 capitalize">{day}</span>
                        </div>
                        <label className="flex items-center">
                          <input
                            type="checkbox"
                            checked={hours.enabled}
                            onChange={(e) => setBusinessProfile({
                              ...businessProfile,
                              businessHours: {
                                ...businessProfile.businessHours,
                                [day]: { ...hours, enabled: e.target.checked }
                              }
                            })}
                            className="rounded border-slate-300 text-blue-600 focus:ring-blue-600"
                          />
                          <span className="ml-2 text-sm text-slate-600">Open</span>
                        </label>
                        {hours.enabled && (
                          <>
                            <input
                              type="time"
                              value={hours.open}
                              onChange={(e) => setBusinessProfile({
                                ...businessProfile,
                                businessHours: {
                                  ...businessProfile.businessHours,
                                  [day]: { ...hours, open: e.target.value }
                                }
                              })}
                              className="px-3 py-1 border border-slate-300 rounded text-sm"
                            />
                            <span className="text-slate-500">to</span>
                            <input
                              type="time"
                              value={hours.close}
                              onChange={(e) => setBusinessProfile({
                                ...businessProfile,
                                businessHours: {
                                  ...businessProfile.businessHours,
                                  [day]: { ...hours, close: e.target.value }
                                }
                              })}
                              className="px-3 py-1 border border-slate-300 rounded text-sm"
                            />
                          </>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                <button
                  type="button"
                  onClick={handleSaveProfile}
                  className="flex items-center space-x-2 bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  <Save className="h-4 w-4" />
                  <span>Save Changes</span>
                </button>
              </form>
            </div>
          </div>
        );

      case 'team':
        return (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-slate-900">Team Members</h3>
              <button 
                onClick={() => setShowInviteForm(true)}
                className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
              >
                <Plus className="h-4 w-4" />
                <span>Invite Member</span>
              </button>
            </div>

            {/* Invite Form */}
            {showInviteForm && (
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <h4 className="font-medium text-blue-900 mb-3">Invite New Team Member</h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <input
                    type="text"
                    placeholder="Full Name"
                    value={newMember.name}
                    onChange={(e) => setNewMember({ ...newMember, name: e.target.value })}
                    className="px-3 py-2 border border-blue-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                  />
                  <input
                    type="email"
                    placeholder="Email Address"
                    value={newMember.email}
                    onChange={(e) => setNewMember({ ...newMember, email: e.target.value })}
                    className="px-3 py-2 border border-blue-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                  />
                  <select
                    value={newMember.role}
                    onChange={(e) => setNewMember({ ...newMember, role: e.target.value })}
                    className="px-3 py-2 border border-blue-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                  >
                    <option value="staff">Staff</option>
                    <option value="manager">Manager</option>
                  </select>
                </div>
                <div className="flex items-center space-x-3 mt-4">
                  <button
                    onClick={handleInviteMember}
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    Send Invitation
                  </button>
                  <button
                    onClick={() => setShowInviteForm(false)}
                    className="text-slate-600 hover:text-slate-800"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            )}
            
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-slate-200">
                    <th className="text-left p-3 text-sm font-medium text-slate-600">Member</th>
                    <th className="text-left p-3 text-sm font-medium text-slate-600">Role</th>
                    <th className="text-left p-3 text-sm font-medium text-slate-600">Status</th>
                    <th className="text-left p-3 text-sm font-medium text-slate-600">Last Active</th>
                    <th className="text-left p-3 text-sm font-medium text-slate-600">Permissions</th>
                    <th className="text-left p-3 text-sm font-medium text-slate-600">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {teamMembers.map((member) => (
                    <tr key={member.id} className="border-b border-slate-100">
                      <td className="p-3">
                        <div className="flex items-center space-x-3">
                          <div className="w-8 h-8 bg-slate-300 rounded-full flex items-center justify-center">
                            <span className="text-slate-700 font-medium text-sm">
                              {member.name.charAt(0)}
                            </span>
                          </div>
                          <div>
                            <p className="font-medium text-slate-900">{member.name}</p>
                            <p className="text-sm text-slate-600">{member.email}</p>
                          </div>
                        </div>
                      </td>
                      <td className="p-3">
                        {editingMember === member.id ? (
                          <select
                            value={member.role}
                            onChange={(e) => handleUpdateMemberRole(member.id, e.target.value)}
                            className="px-2 py-1 border border-slate-300 rounded text-sm"
                          >
                            <option value="staff">Staff</option>
                            <option value="manager">Manager</option>
                            <option value="owner">Owner</option>
                          </select>
                        ) : (
                          <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800 capitalize">
                            {member.role}
                          </span>
                        )}
                      </td>
                      <td className="p-3">
                        <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                          {member.status}
                        </span>
                      </td>
                      <td className="p-3 text-sm text-slate-600">{member.lastActive}</td>
                      <td className="p-3">
                        <div className="flex flex-wrap gap-1">
                          {member.permissions.slice(0, 2).map((perm) => (
                            <span key={perm} className="inline-flex items-center px-2 py-1 rounded text-xs bg-slate-100 text-slate-700">
                              {perm === 'all' ? 'All' : perm}
                            </span>
                          ))}
                          {member.permissions.length > 2 && (
                            <span className="text-xs text-slate-500">+{member.permissions.length - 2} more</span>
                          )}
                        </div>
                      </td>
                      <td className="p-3">
                        <div className="flex items-center space-x-2">
                          {editingMember === member.id ? (
                            <>
                              <button
                                onClick={() => setEditingMember(null)}
                                className="text-green-600 hover:text-green-800 text-sm"
                              >
                                Save
                              </button>
                              <button
                                onClick={() => setEditingMember(null)}
                                className="text-slate-600 hover:text-slate-800 text-sm"
                              >
                                Cancel
                              </button>
                            </>
                          ) : (
                            <>
                              <button
                                onClick={() => setEditingMember(member.id)}
                                className="text-blue-600 hover:text-blue-800 text-sm"
                              >
                                <Edit className="h-4 w-4" />
                              </button>
                              {member.role !== 'owner' && (
                                <button className="text-red-600 hover:text-red-800 text-sm">
                                  <Trash2 className="h-4 w-4" />
                                </button>
                              )}
                            </>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Permissions Reference */}
            <div className="bg-slate-50 rounded-lg p-6">
              <h4 className="font-medium text-slate-900 mb-4">Permission Reference</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {permissions.map((permission) => (
                  <div key={permission.id} className="bg-white p-3 rounded-lg border border-slate-200">
                    <h5 className="font-medium text-slate-900 text-sm">{permission.name}</h5>
                    <p className="text-slate-600 text-xs mt-1">{permission.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );

      case 'integrations':
        return (
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-slate-900">Integrations</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {integrations.map((integration) => (
                <div key={integration.id} className="bg-white border border-slate-200 rounded-lg p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <div className="p-2 bg-slate-100 rounded-lg">
                        <integration.icon className="h-5 w-5 text-slate-600" />
                      </div>
                      <div>
                        <h4 className="font-medium text-slate-900">{integration.name}</h4>
                        <p className="text-sm text-slate-600">{integration.description}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      {integration.connected ? (
                        <Check className="h-4 w-4 text-green-500" />
                      ) : (
                        <X className="h-4 w-4 text-slate-400" />
                      )}
                    </div>
                  </div>
                  
                  {integration.connected && integration.config && (
                    <div className="mb-4 p-3 bg-slate-50 rounded-lg">
                      <div className="text-sm space-y-1">
                        {Object.entries(integration.config).map(([key, value]) => (
                          <div key={key} className="flex justify-between">
                            <span className="text-slate-600 capitalize">{key.replace(/([A-Z])/g, ' $1')}:</span>
                            <span className="text-slate-900 font-medium">{value}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <span className={`text-sm font-medium ${
                        integration.connected ? 'text-green-600' : 'text-slate-500'
                      }`}>
                        {integration.status}
                      </span>
                      {integration.lastSync && (
                        <p className="text-xs text-slate-500 mt-1">Last sync: {integration.lastSync}</p>
                      )}
                    </div>
                    <button 
                      onClick={() => handleToggleIntegration(integration.id)}
                      className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                        integration.connected
                          ? 'bg-red-100 text-red-700 hover:bg-red-200'
                          : 'bg-blue-100 text-blue-700 hover:bg-blue-200'
                      }`}
                    >
                      {integration.connected ? 'Disconnect' : 'Connect'}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      case 'security':
        return (
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-slate-900">Security & Compliance</h3>
            
            <div className="space-y-6">
              <div className="bg-white border border-slate-200 rounded-lg p-6">
                <h4 className="font-medium text-slate-900 mb-4">API Access</h4>
                <p className="text-sm text-slate-600 mb-4">
                  Use this API key to integrate with external services. Keep it secure and never share it publicly.
                </p>
                <div className="flex items-center space-x-3">
                  <input
                    type={showApiKey ? 'text' : 'password'}
                    value="sk-1234567890abcdef1234567890abcdef"
                    readOnly
                    className="flex-1 px-3 py-2 border border-slate-300 rounded-lg bg-slate-50 font-mono text-sm"
                  />
                  <button
                    onClick={() => setShowApiKey(!showApiKey)}
                    className="p-2 text-slate-500 hover:text-slate-700 hover:bg-slate-100 rounded-lg transition-colors"
                  >
                    {showApiKey ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                  <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                    Regenerate
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white border border-slate-200 rounded-lg p-6">
                  <h4 className="font-medium text-slate-900 mb-2">Data Encryption</h4>
                  <div className="flex items-center justify-between">
                    <p className="text-sm text-slate-600">
                      All data is encrypted at rest and in transit using AES-256
                    </p>
                    <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                      <Check className="h-3 w-3 mr-1" />
                      Active
                    </span>
                  </div>
                </div>

                <div className="bg-white border border-slate-200 rounded-lg p-6">
                  <h4 className="font-medium text-slate-900 mb-2">Audit Logging</h4>
                  <div className="flex items-center justify-between">
                    <p className="text-sm text-slate-600">
                      Track all user actions and system events
                    </p>
                    <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                      <Check className="h-3 w-3 mr-1" />
                      Enabled
                    </span>
                  </div>
                </div>

                <div className="bg-white border border-slate-200 rounded-lg p-6">
                  <h4 className="font-medium text-slate-900 mb-2">Two-Factor Authentication</h4>
                  <p className="text-sm text-slate-600 mb-3">
                    Add an extra layer of security to your account
                  </p>
                  <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors text-sm">
                    Enable 2FA
                  </button>
                </div>

                <div className="bg-white border border-slate-200 rounded-lg p-6">
                  <h4 className="font-medium text-slate-900 mb-2">GDPR Compliance</h4>
                  <p className="text-sm text-slate-600 mb-3">
                    Manage user consent and data processing preferences
                  </p>
                  <button className="bg-slate-100 text-slate-700 px-4 py-2 rounded-lg hover:bg-slate-200 transition-colors text-sm">
                    Manage Consent
                  </button>
                </div>
              </div>
            </div>
          </div>
        );

      case 'data':
        return (
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-slate-900">Data Management</h3>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-white border border-slate-200 rounded-lg p-6">
                <h4 className="font-medium text-slate-900 mb-4">Export Data</h4>
                <p className="text-sm text-slate-600 mb-4">
                  Download your business data in various formats for backup or analysis.
                </p>
                <div className="space-y-3">
                  <button 
                    onClick={() => handleExportData('customers')}
                    className="w-full bg-blue-600 text-white px-4 py-3 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center space-x-2"
                  >
                    <Download className="h-4 w-4" />
                    <span>Export Customer Data (CSV)</span>
                  </button>
                  <button 
                    onClick={() => handleExportData('conversations')}
                    className="w-full bg-blue-600 text-white px-4 py-3 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center space-x-2"
                  >
                    <Download className="h-4 w-4" />
                    <span>Export Conversations (JSON)</span>
                  </button>
                  <button 
                    onClick={() => handleExportData('financial')}
                    className="w-full bg-blue-600 text-white px-4 py-3 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center space-x-2"
                  >
                    <Download className="h-4 w-4" />
                    <span>Export Financial Data (Excel)</span>
                  </button>
                </div>
              </div>

              <div className="bg-white border border-slate-200 rounded-lg p-6">
                <h4 className="font-medium text-slate-900 mb-4">Data Retention</h4>
                <p className="text-sm text-slate-600 mb-4">
                  Configure how long to keep your data for compliance and storage optimization.
                </p>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Chat History
                    </label>
                    <select className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent">
                      <option value="1year">1 Year</option>
                      <option value="2years">2 Years</option>
                      <option value="3years">3 Years</option>
                      <option value="forever">Forever</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Financial Records
                    </label>
                    <select className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent">
                      <option value="5years">5 Years</option>
                      <option value="7years">7 Years</option>
                      <option value="forever">Forever</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Customer Data
                    </label>
                    <select className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent">
                      <option value="3years">3 Years</option>
                      <option value="5years">5 Years</option>
                      <option value="forever">Forever</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-red-50 border border-red-200 rounded-lg p-6">
              <h4 className="font-medium text-red-900 mb-2">Danger Zone</h4>
              <p className="text-sm text-red-700 mb-4">
                Permanently delete all your data. This action cannot be undone and will immediately terminate your account.
              </p>
              <button className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors flex items-center space-x-2">
                <Trash2 className="h-4 w-4" />
                <span>Delete All Data</span>
              </button>
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
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Settings</h1>
          <p className="text-slate-600 mt-1">Manage your business profile, team, and integrations</p>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        {/* Sidebar Navigation */}
        <div className="w-full lg:w-64 bg-white rounded-xl shadow-sm border border-slate-200 p-1">
          <nav className="space-y-1">
            {settingsTabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`w-full flex items-center space-x-3 px-3 py-3 rounded-lg text-left transition-colors ${
                  activeTab === tab.id
                    ? 'bg-blue-50 text-blue-700'
                    : 'text-slate-700 hover:bg-slate-50'
                }`}
              >
                <tab.icon className="h-5 w-5" />
                <span className="font-medium">{tab.name}</span>
              </button>
            ))}
          </nav>
        </div>

        {/* Main Content */}
        <div className="flex-1 bg-white rounded-xl shadow-sm border border-slate-200 p-6">
          {renderTabContent()}
        </div>
      </div>
    </div>
  );
}