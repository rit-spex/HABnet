// socket lists
const dataSources = {};
const dataListeners = {};

// setup socket listeners on join
const onJoined = (sock, influxClient) => {
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

module.exports = {
  onDisconnect,
  onJoined,
};
