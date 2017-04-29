import React from 'react';
import io from 'socket.io-client';
import MobileOrientationCollector from '../components/MobileOrientationCollector';
import DataSocketInitializer from '../components/DataSocketInitializer';
//import styles from '../css/App.css';

const MobileDataCollection = React.createClass({
  getInitialState() {
    return {
      isSocketConnected: false,
      socketName: 'mobileDataClient',
    };
  },

  componentWillUnmount() {
    if (this.socket) {
      this.socket.disconnect();
    }
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
        <h1>Mobile Data Collector</h1>
        <h2>{`This data source is named: ${socketName}`}</h2>
        {!isSocketConnected && 
        <DataSocketInitializer connectSocket={this.connectSocket} socketName={socketName}/>}
        {isSocketConnected && <MobileOrientationCollector username={socketName} socket={this.socket}/>}
      </div>
    );
  },
});

export default MobileDataCollection;

