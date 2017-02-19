const path = require('path');
const express = require('express');
const compression = require('compression');
const favicon = require('serve-favicon');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');

const Influx = require('influxdb-nodejs');
const expressHandlebars = require('express-handlebars');
const router = require('./router.js');

dotenv.load();
const port = process.env.PORT || process.env.NODE_PORT || 3000;

const app = express();
app.use('/assets', express.static(path.resolve(`${__dirname}/../client/`)));
app.use(compression());
app.use(bodyParser.urlencoded({
  extended: true,
}));
app.engine('handlebars', expressHandlebars({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');
app.set('views', `${__dirname}/../views`);
app.use(favicon(`${__dirname}/../client/img/spexFavicon.png`));
app.use(cookieParser());

router(app);

const influxClient = new Influx(process.env.INFLUXDB_URL);
const fieldSchema = {
  connectionSource: 'string',
};
const tagSchema = {

};

influxClient.schema('http', fieldSchema, tagSchema);
influxClient.createDatabase().catch(err => {
  console.error('create database fail err:', err);
});

const io = require('socket.io').listen(app.listen(port));

// socket lists
const dataSources = {};
const dataListeners = {};

// setup socket listeners on join
const onJoined = (sock) => {
  const socket = sock;

  socket.on('join', (data) => {
    console.log(`New Connection: ${data.name} at ${new Date().toISOString()}`);
    influxClient.write('http')
    .field({
      connectionSource: data.name,
    })
    .then(() => console.info('write point success'))
    .catch(console.error);

    // Add socket to right user list
    if (data.type === 'dataSource') {
      dataSources[data.name] = '';
    } else if (data.type === 'dataListener') {
      dataListeners[data.name] = '';
    }

    // add metadata
    socket.name = data.name;
    socket.join('room1');
  });
  // Broadcast out received data
  socket.on('sensorData', (data) => {
    socket.broadcast.to('room1').emit('broadcastData', data);
    // console.log('broadcasted data');
    influxClient.write('http')
    .field({
      connectionSource: data.toString(),
    })
    .queue();

    if (influxClient.writeQueueLength >= 100) {
      influxClient.syncWrite()
        .then(() => console.info('sync write queue success'))
        .catch(console.error);
    }
  });

  socket.on('mobileIMUData', (data) => {
    socket.broadcast.to('room1').emit('broadcastMobileData', data);
    console.log('broadcasted mobile data');
  });
};

// Setup Disconnection event listeners
const onDisconnect = (sock) => {
  const socket = sock;
  socket.on('disconnect', (data) => {
    // delete users[socket.name];
    delete dataSources[socket.name];
    delete dataListeners[socket.name];
    console.log(data);
  });
};

// call all setup code
io.sockets.on('connection', (socket) => {
  console.log('started');

  onJoined(socket);
  onDisconnect(socket);
});

console.log(`Listening on 127.0.0.1: ${port}`);
