import React, { useState, useRef, useEffect } from 'react';
import { Send, Paperclip, Smile, MoreVertical, Info, Phone, Video, Archive, UserPlus } from 'lucide-react';
import { useApp } from '../../contexts/AppContext';
import { Message } from '../../types';
import { format } from 'date-fns';
import clsx from 'clsx';

// Different conversation sets for different customers
const conversationSets: { [key: string]: Message[] } = {
  '1': [ // Sarah Martinez - Technical Support
    {
      id: '1',
      conversationId: '1',
      content: 'Hi there! I\'ve been trying to log into my account but it keeps saying my password is incorrect.',
      type: 'text',
      sender: 'customer',
      timestamp: new Date('2024-01-15T11:40:00'),
      status: 'read'
    },
    {
      id: '2',
      conversationId: '1',
      content: 'Hello Sarah! I\'m sorry to hear you\'re having trouble accessing your account. Let me help you with that. Can you confirm the email address associated with your account?',
      type: 'text',
      sender: 'agent',
      timestamp: new Date('2024-01-15T11:41:00'),
      status: 'read'
    },
    {
      id: '3',
      conversationId: '1',
      content: 'Yes, it\'s sarah.martinez@email.com. I\'ve tried resetting it multiple times but I\'m not receiving the reset email.',
      type: 'text',
      sender: 'customer',
      timestamp: new Date('2024-01-15T11:42:00'),
      status: 'read'
    },
    {
      id: '4',
      conversationId: '1',
      content: 'I can see your account here. It looks like there might be an issue with our email delivery. Let me send you a secure password reset link directly through our system.',
      type: 'text',
      sender: 'agent',
      timestamp: new Date('2024-01-15T11:43:00'),
      status: 'read'
    },
    {
      id: '5',
      conversationId: '1',
      content: 'Can you help me reset my password? I\'ve been locked out for hours.',
      type: 'text',
      sender: 'customer',
      timestamp: new Date('2024-01-15T11:45:00'),
      status: 'read'
    }
  ],
  '2': [ // David Chen - Sales Inquiry
    {
      id: '1',
      conversationId: '2',
      content: 'Hello! I\'m interested in learning more about your enterprise solutions. We\'re a growing company with about 200 employees.',
      type: 'text',
      sender: 'customer',
      timestamp: new Date('2024-01-15T10:15:00'),
      status: 'read'
    },
    {
      id: '2',
      conversationId: '2',
      content: 'Hi David! Thank you for your interest in our enterprise solutions. I\'d be happy to help you find the perfect plan for your team. What specific features are most important to your business?',
      type: 'text',
      sender: 'agent',
      timestamp: new Date('2024-01-15T10:16:00'),
      status: 'read'
    },
    {
      id: '3',
      conversationId: '2',
      content: 'We need advanced analytics, custom integrations, and priority support. Our current solution isn\'t scaling well.',
      type: 'text',
      sender: 'customer',
      timestamp: new Date('2024-01-15T10:18:00'),
      status: 'read'
    },
    {
      id: '4',
      conversationId: '2',
      content: 'Perfect! Our Enterprise plan includes all of those features. I can schedule a demo to show you how our platform handles scaling and integrations. Would tomorrow at 2 PM work for you?',
      type: 'text',
      sender: 'agent',
      timestamp: new Date('2024-01-15T10:19:00'),
      status: 'read'
    },
    {
      id: '5',
      conversationId: '2',
      content: 'I\'m interested in upgrading to your enterprise plan. What are the benefits?',
      type: 'text',
      sender: 'customer',
      timestamp: new Date('2024-01-15T10:20:00'),
      status: 'read'
    }
  ],
  '3': [ // Emma Thompson - Billing Issue
    {
      id: '1',
      conversationId: '3',
      content: 'Hi, I just received my invoice and noticed the billing address is incorrect. It shows our old office address.',
      type: 'text',
      sender: 'customer',
      timestamp: new Date('2024-01-15T09:25:00'),
      status: 'read'
    },
    {
      id: '2',
      conversationId: '3',
      content: 'Hello Emma! I apologize for the confusion with your billing address. I can help you update that right away. Could you please provide the correct billing address?',
      type: 'text',
      sender: 'agent',
      timestamp: new Date('2024-01-15T09:26:00'),
      status: 'read'
    },
    {
      id: '3',
      conversationId: '3',
      content: 'Sure! The correct address is: 456 Business Plaza, Suite 300, New York, NY 10001. We moved offices last month.',
      type: 'text',
      sender: 'customer',
      timestamp: new Date('2024-01-15T09:28:00'),
      status: 'read'
    },
    {
      id: '4',
      conversationId: '3',
      content: 'Thank you! I\'ve updated your billing address in our system. I\'ll also send you a corrected invoice within the next hour. Is there anything else I can help you with?',
      type: 'text',
      sender: 'agent',
      timestamp: new Date('2024-01-15T09:29:00'),
      status: 'read'
    },
    {
      id: '5',
      conversationId: '3',
      content: 'The invoice you sent has the wrong billing address. Please update it.',
      type: 'text',
      sender: 'customer',
      timestamp: new Date('2024-01-15T09:30:00'),
      status: 'read'
    }
  ],
  '4': [ // James Rodriguez - Post-Demo Success
    {
      id: '1',
      conversationId: '4',
      content: 'The demo yesterday was fantastic! Our team was really impressed with the automation features.',
      type: 'text',
      sender: 'customer',
      timestamp: new Date('2024-01-14T16:10:00'),
      status: 'read'
    },
    {
      id: '2',
      conversationId: '4',
      content: 'That\'s wonderful to hear, James! I\'m so glad the demo resonated with your team. Are you ready to move forward with implementation?',
      type: 'text',
      sender: 'agent',
      timestamp: new Date('2024-01-14T16:11:00'),
      status: 'read'
    },
    {
      id: '3',
      conversationId: '4',
      content: 'Absolutely! We\'d like to start with the Professional plan for our 50-person team. What\'s the next step?',
      type: 'text',
      sender: 'customer',
      timestamp: new Date('2024-01-14T16:13:00'),
      status: 'read'
    },
    {
      id: '4',
      conversationId: '4',
      content: 'Excellent! I\'ll send you the contract and onboarding materials. Our implementation team will reach out within 24 hours to schedule your setup call.',
      type: 'text',
      sender: 'agent',
      timestamp: new Date('2024-01-14T16:14:00'),
      status: 'read'
    },
    {
      id: '5',
      conversationId: '4',
      content: 'Perfect! The demo went great. When can we start the onboarding process?',
      type: 'text',
      sender: 'customer',
      timestamp: new Date('2024-01-14T16:15:00'),
      status: 'read'
    }
  ],
  '5': [ // Lisa Wang - Cancellation/Retention
    {
      id: '1',
      conversationId: '5',
      content: 'Hi, I\'m considering canceling my subscription. The features aren\'t quite what I expected for my small business.',
      type: 'text',
      sender: 'customer',
      timestamp: new Date('2024-01-14T14:40:00'),
      status: 'read'
    },
    {
      id: '2',
      conversationId: '5',
      content: 'Hi Lisa, I\'m sorry to hear you\'re not completely satisfied. I\'d love to understand what specific features you were looking for so we can see if there\'s a better solution for you.',
      type: 'text',
      sender: 'agent',
      timestamp: new Date('2024-01-14T14:41:00'),
      status: 'read'
    },
    {
      id: '3',
      conversationId: '5',
      content: 'I mainly need simple invoicing and basic customer management. The current plan seems too complex and expensive for my needs.',
      type: 'text',
      sender: 'customer',
      timestamp: new Date('2024-01-14T14:43:00'),
      status: 'read'
    },
    {
      id: '4',
      conversationId: '5',
      content: 'I completely understand! We actually have a Starter plan that focuses on exactly those features at a lower price point. Would you like me to show you how it compares?',
      type: 'text',
      sender: 'agent',
      timestamp: new Date('2024-01-14T14:44:00'),
      status: 'read'
    },
    {
      id: '5',
      conversationId: '5',
      content: 'I need to cancel my subscription. The features don\'t match what I expected.',
      type: 'text',
      sender: 'customer',
      timestamp: new Date('2024-01-14T14:45:00'),
      status: 'read'
    }
  ],
  '6': [ // Alex Johnson - Training Success
    {
      id: '1',
      conversationId: '6',
      content: 'Just wanted to say thank you for the excellent training session this morning! My team learned so much.',
      type: 'text',
      sender: 'customer',
      timestamp: new Date('2024-01-13T15:25:00'),
      status: 'read'
    },
    {
      id: '2',
      conversationId: '6',
      content: 'You\'re very welcome, Alex! It was a pleasure working with your team. They asked great questions and were very engaged throughout the session.',
      type: 'text',
      sender: 'agent',
      timestamp: new Date('2024-01-13T15:26:00'),
      status: 'read'
    },
    {
      id: '3',
      conversationId: '6',
      content: 'They\'re already implementing some of the workflows we discussed. Do you have any additional resources for advanced features?',
      type: 'text',
      sender: 'customer',
      timestamp: new Date('2024-01-13T15:28:00'),
      status: 'read'
    },
    {
      id: '4',
      conversationId: '6',
      content: 'Absolutely! I\'ll send you our advanced user guide and video tutorials. We also offer monthly office hours if your team has specific questions as they get more comfortable with the platform.',
      type: 'text',
      sender: 'agent',
      timestamp: new Date('2024-01-13T15:29:00'),
      status: 'read'
    },
    {
      id: '5',
      conversationId: '6',
      content: 'Thanks for the training session! My team is excited to get started.',
      type: 'text',
      sender: 'customer',
      timestamp: new Date('2024-01-13T15:30:00'),
      status: 'read'
    }
  ],
  '7': [ // Maria Garcia - Integration Issue
    {
      id: '1',
      conversationId: '7',
      content: 'We\'re having a critical issue with our Salesforce integration. It stopped syncing data this morning and our sales team can\'t access customer information.',
      type: 'text',
      sender: 'customer',
      timestamp: new Date('2024-01-13T13:15:00'),
      status: 'read'
    },
    {
      id: '2',
      conversationId: '7',
      content: 'Hi Maria, I understand this is urgent. Let me immediately escalate this to our technical team. Can you tell me when the integration was last working properly?',
      type: 'text',
      sender: 'agent',
      timestamp: new Date('2024-01-13T13:16:00'),
      status: 'read'
    },
    {
      id: '3',
      conversationId: '7',
      content: 'It was working fine yesterday evening. We noticed the issue around 9 AM today when our sales team started their calls.',
      type: 'text',
      sender: 'customer',
      timestamp: new Date('2024-01-13T13:18:00'),
      status: 'read'
    },
    {
      id: '4',
      conversationId: '7',
      content: 'Thank you for that information. Our senior developer is looking into this now. I\'ll keep you updated every 30 minutes until we have this resolved. We should have a fix within the next 2 hours.',
      type: 'text',
      sender: 'agent',
      timestamp: new Date('2024-01-13T13:19:00'),
      status: 'read'
    },
    {
      id: '5',
      conversationId: '7',
      content: 'The integration with our CRM is failing. Can someone look into this urgently?',
      type: 'text',
      sender: 'customer',
      timestamp: new Date('2024-01-13T13:20:00'),
      status: 'read'
    }
  ],
  '8': [ // Robert Kim - Quote Request
    {
      id: '1',
      conversationId: '8',
      content: 'Hi! We\'re looking to expand our team and need pricing for additional user licenses. Currently we have 25 users.',
      type: 'text',
      sender: 'customer',
      timestamp: new Date('2024-01-12T16:05:00'),
      status: 'read'
    },
    {
      id: '2',
      conversationId: '8',
      content: 'Hello Robert! That\'s great news about your team expansion. How many additional users are you looking to add?',
      type: 'text',
      sender: 'agent',
      timestamp: new Date('2024-01-12T16:06:00'),
      status: 'read'
    },
    {
      id: '3',
      conversationId: '8',
      content: 'We\'re planning to add 50 more users over the next quarter. We\'d like to understand the pricing structure and any volume discounts available.',
      type: 'text',
      sender: 'customer',
      timestamp: new Date('2024-01-12T16:08:00'),
      status: 'read'
    },
    {
      id: '4',
      conversationId: '8',
      content: 'Perfect! With 75 total users, you\'ll qualify for our volume discount tier. Let me prepare a detailed quote with pricing options and send it to you within the hour.',
      type: 'text',
      sender: 'agent',
      timestamp: new Date('2024-01-12T16:09:00'),
      status: 'read'
    },
    {
      id: '5',
      conversationId: '8',
      content: 'Could you provide a quote for 50 additional user licenses?',
      type: 'text',
      sender: 'customer',
      timestamp: new Date('2024-01-12T16:10:00'),
      status: 'read'
    }
  ]
};

