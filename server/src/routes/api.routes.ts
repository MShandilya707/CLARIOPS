import { Router } from 'express';
import apiController from '../controllers/api.controller.js';

const router = Router();

// GET /api/health - Health check
router.get('/health', (req, res) => apiController.healthCheck(req, res));

// POST /api/send-message - Send a message
router.post('/send-message', (req, res) => apiController.sendMessage(req, res));

// GET /api/session/:phoneNumber - Get session data
router.get('/session/:phoneNumber', (req, res) => apiController.getSession(req, res));

// POST /api/generate-response - Generate LLM response (for testing)
router.post('/generate-response', (req, res) => apiController.generateResponse(req, res));

export default router;
