const Immutable = require('immutable');
const { ALL_SOCKETS } = require('../utils/Constants');
const {
  writeConnectionOpen,
  writeConnectionClose,
  writeDataPacket,
} = require('./influxConnections');
const { getDatabaseList } = require('../influxdb/InfluxDB');
const { generateUniqueName } = require('../utils/Identification')
// socket lists
let dataSources = Immutable.Map();
let dataListeners = Immutable.Map();
let databases = [];
const sendSocketData = (socket, destination, messageType, payload) => {
  socket.broadcast.to(destination).emit(messageType, payload);
};

const printConnectedSockets = () => {
  console.log('Data Sources');
  dataSources.map(source => console.log(source.name));

  console.log('Data Listeners');
  dataListeners.map(source => console.log(source.name));
};

const getSubscribedRooms = (socket) => {
  let rooms = Immutable.Map(socket.rooms);
  rooms = rooms.delete(socket.id);
  socket.emit('subscribedRooms', rooms.toArray());
};

const influxDoesContainDB = (dbName) => {
  getDatabaseList().then( dbs => databases = dbs);
  return databases.includes(dbName);
};

const isClientConnected = (clientName) => {
  const dataSourceNames = dataSources.map(source => source.name);
  const dataListenerNames = dataListeners.map(source => source.name);
  if (dataSourceNames.includes(clientName) || dataListenerNames.includes(clientName)) return true;
  return false;
};


const getUniqueName = (clientName) => {
 if(influxDoesContainDB(clientName) || isClientConnected(clientName)) {
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
    dataListeners: dataListeners.map(sock => {
      return {
        name: sock.name,
        id: sock.id,
      };
    }).toArray(),
    dataSources: dataSources.map(sock => {
      return {
        name: sock.name,
        id: sock.id,
      };
    }).toArray(),
  };
};


const addSocketToGroup = (data, socket) => {
  if (data.type === 'dataSource') {
    dataSources = dataSources.set(socket.id, Immutable.fromJS(socket));
  } else if (data.type === 'dataListener') {
    dataListeners = dataListeners.set(socket.id, Immutable.fromJS(socket));
  }

  printConnectedSockets();
  const connections = getCurrentConnections();

  sendSocketData(socket, ALL_SOCKETS, 'availableRooms', connections);
};

const removeSocketFromGroup = (data, socket) => {
  if (dataSources.has(socket.id)) {
    dataSources = dataSources.delete(socket.id);
  } else if (dataListeners.has(socket.id)) {
    dataListeners = dataListeners.delete(socket.id);
  }

  printConnectedSockets();

  const connections = {
    timestamp: Date.now(),
    dataListeners: dataListeners.map(sock => sock.name).toArray(),
    dataSources: dataSources.map(sock => sock.name).toArray(),
  };

  sendSocketData(socket, ALL_SOCKETS, 'availableRooms', connections);
};

// setup socket listeners on join
const onJoined = (sock, statisticsClient, dataClient) => {
  const socket = sock;

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
    writeDataPacket(dataClient, data);
  });

  socket.on('mobileIMUData', (data) => {
    sendSocketData(socket, ALL_SOCKETS, 'broadcastMobileData', data);
    sendSocketData(socket, socket.id, 'broadcastMobileData', data);
    writeDataPacket(dataClient, data);
  });

  socket.on('connectToSocket', (data) => {
    connectToSocket(socket, data.target);
  });

  socket.on('disconnectFromSocket', (data) => {
    disconnectFromSocket(socket, data.target);
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
