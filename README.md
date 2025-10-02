# CLARIOPS

ClariOps is a comprehensive business management platform that combines customer service, sales, finances, and HR into one seamless solution.

## Project Structure

```
CLARIOPS/
├── src/                    # Frontend React application
│   ├── components/         # React components
│   ├── pages/             # Page components
│   ├── contexts/          # React contexts
│   └── types/             # TypeScript types
│
└── server/                # Backend API server
    ├── src/
    │   ├── controllers/   # Request handlers
    │   ├── services/      # Business logic
    │   ├── routes/        # API routes
    │   ├── middleware/    # Express middleware
    │   ├── types/         # TypeScript types
    │   └── config/        # Configuration
    └── README.md          # API documentation
```

## Features

### Frontend
- 💬 WhatsApp-style chat interface
- 📊 Business analytics dashboard
- 👥 Customer management
- 💳 Subscription management
- ⚙️ Business settings and integrations

### Backend API
- 🤖 **LLM Integration**: AI-powered customer service using OpenAI
- 📱 **WhatsApp Integration**: Connect to WhatsApp Business API
- 💬 **Conversation Management**: Maintain context across conversations
- 🔄 **Webhook Processing**: Handle real-time WhatsApp messages

## Quick Start

### Frontend

1. Install dependencies:
```bash
npm install
```

2. Start development server:
```bash
npm run dev
```

3. Build for production:
```bash
npm run build
```

### Backend API

See [server/README.md](./server/README.md) for detailed API documentation.

1. Navigate to server directory:
```bash
cd server
```

2. Install dependencies:
```bash
npm install
```

3. Configure environment variables:
```bash
cp .env.example .env
# Edit .env with your credentials
```

4. Start the API server:
```bash
npm run dev
```

## API Documentation

The backend API provides endpoints for:
- WhatsApp webhook integration
- LLM-powered message processing
- Session management
- Message sending

For detailed API documentation, see [server/README.md](./server/README.md).

## Technologies

### Frontend
- React 18
- TypeScript
- Vite
- TailwindCSS
- React Router
- Lucide Icons

### Backend
- Node.js + Express
- TypeScript
- OpenAI API
- WhatsApp Business API
- Axios

## License

MIT