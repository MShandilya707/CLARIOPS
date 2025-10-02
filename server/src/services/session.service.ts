import { SessionData, ConversationContext } from '../types/index.js';
import { config } from '../config/index.js';

export class SessionService {
  private sessions: Map<string, SessionData>;
  private cleanupInterval: NodeJS.Timeout;

  constructor() {
    this.sessions = new Map();
    
    // Cleanup inactive sessions every 5 minutes
    this.cleanupInterval = setInterval(() => {
      this.cleanupInactiveSessions();
    }, 5 * 60 * 1000);
  }

  getSession(phoneNumber: string): SessionData | undefined {
    return this.sessions.get(phoneNumber);
  }

  createOrUpdateSession(phoneNumber: string, customerName?: string): SessionData {
    const existingSession = this.sessions.get(phoneNumber);
    
    if (existingSession) {
      existingSession.lastActivity = new Date();
      existingSession.active = true;
      if (customerName) {
        existingSession.customerName = customerName;
      }
      return existingSession;
    }

    const newSession: SessionData = {
      conversationId: this.generateConversationId(),
      phoneNumber,
      customerName,
      context: {
        previousMessages: [],
      },
      lastActivity: new Date(),
      active: true,
    };

    this.sessions.set(phoneNumber, newSession);
    return newSession;
  }

  addMessageToContext(
    phoneNumber: string,
    role: 'user' | 'assistant' | 'system',
    content: string
  ): void {
    const session = this.sessions.get(phoneNumber);
    if (!session) return;

    session.context.previousMessages.push({
      role,
      content,
      timestamp: new Date(),
    });

    // Keep only last 10 messages to prevent context from growing too large
    if (session.context.previousMessages.length > 10) {
      session.context.previousMessages = session.context.previousMessages.slice(-10);
    }

    session.lastActivity = new Date();
  }

  endSession(phoneNumber: string): void {
    const session = this.sessions.get(phoneNumber);
    if (session) {
      session.active = false;
    }
  }

  private cleanupInactiveSessions(): void {
    const now = new Date();
    const timeoutMs = config.app.sessionTimeoutMinutes * 60 * 1000;

    for (const [phoneNumber, session] of this.sessions.entries()) {
      const inactiveTime = now.getTime() - session.lastActivity.getTime();
      
      if (inactiveTime > timeoutMs) {
        console.log(`Cleaning up inactive session for ${phoneNumber}`);
        this.sessions.delete(phoneNumber);
      }
    }
  }

  private generateConversationId(): string {
    return `conv_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }

  destroy(): void {
    if (this.cleanupInterval) {
      clearInterval(this.cleanupInterval);
    }
  }
}

export default new SessionService();
