import React from 'react';
import Toggle from 'material-ui/Toggle';
import Slider from 'material-ui/Slider';
import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import Divider from 'material-ui/Divider';

const FakeDataControls = React.createClass({

  getInitialState() {
    this.isSending = false;
    return {
      temp1: 25,
      pressure: 0.101,
      altitude: 10,
      humidity: 5,
      rotationX: 0,
      rotationY: 0,
      rotationZ: 0,
      accelX: 0,
      accelY: 0,
      accelZ: 0,
      magX: 0,
      magY: 0,
      magZ: 0,
      colorR: 125,
      colorG: 125,
      colorB: 125,
      lux: 0,
      colorTemp: 0,
      hasBarometer: false,
      hasIMU: false,
      hasColorSensor: false,
      timestamp: 0,
    };
  },

  pollDataJson() {
    const cleanedState = this.state;
    delete cleanedState['hasColorSensor'];
    delete cleanedState['hasIMU'];
    delete cleanedState['hasBarometer'];
    return cleanedState;
  },

  sendDataJSON() {
    const dataPacket = {
      dateCreated: Date.now(),
      name: this.props.username,
      payload: this.pollDataJson(),
    };

    this.props.socket.emit('sensorData', dataPacket, (response) =>{
      console.log(response);
    });
  },

  continuousSend() {
    this.sendDataJson();
    this.setState({timestamp: Date.now()});
    this.requestID = window.requestAnimationFrame(this.continuousSend);
  },

  handleSlider(value, type) {
    console.log(type);
    const data = {};
    data[`${type}`] = value;
    this.setState(data);
  },

  handleToggle(isToggled, type) {
    console.log(type);
    const data = {};
    data[`${type}`] = isToggled;
    this.setState(data);
  },

  handleSendPacketsContinuously() {
    this.isSending = !this.isSending;
    if (this.isSending) {
      this.continuousSend();
    } else {
      window.cancelAnimationFrame(this.requestID);
      this.requestID = undefined;
    }
  },
  
  handleSendOnePacket() {
    this.sendDataJSON();
  },

  renderBarometer() {
    const { temp1, pressure, altitude, humidity } = this.state;
    return (
      <Paper style={{padding: '5px' }}zDepth={2}>
        <span>{`Temperature: ${temp1} °C`}</span>
        <Slider
          min={0}
          max={100}
          step={1}
          defaultValue={50}
          value={this.state.temp1}
          onChange={(evt, value) => { this.handleSlider(value, 'temp1'); }}
        />
        <span>{`Pressure: ${pressure} MPa`}</span>
        <Slider
          max={0.2}
          min={0}
          step={0.001}
          axis="x-reverse"
          defaultValue={0.101}
          value={this.state.pressure}
          onChange={(evt, value) => { this.handleSlider(value, 'pressure'); }}
        />
        <span>{`Altitude: ${altitude} m`}</span>
        <Slider
          min={0}
          max={100000}
          step={25}
          defaultValue={20}
          value={this.state.altitude}
          onChange={(evt, value) => { this.handleSlider(value, 'altitude'); }}
        />
        <span>{`Humidity: ${humidity} %`}</span>
        <Slider
          min={0}
          max={100}
          step={0.1}
          defaultValue={10}
          value={this.state.humidity}
          onChange={(evt, value) => { this.handleSlider(value, 'humidity'); }}
        />
      </Paper>
    );
  },

  renderIMU() {
    const {
      rotationX,
      rotationY,
      rotationZ,
      accelX,
      accelY,
      accelZ,
      magX,
      magY,
      magZ
    } = this.state;
    return (
      <Paper style={{padding: '5px' }}zDepth={2}>
        <span>{`Rotation-X: ${rotationX} degrees/s`}</span>
        <Slider
          min={-2000}
          max={2000}
          step={100}
          defaultValue={0}
          value={this.state.rotationX}
          onChange={(evt, value) => { this.handleSlider(value, 'rotationX'); }}
        />
        <span>{`Rotation-Y: ${rotationY} degrees/s`}</span>
        <Slider
          min={-2000}
          max={2000}
          step={100}
          defaultValue={0}
          value={this.state.rotationY}
          onChange={(evt, value) => { this.handleSlider(value, 'rotationY'); }}
        />
        <span>{`Rotation-Z: ${rotationZ} degrees/s`}</span>
        <Slider
          min={-2000}
          max={2000}
          step={100}
          defaultValue={0}
          value={this.state.rotationZ}
          onChange={(evt, value) => { this.handleSlider(value, 'rotationZ'); }}
        />
        <span>{`Acceleration-X: ${accelX} m/s^2`}</span>
        <Slider
          min={-100}
          max={100}
          step={0.1}
          defaultValue={0}
          value={this.state.accelX}
          onChange={(evt, value) => { this.handleSlider(value, 'accelX'); }}
        />
        <span>{`Acceleration-Y: ${accelY} m/s^2`}</span>
        <Slider
          min={-100}
          max={100}
          step={0.1}
          defaultValue={0}
          value={this.state.accelY}
          onChange={(evt, value) => { this.handleSlider(value, 'accelY'); }}
        />
        <span>{`Acceleration-Z: ${accelZ} m/s^2`}</span>
        <Slider
          min={-100}
          max={100}
          step={0.1}
          defaultValue={0}
          value={this.state.accelZ}
          onChange={(evt, value) => { this.handleSlider(value, 'accelZ'); }}
        />
        <span>{`Magnetometer-X: ${magX} gauss`}</span>
        <Slider
          min={-8.1}
          max={8.1}
          step={0.01}
          defaultValue={0}
          value={this.state.magX}
          onChange={(evt, value) => { this.handleSlider(value, 'magX'); }}
        />
        <span>{`Magnetometer-Y: ${magY} gauss`}</span>
        <Slider
          min={-8.1}
          max={8.1}
          step={0.01}
          defaultValue={0}
          value={this.state.magY}
          onChange={(evt, value) => { this.handleSlider(value, 'magY'); }}
        />
        <span>{`Magnetometer-Z: ${magZ} gauss`}</span>
        <Slider
          min={-8.1}
          max={8.1}
          step={0.01}
          defaultValue={0}
          value={this.state.magZ}
          onChange={(evt, value) => { this.handleSlider(value, 'magZ'); }}
        />
      </Paper>
    );
  },

  renderColorSensor() {
    const { colorR, colorG, colorB, lux, colorTemp } = this.state;
    return (
      <Paper style={{padding: '5px' }}zDepth={2}>
        <span>{`Red Light: ${colorR}`}</span>
        <Slider
          min={0}
          max={255}
          step={1}
          defaultValue={125}
          value={this.state.colorR}
          onChange={(evt, value) => { this.handleSlider(value, 'colorR'); }}
        />
        <span>{`Green Light: ${colorG}`}</span>
        <Slider
          min={0}
          max={255}
          step={1}
          defaultValue={125}
          value={this.state.colorG}
          onChange={(evt, value) => { this.handleSlider(value, 'colorG'); }}
        />
        <span>{`Blue Light: ${colorB}`}</span>
        <Slider
          min={0}
          max={255}
          step={1}
          defaultValue={125}
          value={this.state.colorB}
          onChange={(evt, value) => { this.handleSlider(value, 'colorB'); }}
        />
        <span>{`Color Temperature: ${colorTemp} K`}</span>
        <Slider
          min={1000}
          max={30000}
          step={100}
          defaultValue={7000}
          value={this.state.colorTemp}
          onChange={(evt, value) => { this.handleSlider(value, 'colorTemp'); }}
        />
        <span>{`Lux: ${lux} lumens/m^2`}</span>
        <Slider
          min={0}
          max={65000}
          step={500}
          defaultValue={20000}
          value={this.state.lux}
          onChange={(evt, value) => { this.handleSlider(value, 'lux'); }}
        />
      </Paper>
    );
  },

  render() {
    const { hasBarometer, hasIMU, hasColorSensor, timestamp } = this.state;
    return (
      <div>
        <Toggle label="Show Barometer" onToggle={(evt, isToggled) => { this.handleToggle(isToggled, 'hasBarometer'); }} />
        {hasBarometer && this.renderBarometer()}
        <Toggle label="Show IMU" onToggle={(evt, isToggled) => { this.handleToggle(isToggled, 'hasIMU'); }} />
        {hasIMU && this.renderIMU()}
        <Toggle label="Show Color Sensor" onToggle={(evt, isToggled) => { this.handleToggle(isToggled, 'hasColorSensor'); }}/>
        {hasColorSensor && this.renderColorSensor()}
        <TextField
          id="text-field-controlled"
          value={`Recorded time: ${timestamp} ms`}
          disabled={true}
        />
        <Divider />
        <RaisedButton
          label="Send one packet"
          primary={true}
          style={{ margin: '12px' }} 
          onTouchTap={this.handleSendOnePacket}
          />
        <RaisedButton
          label="Send packets continously"
          primary={true}
          style={{ margin: '12px' }}
          onTouchTap={this.handleSendPacketsContinuously}
          />
      </div>
    );
  },

});

export default FakeDataControls;
