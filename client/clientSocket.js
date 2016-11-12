var socket;
let user;

const connectSocket = (e) => {
  socket = io.connect();

  socket.on('broadcastData', (data) => {
    console.log(data);
  });

  socket.on('connect', () => {
    if(!user) {
      user = "unknown";
    }

    socket.emit('join', {name: user, type: "dataListener" });
  });
}

const init = () => {
  console.log('init');
  connectSocket();
};

window.onload = init;
