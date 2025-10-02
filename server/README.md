# ClariOps API - LLM-WhatsApp Integration

This API server enables integration between Large Language Models (LLM) and WhatsApp Business API, allowing automated customer service responses through WhatsApp.

## Features

- 🤖 **LLM Integration**: Uses OpenAI GPT models to generate intelligent responses
- 📱 **WhatsApp Business API**: Connects to WhatsApp Business Platform for messaging
- 💬 **Conversation Management**: Maintains conversation context and session state
- 🔄 **Webhook Processing**: Handles incoming WhatsApp messages via webhooks
- 🛡️ **Error Handling**: Robust error handling with fallback responses

## Architecture

```
┌──────────────┐         ┌──────────────┐         ┌──────────────┐
│   WhatsApp   │         │  ClariOps    │         │   OpenAI     │
│   Business   │────────▶│     API      │────────▶│     API      │
│     API      │◀────────│   Server     │◀────────│   (GPT-3.5)  │
└──────────────┘         └──────────────┘         └──────────────┘
                               │
                               ▼
                         ┌──────────────┐
                         │   Session    │
                         │  Management  │
                         └──────────────┘
```

## Prerequisites

- Node.js 18+ 
- OpenAI API key
- WhatsApp Business API account (Meta)
- WhatsApp Business phone number

## Installation

1. Navigate to the server directory:
```bash
cd server
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file based on `.env.example`:
```bash
cp .env.example .env
```

4. Configure your environment variables in `.env`:
```env
# Server Configuration
PORT=3001
NODE_ENV=development

# OpenAI Configuration
OPENAI_API_KEY=sk-your-openai-api-key-here
OPENAI_MODEL=gpt-3.5-turbo

# WhatsApp Configuration
WHATSAPP_PHONE_NUMBER_ID=your_phone_number_id
WHATSAPP_BUSINESS_ACCOUNT_ID=your_business_account_id
WHATSAPP_ACCESS_TOKEN=your_whatsapp_access_token
WHATSAPP_WEBHOOK_VERIFY_TOKEN=your_webhook_verify_token

# Application Settings
SESSION_TIMEOUT_MINUTES=30
MAX_MESSAGE_LENGTH=4096
```

## Getting WhatsApp Credentials

1. **Create a Meta Developer Account**: Go to [developers.facebook.com](https://developers.facebook.com)
2. **Create an App**: Select "Business" type
3. **Add WhatsApp Product**: Add WhatsApp to your app
4. **Get Phone Number ID**: Found in WhatsApp > API Setup
5. **Get Access Token**: Generate a permanent token in WhatsApp > API Setup
6. **Configure Webhook**:
   - Webhook URL: `https://your-domain.com/webhook`
   - Verify Token: A random string you choose (set in `.env`)
   - Subscribe to: `messages`

## Usage

### Development Mode

Start the development server with auto-reload:
```bash
npm run dev
```

### Production Mode

Build and run in production:
```bash
npm run build
npm start
```

## API Endpoints

### Webhook Endpoints

#### Verify Webhook (GET /webhook)
WhatsApp will call this endpoint to verify your webhook.

**Query Parameters:**
- `hub.mode`: "subscribe"
- `hub.verify_token`: Your verification token
- `hub.challenge`: Challenge string to echo back

**Response:** Returns the challenge string if verification is successful

#### Handle Incoming Messages (POST /webhook)
Receives incoming WhatsApp messages.

**Request Body:** WhatsApp webhook payload
**Response:** `200 OK` (immediate response required)

### API Endpoints

#### Health Check (GET /api/health)
Check if the API is running.

**Response:**
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

#### Send Message (POST /api/send-message)
Send a WhatsApp message programmatically.

**Request Body:**
```json
{
  "phoneNumber": "1234567890",
  "message": "Hello from ClariOps!"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Message sent successfully",
  "data": {
    "messaging_product": "whatsapp",
    "contacts": [...],
    "messages": [...]
  }
}
```

#### Get Session (GET /api/session/:phoneNumber)
Retrieve conversation session data for a phone number.

**Response:**
```json
{
  "success": true,
  "data": {
    "conversationId": "conv_1234567890_abc123",
    "phoneNumber": "1234567890",
    "customerName": "John Doe",
    "context": {
      "previousMessages": [...]
    },
    "lastActivity": "2024-01-15T12:00:00.000Z",
    "active": true
  }
}
```

#### Generate Response (POST /api/generate-response)
Test LLM response generation.

