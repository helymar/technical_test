import express from 'express';
import { isAuthenticated } from '../lib/auth.js';
import { getChat } from '../controllers/chatController.js';
const router = express.Router();

/**
 * @swagger
 * /chat/getAll:
 *   get:
 *     summary: Get chat messages
 *     tags: [Chat]
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: Chat messages retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                   sender:
 *                     type: string
 *                   message:
 *                     type: string
 *                   time:
 *                     type: string
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal server error
 */
router.get('/getAll', isAuthenticated, getChat);


export default router;