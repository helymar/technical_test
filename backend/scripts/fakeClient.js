import io from 'socket.io-client';
// URL del servidor de Socket.IO
const SERVER_URL = 'http://localhost:3000';

// Conectar al servidor de Socket.IO
const socket = io(SERVER_URL);

// Manejar eventos de conexión y desconexión
socket.on('connect', () => {
    console.log('Conectado al servidor de Socket.IO');
});

// Simular el envío de mensajes

// Message object of type 'student'
const studentMessage = {
    token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImhlbHltYXIiLCJ0eXBlIjoic3R1ZGVudCIsImlhdCI6MTcxNTg2NDU0MywiZXhwIjoxNzE1ODc4OTQzfQ._5iI62wYBu4ZmICHsyo-xcUn37hj73MrZnOA9SE8h9o',
    message: 'Hello, I am a student',
}

// Message object of type 'moderator'
const moderatorMessage = {
    token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImhlbHltYXIiLCJUeXBlIjpudWxsLCJpYXQiOjE3MTU4NjQwNTgsImV4cCI6MTcxNTg3ODQ1OH0.XNBVBQvxrR4uxeVZ88c2QFrSThJFeaMr7tpGsbTiAU',
    message: 'Hello, I am a moderator',
}


// Emitir mensajes al servidor
socket.emit('chat message', studentMessage);
socket.emit('chat message', moderatorMessage);

// Manejar eventos de chat
socket.on('chat message', (msg) => {
    console.log('Mensaje de chat recibido:', msg);
});

// Manejar eventos de desconexión

socket.on('disconnect', () => {
    console.log('Desconectado del servidor de Socket.IO');
});
