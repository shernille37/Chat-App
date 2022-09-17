const io = require('socket.io')(8800, {
  cors: {
    origin: 'http://localhost:3000',
  },
});

// Users that have subscribed to this socket
let activeUsers = [];

io.on('connection', (socket) => {
  // Add new User (Register our user in our socket server)

  // (socket.on) GET SOME DATA ON THE CLIENT SIDE
  socket.on('add-new-user', (newUserId) => {
    // If user is not currently in the active Users
    if (!activeUsers.some((user) => user.userId === newUserId)) {
      activeUsers.push({
        userId: newUserId,
        socketId: socket.id,
      });
    }

    console.log('Connected Users', activeUsers);
    // (io.emit) SEND SOME DATA TO THE CLIENT SIDE
    io.emit('get-users', activeUsers);
  });

  socket.on('send-message', (data) => {
    const user = activeUsers.find((user) => user.userId === data.receiverId);
    console.log('Sending from socket to :', data.receiverId);

    if (user) {
      console.log('RECEIVED MESSAGE');
      io.to(user.socketId).emit('receive-message', data);
    }
  });

  socket.on('disconnect', () => {
    activeUsers = activeUsers.filter((user) => user.socketId !== socket.id);

    io.emit('get-users', activeUsers);

    console.log('User Disconnected', activeUsers);
  });
});
