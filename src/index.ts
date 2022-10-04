import 'dotenv/config';
import express from 'express';
import http from 'http';
import { Server } from 'socket.io';

const app = express();
const server = http.createServer(app);

console.log({ server });

const io = new Server(server);

const PORT = process.env.PORT || 3001;

io.on('connection', (socket) => {
  socket.on('chat message', (msg) => {
    console.log(socket.id);
    const data = {
      id: socket.id,
      msg,
    };
    io.emit('chat message', data);
  });
});

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

server.listen(PORT, () => {
  console.log('LISTENING');
});
