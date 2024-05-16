'use client'
import {Card, CardBody, Input, Button, CardFooter} from "@nextui-org/react";
import { useEffect, useState } from "react";
import {io} from 'socket.io-client';

interface Message {
	id: string;
	message: string;
	sender: string;
	type: string;
	time : string;
}

export default function AboutPage() {
	const [messages, setMessages] = useState<Message[]>([]);
    const [messageInput, setMessageInput] = useState<string>('');

    useEffect(() => {
        // Start the connection to the server
        const socket = io('http://localhost:3001',
        {
            withCredentials: true
        }
        );

        //conect to the server

        socket.on('connect', () => {
            //obtener todos los mensajes
            const token = localStorage.getItem('token');
            const message = { token, message: messageInput };
            socket.emit('get messages', message);
            
        });

        // Escuchar eventos de chat
        socket.on('chat message', (msg: Message) => {
            console.log(msg);
            
            setMessages(prevMessages => [...prevMessages, msg]);
        });

        // escuchar el obtener mensajes anteriores
        socket.on('get messages', (msgs: Message[]) => {
            console.log(msgs);
            setMessages(msgs);
        });

        return () => {
            // Desconectar el socket cuando el componente se desmonte
            socket.disconnect();
        };
    }, []);

    const sendMessage = () => {
        // Enviar el mensaje al servidor de Socket.IO en el backend
        const socket = io('http://localhost:3001',
        {
            withCredentials: true
        }
        ); // Reemplaza con la URL de tu servidor de backend
        // get token from local storage
        const token = localStorage.getItem('token');
        const message = { token, message: messageInput };

        socket.emit('chat message', message);

        setMessageInput('');
    };


	return (
		<div className="w-full">
			<div className="flex w-full gap-4">
				<div>
						<Card className="w-full h-full">
						<CardBody>
							<iframe width="560" height="315" src="https://www.youtube.com/embed/wTpuKOhGfJE?si=D5ILlgZfCnlPWamD" title="YouTube video player" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen>

							</iframe>
						</CardBody>
					</Card>
				</div>
				<div className="flex w-full">
						<Card className=" w-full ">
                
						<CardBody className="overflow-y-auto h-96 gap-4">
							{messages.map((msg) => (
                                //que mantenga el tamaño del card
								<Card key={msg.id} className="w-full overflow-visible rounded-2xl">
									<CardBody className={ msg.type === 'moderator' ? 'bg-primary text-white' : 'bg-gray text-white'}>
										<p>{msg.message}</p>
										<p className="text-xs text-right">{msg.sender} - {msg.time} - {msg.type}</p>
									</CardBody>
								</Card>
							))}
						</CardBody>
						<CardFooter className="flex gap-4">
								<Input value={messageInput} onChange={(e) => setMessageInput(e.target.value)} /> 
								<Button color="primary" variant="shadow" className="w-full" onPress={sendMessage}>
									Send
								</Button>
							</CardFooter>
					</Card>
				</div>
			</div>	
		</div>
	);
}
