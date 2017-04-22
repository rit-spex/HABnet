import React from 'react';
//import styles from '../css/App.css';

class Custom404 extends React.Component {
  constructor(props) {
    super(props);
    this.state = { test: 'foo' };
  }
  render() {
    return (
      <div >
        <h1>This is the Custom 404 page</h1>
      </div>
    );
  }
}

export default Custom404;
