let socket;
let user;

var a, b, c;

const connectSocket = (e) => {
  socket = io.connect();

  socket.on('broadcastData', (data) => {
    //var chartz = $('#container').highcharts();
    //chart1.series[0].addPoint([new Date().getTime(),data.buffer[1]],true,true,false);
    //chart1.series[0].redraw();
    a = data.buffer[1];
    b = data.buffer[4];
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
