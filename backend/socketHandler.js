import { Server } from 'socket.io';
import { ChatModel } from './models/Chat.js' 
import { isAuthenticated, ValidToken } from './lib/auth.js';

export function initSocket(server) {
    const io = new Server(server);

    io.on('connection', async (socket) => {
        console.log('Usuario conectado');

        // Manejar el evento de chat
        socket.on('chat message', async (msg) => {
            try {

                // Verify the token and save the message
                const decodedToken = await ValidToken(msg.token);  
                if (decodedToken === null) {
                    console.error('Token inválido');
                    return;
                }
                const newMessage = new ChatModel(decodedToken.username, msg.message, decodedToken.type);
                await newMessage.save();

                // Emitir el mensaje a todos los clientes conectados
                io.emit(msg);
                
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
