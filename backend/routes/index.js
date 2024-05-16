// routes.js

import express from 'express';
import { initSocket } from '../socketHandler.js';

const router = express.Router();

// Inicializar el servidor de Socket.IO
import http from 'http';
const server = http.createServer();
const io = initSocket(server); // Inicializar el servidor de Socket.IO


/**
 * @swagger
 * /:
 *   get:
 *     summary: Redirige a /connectionStatus
 *     tags: [Redirect]
 *     responses:
 *       302:
 *         description: Redireccionado a /connectionStatus
 */
router.get('/', (req, res) => {
    res.redirect('/connectionStatus');
});

/**
 * @swagger
 * /connectionStatus:
 *   get:
 *     summary: Obtener el estado de la conexión
 *     tags: [Connection]
 *     responses:
 *       200:
 *         description: Estado de la conexión recuperado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: connected
 */
router.get('/connectionStatus', (req, res) => {
    const isConnected = Boolean(io.engine.clientsCount);
    res.json({ isConnected });
});

export default router;
