import React from 'react';
import OrientationCanvas from '../components/OrientationCanvas';
import SocketManager from '../components/SocketManager';
//import styles from '../css/App.css';

const OrientationVisualizer = React.createClass({

  render() {
    return (
      <div >
        <h1>This is the Orientation Visualizer page</h1>
        <OrientationCanvas />
        <SocketManager />
      </div>
    );
  },
});

export default OrientationVisualizer;

