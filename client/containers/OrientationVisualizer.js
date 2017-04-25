import React from 'react';
import OrientationCanvas from '../components/OrientationCanvas';
import ProgressBarCustom from '../components/ProgressBarCustom';

//import styles from '../css/App.css';

const OrientationVisualizer = React.createClass({

  render() {
    return (
      <div >
        <h1>This is the Orientation Visualizer page</h1>
        <OrientationCanvas />
        <ProgressBarCustom />
      </div>
    );
  },
});

export default OrientationVisualizer;
