export interface WhatsAppMessage {
  from: string;
  id: string;
  timestamp: string;
  text: {
    body: string;
  };
  type: 'text' | 'image' | 'document' | 'audio' | 'video';
}

export interface WhatsAppWebhookPayload {
  object: string;
  entry: Array<{
    id: string;
    changes: Array<{
      value: {
        messaging_product: string;
        metadata: {
          display_phone_number: string;
          phone_number_id: string;
        };
        contacts?: Array<{
          profile: {
            name: string;
          };
          wa_id: string;
        }>;
        messages?: WhatsAppMessage[];
      };
      field: string;
    }>;
  }>;
}

export interface LLMRequest {
  message: string;
  conversationId: string;
  context?: ConversationContext;
}

export interface LLMResponse {
  reply: string;
  conversationId: string;
  metadata?: {
    model: string;
    tokens: number;
    timestamp: Date;
  };
}

export interface ConversationContext {
  customerName?: string;
  previousMessages: Array<{
    role: 'user' | 'assistant' | 'system';
    content: string;
    timestamp: Date;
  }>;
  businessContext?: string;
  intent?: string;
}

export interface WhatsAppOutgoingMessage {
  messaging_product: string;
  recipient_type: string;
  to: string;
  type: string;
  text: {
    preview_url: boolean;
    body: string;
  };
}

export interface SessionData {
  conversationId: string;
  phoneNumber: string;
  customerName?: string;
  context: ConversationContext;
  lastActivity: Date;
  active: boolean;
}

export interface APIResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}
