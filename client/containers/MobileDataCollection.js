import React from 'react';
import MobileOrientationCollector from '../components/MobileOrientationCollector';
//import styles from '../css/App.css';

 class MobileDataCollection extends React.Component {
  constructor(props) {
    super(props);
    this.state = { test: 'foo' };
  }
  render() {
    return (
      <div >
        <h1>This is the Mobile Data Collection page</h1>
        <MobileOrientationCollector />
      </div>
    );
  }
}

export default MobileDataCollection;

