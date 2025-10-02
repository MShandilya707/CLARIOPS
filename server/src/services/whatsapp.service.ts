import axios from 'axios';
import { config } from '../config/index.js';
import { WhatsAppOutgoingMessage } from '../types/index.js';

export class WhatsAppService {
  private apiUrl: string;
  private accessToken: string;
  private phoneNumberId: string;

  constructor() {
    this.apiUrl = config.whatsapp.apiUrl;
    this.accessToken = config.whatsapp.accessToken;
    this.phoneNumberId = config.whatsapp.phoneNumberId;
  }

  async sendMessage(to: string, message: string): Promise<any> {
    if (!this.accessToken || !this.phoneNumberId) {
      console.warn('WhatsApp credentials not configured. Message not sent.');
      return { success: false, error: 'WhatsApp not configured' };
    }

    try {
      const payload: WhatsAppOutgoingMessage = {
        messaging_product: 'whatsapp',
        recipient_type: 'individual',
        to,
        type: 'text',
        text: {
          preview_url: false,
          body: message,
        },
      };

      const url = `${this.apiUrl}/${this.phoneNumberId}/messages`;
      
      const response = await axios.post(url, payload, {
        headers: {
          'Authorization': `Bearer ${this.accessToken}`,
          'Content-Type': 'application/json',
        },
      });

      return response.data;
    } catch (error) {
      console.error('Error sending WhatsApp message:', error);
      if (axios.isAxiosError(error)) {
        console.error('Response data:', error.response?.data);
      }
      throw new Error('Failed to send WhatsApp message');
    }
  }

  async markMessageAsRead(messageId: string): Promise<void> {
    if (!this.accessToken || !this.phoneNumberId) {
      return;
    }

    try {
      const url = `${this.apiUrl}/${this.phoneNumberId}/messages`;
      
      await axios.post(
        url,
        {
          messaging_product: 'whatsapp',
          status: 'read',
          message_id: messageId,
        },
        {
          headers: {
            'Authorization': `Bearer ${this.accessToken}`,
            'Content-Type': 'application/json',
          },
        }
      );
    } catch (error) {
      console.error('Error marking message as read:', error);
    }
  }

  verifyWebhook(mode: string, token: string, challenge: string): string | null {
    const verifyToken = config.whatsapp.webhookVerifyToken;
    
    if (mode === 'subscribe' && token === verifyToken) {
      console.log('Webhook verified successfully');
      return challenge;
    }
    
    console.log('Webhook verification failed');
    return null;
  }
}

export default new WhatsAppService();
