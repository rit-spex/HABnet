let socket;
let user;

let dataArray;
let roll;
let pitch;
let heading;

const connectSocket = (e) => {
  socket = io.connect();

  socket.on('broadcastData', (data) => {
    dataArray = data.buffer;

    roll = Math.atan2(dataArray[9], dataArray[10]);
    pitch = Math.atan2(-dataArray[8], Math.sqrt((dataArray[9] * dataArray[9]) + (dataArray[10] * dataArray[10])));

    if (dataArray[12] === 0) {
      heading = (dataArray[12] < 0) ? 180 : 0;
    } else {
      heading = Math.atan2(dataArray[11], dataArray[12]);
    }

    if (heading > Math.PI) {
      heading -= (2 * Math.PI);
    } else if (heading < -Math.PI) {
      heading += (2 * Math.PI);
    } else if (heading < 0) {
      heading += (2 * Math.PI);
    }
    /*
    heading *= 180.0 / Math.PI;
    pitch   *= 180.0 / Math.PI;
    roll     *= 180.0 / Math.PI;*/
  });

  socket.on('broadcastMobileData', (data) => {
    console.log('mobile data received');
    dataArray = data.buffer;
    roll = dataArray[0]
    pitch = dataArray[1];
    heading = dataArray[2];
  });

  socket.on('connect', () => {
    console.log('connected to server');
    if (!user) {
      user = 'unknown';
    }

    socket.emit('join', { name: user, type: 'dataListener' });
  });
};

const connectSocketJson = (e) => {
  socket = io.connect();

  socket.on('broadcastData', (data) => {
    dataArray = data.payload;

    roll = Math.atan2(dataArray.imu_ay, dataArray.imu_az);
    pitch = Math.atan2(-dataArray.imu_ax, Math.sqrt((dataArray.imu_ay * dataArray.imu_ay) + (dataArray.imu_az * dataArray.imu_az)));

    if (dataArray.imu_my === 0) {
      heading = (dataArray.imu_my < 0) ? 180 : 0;
    } else {
      heading = Math.atan2(dataArray.imu_mx, dataArray.imu_my);
    }

    if (heading > Math.PI) {
      heading -= (2 * Math.PI);
    } else if (heading < -Math.PI) {
      heading += (2 * Math.PI);
    } else if (heading < 0) {
      heading += (2 * Math.PI);
    }
  });

  socket.on('broadcastMobileData', (data) => {
    console.log('mobile data received');
    dataArray = data.payload;
    pitch = dataArray.roll;
    roll = -dataArray.pitch;
    heading = dataArray.direction;
  });

  socket.on('connect', () => {
    console.log('connected to server');
    if (!user) {
      user = 'listenerClient';
    }

    socket.emit('join', { name: user, type: 'dataListener' });
  });

  socket.on('connectionList', (data) => {
    console.log(`There are ${data.dataListeners.length} dataListener sockets
     and ${data.dataSources.length} dataSources as of ${data.timestamp}`);
  });
};

const init = () => {
  console.log('init');
  // connectSocket();
  connectSocketJson();
};


window.onload = init;
