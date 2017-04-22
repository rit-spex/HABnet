import React from 'react';
import FakeDataControls from '../components/FakeDataControls';
//import styles from '../css/App.css';

 class FakeDataGenerator extends React.Component {
  constructor(props) {
    super(props);
    this.state = { test: 'foo' };
  }
  render() {
    return (
      <div >
        <h1>This is the Fake Data Generator page</h1>
        <FakeDataControls />
      </div>
    );
  }
}
export default FakeDataGenerator;
