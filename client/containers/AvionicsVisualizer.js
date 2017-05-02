import React from 'react';
import io from 'socket.io-client';
import OrientationCanvas from '../components/OrientationCanvas';
import ProgressBarCustom from '../components/ProgressBarCustom';
import SocketManager from '../components/SocketManager';

class AvionicsVisualizer extends React.Component {
  constructor(props) {
    super(props);
    this.state = { test: 'foo' };
  }
  render() {
    return (
      <div >
        <h1>This is the Avionics Visualizer page</h1>
        <SocketManager socket={this.socket} />
        {isSocketConnected && <ProgressBarCustom socket={this.socket}/> }
        {isSocketConnected && <OrientationCanvas socket={this.socket}/> }
      </div>
    );
  }
}

export default AvionicsVisualizer;
