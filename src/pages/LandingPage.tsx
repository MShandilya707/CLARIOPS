import React from 'react';
import { Link } from 'react-router-dom';
import { 
  MessageSquare, 
  TrendingUp, 
  DollarSign, 
  Users, 
  Calendar,
  Shield,
  Zap,
  Target,
  CheckCircle,
  ArrowRight,
  Star,
  Globe,
  Clock,
  BarChart3,
  Settings,
  Building2,
  CreditCard,
} from 'lucide-react';

const features = [
  {
    icon: MessageSquare,
    title: 'Customer Service',
    description: 'Auto-replies, FAQs, order updates, multi-language support.',
    color: 'bg-blue-100 text-blue-700'
  },
  {
    icon: TrendingUp,
    title: 'Sales and Lead Management',
    description: 'Lead capture, catalog sharing, appointments, broadcasts, payments.',
    color: 'bg-green-100 text-green-700'
  },
  {
    icon: DollarSign,
    title: 'Financial Management',
    description: 'Invoices, payment tracking, receivables, revenue overview.',
    color: 'bg-purple-100 text-purple-700'
  },
  {
    icon: Users,
    title: 'Human Resources',
    description: 'Team activity tracking, performance metrics, leave requests, access control.',
    color: 'bg-orange-100 text-orange-700'
  },
  {
    icon: Calendar,
    title: 'Scheduling & Alerts',
    description: 'Appointments calendar, reminders, meeting minutes, weekly snapshots.',
    color: 'bg-teal-100 text-teal-700'
  }
];

const benefits = [
  {
    icon: Zap,
    title: 'Simple to use',
    description: 'No steep learning curve, designed for business owners.'
  },
  {
    icon: Target,
    title: 'End-to-end coverage',
    description: 'From getting new customers to collecting payments.'
  },
  {
    icon: BarChart3,
    title: 'Scalable',
    description: 'Start small and grow into advanced features as your business expands.'
  },
  {
    icon: Shield,
    title: 'Professional & secure',
    description: 'Built with compliance, data security, and reliability in mind.'
  }
];

const aboutPoints = [
  'Provide instant customer service through a familiar chat interface.',
  'Capture leads, share catalogs, and book appointments seamlessly.',
  'Generate invoices, accept payments, and track your finances in real time.',
  'Monitor team performance and streamline HR tasks like leave requests.',
  'Stay on top of your operations with snapshots, reminders, and alerts.'
];

