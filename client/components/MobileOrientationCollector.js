import React, { PropTypes } from 'react';
import Immutable from 'immutable';

const MobileOrientationCollector = React.createClass({
  propTypes: {
    socket: PropTypes.object.isRequired,
    username: PropTypes.string.isRequired,
  },

  getInitialState() {
    return {
      pitch: 0,
      roll: 0,
      yaw: 0,
      accelX: 0,
      accelY: 0,
      accelZ: 0,
      gyroX: 0,
      gyroY: 0,
      gyroZ: 0,
      isDeg: true,
      isIMU: false,
      showMotion: false,
      showOrientation: false,
    };
  },

  componentDidMount() {
    if (window.DeviceMotionEvent) {
      window.addEventListener('devicemotion', this.handleMotion, true);
      this.setState({
        showMotion: true,
        isIMU: true,
      });
    }
    if (window.DeviceOrientationEvent) {
      window.addEventListener('deviceorientation', this.handleOrientation);
      this.setState({ showOrientation: true });
    }
  },

  pollDataJson() {
    let cleanedState = Immutable.Map(this.state);
    cleanedState = cleanedState.delete('showMotion').delete('showOrientation');
    return cleanedState.toJS();
  },

  sendDataJson() {
    const dataPacket = {
      dateCreated: Date.now(),
      name: this.props.username,
      payload: this.pollDataJson(),
    };

    this.props.socket.emit('mobileIMUData', dataPacket, (response) => {
      console.log(response);
    });
  },

  handleMotion(event) {
    this.setState({
      accelX: event.acceleration.x,
      accelY: event.acceleration.y,
      accelZ: event.acceleration.z,
      gyroX: event.rotationRate.x,
      gyroY: event.rotationRate.y,
      gyroZ: event.rotationRate.z,
    }, this.sendDataJson());
  },

  handleOrientation(event) {
    this.setState({
      pitch: event.beta,
      roll: event.gamma,
      yaw: event.alpha,
    }, this.sendDataJson());
  },

  renderOrientation() {
    const {
      roll,
      pitch,
      yaw,
    } = this.state;
    if (pitch && roll && yaw) {
      return (
        <div>
          <h2>{`Pitch: ${pitch.toFixed(3)}`}</h2>
          <h2>{`Roll: ${roll.toFixed(3)}`}</h2>
          <h2>{`Yaw/Direction: ${yaw.toFixed(3)}`}</h2>
        </div>
      );
    }
    return (<span>DeviceOrientation api is not supported on this device </span>);
  },

  renderMotion() {
    const {
      accelX,
      accelY,
      accelZ,
      gyroX,
      gyroY,
      gyroZ,
    } = this.state;
    if (accelX && accelY && accelZ && gyroX && gyroY && gyroZ) {
      return (
        <div>
          <h2>{`Accel-X: ${accelX.toFixed(3)}`}</h2>
          <h2>{`Accel-Y: ${accelY.toFixed(3)}`}</h2>
          <h2>{`Accel-Z: ${accelZ.toFixed(3)}`}</h2>
          <h2>{`Gyro-X: ${gyroX.toFixed(3)}`}</h2>
          <h2>{`Gyro-Y: ${gyroY.toFixed(3)}`}</h2>
          <h2>{`Gyro-Z: ${gyroZ.toFixed(3)}`}</h2>
        </div>
      );
    }
    return (<span>DeviceMotion api is not supported on this device </span>);
  },

  render() {
    const {
      showMotion,
      showOrientation,
    } = this.state;
    return (
      <div >
        {showOrientation && this.renderOrientation()}
        {showMotion && this.renderMotion()}
      </div>
    );
  },
});

export default MobileOrientationCollector;
