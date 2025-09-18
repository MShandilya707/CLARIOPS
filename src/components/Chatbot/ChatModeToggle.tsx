import React from 'react';
import { useApp } from '../../contexts/AppContext';
import { HeadphonesIcon, TrendingUp } from 'lucide-react';
import clsx from 'clsx';

const modes = [
  {
    id: 'customer_service' as const,
    name: 'Customer Service',
    description: 'Handle support requests',
    icon: HeadphonesIcon,
    color: 'bg-blue-100 text-blue-700'
  },
  {
    id: 'sales_lead' as const,
    name: 'Sales & Leads',
    description: 'Manage sales conversations',
    icon: TrendingUp,
    color: 'bg-indigo-100 text-indigo-700'
  }
];

export default function ChatModeToggle() {
  const { chatMode, setChatMode } = useApp();

  return (
    <div className="flex items-center space-x-2 p-1 rounded-lg bg-white/20 backdrop-blur-sm">
      {modes.map((mode) => (
        <button
          key={mode.id}
          onClick={() => setChatMode({
            id: mode.id,
            name: mode.name,
            description: mode.description,
            active: true
          })}
          className={clsx(
            'flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-all duration-200',
            chatMode.id === mode.id
              ? 'bg-white/30 text-white backdrop-blur-sm'
              : 'cu-nav-item'
          )}
        >
          <mode.icon className="h-4 w-4" />
          <span>{mode.name}</span>
        </button>
      ))}
    </div>
  );
}