import express from 'express';
import cors from 'cors';
import { config } from './config/index.js';
import webhookRoutes from './routes/webhook.routes.js';
import apiRoutes from './routes/api.routes.js';
import { errorHandler, notFoundHandler } from './middleware/errorHandler.js';

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Request logging
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
  next();
});

// Routes
app.use('/webhook', webhookRoutes);
app.use('/api', apiRoutes);

// Root endpoint
app.get('/', (req, res) => {
  res.json({
    name: 'ClariOps API',
    description: 'API for LLM-WhatsApp integration',
    version: '1.0.0',
    endpoints: {
      webhook: {
        verify: 'GET /webhook',
        incoming: 'POST /webhook',
      },
      api: {
        health: 'GET /api/health',
        sendMessage: 'POST /api/send-message',
        getSession: 'GET /api/session/:phoneNumber',
        generateResponse: 'POST /api/generate-response',
      },
    },
  });
});

// Error handling
app.use(notFoundHandler);
app.use(errorHandler);

// Start server
const PORT = config.port;

app.listen(PORT, () => {
  console.log(`
╔══════════════════════════════════════════════════════════╗
║                    ClariOps API Server                   ║
╚══════════════════════════════════════════════════════════╝

🚀 Server is running on http://localhost:${PORT}

📱 WhatsApp Webhook: http://localhost:${PORT}/webhook
🔧 API Endpoints:    http://localhost:${PORT}/api

Environment: ${config.nodeEnv}
OpenAI Model: ${config.openai.model}

Ready to process messages!
  `);
});

// Graceful shutdown
process.on('SIGTERM', () => {
  console.log('SIGTERM signal received: closing HTTP server');
  process.exit(0);
});

process.on('SIGINT', () => {
  console.log('SIGINT signal received: closing HTTP server');
  process.exit(0);
});

export default app;
