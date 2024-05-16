// app.js
// Importar módulos
import express from 'express';
import passport from 'passport';
import http from 'http'; // Importar el módulo http
import { initSocket } from './socketHandler.js'; // Importar la función para inicializar Socket.IO

// Importar rutas
import indexRoute from './routes/index.js';
import authRoute from './routes/auth.js'; 
import chatRoute from './routes/chat.js';

import { swaggerUi, specs } from './lib/swaggerConfig.js';

// Configurar Express
const app = express();

// Crear servidor HTTP usando Express
const server = http.createServer(app); // Crear el servidor HTTP utilizando Express

// Iniciar Socket.IO y pasarle el servidor HTTP
const io = initSocket(server); // Iniciar Socket.IO y pasarle el servidor HTTP

// Middleware
app.use(express.json());
app.use(passport.initialize());

// Rutas
app.use('/', indexRoute);
app.use('/chat', chatRoute);
app.use('/auth', authRoute);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));

// Manejo de errores
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Error interno del servidor');
});

// Iniciar el servidor
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => { // Usar server.listen en lugar de app.listen
    console.log(`Servidor en ejecución en el puerto ${PORT}`);
});
