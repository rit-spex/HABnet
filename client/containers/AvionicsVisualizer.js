import React, { PropTypes } from 'react';
import io from 'socket.io-client';
import RaisedButton from 'material-ui/RaisedButton'
import OrientationCanvas from '../components/OrientationCanvas';
import ProgressBarCustom from '../components/ProgressBarCustom';
import SocketManager from '../components/SocketManager';

class AvionicsVisualizer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: 'AvionicsVisualizer',
      isSocketConnected: false,
      model: 0
    };
    this.toggleModel = this.toggleModel.bind(this, this.state.model);
  }

  componentWillMount() {
    this.connectSocket();
    this.setState({ model: 0 });
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

  toggleModel(e) {
    var newVal = this.state.model ? 0 : 1;
    console.log(this.state.model);
    this.setState({ model: newVal });
    console.log(this.state.model);
  }

  render() {
    const { isSocketConnected } = this.state;
    return (
      <div >
        <h1>This is the Avionics Visualizer page</h1>
        <SocketManager socket={this.socket} />
        <RaisedButton label="Toggle1" onTouchTap={this.toggleModel} />
        {isSocketConnected && <ProgressBarCustom socket={this.socket}/> }
        {isSocketConnected && <OrientationCanvas socket={this.socket} model={this.state.model} /> }
      </div>
    );
  }
}

export default AvionicsVisualizer;
