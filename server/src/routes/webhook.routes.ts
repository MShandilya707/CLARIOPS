import { Router } from 'express';
import webhookController from '../controllers/webhook.controller.js';

const router = Router();

// GET /webhook - Verify webhook
router.get('/', (req, res) => webhookController.verifyWebhook(req, res));

// POST /webhook - Handle incoming WhatsApp messages
router.post('/', (req, res) => webhookController.handleWebhook(req, res));

export default router;
