import express from 'express';
const router = express.Router();


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
    res.render('connectionStatus', { status: 'connected' });
});

export default router;
