# Usage Guide

This guide shows practical examples of using the ClariOps API.

## Table of Contents
- [Basic Setup](#basic-setup)
- [Testing Without WhatsApp](#testing-without-whatsapp)
- [WhatsApp Integration](#whatsapp-integration)
- [Customizing the LLM](#customizing-the-llm)
- [Common Use Cases](#common-use-cases)
- [Best Practices](#best-practices)

## Basic Setup

### 1. Install and Start

```bash
cd server
npm install
cp .env.example .env
# Edit .env with your credentials
npm run dev
```

### 2. Verify Server is Running

```bash
curl http://localhost:3001/api/health
```

Expected output:
```json
{
  "success": true,
  "message": "ClariOps API is running",
  "data": {
    "timestamp": "2024-01-15T12:00:00.000Z",
    "status": "healthy"
  }
}
```

## Testing Without WhatsApp

You can test the LLM functionality without WhatsApp credentials.

### Generate a Response

```bash
curl -X POST http://localhost:3001/api/generate-response \
  -H "Content-Type: application/json" \
  -d '{
    "message": "What are your pricing plans?",
    "conversationId": "test_123"
  }'
```

Response (without OpenAI key):
```json
{
  "success": true,
  "data": {
    "reply": "Thank you for your message. Our team will get back to you shortly.",
    "conversationId": "test_123",
    "metadata": {
      "model": "fallback",
      "tokens": 0,
      "timestamp": "2024-01-15T12:00:00.000Z"
    }
  }
}
```

Response (with OpenAI key):
```json
{
  "success": true,
  "data": {
    "reply": "We offer three pricing plans: Starter at $29/month, Professional at $79/month, and Enterprise with custom pricing. Each plan includes...",
    "conversationId": "test_123",
    "metadata": {
      "model": "gpt-3.5-turbo",
      "tokens": 150,
      "timestamp": "2024-01-15T12:00:00.000Z"
    }
  }
}
```

### Test with Conversation Context

```bash
curl -X POST http://localhost:3001/api/generate-response \
  -H "Content-Type: application/json" \
  -d '{
    "message": "What about discounts?",
    "conversationId": "test_123",
    "context": {
      "previousMessages": [
        {
          "role": "user",
          "content": "What are your pricing plans?",
          "timestamp": "2024-01-15T12:00:00.000Z"
        },
        {
          "role": "assistant",
          "content": "We offer three plans: Starter, Professional, and Enterprise.",
          "timestamp": "2024-01-15T12:00:05.000Z"
        }
      ]
    }
  }'
```

## WhatsApp Integration

### Setup WhatsApp Webhook

1. **Get a public URL:**

For development (using ngrok):
```bash
ngrok http 3001
```

For production, deploy to a cloud platform with HTTPS.

2. **Configure in Meta Developer Console:**
   - Go to https://developers.facebook.com
   - Navigate to your app → WhatsApp → Configuration
   - Set Webhook URL: `https://your-domain.com/webhook`
   - Set Verify Token: (must match `WHATSAPP_WEBHOOK_VERIFY_TOKEN` in `.env`)
   - Subscribe to: `messages`

3. **Verify webhook:**

Meta will call:
```
GET /webhook?hub.mode=subscribe&hub.verify_token=YOUR_TOKEN&hub.challenge=RANDOM_STRING
```

Test locally:
```bash
curl "http://localhost:3001/webhook?hub.mode=subscribe&hub.verify_token=your_webhook_verify_token&hub.challenge=test123"
```

Should return: `test123`

### Send a WhatsApp Message

```bash
curl -X POST http://localhost:3001/api/send-message \
  -H "Content-Type: application/json" \
  -d '{
    "phoneNumber": "1234567890",
    "message": "Hello from ClariOps! How can I help you today?"
  }'
```

Response:
```json
{
  "success": true,
  "message": "Message sent successfully",
  "data": {
    "messaging_product": "whatsapp",
    "contacts": [{ "input": "1234567890", "wa_id": "1234567890" }],
    "messages": [{ "id": "wamid.XXX" }]
  }
}
```

### Simulate Incoming Webhook

Test webhook handling:

```bash
curl -X POST http://localhost:3001/webhook \
  -H "Content-Type: application/json" \
  -d @server/examples/webhook-test.json
```

The server will:
1. Receive the message
2. Create/update session
3. Generate LLM response
4. Send reply via WhatsApp

## Customizing the LLM

### 1. Edit System Prompt

Open `server/src/services/llm.service.ts` and modify:

```typescript
const systemPrompt = `You are a helpful customer service assistant for ClariOps.

Your personality:
- Professional but friendly
- Concise and clear
- Patient and understanding

You can help with:
- Product information
- Pricing and plans
- Technical support
- General inquiries

If you don't know something, offer to connect them with a human agent.

Important: Always maintain customer privacy and don't share sensitive information.`;
```

### 2. Adjust Response Parameters

In the same file, modify:

```typescript
const completion = await this.openai.chat.completions.create({
  model: config.openai.model,
  messages,
  temperature: 0.7,  // Creativity: 0 (precise) to 1 (creative)
  max_tokens: 500,   // Max response length
  presence_penalty: 0,  // Avoid repetition
  frequency_penalty: 0  // Avoid word repetition
});
```

### 3. Add Business Context

Include dynamic business context:

```typescript
if (context?.businessContext) {
  messages.push({
    role: 'system',
    content: `Additional context: ${context.businessContext}`
  });
}
```

Usage:
```bash
curl -X POST http://localhost:3001/api/generate-response \
  -H "Content-Type: application/json" \
  -d '{
    "message": "Do you have any promotions?",
    "conversationId": "test_123",
    "context": {
      "businessContext": "Current promotion: 20% off all plans for new customers. Code: WELCOME20",
      "previousMessages": []
    }
  }'
```

## Common Use Cases

### Use Case 1: Customer Support

**Scenario:** Customer asks about a technical issue

```typescript
// Customize system prompt for support
const systemPrompt = `You are a technical support agent for ClariOps.

When handling issues:
1. Ask clarifying questions
2. Provide step-by-step solutions
3. If issue persists, collect details and escalate

Common issues:
- Login problems → Reset password
- Payment issues → Check payment method
- Integration errors → Verify API credentials`;
```

### Use Case 2: Sales Assistant

**Scenario:** Potential customer inquiring about features

```typescript
const systemPrompt = `You are a sales assistant for ClariOps.

Your goal:
- Understand customer needs
- Recommend appropriate plan
- Highlight relevant features
- Create urgency (limited-time offers)
- Collect contact info for follow-up

Features to highlight:
- WhatsApp integration
- AI-powered responses
- Multi-channel support
- Analytics dashboard`;
```

### Use Case 3: Appointment Booking

**Scenario:** Customer wants to schedule a demo

```typescript
const systemPrompt = `You are a scheduling assistant for ClariOps.

When booking appointments:
1. Offer available time slots
2. Confirm customer timezone
3. Collect necessary details (name, company, phone)
4. Send confirmation message

Available slots: Mon-Fri, 9 AM - 5 PM EST
Demo duration: 30 minutes`;
```

### Use Case 4: Lead Qualification

**Scenario:** Qualify leads before human handoff

```typescript
const systemPrompt = `You are a lead qualification assistant.

Gather this information:
1. Company name and size
2. Current solution (if any)
3. Pain points
4. Budget range
5. Decision timeline
6. Decision maker contact

Score leads as:
- Hot: Budget > $1000/mo, timeline < 1 month
- Warm: Budget > $500/mo, timeline < 3 months
- Cold: Others

Route hot leads to sales immediately.`;
```

## Session Management

### Check Active Session

```bash
curl http://localhost:3001/api/session/1234567890
```

Response:
```json
{
  "success": true,
  "data": {
    "conversationId": "conv_1234567890_abc123",
    "phoneNumber": "1234567890",
    "customerName": "John Doe",
    "context": {
      "previousMessages": [
        {
          "role": "user",
          "content": "Hello",
          "timestamp": "2024-01-15T12:00:00.000Z"
        },
        {
          "role": "assistant",
          "content": "Hi! How can I help you?",
          "timestamp": "2024-01-15T12:00:05.000Z"
        }
      ]
    },
    "lastActivity": "2024-01-15T12:00:05.000Z",
    "active": true
  }
}
```

## Best Practices

### 1. Error Handling

Always wrap API calls:

```javascript
try {
  const response = await fetch('http://localhost:3001/api/generate-response', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ message, conversationId })
  });
  
  const data = await response.json();
  
  if (!data.success) {
    console.error('API error:', data.error);
    // Handle error appropriately
  }
  
  return data.data;
} catch (error) {
  console.error('Network error:', error);
  // Fallback behavior
}
```

### 2. Rate Limiting

Implement rate limiting for your use case:

```javascript
const messageQueue = [];
const RATE_LIMIT = 10; // messages per minute

async function sendMessageWithRateLimit(phoneNumber, message) {
  if (messageQueue.length >= RATE_LIMIT) {
    await new Promise(resolve => setTimeout(resolve, 60000));
    messageQueue.length = 0;
  }
  
  messageQueue.push({ phoneNumber, message, timestamp: Date.now() });
  
  // Send message
  return await sendMessage(phoneNumber, message);
}
```

### 3. Message Validation

Validate messages before sending:

```javascript
function validateMessage(message) {
  // Check length
  if (message.length > 4096) {
    throw new Error('Message too long');
  }
  
  // Check for forbidden content
  const forbiddenPatterns = [/* patterns */];
  for (const pattern of forbiddenPatterns) {
    if (pattern.test(message)) {
      throw new Error('Message contains forbidden content');
    }
  }
  
  return true;
}
```

### 4. Context Management

Keep context relevant:

```javascript
function buildContext(messages, maxMessages = 10) {
  // Only include recent messages
  const recentMessages = messages.slice(-maxMessages);
  
  // Summarize older messages if needed
  if (messages.length > maxMessages) {
    return {
      previousMessages: recentMessages,
      summary: `Previous conversation: ${messages.length} messages exchanged about ${topic}`
    };
  }
  
  return { previousMessages: recentMessages };
}
```

### 5. Monitoring

Log important events:

```javascript
function logConversation(phoneNumber, message, response) {
  console.log(JSON.stringify({
    timestamp: new Date().toISOString(),
    phoneNumber: phoneNumber.slice(-4), // Last 4 digits only
    messageLength: message.length,
    responseLength: response.length,
    model: response.metadata.model,
    tokens: response.metadata.tokens
  }));
}
```

## Testing

### Run Test Suite

```bash
cd server/examples
chmod +x test-api.sh
./test-api.sh
```

### Use Postman Collection

1. Import `server/examples/postman-collection.json`
2. Set environment variables
3. Run collection

### Manual Testing Checklist

- [ ] Health check responds
- [ ] LLM generates responses
- [ ] Webhook verification works
- [ ] Incoming webhooks process correctly
- [ ] Messages send successfully
- [ ] Sessions are created and managed
- [ ] Error handling works as expected
- [ ] Logs are informative

## Troubleshooting

### Issue: No response from LLM

**Solution:**
1. Check OpenAI API key is set
2. Verify API key has credits
3. Check rate limits
4. Review error logs

### Issue: WhatsApp messages not arriving

**Solution:**
1. Verify webhook URL is accessible
2. Check HTTPS is enabled
3. Confirm verify token matches
4. Review Meta Console webhook status

### Issue: Sessions not persisting

**Solution:**
1. Check server isn't restarting frequently
2. Verify session timeout settings
3. Consider implementing database storage

## Advanced Features

### Add Media Support

```typescript
// In whatsapp.service.ts
async sendImage(to: string, imageUrl: string, caption?: string) {
  const payload = {
    messaging_product: 'whatsapp',
    recipient_type: 'individual',
    to,
    type: 'image',
    image: {
      link: imageUrl,
      caption: caption
    }
  };
  
  return await this.sendToWhatsApp(payload);
}
```

### Implement Templates

```typescript
async sendTemplate(to: string, templateName: string, parameters: any[]) {
  const payload = {
    messaging_product: 'whatsapp',
    to,
    type: 'template',
    template: {
      name: templateName,
      language: { code: 'en' },
      components: [
        {
          type: 'body',
          parameters: parameters
        }
      ]
    }
  };
  
  return await this.sendToWhatsApp(payload);
}
```

### Add Analytics

```typescript
interface Analytics {
  totalMessages: number;
  averageResponseTime: number;
  customerSatisfaction: number;
  topQuestions: string[];
}

class AnalyticsService {
  async trackMessage(conversationId: string, duration: number) {
    // Store metrics
  }
  
  async getAnalytics(startDate: Date, endDate: Date): Promise<Analytics> {
    // Return analytics
  }
}
```

## Next Steps

1. **Customize** the system prompt for your business
2. **Test** thoroughly with different scenarios
3. **Monitor** conversations and responses
4. **Iterate** based on customer feedback
5. **Scale** as your needs grow

## Resources

- [OpenAI API Documentation](https://platform.openai.com/docs)
- [WhatsApp Business API Docs](https://developers.facebook.com/docs/whatsapp)
- [ClariOps GitHub Repository](https://github.com/MShandilya707/CLARIOPS)
