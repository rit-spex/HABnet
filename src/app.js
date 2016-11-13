const path = require('path');
const express = require('express');
const compression = require('compression');
const favicon = require('serve-favicon');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const expressHandlebars = require('express-handlebars');


const dbURL = process.env.MONGODB_URI || 'mongodb://localhost/HABTelemetry';

/*
mongoose.connect(dbURL, (err) => {
  if (err) {
    console.log('Could not connect to database');
    throw err;
  }
});*/

const router = require('./router.js');
const port = process.env.PORT || process.env.NODE_PORT || 3000;

const app = express();
var server = require('http').createServer(app);
//var io = require('socket.io')(server);

const socketio = require('socket.io');
app.use('/assets', express.static(path.resolve(`${__dirname}/../client/`)));
app.use(compression());
app.use(bodyParser.urlencoded({
  extended: true,
}));
app.engine('handlebars', expressHandlebars(defaultLayout: 'main'));
app.set('view engine', 'handlebars');
app.set('views', `${__dirname}/../views`);
app.use(favicon(`${__dirname}/../client/img/spexFavicon.png`));
app.use(cookieParser());

router(app);

var io = require('socket.io').listen(app.listen(port));
/*
app.listen(port, (err) => {
  if (err) {
    throw err;
  }
  console.log(`Listening on port ${port}`);
});*/




const onRequest = (request, response) => {
  response.writeHead(200, {'Content-Type': 'text/html' });
  response.write(index);
  response.end();
};


//const io = socketio(app);

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
