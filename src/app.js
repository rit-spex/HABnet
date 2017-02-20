const { app, port } = require('./Express');
const { onJoined, onDisconnect } = require('./Sockets');
const { getInfluxClient, getStatisticsInfluxClient } = require('./InfluxDB');
const io = require('socket.io').listen(app.listen(port));


// call all setup code
io.sockets.on('connection', (socket) => {
  console.log('started');

  onJoined(socket, getStatisticsInfluxClient(), getInfluxClient());
  onDisconnect(socket, getStatisticsInfluxClient(), getInfluxClient());
});

console.log(`Listening on 127.0.0.1: ${port}`);
