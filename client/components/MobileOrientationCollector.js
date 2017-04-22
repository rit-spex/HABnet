import React, { PropTypes } from 'react';

const MobileOrientationCollector = React.createClass({
  propTypes: {
    socket: PropTypes.object,
  },

  getInitialState() {
    return {
      pitch: 0,
      roll: 0,
      yaw: 0,
      accelX: 0,
      accelY: 0,
      accelZ: 0,
      rotationX: 0,
      rotationY: 0,
      rotationZ: 0,
      showMotion: false,
      showOrientation: false,
    };
  },

  componentDidMount() {
    if (window.DeviceMotionEvent) {
      window.addEventListener("devicemotion", this.handleMotion, true);
      this.setState({ showMotion: false });
    }
    if (window.DeviceOrientationEvent) {
      window.addEventListener('deviceorientation', this.handleOrientation);
      this.setState({ showOrientation: true });
    }
  },

  handleMotion(event) {
    this.setState({
      accelX: event.acceleration.x,
      accelY: event.acceleration.y,
      accelZ: event.acceleration.z,
      rotationX: event.rotationRate.x,
      rotationY: event.rotationRate.y,
      rotationZ: event.rotationRate.z,
    });
  },

  handleOrientation(event) {
    this.setState({
      pitch: event.beta,
      roll: event.gamma,
      yaw: event.alpha,
    });
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
      rotationX,
      rotationY,
      rotationZ,
    } = this.state;
    if (accelX && accelY && accelZ && rotationX && rotationY && rotationZ) {
      return (
        <div>
          <h2>{`Accel-X: ${accelX.toFixed(3)}`}</h2>
          <h2>{`Accel-Y: ${accelY.toFixed(3)}`}</h2>
          <h2>{`Accel-Z: ${accelZ.toFixed(3)}`}</h2>
          <h2>{`Rotation-X: ${rotationX.toFixed(3)}`}</h2>
          <h2>{`Rotation-Y: ${rotationY.toFixed(3)}`}</h2>
          <h2>{`Rotation-Z: ${rotationZ.toFixed(3)}`}</h2>
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
