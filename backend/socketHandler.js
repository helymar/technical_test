import { Server } from 'socket.io';
import { ChatModel } from './models/Chat.js' 
import { isAuthenticated, ValidToken } from './lib/auth.js';

export function initSocket(server) {
    const io = new Server(server, 
        {
            cors: {
                origin: 'http://localhost:3000',
                credentials: true,
            }
        }
    );

    io.on('connection', async (socket) => {
        console.log('Usuario conectado');

        // Manejar el evento de chat
        socket.on('get messages', async (msg) => {
            try {

                if (!msg.token) {
                    console.error('Token no proporcionado');
                    return;
                }
                
                // Verify the token and save the message
                const decodedToken = await ValidToken(msg.token);  
                if (decodedToken === null) {
                    console.error('Token inválido');
                    return;
                }
                const messages = await ChatModel.findAll();

                // Emitir el mensaje a el cliente que lo envió
                socket.emit('get messages', messages);
                console.log(`Mensajes enviados a ${decodedToken.username}`);
                
            } catch (error) {
                console.error('Error al guardar el mensaje de chat:', error);
            }
        });

        // Manejar el evento de chat
        socket.on('chat message', async (msg) => {
            try {
                if (!msg.token) {
                    console.error('Token no proporcionado');
                    return;
                }
                
                // Verify the token and save the message
                const decodedToken = await ValidToken(msg.token);  
                if (decodedToken === null) {
                    console.error('Token inválido');
                    return;
                }
                const newMessage = new ChatModel(decodedToken.username, msg.message, decodedToken.type);
                await newMessage.save();
                console.log(newMessage);
                console.log(`Mensaje de chat guardado de ${decodedToken.username}`);

                // Emitir el mensaje a todos los clientes
                io.emit('chat message', newMessage);
            } catch (error) {
                console.error('Error al guardar el mensaje de chat:', error);
            }
        });

        // Manejar el evento de desconexión
        socket.on('disconnect', () => {
            console.log('Usuario desconectado');
        });
    });

    return io;
}
