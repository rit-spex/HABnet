import React from 'react';
import styles from '../css/App.css';

class OrientationVisualizer extends React.Component {
  constructor(props) {
    super(props);
    this.state = { test: 'foo' };
  }
  render() {
    return (
      <div className={styles.app}>
        <h1>This is the Orientation Visualizer page</h1>
      </div>
    );
  }
}

export default OrientationVisualizer;

