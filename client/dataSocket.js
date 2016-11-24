let socket;
let user;

let dataArray;
let tiltLR;
let tiltFBl
let direction;

const connectSocket = (e) => {
  socket = io.connect();


  socket.on('connect', () => {
    console.log('connected to server');
    if (!user) {
      user = 'mobileClient';
    }

    socket.emit('join', { name: user, type: 'dataSource' });
  });
};

const init = () => {
  console.log('init');
  connectSocket();
    // Check to make sure the browser supprots DeviceOrientationEvents
    if (window.DeviceOrientationEvent) {
    // Create an event listener
    window.addEventListener('deviceorientation', function(event) {
    // Get the left-to-right tilt (in degrees).
     tiltLR = event.gamma;

    // Get the front-to-back tilt (in degrees).
     tiltFB = event.beta;

      // Get the direction of the device (in degrees).
     direction = event.alpha;

    console.log(`Tilt Left/Right: ${tiltLR} Tilt Forward/Back: ${tiltFB} Direction: ${direction}`);
    sendData();
    updateUI();
  });
}
};

const sendData = () => {

  let data = new Float32Array(3);
  data[0] = tiltLR;
  data[1] = tiltFB;
  data[2] = direction;

  let dataPacket = {
	dateCreated: Date.now,
	buffer: data,
	name: user,
	};

    socket.emit('mobileIMUData', dataPacket, function (response) {
		console.log(response);
	});
	// console.log(`Data sent over socket to ${serverURL}: ${dataPacket}`);
};

const updateUI = () => {
  console.log(`Pitch: ${tiltFB}`);
  console.log(`Roll: ${tiltLR}`);
  $('#pitch').text(`Pitch: ${tiltFB}`);
  $('#roll').text(`Roll: ${tiltLR}`);
  $('#direction').text(`Direction: ${direction}`);
};


window.onload = init;
