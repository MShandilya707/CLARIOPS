import OpenAI from 'openai';
import { config } from '../config/index.js';
import { LLMRequest, LLMResponse, ConversationContext } from '../types/index.js';

export class LLMService {
  private openai: OpenAI;

  constructor() {
    if (!config.openai.apiKey) {
      console.warn('Warning: OpenAI API key not configured. LLM features will be disabled.');
      this.openai = null as any;
    } else {
      this.openai = new OpenAI({
        apiKey: config.openai.apiKey,
      });
    }
  }

  async generateResponse(request: LLMRequest): Promise<LLMResponse> {
    if (!this.openai) {
      // Fallback response when OpenAI is not configured
      return {
        reply: "Thank you for your message. Our team will get back to you shortly.",
        conversationId: request.conversationId,
        metadata: {
          model: 'fallback',
          tokens: 0,
          timestamp: new Date(),
        },
      };
    }

    try {
      const messages = this.buildMessages(request.message, request.context);

      const completion = await this.openai.chat.completions.create({
        model: config.openai.model,
        messages,
        temperature: 0.7,
        max_tokens: 500,
      });

      const reply = completion.choices[0]?.message?.content || 
                    'I apologize, but I couldn\'t generate a response. Please try again.';

      return {
        reply,
        conversationId: request.conversationId,
        metadata: {
          model: config.openai.model,
          tokens: completion.usage?.total_tokens || 0,
          timestamp: new Date(),
        },
      };
    } catch (error) {
      console.error('Error generating LLM response:', error);
      throw new Error('Failed to generate response from LLM');
    }
  }

  private buildMessages(
    message: string,
    context?: ConversationContext
  ): Array<{ role: 'system' | 'user' | 'assistant'; content: string }> {
    const messages: Array<{ role: 'system' | 'user' | 'assistant'; content: string }> = [];

    // System prompt
    const systemPrompt = `You are a helpful customer service assistant for ClariOps, a comprehensive business management platform. 
You help customers with:
- Customer service inquiries
- Sales and lead management
- Product information and features
- Pricing and subscriptions
- Technical support

Be professional, friendly, and concise. If you don't know something, acknowledge it and offer to connect them with a human agent.`;

    messages.push({
      role: 'system',
      content: systemPrompt,
    });

    // Add conversation history
    if (context?.previousMessages && context.previousMessages.length > 0) {
      // Include last 5 messages for context
      const recentMessages = context.previousMessages.slice(-5);
      for (const msg of recentMessages) {
        messages.push({
          role: msg.role === 'user' ? 'user' : 'assistant',
          content: msg.content,
        });
      }
    }

    // Add current message
    messages.push({
      role: 'user',
      content: message,
    });

    return messages;
  }
}

export default new LLMService();
