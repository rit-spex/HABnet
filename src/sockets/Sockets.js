const Immutable = require('immutable');
const { ALL_SOCKETS } = require('../utils/Constants');
const { Connections } = require('../utils/Connections');
const {
  writeConnectionOpen,
  writeConnectionClose,
  writeDataPacket,
} = require('./influxConnections');
const { 
  getInfluxClient,
  getStatisticsInfluxClient, 
  getSourceInfluxClient,
  getMeasurementList
} = require('../influxdb/InfluxDB.js');
const { generateUniqueName } = require('../utils/Identification')
// socket lists
const clientConnections = new Connections();

const sendSocketData = (socket, destination, messageType, payload) => {
  socket.broadcast.to(destination).emit(messageType, payload);
};

const sendToClientPacket = (socket, messageType, payload) => {
  socket.emit(messageType, payload);
};

const printConnectedSockets = () => {
  console.log('Data Sources');
  clientConnections.dataSources.map(source => console.log(source.name));

  console.log('Data Listeners');
   clientConnections.dataListeners.map(source => console.log(source.name));
};

const getSubscribedRooms = (socket) => {
  let rooms = Immutable.Map(socket.rooms);
  rooms = rooms.delete(socket.id);
  socket.emit('subscribedRooms', rooms.toArray());
};

const getUniqueName = (clientName) => {
 if(clientConnections.hasClientConnectedPreviously(clientName) && clientConnections.isClientConnected(clientName)) {
  return getUniqueName(generateUniqueName(clientName));
 }
 return clientName;
};

const connectToSocket = (socket, target) => {
  socket.join(target, () => {
    console.log(socket.rooms);
    getSubscribedRooms(socket);
  });
  console.log(`${socket.name} has started listening to ${target}`);
};

const disconnectFromSocket = (socket, target) => {
  socket.leave(target, () => {
    console.log(socket.rooms);
    getSubscribedRooms(socket);
  });
  console.log(`${socket.name} has stopped listening to ${target}`);
};



const getCurrentConnections = () => {
  return {
    timestamp: Date.now(),
    dataListeners:  clientConnections.dataListeners.map(sock => {
      return {
        name: sock.name,
        id: sock.id,
      };
    }).toArray(),
    dataSources:  clientConnections.dataSources.map(sock => {
      return {
        name: sock.name,
        id: sock.id,
      };
    }).toArray(),
  };
};


const addSocketToGroup = (data, socket) => {
  if (data.type === 'dataSource') {
     clientConnections.dataSources =  clientConnections.dataSources.set(socket.id, Immutable.fromJS(socket));
  } else if (data.type === 'dataListener') {
     clientConnections.dataListeners =  clientConnections.dataListeners.set(socket.id, Immutable.fromJS(socket));
  }

  printConnectedSockets();
  const connections = getCurrentConnections();

  sendSocketData(socket, ALL_SOCKETS, 'availableRooms', connections);
  sendToClientPacket(socket, 'availablerooms', connections );
};

const removeSocketFromGroup = (data, socket) => {
  if ( clientConnections.dataSources.has(socket.id)) {
    clientConnections.dataSources =  clientConnections.dataSources.delete(socket.id);
  } else if ( clientConnections.dataListeners.has(socket.id)) {
    clientConnections.dataListeners =  clientConnections.dataListeners.delete(socket.id);
  }

  printConnectedSockets();

  const connections = {
    timestamp: Date.now(),
    dataListeners:  clientConnections.dataListeners.map(sock => sock.name).toArray(),
    dataSources:  clientConnections.dataSources.map(sock => sock.name).toArray(),
  };

  sendSocketData(socket, ALL_SOCKETS, 'availableRooms', connections);
  sendToClientPacket(socket, 'availablerooms', connections );
};

// setup socket listeners on join
const onJoined = (sock) => {
  const socket = sock;
  const statisticsClient = getStatisticsInfluxClient();
  const dataClient = getSourceInfluxClient();
  socket.on('join', (data) => {
    console.log(`New Connection: ${data.name} at ${new Date().toISOString()}`);
    // add metadata
    const name = getUniqueName(data.name);
    socket.name = name;
    socket.join(ALL_SOCKETS);
    writeConnectionOpen(statisticsClient, data);
    addSocketToGroup(data, socket);
  });

  // Broadcast out received data
  socket.on('sensorData', (data) => {
    sendSocketData(socket, ALL_SOCKETS, 'broadcastData', data);
    sendSocketData(socket, socket.id, 'broadcastData', data);
    writeDataPacket(dataClient, data, socket.name);
  });

  socket.on('mobileIMUData', (data) => {
    sendSocketData(socket, ALL_SOCKETS, 'broadcastMobileData', data);
    sendSocketData(socket, socket.id, 'broadcastMobileData', data);
    writeDataPacket(dataClient, data, socket.name);
  });

  socket.on('connectToSocket', (data) => {
    connectToSocket(socket, data.target);
  });

  socket.on('disconnectFromSocket', (data) => {
    disconnectFromSocket(socket, data.target);
  });
};

// Setup Disconnection event listeners
const onDisconnect = (sock) => {
  const socket = sock;
  const statisticsClient = getStatisticsInfluxClient();
  socket.on('disconnect', (data) => {
    removeSocketFromGroup(data, socket);
    writeConnectionClose(statisticsClient, data, socket.name);
  });
};

module.exports = {
  onDisconnect,
  onJoined,
};