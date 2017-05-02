import React, { PropTypes } from 'react';
import io from 'socket.io-client';
import OrientationCanvas from '../components/OrientationCanvas';
import ProgressBarCustom from '../components/ProgressBarCustom';
import SocketManager from '../components/SocketManager';

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
        <ProgressBarCustom />
        <SocketManager socket={this.socket} />
        {isSocketConnected && <OrientationCanvas socket={this.socket}/> }
      </div>
    );
  },
});

export default OrientationVisualizer;
