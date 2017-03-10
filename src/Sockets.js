const Immutable = require('immutable');
const { ALL_SOCKETS } = require('./utils/Constants');
// socket lists
let dataSources = Immutable.List();
let dataListeners = Immutable.List();

const writeConnectionOpen = (client, data) => {
  client.write('http')
    .field({
      connectionSource: data.type,
      connectionName: data.name,
      connected: true,
    })
    .then(() => console.info('New Connection Recorded'))
    .catch(console.error);
};

const writeConnectionClose = (client, data, name) => {
  client.write('http')
    .field({
      connectionSource: name,
      connectionName: data.name,
      connected: false,
    })
    .then(() => console.info('Connection Closed Recorded'))
    .catch(console.error);
};

const writeDataPacket = (client, data) => {
  client.write('http')
    .field({
      socketName: data.name,
      data: JSON.stringify(data.buffer),
    })
    .queue();

  if (client.writeQueueLength >= 100) {
    client.syncWrite()
      .then(() => console.info('Socket data queue write'))
      .catch(console.error);
  }
};

const addSocketToGroup = (data, socket) => {
  if (data.type === 'dataSource') {
    dataSources = dataSources.push(socket.id);
  } else if (data.type === 'dataListener') {
    dataListeners = dataListeners.push(socket.id);
  }
  console.log('Data Sources');
  dataSources.map(source => {
    console.log(source);
  });

  console.log('Data Listeners');
  dataListeners.map(source => {
    console.log(source);
  });

  const connections = {
    timestamp: Date.now(),
    dataListeners: dataListeners.toArray(),
    dataSources: dataSources.toArray(),
  };

  socket.broadcast.to(ALL_SOCKETS).emit('connectionList', connections);
};

const removeSocketFromGroup = (data, socket) => {  
  if (dataSources.includes(socket.id)) {
    dataSources = dataSources.delete(dataSources.indexOf(socket.id));
  } else if (dataListeners.includes(socket.id)) {
    dataListeners = dataListeners.delete(dataListeners.indexOf(socket.id));
  }

  console.log('Data Sources');
  dataSources.map(source => {
    console.log(source);
  });

  console.log('Data Listeners');
  dataListeners.map(source => {
    console.log(source);
  });

  const connections = {
    timestamp: Date.now(),
    dataListeners: dataListeners.toArray(),
    dataSources: dataSources.toArray(),
  };

  socket.broadcast.to(ALL_SOCKETS).emit('connectionList', connections);
};

// setup socket listeners on join
const onJoined = (sock, statisticsClient, dataClient) => {
  const socket = sock;

  socket.on('join', (data) => {
    console.log(`New Connection: ${data.name} at ${new Date().toISOString()}`);
    writeConnectionOpen(statisticsClient, data);
    addSocketToGroup(data, socket);

    // add metadata
    socket.name = data.name;
    socket.join(ALL_SOCKETS);
  });

  // Broadcast out received data
  socket.on('sensorData', (data) => {
    socket.broadcast.to(ALL_SOCKETS).emit('broadcastData', data);
    writeDataPacket(dataClient, data);
  });

  socket.on('mobileIMUData', (data) => {
    socket.broadcast.to(ALL_SOCKETS).emit('broadcastMobileData', data);
  });
};

// Setup Disconnection event listeners
const onDisconnect = (sock, statisticsClient) => {
  const socket = sock;

  socket.on('disconnect', (data) => {
    removeSocketFromGroup(data, socket);
    writeConnectionClose(statisticsClient, data, socket.name);
  });
};

module.exports = {
  onDisconnect,
  onJoined,
};
