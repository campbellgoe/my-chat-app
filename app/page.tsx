'use client'
import { useEffect, useState } from 'react';
import io, { Socket } from 'socket.io-client';

let socket: Socket;

const Home = () => {
  const [message, setMessage] = useState<string>('');
  const [messages, setMessages] = useState<string[]>([]);

  useEffect(() => {
    socket = io('http://localhost:3003');
    socket.on('chat message', (msgs: string[]) => {
      setMessages(msgs);
    });
    socket.on('messages', setMessages)

    return () => {
      socket.off('chat message');
    };
  }, []);

  useEffect(() => {
    setTimeout(() => {
      if (typeof window != 'undefined') {
        window.scrollTo(0, document.body.scrollHeight);
      }
    },0)
  }, [messages])

  const sendMessage = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (message && socket) {
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