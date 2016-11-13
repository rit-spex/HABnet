let socket;
let user;

var a, b, c;
var dataArray;
let roll, pitch, heading;

const connectSocket = (e) => {
  socket = io.connect();

  socket.on('broadcastData', (data) => {
    //var chartz = $('#container').highcharts();
    //chart1.series[0].addPoint([new Date().getTime(),data.buffer[1]],true,true,false);
    //chart1.series[0].redraw();
    a = data.buffer[1];
    b = data.buffer[4];
    dataArray = data.buffer;

    roll = Math.atan2(dataArray[9], dataArray[10]);
    pitch = Math.atan2(-dataArray[8], Math.sqrt(dataArray[9] * dataArray[9] + dataArray[10] * dataArray[10]));

    if(dataArray[12] == 0) {
      heading = (dataArray[12] < 0) ? 180 : 0;
    } else {
      heading = Math.atan2(dataArray[11], dataArray[12]);
    }

    if( heading > Math.PI) {
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
