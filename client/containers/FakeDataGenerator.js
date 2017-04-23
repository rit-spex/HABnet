import React from 'react';
import io from 'socket.io-client';
import FakeDataControls from '../components/FakeDataControls';
import DataSocketInitializer from '../components/DataSocketInitializer';
//import styles from '../css/App.css';


const FakeDataGenerator = React.createClass({
  getInitialState() {
    return {
      isSocketConnected: false,
      socketName: 'fakeDataClient',
    };
  },

  connectSocket(username) {
    this.socket = io.connect();
    this.socket.on('joinedSuccessfully', (data) => {
      this.setState({ socketName: data.name });
    });
    this.socket.on('connect', () => {
      console.log('connected to server');
      this.socket.emit('join', { name: username, type: 'dataSource' });
      this.setState({ isSocketConnected: true });
    });

    this.socket.on('disconnect', () => {
      console.log('disconnected to server');
      this.setState({ isSocketConnected: false });
    });
  },

  render() {
    const { isSocketConnected, socketName } = this.state;
    return (
      <div >
        <h1>Fake Data Generator</h1>
        <h1>{`This data source is named: ${socketName}`}</h1>
        {!isSocketConnected && 
        <DataSocketInitializer connectSocket={this.connectSocket} socketName={socketName}/>}
        {isSocketConnected && <FakeDataControls username={socketName} socket={this.socket}/>}
      </div>
    );
  },
});

export default FakeDataGenerator;
