# Architecture Documentation

## System Overview

The ClariOps API provides a bridge between WhatsApp Business API and Large Language Models (LLM), enabling automated, intelligent customer service through WhatsApp messaging.

## High-Level Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                         Customer                                 │
│                     (WhatsApp User)                             │
└────────────────┬────────────────────────────────────────────────┘
                 │
                 │ Sends message
                 ▼
┌─────────────────────────────────────────────────────────────────┐
│                   WhatsApp Business API                          │
│                  (Meta/Facebook Platform)                        │
└────────────────┬────────────────────────────────────────────────┘
                 │
                 │ Webhook POST
                 ▼
┌─────────────────────────────────────────────────────────────────┐
│                     ClariOps API Server                          │
│  ┌───────────────────────────────────────────────────────────┐  │
│  │              Webhook Controller                           │  │
│  │  • Verify webhook                                         │  │
│  │  • Receive incoming messages                              │  │
│  │  • Queue processing                                       │  │
│  └──────────────┬────────────────────────────────────────────┘  │
│                 │                                                │
│                 ▼                                                │
│  ┌───────────────────────────────────────────────────────────┐  │
│  │              Session Service                              │  │
│  │  • Manage conversation sessions                           │  │
│  │  • Store context (last 10 messages)                       │  │
│  │  • Track customer info                                    │  │
│  │  • Auto-cleanup inactive sessions                         │  │
│  └──────────────┬────────────────────────────────────────────┘  │
│                 │                                                │
│                 ▼                                                │
│  ┌───────────────────────────────────────────────────────────┐  │
│  │              LLM Service                                  │  │
│  │  • Build conversation context                             │  │
│  │  • Generate intelligent responses                         │  │
│  │  • Handle fallback when OpenAI unavailable                │  │
│  └──────────────┬────────────────────────────────────────────┘  │
│                 │                                                │
│                 │ API call                                       │
│                 ▼                                                │
└─────────────────────────────────────────────────────────────────┘
                 │
                 ▼
┌─────────────────────────────────────────────────────────────────┐
│                      OpenAI API                                  │
│                   (GPT-3.5-turbo)                               │
└────────────────┬────────────────────────────────────────────────┘
                 │
                 │ Returns response
                 ▼
┌─────────────────────────────────────────────────────────────────┐
│                     ClariOps API Server                          │
│  ┌───────────────────────────────────────────────────────────┐  │
│  │              WhatsApp Service                             │  │
│  │  • Send message to customer                               │  │
│  │  • Mark messages as read                                  │  │
│  │  • Handle WhatsApp API errors                             │  │
│  └──────────────┬────────────────────────────────────────────┘  │
└─────────────────┼────────────────────────────────────────────────┘
                 │
                 │ API call
                 ▼
┌─────────────────────────────────────────────────────────────────┐
│                   WhatsApp Business API                          │
└────────────────┬────────────────────────────────────────────────┘
                 │
                 │ Delivers message
                 ▼
┌─────────────────────────────────────────────────────────────────┐
│                         Customer                                 │
│                  (Receives AI response)                         │
└─────────────────────────────────────────────────────────────────┘
```

## Component Details

### 1. Webhook Controller (`webhook.controller.ts`)

**Responsibilities:**
- Handle GET requests for webhook verification
- Process POST requests with incoming WhatsApp messages
- Validate webhook payloads
- Respond quickly (200 OK) to WhatsApp
- Queue messages for asynchronous processing

**Key Methods:**
- `verifyWebhook()`: Validates WhatsApp's verification challenge
- `handleWebhook()`: Receives and queues incoming messages
- `processMessage()`: Processes individual messages asynchronously

### 2. Session Service (`session.service.ts`)

**Responsibilities:**
- Maintain conversation state across messages
- Store customer information
- Track message history (context)
- Clean up inactive sessions

**Data Structure:**
```typescript
SessionData {
  conversationId: string
  phoneNumber: string
  customerName?: string
  context: ConversationContext
  lastActivity: Date
  active: boolean
}
```

**Features:**
- Auto-cleanup after 30 minutes of inactivity
- Stores last 10 messages for context
- In-memory storage (can be extended to Redis/Database)

### 3. LLM Service (`llm.service.ts`)

**Responsibilities:**
- Interface with OpenAI API
- Build conversation context
- Generate intelligent responses
- Handle errors gracefully

**System Prompt:**
- Defines AI personality and capabilities
- Provides business context
- Sets response guidelines

**Features:**
- Fallback responses when OpenAI unavailable
- Configurable model (GPT-3.5, GPT-4, etc.)
- Temperature and max tokens control

### 4. WhatsApp Service (`whatsapp.service.ts`)

**Responsibilities:**
- Send messages to WhatsApp Business API
- Mark messages as read
- Verify webhook tokens

**API Integration:**
- Uses WhatsApp Cloud API (v18.0)
- Requires phone number ID and access token
- Handles rate limits and errors

### 5. API Controller (`api.controller.ts`)

**Responsibilities:**
- Provide REST API endpoints for testing
- Health checks
- Manual message sending
- Session inspection

**Endpoints:**
- Health check
- Send message
- Get session
- Generate response

## Data Flow

### Incoming Message Flow

1. **Customer sends message** via WhatsApp
2. **WhatsApp Cloud API** receives message
3. **Webhook POST** sent to `/webhook` endpoint
4. **Webhook Controller** validates and returns 200 OK immediately
5. **Async Processing** begins:
   - Extract message data
   - Get/create customer session
   - Add user message to context
6. **LLM Service** called with:
   - Current message
   - Conversation context (last 10 messages)
   - System prompt
7. **OpenAI API** generates response
8. **Session Service** updates context with AI response
9. **WhatsApp Service** sends response to customer
10. **Customer receives** AI-generated message

### Session Lifecycle

```
┌─────────────┐
│   Start     │
└──────┬──────┘
       │
       ▼
