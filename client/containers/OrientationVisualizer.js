import React, { PropTypes } from 'react';
import io from 'socket.io-client';
import OrientationCanvas from '../components/OrientationCanvas';
<<<<<<< HEAD
import ProgressBarCustom from '../components/ProgressBarCustom';
=======
import SocketManager from '../components/SocketManager';
>>>>>>> 866a77182a1ac24921829cc608f32dfab2013341

//import styles from '../css/App.css';

const OrientationVisualizer = React.createClass({
  getInitialState() {
    return {
      username: 'OrientationVisualizer',
      isSocketConnected: false,
    };
  },

  componentWillMount() {
    this.connectSocket();
  },

  connectSocket() {
    this.socket = io.connect();
    this.socket.on('joinedSuccessfully', (data) => {
      this.setState({ username: data.name });
    });
    this.socket.on('connect', () => {
      console.log('connected to server');
      this.socket.emit('join', { name: this.state.username, type: 'dataListener' });
      this.setState({ isSocketConnected: true });
    });

    this.socket.on('disconnect', () => {
      console.log('disconnected to server');
      this.setState({ isSocketConnected: false });
    });
  },

  render() {
    const { isSocketConnected } = this.state;
    return (
      <div >
        <h1>This is the Orientation Visualizer page</h1>
<<<<<<< HEAD
        <OrientationCanvas />
        <ProgressBarCustom />
=======
        <SocketManager socket={this.socket} />
        {isSocketConnected && <OrientationCanvas socket={this.socket}/> }
>>>>>>> 866a77182a1ac24921829cc608f32dfab2013341
      </div>
    );
  },
});

export default OrientationVisualizer;
