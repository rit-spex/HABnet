import React from 'react';
import MobileOrientationCollector from '../components/MobileOrientationCollector';
//import styles from '../css/App.css';

const MobileDataCollection = React.createClass({
  render() {
    return (
      <div >
        <h1>This is the Mobile Data Collection page</h1>
        <MobileOrientationCollector />
      </div>
    );
  },
});

export default MobileDataCollection;

