import { Request, Response } from 'express';
import { WhatsAppWebhookPayload, WhatsAppMessage } from '../types/index.js';
import whatsappService from '../services/whatsapp.service.js';
import llmService from '../services/llm.service.js';
import sessionService from '../services/session.service.js';

export class WebhookController {
  // Verify webhook (GET request from WhatsApp)
  async verifyWebhook(req: Request, res: Response): Promise<void> {
    try {
      const mode = req.query['hub.mode'];
      const token = req.query['hub.verify_token'];
      const challenge = req.query['hub.challenge'];

      if (mode && token) {
        const verifiedChallenge = whatsappService.verifyWebhook(
          mode as string,
          token as string,
          challenge as string
        );

        if (verifiedChallenge) {
          res.status(200).send(verifiedChallenge);
          return;
        }
      }

      res.sendStatus(403);
    } catch (error) {
      console.error('Error verifying webhook:', error);
      res.sendStatus(500);
    }
  }

  // Handle incoming messages (POST request from WhatsApp)
  async handleWebhook(req: Request, res: Response): Promise<void> {
    try {
      const payload: WhatsAppWebhookPayload = req.body;

      // Respond quickly to WhatsApp (required)
      res.sendStatus(200);

      // Process the webhook payload asynchronously
      this.processWebhookPayload(payload).catch((error) => {
        console.error('Error processing webhook payload:', error);
      });
    } catch (error) {
      console.error('Error handling webhook:', error);
      res.sendStatus(500);
    }
  }

  private async processWebhookPayload(payload: WhatsAppWebhookPayload): Promise<void> {
    if (payload.object !== 'whatsapp_business_account') {
      console.log('Not a WhatsApp business account webhook');
      return;
    }

    for (const entry of payload.entry) {
      for (const change of entry.changes) {
        if (change.field !== 'messages') {
          continue;
        }

        const { messages, contacts } = change.value;

        if (!messages || messages.length === 0) {
          continue;
        }

        for (const message of messages) {
          await this.processMessage(message, contacts?.[0]?.profile?.name);
        }
      }
    }
  }

  private async processMessage(message: WhatsAppMessage, customerName?: string): Promise<void> {
    try {
      // Only process text messages for now
      if (message.type !== 'text') {
        console.log(`Unsupported message type: ${message.type}`);
        return;
      }

      const phoneNumber = message.from;
      const messageText = message.text.body;

      console.log(`Received message from ${phoneNumber}: ${messageText}`);

      // Mark message as read
      await whatsappService.markMessageAsRead(message.id);

      // Get or create session
      const session = sessionService.createOrUpdateSession(phoneNumber, customerName);

      // Add user message to context
      sessionService.addMessageToContext(phoneNumber, 'user', messageText);

      // Generate LLM response
      const llmResponse = await llmService.generateResponse({
        message: messageText,
        conversationId: session.conversationId,
        context: session.context,
      });

      // Add assistant response to context
      sessionService.addMessageToContext(phoneNumber, 'assistant', llmResponse.reply);

      // Send response via WhatsApp
      await whatsappService.sendMessage(phoneNumber, llmResponse.reply);

      console.log(`Sent response to ${phoneNumber}: ${llmResponse.reply}`);
    } catch (error) {
      console.error('Error processing message:', error);
      
      // Send fallback error message
      try {
        await whatsappService.sendMessage(
          message.from,
          'I apologize, but I encountered an error processing your message. Please try again or contact our support team.'
        );
      } catch (sendError) {
        console.error('Error sending fallback message:', sendError);
      }
    }
  }
}

export default new WebhookController();