┌─────────────────────┐
│  First Message      │
│  Create Session     │
└──────┬──────────────┘
       │
       ▼
┌─────────────────────┐
│  Active State       │
│  • Store messages   │
│  • Update context   │
│  • Track activity   │
└──────┬──────────────┘
       │
       ▼
┌─────────────────────┐
│  Inactive           │
│  (30 min timeout)   │
└──────┬──────────────┘
       │
       ▼
┌─────────────────────┐
│  Auto-cleanup       │
│  Delete Session     │
└─────────────────────┘
```

## Error Handling Strategy

### 1. Webhook Errors
- Always respond with 200 OK to WhatsApp
- Process messages asynchronously
- Log errors for debugging

### 2. LLM Errors
- Fallback to polite default message
- Log error details
- Continue conversation flow

### 3. WhatsApp API Errors
- Retry with exponential backoff (future)
- Send error notification to admin (future)
- Log for monitoring

### 4. Network Errors
- Timeout handling
- Connection pool management
- Graceful degradation

## Security Considerations

### 1. Webhook Verification
- Verify token on all webhook requests
- Validate payload structure
- Check message signatures (future enhancement)

### 2. API Authentication
- Use environment variables for secrets
- Rotate access tokens regularly
- Implement rate limiting (future)

### 3. Data Privacy
- Don't log sensitive customer data
- Sanitize inputs before LLM
- GDPR compliance considerations

### 4. Input Validation
- Validate all incoming data
- Sanitize user messages
- Prevent injection attacks

## Scalability Considerations

### Current State (MVP)
- In-memory session storage
- Single server instance
- Synchronous processing

### Future Enhancements

#### 1. Horizontal Scaling
- Load balancer
- Multiple server instances
- Sticky sessions or shared storage

#### 2. Message Queue
```
Webhook → Queue (Redis/RabbitMQ) → Workers → LLM
```

#### 3. Database Integration
- PostgreSQL for conversations
- Redis for session cache
- Message history persistence

#### 4. Caching
- Cache frequent responses
- LLM response caching
- Session data caching

#### 5. Monitoring
- Request logging
- Performance metrics
- Error tracking (Sentry)
- Analytics dashboard

## Configuration

### Environment Variables

| Variable | Required | Description |
|----------|----------|-------------|
| PORT | No | Server port (default: 3001) |
| NODE_ENV | No | Environment (development/production) |
| OPENAI_API_KEY | Yes* | OpenAI API key (* fallback available) |
| OPENAI_MODEL | No | GPT model (default: gpt-3.5-turbo) |
| WHATSAPP_PHONE_NUMBER_ID | Yes | WhatsApp phone number ID |
| WHATSAPP_ACCESS_TOKEN | Yes | WhatsApp API access token |
| WHATSAPP_WEBHOOK_VERIFY_TOKEN | Yes | Webhook verification token |
| SESSION_TIMEOUT_MINUTES | No | Session timeout (default: 30) |
| MAX_MESSAGE_LENGTH | No | Max message length (default: 4096) |

## Performance Metrics

### Target Metrics
- Webhook response: < 200ms
- End-to-end message processing: < 5s
- LLM response time: 2-4s
- Session lookup: < 10ms
- WhatsApp API call: 500ms-1s

### Resource Usage
- Memory: ~50-100MB baseline
- CPU: Minimal (I/O bound)
- Network: Dependent on message volume

## Testing Strategy

### 1. Unit Tests
- Service layer functions
- Controller methods
- Utility functions

### 2. Integration Tests
- Webhook flow
- LLM integration
- WhatsApp API calls

### 3. Load Tests
- Concurrent webhooks
- Session management under load
- API endpoint performance

### 4. Manual Testing
- Postman collection
- Example scripts
- ngrok + real WhatsApp messages

## Deployment Architecture

### Development
```
Local Machine → ngrok → WhatsApp
```

### Production
```
WhatsApp → Load Balancer → API Servers → OpenAI
                              ↓
                          Database
                              ↓
                          Redis Cache
```

## API Versioning

Current: v1.0.0
- Endpoints: `/webhook`, `/api/*`
- No breaking changes expected
- Future: `/v2/webhook`, `/v2/api/*`

## Dependencies

### Core
- `express`: Web framework
- `typescript`: Type safety
- `openai`: LLM integration
- `axios`: HTTP client

### Development
- `tsx`: TypeScript execution
- `@types/*`: Type definitions

## Future Enhancements

1. **Media Support**: Handle images, documents, audio
2. **Templates**: Use WhatsApp message templates
3. **Analytics**: Track conversation metrics
4. **CRM Integration**: Connect to existing systems
5. **Multi-language**: Support multiple languages
6. **Agent Handoff**: Transfer to human agents
7. **Business Hours**: Auto-respond outside hours
8. **Rate Limiting**: Protect against abuse
9. **Database**: Persist conversation history
10. **Webhooks**: Send events to external systems
