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
        <h1 id="habnet">HABnet</h1>
        <p>HABnet is a multi-user web application designed to facilitate  the collection and visualization of embedded sensor data. There are two primary components included within this application.</p>
        <h2 id="applications">Applications</h2>
        <p>The primary use case for this project is to support embedded research projects at Rochester Institute of Technology pursued by RIT Space Exploration. The initial proof-of-concept was developed as a hackathon project to support a High Altitude Balloon (HAB) launch by SPEX. This system supports any embedded device that can transmit data via the Internet using websockets.</p>
        <h2 id="server">Server</h2>
        <p>The server is an Express application that handles incoming and outgoing websocket connections with Socket.io. Connections are classified into two types: data sources and data listeners. Data listeners are websockets, usually established via the web client, that can connect and subscribe to other data sources. This allows them to receive real-time updates from the data sources. Data sources are the key feature of the application. A data source can be any network device that follows the HABnet protocol. A DS connects to the server using a websocket, requests and is assigned an UUID, and can transmit data to the server. The server rebroadcasts each received packet to any data listener, and also stores that data in an database based on InfluxDB. Data can be monitored in real-time with the web client or retrieved later via the HABnet API.</p>
        <h2 id="webclient">Web Client</h2>
        <p>The server hosts a web application built with React/webpack. This application allows the user to monitor incoming data streams as well as create compelling real-time visualizations of that data.</p>
        <h3 id="statistics">Statistics</h3>
        <p>The statistics tool allows the user to select any connected data source and choose a specific graph type. Multiple graphs from multiple data sources can be added and displayed simultaneously, all updating in real-time.</p>
        <h3 id="orientationvisualizer">Orientation Visualizer</h3>
        <p>The orientation visualizer is useful for visualizing data from data sources that have orientation data provided by an IMU or other instrument. The application provides a default model of a cubesat created by NASA.</p>
        <h3 id="avionicsvisualizer">Avionics Visualizer</h3>
        <p>This is an example of an extension built upon the HABnet platform. This was used by the RIT SPEX Avionics team for their ImagineRIT demonstration. It utilizes the HABnet data collection system and reused the 3D rendering components for the Orientation Visualizer, but extends them into a minigame coupled with a hardware component.</p>
        <h3 id="mobiledatacollection">Mobile Data Collection</h3>
        <p>This is a page that leverages modern mobile browser APIs to access the mobile IMU for orientation data, and on supported devices, raw IMU data. It can be used to test the data collection components of the system and works well with the existing visualizations.</p>
        <h3 id="fakedatagenerator">Fake Data Generator</h3>
        <p>This is a tool for testing the system during development. It is included to provide an easy way to generate consistent, predictable data when a hardware device is not available.</p>
      </div>
    );
  }
}
export default Home;
