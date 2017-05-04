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
    this.model = 0;
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

  toggleModel() {
    this.model = this.model ? 0 : 1;
  }

  render() {
    const { isSocketConnected } = this.state;
    return (
      <div >
        <h1>This is the Avionics Visualizer page</h1>
        <SocketManager socket={this.socket} />
        <a href="#" onClick={toggleModel}>Button1</a>
        <a href="#" onClick={toggleModel}>Button1</a>
        {isSocketConnected && <ProgressBarCustom socket={this.socket}/> }
        {isSocketConnected && <OrientationCanvas socket={this.socket} model={this.model} /> }
      </div>
    );
  }
}

export default AvionicsVisualizer;
