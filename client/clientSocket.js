let socket;
let user;

const connectSocket = (e) => {
  socket = io.connect();

  socket.on('broadcastData', (data) => {
    console.log(data.buffer[0] + " " + data.buffer[1]);
    var chartz = $('#container').highcharts();
    chartz.series[0].addPoint([data.buffer[0],data.buffer[1]],true,true,false);
  });

  socket.on('connect', () => {
    console.log('connected to server');
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
