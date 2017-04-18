import React from 'react';
import styles from '../css/App.css';

export default class Statistics extends React.Component {
  constructor(props) {
    super(props);
    this.state = { test: 'foo' };
  }
  render() {
    return (
      <div className={styles.app}>
        <h1>This is the Statistics page</h1>
      </div>
    );
  }
}
