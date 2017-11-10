let path = require('path');
let app = require('express')();  
let server = require('http').Server(app);  
let io = require('socket.io')(server);



const port = 8000;
server.listen(port, () => console.log('started in '+port))


app.get('/', (request, response) => {
    response.sendFile(path.join(__dirname+'/index.html'));
});

let clientsNum = 0;
io.on('connection', socket => {  
    clientsNum++;
    io.sockets.emit("info", "userConnected");

    socket.on('disconnect', () => {
        clientsNum--;
        io.sockets.emit("info", "userDisconnected");
    });
});
//io.sockets.broadcast.emit("info", "userDisconnected");