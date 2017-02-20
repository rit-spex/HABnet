// socket lists
const dataSources = {};
const dataListeners = {};

// setup socket listeners on join
const onJoined = (sock, statisticsClient, dataClient) => {
  const socket = sock;

  socket.on('join', (data) => {
    console.log(`New Connection: ${data.name} at ${new Date().toISOString()}`);
    statisticsClient.write('http')
    .field({
      connectionSource: data.type,
      connectionName: data.name,
      connected: true,
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
    dataClient.write('http')
    .field({
      socketName: data.name,
      data: data.buffer.toString(),
    })
    .queue();

    if (dataClient.writeQueueLength >= 100) {
      dataClient.syncWrite()
        .then(() => console.info('Socket data queue write'))
        .catch(console.error);
    }
  });

  socket.on('mobileIMUData', (data) => {
    socket.broadcast.to('room1').emit('broadcastMobileData', data);
    console.log('broadcasted mobile data');
  });
};

// Setup Disconnection event listeners
const onDisconnect = (sock, statisticsClient, dataClient) => {
  const socket = sock;
  socket.on('disconnect', (data) => {
    // delete users[socket.name];
    delete dataSources[socket.name];
    delete dataListeners[socket.name];
    console.log(data);
    statisticsClient.write('http')
    .field({
      connectionSource: socket.name,
      connectionName: data.name,
      connected: false,
    })
    .then(() => console.info('write point success'))
    .catch(console.error);
  });
};

module.exports = {
  onDisconnect,
  onJoined,
};
