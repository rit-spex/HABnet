import React from 'react';
import Toggle from 'material-ui/Toggle';

const FakeDataControls = React.createClass({

  getInitialState() {
    return {
      temp1: null,
      pressure: null,
      altitude: null,
      humidty: null,
      rotationX: null,
      rotationY: null,
      rotationZ: null,
      accelX: null,
      accelY: null,
      accelZ: null,
      magX: null,
      magY: null,
      magZ: null,
      colorR: null,
      colorG: null,
      colorB: null,
      lux: null,
      hasBarometer: false,
      hasIMU: false,
      hasColorSensor: false,
    };
  },

  renderBarometer() {
    const { temp1, pressure, altitude, humidity } = this.state;
    return (
      <div>

      </div>
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
      <div>

      </div>
    );
  },

  renderColorSensor() {
    const { colorR, colorG, colorB, lux, hasColorSensor } = this.state;
    return (
      <div>
    
      </div>
    );
  },

  render() {
    const { hasBarometer, hasIMU, hasColorSensor } = this.state;
    return (
      <div>
        <Toggle label="Show Barometer" />
        {hasBarometer && this.renderBarometer()}
        <Toggle label="Show IMU" />
        {hasIMU && this.renderIMU()}
        <Toggle label="Show Color Sensor" />
        {hasColorSensor && this.renderColorSensor()}
      </div>
    );
  },

});

export default FakeDataControls;
