const http = require('http');
const apiServer = require('./api');

const httpServer = http.createServer(apiServer);
const { Server } = require('socket.io');
// const io = require('socket.io');
// const cors = require('cors');
// const { createServer } = "http";
const sockets = require('./sockets');

const PORT = 3000;

// const httpServer = createServer();
// const io = new Server(httpServer, {
//   cors: {
//     origin: "*"
//   }
// });
const socketServer = new Server(httpServer);

httpServer.listen(PORT);
console.log(`Listening on port ${PORT}...`);
sockets.listen(socketServer);

// sockets.listen(io);
