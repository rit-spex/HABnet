let socket;
let user;

let dataArray;
let requestID;
let send = false;
const connectSocket = (e) => {
  socket = io.connect();


  socket.on('connect', () => {
    console.log('connected to server');
    if (!user) {
      user = 'fakeDataClient';
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
    $('#sendPacket').on('click', function(event) {
      /*
      pollData();
      sendData();
      */
      sendDataJson();
      // updateUI();
    });
    $('#sendContinuousPacket').on('click', function(event) {
      send = !send;
      if(send) {
        continuousSend();
      } else {
        if(requestID) {
          window.cancelAnimationFrame(requestID);
          requestID = undefined;
        }
      }
    });
  }
};
const continuousSend = () => {
  /*
  pollData();
  sendData();
  */
  sendDataJson();
  $('#since_init_Input').val(parseInt($('#since_init_Input').val()) + 16)
  // updateUI();
  requestID = window.requestAnimationFrame(continuousSend);
};

const sendData = () => {
  console.log("Sending data");
  let data = pollData();
  let dataPacket = {
	dateCreated: Date.now,
	buffer: data,
	name: user,
	};

  socket.emit('sensorData', dataPacket, (response) => {
    console.log(response);
  });
	// console.log(`Data sent over socket to ${serverURL}: ${dataPacket}`);
};

const sendDataJson = () => {
  const dataPacket = {
    dateCreated: Date.now(),
    payload: pollDataJson(),
    name: user,
  };

  socket.emit('sensorData', dataPacket, (response) => {
		console.log(response);
	});
};

const pollData = () => {
  let data = new Float32Array(15);
  data[0] = $('#since_init_Input').val()
  data[1] = $('#temp_c_Input').val()
  data[2] = $('#pressure_Input').val()
  data[3] = $('#alt_m_Input').val()
  data[4] = $('#humidty_Input').val()
  data[5] = $('#imu_gx_Input').val()
  data[6] = $('#imu_gy_Input').val()
  data[7] = $('#imu_gz_Input').val()
  data[8] = $('#imu_ax_Input').val()
  data[9] = $('#imu_ay_Input').val()
  data[10] = $('#imu_az_Input').val()
  data[11] = $('#imu_mx_Input').val()
  data[12] = $('#imu_my_Input').val()
  data[13] = $('#imu_mz_Input').val()
  data[14] = $('#mcp9808_Input').val()
  console.log(data);
  return data;
};

const pollDataJson = () => {
  return {
    timestamp: $('#since_init_Input').val(),
    temp_1: $('#temp_c_Input').val(),
    pressure: $('#pressure_Input').val(),
    altitude: $('#alt_m_Input').val(),
    humidity: $('#humidty_Input').val(),
    imu_gx: $('#imu_gx_Input').val(),
    imu_gy: $('#imu_gy_Input').val(),
    imu_gz: $('#imu_gz_Input').val(),
    imu_ax: $('#imu_ax_Input').val(),
    imu_ay: $('#imu_ay_Input').val(),
    imu_az: $('#imu_az_Input').val(),
    imu_mx: $('#imu_mx_Input').val(),
    imu_my: $('#imu_my_Input').val(),
    imu_mz: $('#imu_mz_Input').val(),
    temp_2: $('#mcp9808_Input').val(),
  };
};

const deg2ra = (degree) => {
   return degree*(Math.PI/180);
};


window.onload = init;
