const express = require('express');
const { createServer } = require('http');
const { Server } = require('socket.io');
const { spawn } = require('node:child_process');
const next = require('next');
const rateLimit = require('express-rate-limit');

const port = parseInt(process.env.PORT, 10) || 3000;
const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

// Define a rate limit: max 10 messages per minute
const limiter = rateLimit({
  windowMs: 1 * 60 * 1000, // 1 minute
  max: 10, // limit each IP to 10 requests per windowMs
  message: 'Too many messages sent from this IP, please try again after a minute'
});

app.prepare().then(() => {
  const server = express();
  const httpServer = createServer(server);
  const io = new Server(httpServer, {
    cors: {
      origin: "http://localhost:3000",
      methods: ["GET", "POST"]
    }
  });

  const messages = []
  io.on('connection', (socket) => {
    console.log('a user connected', messages);
    socket.emit('messages', messages)
    socket.on('chat message', (msg) => {
      
      messages.push(msg)
      if(messages.length > 64){
        messages.shift()
      }
      io.emit('chat message', messages);
    });

    socket.on('disconnect', () => {
      console.log('user disconnected');
    });
  });

  server.all('*', (req, res) => {
    return handle(req, res);
  });

  httpServer.listen(port, () => {
    console.log(`> Ready on http://localhost:${port}`);
    process.env.PORT = 3000
    process.env.NODE_ENV = 'production'
    const nextCmd = spawn('next', ['start']);

    nextCmd.stdout.on('data', (data) => {
      console.log(`stdout: ${data}`);
    });
    
    nextCmd.stderr.on('data', (data) => {
      console.error(`stderr: ${data}`);
    });
    
    nextCmd.on('close', (code) => {
      console.log(`child process exited with code ${code}`);
    }); 
  });
});