const navigationLinks = [
  { name: 'Chatbot', href: '/app/chatbot', icon: MessageSquare },
  { name: 'Dashboard', href: '/app/dashboard', icon: BarChart3 },
  { name: 'Subscriptions', href: '/app/subscriptions', icon: CreditCard },
  { name: 'Customer Profile', href: '/app/customer-profile', icon: Building2 },
  { name: 'Settings', href: '/app/settings', icon: Settings },
];

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-900 to-blue-700 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">CO</span>
              </div>
              <span className="text-xl font-bold text-slate-900">ClariOps</span>
            </div>
            <div className="flex items-center space-x-6">
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-slate-50 to-blue-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-left max-w-4xl">
            <h1 className="text-4xl md:text-6xl font-bold text-slate-900 mb-6">
              ClariOps: Simplifying
              <span className="text-blue-700 block">Business Management</span>
            </h1>
            <p className="text-xl text-slate-600 mb-8 max-w-3xl leading-relaxed">
              ClariOps is a powerful yet simple web application that brings together everything your business needs — 
              customer service, sales and lead management, finances, and HR — into one seamless platform.
            </p>
            <p className="text-lg text-slate-600 mb-10 max-w-2xl">
              With our WhatsApp-style chatbot and intuitive dashboard, you can engage customers, close deals, 
              track payments, and manage your team with ease.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                to="/app/chatbot"
                className="bg-blue-700 text-white px-8 py-4 rounded-lg hover:bg-blue-800 transition-colors font-semibold text-lg flex items-center justify-center"
              >
                Get Started
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* About ClariOps */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-left mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6">About ClariOps</h2>
            <p className="text-xl text-slate-600 max-w-3xl leading-relaxed mb-8">
              At ClariOps, we believe running a business should be simple. That's why we built an all-in-one solution that helps you:
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            <div className="space-y-6">
              {aboutPoints.map((point, index) => (
                <div key={index} className="flex items-start space-x-3">
                  <CheckCircle className="h-6 w-6 text-green-500 mt-0.5 flex-shrink-0" />
                  <p className="text-slate-700 text-lg">{point}</p>
                </div>
              ))}
            </div>
            <div className="bg-gradient-to-br from-blue-50 to-slate-50 rounded-2xl p-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-700 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Globe className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-slate-900 mb-3">Integrated System</h3>
                <p className="text-slate-600">
                  ClariOps combines customer management, sales growth, financial tracking, and HR productivity 
                  into one integrated system, so you can focus on what matters most - growing your business.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Key Features Preview */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-left mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6">Key Features Preview</h2>
            <p className="text-xl text-slate-600 max-w-2xl">
              Everything you need to run your business efficiently, all in one place.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 hover:shadow-md transition-shadow">
                <div className={`w-12 h-12 ${feature.color} rounded-lg flex items-center justify-center mb-4`}>
                  <feature.icon className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-semibold text-slate-900 mb-3">{feature.title}</h3>
                <p className="text-slate-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose ClariOps */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-left mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6">Why Choose ClariOps?</h2>
            <p className="text-xl text-slate-600 max-w-2xl">
              Built specifically for business owners who want powerful features without the complexity.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 bg-blue-100 text-blue-700 rounded-full flex items-center justify-center mx-auto mb-4">
                  <benefit.icon className="h-8 w-8" />
                </div>
                <h3 className="text-xl font-semibold text-slate-900 mb-3">{benefit.title}</h3>
                <p className="text-slate-600">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-700 to-blue-900">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Ready to Simplify Your Business?
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Join thousands of businesses that have streamlined their operations with ClariOps -
            At ClariOps, we believe running a business should be simple. That is why we built an all-in-one solution that helps you:
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/app/chatbot"
              className="bg-white text-blue-700 px-8 py-4 rounded-lg hover:bg-blue-50 transition-colors font-semibold text-lg flex items-center justify-center"
            >
              Get Started
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-blue-500 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-sm">CO</span>
                </div>
                <span className="text-xl font-bold">ClariOps</span>
              </div>
              <p className="text-slate-400 mb-4 max-w-md">
                Simplifying business management through intelligent automation and intuitive design. 
                Everything you need to grow your business, all in one place.
              </p>
              <div className="flex space-x-4">
                <div className="w-8 h-8 bg-slate-800 rounded-full flex items-center justify-center">
                  <Star className="h-4 w-4" />
                </div>
                <div className="w-8 h-8 bg-slate-800 rounded-full flex items-center justify-center">
                  <Globe className="h-4 w-4" />
                </div>
                <div className="w-8 h-8 bg-slate-800 rounded-full flex items-center justify-center">
                  <MessageSquare className="h-4 w-4" />
                </div>
              </div>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Product</h4>
              <ul className="space-y-2 text-slate-400">
                <li><Link to="/app/chatbot" className="hover:text-white transition-colors">Chatbot</Link></li>
                <li><Link to="/app/dashboard" className="hover:text-white transition-colors">Dashboard</Link></li>
                <li><Link to="/app/subscriptions" className="hover:text-white transition-colors">Subscriptions</Link></li>
                <li><Link to="/app/settings" className="hover:text-white transition-colors">Settings</Link></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-slate-400">
                <li><Link to="/app/customer-profile" className="hover:text-white transition-colors">Profile</Link></li>
                <li><a href="#" className="hover:text-white transition-colors">Contact</a></li>
                <li><a href="#" className="hover:text-white transition-colors">About</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-slate-800 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-slate-400 text-sm">
              © 2024 ClariOps. All rights reserved.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <a href="#" className="text-slate-400 hover:text-white text-sm transition-colors">Privacy Policy</a>
              <a href="#" className="text-slate-400 hover:text-white text-sm transition-colors">Terms of Service</a>
              <a href="#" className="text-slate-400 hover:text-white text-sm transition-colors">Cookie Policy</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}