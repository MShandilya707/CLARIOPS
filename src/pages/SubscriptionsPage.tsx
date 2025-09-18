import React from 'react';
import { Check, Star } from 'lucide-react';

const plans = [
  {
    id: 'customer-service',
    name: 'Customer Service',
    description: 'Perfect for businesses focused on customer support',
    popular: false,
    features: [
      'WhatsApp Integration',
      'Auto-replies & FAQs',
      'Multi-language Support',
      'Order Status Tracking',
      'Customer Database',
      'Basic Analytics',
      'Email Support'
    ],
    limitations: [
      'Up to 1,000 conversations/month',
      '2 team members'
    ]
  },
  {
    id: 'sales-lead',
    name: 'Sales & Lead Management',
    description: 'Ideal for sales teams and lead generation',
    popular: true,
    features: [
      'Lead Capture & Management',
      'Product Catalog Sharing',
      'Appointment Booking',
      'Broadcast Messages',
      'Invoice Generation',
      'Sales Analytics',
      'CRM Integration',
      'Priority Support'
    ],
    limitations: [
      'Up to 5,000 conversations/month',
      '5 team members'
    ]
  },
  {
    id: 'financial',
    name: 'Financial Management',
    description: 'Comprehensive financial tracking and management',
    popular: false,
    features: [
      'Payment Tracking',
      'Receivables Aging',
      'DSO Monitoring',
      'Auto-reminder System',
      'Financial Reports',
      'Invoice Management',
      'Payment Gateway Integration',
      'Accounting Software Sync'
    ],
    limitations: [
      'Up to 10,000 transactions/month',
      '3 team members'
    ]
  },
  {
    id: 'all-in-one',
    name: 'All-in-One',
    description: 'Complete business management solution',
    popular: false,
    features: [
      'All Customer Service Features',
      'All Sales & Lead Features',
      'All Financial Features',
      'Advanced Analytics',
      'Custom Integrations',
      'Unlimited Team Members',
      'White-label Options',
      '24/7 Premium Support',
      'Custom Training'
    ],
    limitations: [
      'Unlimited conversations',
      'Unlimited team members'
    ]
  }
];

export default function SubscriptionsPage() {
  const currentPlan = 'sales-lead'; // Mock current plan

  return (
    <div className="p-6">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-3xl font-bold text-slate-900 mb-4">Choose Your Plan</h1>
        <p className="text-lg text-slate-600 max-w-2xl mx-auto">
          Select the perfect plan for your business needs. All plans include core features with different usage limits and capabilities.
        </p>
      </div>

      {/* Current Plan Status */}
      <div className="bg-blue-50 border border-blue-200 rounded-xl p-6 mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold text-blue-900">Current Plan: Sales & Lead Management</h3>
            <p className="text-blue-700 mt-1">Your plan is active and includes all sales features</p>
          </div>
          <div className="text-right">
            <p className="text-sm text-blue-600">Usage this month</p>
            <p className="text-2xl font-bold text-blue-900">2,847 / 5,000</p>
            <p className="text-sm text-blue-600">conversations</p>
          </div>
        </div>
        <div className="mt-4 bg-blue-200 rounded-full h-2">
          <div className="bg-blue-600 h-2 rounded-full" style={{ width: '57%' }}></div>
        </div>
      </div>

      {/* Plans Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {plans.map((plan) => (
          <div
            key={plan.id}
            className={`relative bg-white rounded-xl border-2 p-6 ${
              plan.id === currentPlan
                ? 'border-blue-600 ring-2 ring-blue-600 ring-opacity-20'
                : plan.popular
                ? 'border-blue-300 shadow-lg'
                : 'border-slate-200 hover:border-slate-300'
            } transition-all duration-200`}
          >
            {/* Current Plan Badge */}
            {plan.id === currentPlan && (
              <div className="absolute -top-3 right-4">
                <div className="bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                  Current Plan
                </div>
              </div>
            )}

            {/* Plan Header */}
            <div className="text-center mb-6">
              <h3 className="text-xl font-bold text-slate-900 mb-2">{plan.name}</h3>
              <p className="text-slate-600 text-sm">{plan.description}</p>
            </div>

            {/* Features */}
            <div className="space-y-4 mb-6">
              <div>
                <h4 className="text-sm font-semibold text-slate-900 mb-3">Includes:</h4>
                <ul className="space-y-2">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-start space-x-2">
                      <Check className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                      <span className="text-sm text-slate-700">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {plan.limitations && (
                <div>
                  <h4 className="text-sm font-semibold text-slate-900 mb-3">Limits:</h4>
                  <ul className="space-y-2">
                    {plan.limitations.map((limitation) => (
                      <li key={limitation} className="flex items-start space-x-2">
                        <div className="w-4 h-4 border border-slate-300 rounded-full mt-0.5 flex-shrink-0"></div>
                        <span className="text-sm text-slate-600">{limitation}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            {/* CTA Button */}
            <button
              className={`w-full py-3 px-4 rounded-lg font-medium text-sm transition-colors ${
                plan.id === currentPlan
                  ? 'bg-slate-100 text-slate-500 cursor-not-allowed'
                  : 'bg-slate-900 text-white hover:bg-slate-800'
              }`}
              disabled={plan.id === currentPlan}
            >
              {plan.id === currentPlan ? 'Current Plan' : 'Contact Our Sales Team'}
            </button>
          </div>
        ))}
      </div>

      {/* Contact Sales Form */}
      <div className="mt-12 bg-white rounded-xl shadow-sm border border-slate-200 p-8">
        <div className="max-w-2xl mx-auto">
          <h3 className="text-2xl font-bold text-slate-900 text-center mb-4">Contact Our Sales Team</h3>
          <p className="text-slate-600 text-center mb-8">
            Get personalized recommendations and pricing for your business needs.
          </p>
          
          <form className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Full Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                  placeholder="Enter your full name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Email Address <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  required
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                  placeholder="Enter your email"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Company Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                  placeholder="Enter your company name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Phone Number
                </label>
                <input
                  type="tel"
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                  placeholder="Enter your phone number"
                />
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Which plan interests you most?
              </label>
              <select className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent">
                <option value="">Select a plan</option>
                <option value="customer-service">Customer Service</option>
                <option value="sales-lead">Sales & Lead Management</option>
                <option value="financial">Financial Management</option>
                <option value="all-in-one">All-in-One</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Tell us about your business needs
              </label>
              <textarea
                rows={4}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                placeholder="Describe your business requirements and any specific questions you have..."
              />
            </div>
            
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg font-medium hover:bg-blue-700 transition-colors"
            >
              Submit Request
            </button>
          </form>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="mt-12 text-center">

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          <div>
            <h4 className="font-semibold text-slate-900 mb-2">30-Day Free Trial</h4>
            <p className="text-slate-600 text-sm">Try any plan free for 30 days with full access to all features</p>
          </div>
          <div>
            <h4 className="font-semibold text-slate-900 mb-2">No Setup Fees</h4>
            <p className="text-slate-600 text-sm">Get started immediately with no hidden costs or setup charges</p>
          </div>
          <div>
            <h4 className="font-semibold text-slate-900 mb-2">Cancel Anytime</h4>
            <p className="text-slate-600 text-sm">No long-term commitments. Cancel or change your plan anytime</p>
          </div>
        </div>
      </div>
    </div>
  );
}