**Request Body:**
```json
{
  "message": "What are your pricing plans?",
  "conversationId": "test_123",
  "context": {
    "previousMessages": []
  }
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "reply": "Our pricing plans include...",
    "conversationId": "test_123",
    "metadata": {
      "model": "gpt-3.5-turbo",
      "tokens": 150,
      "timestamp": "2024-01-15T12:00:00.000Z"
    }
  }
}
```

## Message Flow

1. **Customer sends WhatsApp message** → WhatsApp Business API
2. **WhatsApp webhook calls** → `POST /webhook`
3. **API receives message** → Webhook Controller
4. **Session retrieved/created** → Session Service
5. **Message sent to LLM** → LLM Service (OpenAI)
6. **Response generated** → GPT-3.5-turbo
7. **Response sent back** → WhatsApp Service
8. **Customer receives reply** → WhatsApp

## Session Management

- Sessions are automatically created when a new phone number sends a message
- Conversation context is maintained for up to 10 messages
- Inactive sessions are cleaned up after 30 minutes (configurable)
- Each session tracks:
  - Conversation ID
  - Phone number
  - Customer name
  - Message history
  - Last activity timestamp

## Error Handling

The API includes comprehensive error handling:

- **LLM Errors**: Falls back to a polite message if OpenAI is unavailable
- **WhatsApp Errors**: Logs errors and attempts to send fallback messages
- **Webhook Errors**: Responds with 200 to WhatsApp, processes asynchronously
- **Network Errors**: Retries with exponential backoff (planned feature)

## Customizing LLM Behavior

Edit the system prompt in `src/services/llm.service.ts`:

```typescript
const systemPrompt = `You are a helpful customer service assistant for ClariOps...`;
```

You can customize:
- Tone and personality
- Business-specific information
- Response guidelines
- Escalation procedures

## Testing

### Test the Health Endpoint
```bash
curl http://localhost:3001/api/health
```

### Test LLM Response Generation
```bash
curl -X POST http://localhost:3001/api/generate-response \
  -H "Content-Type: application/json" \
  -d '{
    "message": "Hello!",
    "conversationId": "test_123"
  }'
```

### Test WhatsApp Integration
1. Configure your WhatsApp webhook URL
2. Send a message to your WhatsApp Business number
3. Check server logs for processing details

## Deployment

### Using ngrok for Development
```bash
# Install ngrok
npm install -g ngrok

# Start your server
npm run dev

# In another terminal, start ngrok
ngrok http 3001

# Use the ngrok URL as your webhook URL in Meta Developer Console
```

### Production Deployment

For production, deploy to:
- **Heroku**: `git push heroku main`
- **AWS EC2**: Use PM2 for process management
- **Google Cloud Run**: Containerize and deploy
- **DigitalOcean**: Use App Platform

Ensure you:
- Set environment variables on the platform
- Use HTTPS for webhook URL
- Enable logging and monitoring
- Set up auto-scaling if needed

## Security Considerations

- ✅ Store API keys in environment variables
- ✅ Verify webhook requests with verify token
- ✅ Use HTTPS in production
- ✅ Implement rate limiting (recommended)
- ✅ Validate incoming webhook payloads
- ✅ Sanitize user inputs before sending to LLM
- ✅ Keep dependencies updated

## Troubleshooting

### Webhook Not Receiving Messages
- Check webhook URL is publicly accessible (use ngrok for development)
- Verify webhook token matches in both `.env` and Meta Console
- Check webhook is subscribed to "messages" field
- Review server logs for errors

### OpenAI Errors
- Verify API key is valid
- Check API quota and usage limits
- Review rate limits on your OpenAI account
- Check network connectivity

### WhatsApp Sending Fails
- Verify phone number format (no spaces, no + symbol)
- Check access token is valid and not expired
- Verify phone number ID is correct
- Review Meta API limits

## Logging

Logs include:
- Incoming webhook requests
- Message processing steps
- LLM API calls and responses
- WhatsApp API calls
- Session management events
- Errors and exceptions

## Future Enhancements

- [ ] Support for media messages (images, documents, audio)
- [ ] Multi-language support
- [ ] Advanced conversation analytics
- [ ] Integration with CRM systems
- [ ] Message templates support
- [ ] Automated business hours handling
- [ ] Human agent handoff
- [ ] Rate limiting middleware
- [ ] Message queue for high traffic
- [ ] Database persistence for conversations

## License

MIT

## Support

For issues or questions:
- Create an issue on GitHub
- Email: support@clariops.com
- Documentation: https://docs.clariops.com
