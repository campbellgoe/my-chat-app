'use client'
import { useEffect, useState } from 'react';
import io, { Socket } from 'socket.io-client';

let socket: Socket;

const Home = () => {
  const [message, setMessage] = useState<string>('');
  const [messages, setMessages] = useState<string[]>([]);

  useEffect(() => {
    socket = io('http://localhost:3003');

    socket.on('chat message', (msg) => {
      setMessages((messages: string[]) => [...messages, msg]);
    });

    return () => {
      socket.off('chat message');
    };
  }, []);

  const sendMessage = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (message) {
      socket.emit('chat message', message);
      setMessage('');
    }
  };

  return (
    <div className="m-auto max-w-full w-72">
      <ul id="messages">
        {messages.map((msg, index) => (
          <li key={index}>{msg}</li>
        ))}
      </ul>
      <form onSubmit={sendMessage}>
        <input
        className="mr-4"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          autoComplete="off"
        />
        <button type="submit">Send</button>
      </form>
    </div>
  );
};

export default Home;