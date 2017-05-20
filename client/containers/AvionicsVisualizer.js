import React, { PropTypes } from 'react';
import io from 'socket.io-client';
import OrientationCanvas from '../components/OrientationCanvas';
import ProgressBarCustom from '../components/ProgressBarCustom';
import SocketManager from '../components/SocketManager';

class AvionicsVisualizer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: 'AvionicsVisualizer',
      isSocketConnected: false,
    };
  }

  componentWillMount() {
    this.connectSocket();
  }

  componentWillUnmount() {
    if (this.socket) {
      this.socket.disconnect();
    }
  }

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
  }

  render() {
    const { isSocketConnected, username } = this.state;
    return (
      <div >
        <h1>This is the Avionics Visualizer page</h1>
        <SocketManager socket={this.socket} username={username}/>
        {isSocketConnected && <ProgressBarCustom socket={this.socket}/> }
        {isSocketConnected && <OrientationCanvas socket={this.socket}/> }
      </div>
    );
  }
}

export default AvionicsVisualizer;
