import { Request, Response } from 'express';
import { APIResponse } from '../types/index.js';
import sessionService from '../services/session.service.js';
import llmService from '../services/llm.service.js';
import whatsappService from '../services/whatsapp.service.js';

export class ApiController {
  // Health check endpoint
  async healthCheck(req: Request, res: Response): Promise<void> {
    const response: APIResponse = {
      success: true,
      message: 'ClariOps API is running',
      data: {
        timestamp: new Date().toISOString(),
        status: 'healthy',
      },
    };
    res.json(response);
  }

  // Send a message programmatically (for testing or internal use)
  async sendMessage(req: Request, res: Response): Promise<void> {
    try {
      const { phoneNumber, message } = req.body;

      if (!phoneNumber || !message) {
        const response: APIResponse = {
          success: false,
          error: 'phoneNumber and message are required',
        };
        res.status(400).json(response);
        return;
      }

      const result = await whatsappService.sendMessage(phoneNumber, message);

      const response: APIResponse = {
        success: true,
        message: 'Message sent successfully',
        data: result,
      };
      res.json(response);
    } catch (error) {
      console.error('Error sending message:', error);
      const response: APIResponse = {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to send message',
      };
      res.status(500).json(response);
    }
  }

  // Get conversation context for a phone number
  async getSession(req: Request, res: Response): Promise<void> {
    try {
      const { phoneNumber } = req.params;

      if (!phoneNumber) {
        const response: APIResponse = {
          success: false,
          error: 'phoneNumber is required',
        };
        res.status(400).json(response);
        return;
      }

      const session = sessionService.getSession(phoneNumber);

      if (!session) {
        const response: APIResponse = {
          success: false,
          error: 'Session not found',
        };
        res.status(404).json(response);
        return;
      }

      const response: APIResponse = {
        success: true,
        data: session,
      };
      res.json(response);
    } catch (error) {
      console.error('Error getting session:', error);
      const response: APIResponse = {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to get session',
      };
      res.status(500).json(response);
    }
  }

  // Generate LLM response (for testing)
  async generateResponse(req: Request, res: Response): Promise<void> {
    try {
      const { message, conversationId, context } = req.body;

      if (!message || !conversationId) {
        const response: APIResponse = {
          success: false,
          error: 'message and conversationId are required',
        };
        res.status(400).json(response);
        return;
      }

      const llmResponse = await llmService.generateResponse({
        message,
        conversationId,
        context,
      });

      const response: APIResponse = {
        success: true,
        data: llmResponse,
      };
      res.json(response);
    } catch (error) {
      console.error('Error generating response:', error);
      const response: APIResponse = {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to generate response',
      };
      res.status(500).json(response);
    }
  }
}

export default new ApiController();
