const http = require('http');
const fs = require('fs');
const socketio = require('socket.io');


const port = process.env.PORT || process.env.NODE_PORT || 3000;


const index = fs.readFileSync(`${__dirname}/../client/client.html`);

const onRequest = (request, response) => {
  response.writeHead(200, {'Content-Type': 'text/html' });
  response.write(index);
  response.end();
};

const app = http.createServer(onRequest).listen(port);

const io = socketio(app);

const dataSources = {};
const dataListeners = {};

const onJoined = (sock) => {
  const socket = sock;

  socket.on('join', (data) => {
    console.log(`New Connection: ${ data.name }`)
    if (data.type == 'dataSource') {
      dataSources[data.name] = '';
    } else if (data.type == 'dataListener') {
      dataListeners[data.name] = '';
    }

    socket.name = data.name;
    socket.join('room1');
  });

  socket.on('sensorData', (data) => {
    socket.broadcast.to('room1').emit('broadcastData', data);
    console.log('broadcasted data');
  });
};

const onDisconnect = (sock) => {
  const socket = sock;
  socket.on('disconnect', (data) => {
    //delete users[socket.name];
    //io.sockets.in('room1').emit('msg', { name: 'server', msg: `${socket.name} has disconnected` });
    console.log(data);
  });
};

io.sockets.on('connection', (socket) => {
  console.log('started');

  onJoined(socket);
});

console.log(`Listening on 127.0.0.1: ${port}`);
