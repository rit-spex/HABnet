import React from 'react';
import styles from '../css/App.css';

export default class FakeDataGenerator extends React.Component {
  constructor(props) {
    super(props);
    this.state = { test: 'foo' };
  }
  render() {
    return (
      <div className={styles.app}>
        <h1>This is the Fake Data Generator page</h1>
      </div>
    );
  }
}