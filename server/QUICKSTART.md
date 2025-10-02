# Quick Start Guide

Get started with the ClariOps LLM-WhatsApp integration API in 5 minutes!

## Step 1: Install Dependencies

```bash
cd server
npm install
```

## Step 2: Configure Environment

Copy the example environment file:
```bash
cp .env.example .env
```

Edit `.env` with your credentials:
```env
PORT=3001
NODE_ENV=development

# OpenAI Configuration (optional for testing)
OPENAI_API_KEY=sk-your-openai-api-key-here
OPENAI_MODEL=gpt-3.5-turbo

# WhatsApp Configuration
WHATSAPP_PHONE_NUMBER_ID=your_phone_number_id
WHATSAPP_BUSINESS_ACCOUNT_ID=your_business_account_id
WHATSAPP_ACCESS_TOKEN=your_whatsapp_access_token
WHATSAPP_WEBHOOK_VERIFY_TOKEN=choose_a_random_string
```

**Note:** You can test the API without OpenAI credentials - it will use fallback responses.

## Step 3: Start the Server

```bash
npm run dev
```

You should see:
```
╔══════════════════════════════════════════════════════════╗
║                    ClariOps API Server                   ║
╚══════════════════════════════════════════════════════════╝

🚀 Server is running on http://localhost:3001
```

## Step 4: Test the API

### Test Health Endpoint
```bash
curl http://localhost:3001/api/health
```

Expected response:
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

### Test LLM Response
```bash
curl -X POST http://localhost:3001/api/generate-response \
  -H "Content-Type: application/json" \
  -d '{
    "message": "What are your pricing plans?",
    "conversationId": "test_123"
  }'
```

## Step 5: Set Up WhatsApp Webhook (Optional)

### For Local Development (using ngrok)

1. Install ngrok:
```bash
npm install -g ngrok
```

2. Start ngrok:
```bash
ngrok http 3001
```

3. Copy the ngrok URL (e.g., `https://abc123.ngrok.io`)

4. Configure in Meta Developer Console:
   - Go to WhatsApp > Configuration
   - Set Webhook URL: `https://abc123.ngrok.io/webhook`
   - Set Verify Token: (same as `WHATSAPP_WEBHOOK_VERIFY_TOKEN` in your `.env`)
   - Subscribe to `messages` field

5. Test by sending a message to your WhatsApp Business number!

## What's Next?

- **Configure OpenAI**: Add your OpenAI API key for intelligent responses
- **Customize Prompts**: Edit the system prompt in `src/services/llm.service.ts`
- **Add Features**: Extend with media handling, templates, etc.
- **Deploy**: Deploy to production (Heroku, AWS, Google Cloud, etc.)

## Troubleshooting

### Server won't start
- Check if port 3001 is available
- Verify Node.js version is 18+

### OpenAI errors
- Verify API key is correct
- Check OpenAI account has credits

### WhatsApp webhook not working
- Ensure ngrok is running
- Verify webhook URL is accessible
- Check verify token matches

## API Documentation

See [README.md](./README.md) for complete API documentation.

## Examples

Use the provided examples to test:
- `examples/test-api.sh` - Bash script for testing
- `examples/postman-collection.json` - Import into Postman
- `examples/webhook-test.json` - Sample webhook payload
