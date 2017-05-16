import React from 'react';
// import styles from '../css/App.css';

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = { test: 'foo' };
  }
  render() {
    return (
      <div >
        <h1>Welcome to ImagineRIT. Check out the Orientation Visualizer on the sidebar!</h1>
      </div>
    );
  }
}
export default Home;
