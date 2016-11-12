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
    if (data.type == 'dataSource') {
      dataSources[data.name] = '';
    } else if (data.type == 'dataListener') {
      dataListeners[data.name] = '';
    }
  });

  socket.on('sensorData', (data) => {
    socket.broadcast.to('room1').emit('broadcastData', data);
  });

  socket.name = data.name;
  socket.join('room1');
};
