let readyPlayerCount = 0;

function listen (io) {
const pongNamespace = io.of('/pong');
// io.on('connection', (socket)=> {
pongNamespace.on('connection', (socket)=> {
    let room;

    console.log("Somebody connected...", socket.id);

    socket.on('ready', ()=> {
        //we floor it to join a particular room number
        room = 'Room'+ Math.floor(readyPlayerCount / 2);
        socket.join(room);
        console.log('Player ready', socket.id);

        readyPlayerCount++;

        if(readyPlayerCount % 2 === 0) {
            // broadcast game start
            console.log('Refree is...', socket.id);
            // pongNamespace.emit('startGame', socket.id);
            // to emit to all the members in a namespace
            pongNamespace.in(room).emit('startGame', socket.id);
        }
    });
    //sending paddle position to other client apart from the user
    socket.on('paddleMove', (paddleData) => {
        // socket.broadcast.emit('paddleMove', paddleData);
        // to emit to all members in a namespace apart from sender
        socket.to(room).emit('paddleMove', paddleData);
    });
    //sending ball position to other client apart from the sender
    socket.on('ballMove', (ballMove)=> {
        // socket.broadcast.emit('ballMove', ballMove);
        socket.to(room).emit('ballMove', ballMove);
    });
    socket.on('disconnect', (reason)=> {
        console.log(`Client ${socket.id} disconnected: ${reason}`);
        socket.leave(room);
    })
});
}

module.exports = {
    listen,
}