const defaultMessages: Message[] = [
  {
    id: '1',
    conversationId: 'default',
    content: 'Hello! How can I help you today?',
    type: 'text',
    sender: 'customer',
    timestamp: new Date('2024-01-15T12:00:00'),
    status: 'read'
  },
  {
    id: '2',
    conversationId: 'default',
    content: 'Hi! I\'m here to help. What can I assist you with?',
    type: 'text',
    sender: 'agent',
    timestamp: new Date('2024-01-15T12:01:00'),
    status: 'read'
  }
];

export default function ChatInterface() {
  const { selectedConversation, chatMode } = useApp();
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<Message[]>(() => {
    if (selectedConversation) {
      return conversationSets[selectedConversation.id] || defaultMessages;
    }
    return defaultMessages;
  });
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Update messages when conversation changes
  useEffect(() => {
    if (selectedConversation) {
      setMessages(conversationSets[selectedConversation.id] || defaultMessages);
    }
  }, [selectedConversation]);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;
    
    const newMessage: Message = {
      id: Date.now().toString(),
      conversationId: selectedConversation?.id || '1',
      content: message,
      type: 'text',
      sender: 'agent',
      timestamp: new Date(),
      status: 'sent'
    };

    setMessages(prev => [...prev, newMessage]);
    setMessage('');
    
    // Auto-resize textarea
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
    }

    // Simulate customer response after 2 seconds
    setTimeout(() => {
      setIsTyping(true);
      setTimeout(() => {
        const responses = [
          'Thank you for your help!',
          'That sounds great, when can we proceed?',
          'I appreciate the quick response.',
          'Perfect, that is exactly what I needed.',
          'Could you send me more details about this?'
        ];
        
        const customerResponse: Message = {
          id: (Date.now() + 1).toString(),
          conversationId: selectedConversation?.id || '1',
          content: responses[Math.floor(Math.random() * responses.length)],
          type: 'text',
          sender: 'customer',
          timestamp: new Date(),
          status: 'read'
        };
        
        setMessages(prev => [...prev, customerResponse]);
        setIsTyping(false);
      }, 1500);
    }, 2000);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage(e);
    }
  };

  const handleTextareaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMessage(e.target.value);
    
    // Auto-resize textarea
    const textarea = e.target;
    textarea.style.height = 'auto';
    textarea.style.height = Math.min(textarea.scrollHeight, 120) + 'px';
  };

  const insertQuickReply = (reply: string) => {
    setMessage(reply);
    textareaRef.current?.focus();
  };

  const quickReplies = chatMode.id === 'customer_service' 
    ? [
        'Thank you for contacting us!',
        'I\'ll check on that for you right away.',
        'Your order is being processed.',
        'Is there anything else I can help you with?'
      ]
    : [
        'I\'d be happy to show you our products.',
        'Let me schedule a call for you.',
        'I\'ll send you our catalog.',
        'Would you like to see our pricing?'
      ];

  if (!selectedConversation) return null;

  return (
    <div className="flex flex-col h-full">
      {/* Chat Header */}
      <div className="bg-white border-b px-4 py-3 md:px-6 md:py-4 shadow-sm" style={{ borderColor: 'var(--cu-gray-200)' }}>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 md:w-10 md:h-10 bg-gradient-to-r from-blue-700 to-blue-900 rounded-full flex items-center justify-center">
              <span className="font-medium text-white text-sm">
                {selectedConversation.customerName.charAt(0)}
              </span>
            </div>
            <div>
              <h3 className="font-semibold text-sm md:text-base" style={{ color: 'var(--cu-gray-800)' }}>{selectedConversation.customerName}</h3>
              <p className="text-sm" style={{ color: 'var(--cu-gray-600)' }}>
                {selectedConversation.status === 'active' ? (
                  <span className="flex items-center">
                    <span className="w-2 h-2 rounded-full mr-2" style={{ backgroundColor: 'var(--cu-success)' }}></span>
                    Online
                  </span>
                ) : 'Last seen 2h ago'}
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <button className="cu-btn-secondary p-2 hidden md:block">
              <Phone className="h-5 w-5" />
            </button>
            <button className="cu-btn-secondary p-2 hidden md:block">
              <Video className="h-5 w-5" />
            </button>
            <div className="relative">
              <button className="cu-btn-secondary p-2">
                <MoreVertical className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Replies Bar */}
      <div className="border-b px-4 py-2 md:px-6 md:py-3 bg-blue-50 overflow-x-auto" style={{ borderColor: 'var(--cu-gray-200)' }}>
        <div className="flex items-center space-x-2 overflow-x-auto">
          <span className="text-xs md:text-sm whitespace-nowrap text-blue-700 hidden md:inline">Quick replies:</span>
          {quickReplies.map((reply, index) => (
            <button
              key={index}
              onClick={() => insertQuickReply(reply)}
              className="px-2 md:px-3 py-1 rounded-full text-xs md:text-sm whitespace-nowrap bg-white border border-blue-200 text-blue-700 hover:bg-blue-50 transition-colors flex-shrink-0"
            >
              {reply}
            </button>
          ))}
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-3 md:p-4 space-y-3 pb-20 md:pb-4" style={{ backgroundColor: 'var(--cu-gray-50)' }}>
        <div className="max-w-full md:max-w-2xl mx-auto space-y-4">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={clsx(
              'flex',
              msg.sender === 'agent' ? 'justify-end' : 'justify-start'
            )}
          >
            <div
              className={clsx(
                'max-w-xs md:max-w-sm px-3 md:px-4 py-2 md:py-3 rounded-2xl shadow-sm transition-all duration-200',
                msg.sender === 'agent'
                  ? 'text-white rounded-br-md'
                  : 'cu-card rounded-bl-md'
              )}
              style={{
                backgroundColor: msg.sender === 'agent' ? '#1e40af' : undefined,
                color: msg.sender === 'agent' ? 'white' : 'var(--cu-gray-800)'
              }}
            >
              <p className="text-sm leading-relaxed">{msg.content}</p>
              <div className="flex items-center justify-between mt-1">
                <p
                  className={clsx(
                    'text-xs',
                    msg.sender === 'agent' ? 'text-white opacity-75' : ''
                  )}
                  style={{ color: msg.sender === 'agent' ? undefined : 'var(--cu-gray-500)' }}
                >
                  {format(msg.timestamp, 'HH:mm')}
                </p>
                {msg.sender === 'agent' && (
                  <div className="flex items-center space-x-1">
                    <div className={clsx(
                      'w-3 h-3 rounded-full',
                      msg.status === 'read' ? 'bg-white opacity-50' : 'bg-white opacity-75'
                    )}></div>
                    {msg.status === 'read' && (
                      <div className="w-3 h-3 rounded-full bg-white opacity-50"></div>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
        
        {/* Typing Indicator */}
        {isTyping && (
          <div className="flex justify-start">
            <div className="cu-card rounded-2xl rounded-bl-md px-4 py-3">
              <div className="flex space-x-1">
                <div className="w-2 h-2 rounded-full animate-bounce" style={{ backgroundColor: 'var(--cu-gray-400)' }}></div>
                <div className="w-2 h-2 rounded-full animate-bounce" style={{ backgroundColor: 'var(--cu-gray-400)', animationDelay: '0.1s' }}></div>
                <div className="w-2 h-2 rounded-full animate-bounce" style={{ backgroundColor: 'var(--cu-gray-400)', animationDelay: '0.2s' }}></div>
              </div>
            </div>
          </div>
        )}
        
        <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Message Input */}
      <div className="cu-sidebar border-t p-3 md:p-4 pb-safe" style={{ borderColor: 'var(--cu-gray-200)' }}>
        <form onSubmit={handleSendMessage} className="flex items-end space-x-3">
          <div className="flex-1 relative">
            <textarea
              ref={textareaRef}
              value={message}
              onChange={handleTextareaChange}
              onKeyDown={handleKeyDown}
              placeholder="Type your message..."
              rows={1}
              className="cu-input w-full resize-none px-3 md:px-4 py-2 md:py-3 pr-16 md:pr-20 rounded-2xl text-sm"
              style={{ minHeight: '44px', maxHeight: '120px' }}
            />
            <div className="absolute bottom-2 right-2 flex items-center space-x-1">
              <button
                type="button"
                className="p-1.5 rounded-full transition-colors hover:bg-gray-100"
                style={{ color: 'var(--cu-gray-500)' }}
                title="Attach file"
              >
                <Paperclip className="h-4 w-4" />
              </button>
              <button
                type="button"
                className="p-1.5 rounded-full transition-colors hover:bg-gray-100"
                style={{ color: 'var(--cu-gray-500)' }}
                title="Add emoji"
              >
                <Smile className="h-4 w-4" />
              </button>
            </div>
          </div>
          <button
            type="submit"
            disabled={!message.trim()}
            className="cu-btn-primary p-2 md:p-3 rounded-full disabled:opacity-50 disabled:cursor-not-allowed"
            title="Send message"
          >
            <Send className="h-4 w-4 md:h-5 md:w-5" />
          </button>
        </form>
        
        {/* Mode-specific actions */}
        <div className="flex items-center justify-between mt-2 md:mt-3 pt-2 md:pt-3 border-t overflow-x-auto" style={{ borderColor: 'var(--cu-gray-100)' }}>
          <div className="flex items-center space-x-2 text-xs md:text-sm whitespace-nowrap" style={{ color: 'var(--cu-gray-600)' }}>
            <span>Mode: {chatMode.name}</span>
          </div>
          <div className="flex items-center space-x-1 md:space-x-2">
            {chatMode.id === 'sales_lead' ? (
              <>
                <button className="cu-badge-success px-2 md:px-3 py-1 rounded-full text-xs md:text-sm whitespace-nowrap">
                  Send Catalog
                </button>
                <button className="cu-badge-primary px-2 md:px-3 py-1 rounded-full text-xs md:text-sm whitespace-nowrap">
                  Book Meeting
                </button>
                <button className="cu-badge-primary px-2 md:px-3 py-1 rounded-full text-xs md:text-sm whitespace-nowrap">
                  Create Invoice
                </button>
              </>
            ) : (
              <>
                <button className="cu-badge-warning px-2 md:px-3 py-1 rounded-full text-xs md:text-sm whitespace-nowrap">
                  Order Status
                </button>
                <button className="cu-badge-success px-2 md:px-3 py-1 rounded-full text-xs md:text-sm whitespace-nowrap">
                  FAQ
                </button>
                <button className="cu-badge-danger px-2 md:px-3 py-1 rounded-full text-xs md:text-sm whitespace-nowrap">
                  Escalate
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}