import React from 'react';
//import styles from '../css/App.css';

class About extends React.Component {
  constructor(props) {
    super(props);
    this.state = { test: 'foo' };
  }
  render() {
    return (
      <div >
        <h1>About</h1>
        <p>Special thanks to Code van De Mark, the academic advisor for this project</p>
        <h2>Contributors</h2>
        <ul>
          <li>T.J. Tarazevits</li>
          <li>Alec Herbert</li>
          <li>Austin Bodzas</li>
          <li>Dan Mitchell</li>
        </ul>
      </div>
    );
  }
}

export default About;
