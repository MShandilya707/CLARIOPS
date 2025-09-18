import React, { useState } from 'react';
import { Outlet, Link } from 'react-router-dom';
import { 
  MessageSquare, 
  BarChart3, 
  CreditCard, 
  Building2, 
  Settings,
  Home,
  Users,
  Calendar,
  FileText,
  Bell,
  Search,
  Plus,
  Menu,
  X
} from 'lucide-react';

const navigationLinks = [
  { name: 'Dashboard', href: '/app/dashboard', icon: Home },
  { name: 'Chat', href: '/app/chatbot', icon: MessageSquare },
  { name: 'Customers', href: '/app/customers', icon: Users },
  { name: 'Analytics', href: '/app/analytics', icon: BarChart3 },
  { name: 'Plans', href: '/app/subscriptions', icon: CreditCard },
  { name: 'Settings', href: '/app/settings', icon: Settings },
];

export default function Layout() {
  const currentPath = window.location.pathname;
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Mobile Header */}
      <div className="sticky top-0 z-50 h-16 flex items-center justify-between px-4 bg-white border-b shadow-sm md:hidden">
        <Link to="/" className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-gradient-to-r from-blue-700 to-blue-900 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-sm">CO</span>
          </div>
          <span className="text-lg font-bold text-slate-800">ClariOps</span>
        </Link>
        
        <div className="flex items-center space-x-2">
          <button className="p-2 rounded-lg text-slate-600 hover:bg-slate-100">
            <Bell className="h-5 w-5" />
          </button>
          <button 
            onClick={toggleMobileMenu}
            className="p-2 rounded-lg text-slate-600 hover:bg-slate-100"
          >
            {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Desktop Header */}
      <div className="sticky top-0 z-50 h-16 items-center justify-between px-6 bg-white border-b shadow-sm hidden md:flex">
        <div className="flex items-center space-x-4">
          <Link to="/" className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-gradient-to-r from-blue-700 to-blue-900 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">CO</span>
            </div>
            <span className="text-xl font-bold text-slate-800">ClariOps</span>
          </Link>
          
          <div className="relative ml-8">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search anything..."
              className="cu-input pl-10 w-80"
            />
          </div>
        </div>
        
        <div className="flex items-center space-x-3">
          <button className="cu-btn-primary">
            <Plus className="h-4 w-4 mr-2" />
            New
          </button>
          <button className="p-2 rounded-lg text-slate-600 hover:bg-slate-100">
            <Bell className="h-5 w-5" />
          </button>
          <div className="w-8 h-8 bg-gradient-to-r from-blue-700 to-blue-900 rounded-full flex items-center justify-center">
            <span className="text-white font-medium text-sm">U</span>
          </div>
        </div>
      </div>

      <div className="flex">
        {/* Mobile Overlay Menu */}
        {isMobileMenuOpen && (
          <div className="fixed inset-0 z-40 md:hidden">
            <div className="fixed inset-0 bg-black bg-opacity-50" onClick={toggleMobileMenu}></div>
            <div className="fixed top-16 left-0 right-0 bg-white border-b shadow-lg">
              <nav className="p-4 space-y-2">
                {navigationLinks.map((link) => (
                  <Link
                    key={link.name}
                    to={link.href}
                    onClick={toggleMobileMenu}
                    className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                      currentPath === link.href
                        ? 'bg-blue-50 text-blue-700 border border-blue-200'
                        : 'text-slate-700 hover:bg-slate-50'
                    }`}
                  >
                    <link.icon className="h-5 w-5" />
                    <span className="font-medium">{link.name}</span>
                  </Link>
                ))}
              </nav>
            </div>
          </div>
        )}

        {/* Desktop Sidebar */}
        <div className="cu-sidebar w-64 min-h-screen p-4 border-r border-slate-200 hidden md:block">
          <nav className="space-y-1">
            {navigationLinks.map((link) => (
              <Link
                key={link.name}
                to={link.href}
                className={`cu-nav-item ${currentPath === link.href ? 'active' : ''}`}
              >
                <link.icon className="h-5 w-5 mr-3" />
                <span>{link.name}</span>
              </Link>
            ))}
          </nav>
          
          <div className="mt-8 pt-4 border-t border-slate-200">
            <div className="cu-nav-item">
              <FileText className="h-5 w-5 mr-3" />
              <span>Documentation</span>
            </div>
            <div className="cu-nav-item">
              <Calendar className="h-5 w-5 mr-3" />
              <span>Calendar</span>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <main className="flex-1 overflow-auto">
          <div className="p-4 md:p-6">
            <Outlet />
          </div>
        </main>
      </div>

      {/* Mobile Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-slate-200 md:hidden z-30">
        <nav className="flex">
          {navigationLinks.slice(0, 5).map((link) => (
            <Link
              key={link.name}
              to={link.href}
              className={`flex-1 flex flex-col items-center py-2 px-1 transition-colors ${
                currentPath === link.href
                  ? 'text-blue-700 bg-blue-50'
                  : 'text-slate-600 hover:text-slate-800'
              }`}
            >
              <link.icon className="h-5 w-5 mb-1" />
              <span className="text-xs font-medium">{link.name}</span>
            </Link>
          ))}
        </nav>
      </div>

      {/* Mobile Bottom Padding */}
      <div className="h-16 md:hidden"></div>
    </div>
  );
}