const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const path = require('path'); // Add this line

const app = express();
const server = http.createServer(app);
const io = socketIo(server)

app.use(express.static(path.join(__dirname)));

const users = {};

io.on('connection', (socket) => {
    console.log('A user connected');
  
    let username = ''; // Store the username
  
    socket.on('user-login', (user) => {
      username = user;
      users[socket.id] = username;
      io.emit('update-user-list', Object.values(users));
      io.emit('user-count-update', Object.keys(users).length);
    });
  
    socket.on('send-message', (username, message) => {
      io.emit('receive-message', username, message);
    });
  
  });
  
  
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
