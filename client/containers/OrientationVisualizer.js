import React from 'react';
import io from 'socket.io-client';
import OrientationCanvas from '../components/OrientationCanvas';
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
    return (
      <div >
        <h1>This is the Orientation Visualizer page</h1>
        <SocketManager socket={this.socket}>
          <OrientationCanvas socket={this.socket}/>
        </SocketManager>
      </div>
    );
  },
});

export default OrientationVisualizer;

