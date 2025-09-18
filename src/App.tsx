import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AppProvider } from './contexts/AppContext';
import Layout from './components/Layout/Layout';
import ChatbotPage from './pages/ChatbotPage';
import DashboardPage from './pages/DashboardPage';
import SubscriptionsPage from './pages/SubscriptionsPage';
import CustomerProfilePage from './pages/CustomerProfilePage';
import SettingsPage from './pages/SettingsPage';
import LandingPage from './pages/LandingPage';

function App() {
  return (
    <AppProvider>
      <Router>
        <div className="min-h-screen bg-slate-50">
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/app" element={<Layout />}>
              <Route index element={<ChatbotPage />} />
              <Route path="chatbot" element={<ChatbotPage />} />
              <Route path="dashboard" element={<DashboardPage />} />
              <Route path="analytics" element={<DashboardPage />} />
              <Route path="customers" element={<CustomerProfilePage />} />
              <Route path="subscriptions" element={<SubscriptionsPage />} />
              <Route path="customer-profile" element={<CustomerProfilePage />} />
              <Route path="settings" element={<SettingsPage />} />
            </Route>
          </Routes>
        </div>
      </Router>
    </AppProvider>
  );
}

export default App;