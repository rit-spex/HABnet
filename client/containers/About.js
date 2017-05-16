import React from 'react';
//import styles from '../css/App.css';

class About extends React.Component {
  constructor(props) {
    super(props);
    this.state = { test: 'foo' };
  }
  render() {
    return (
      <div>
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
        <h2 id="settinguptheapplication">Setting up the application</h2>
        <p>To run HABnet locally, you need several things.  </p>
        <pre><code>git clone https://github.com/RIT-Space-Exploration/HABnet.git  
        cd HABnet
        npm install
        </code></pre>
        <p>Then you must create a .env file in the root directory
        At minimum you need an influxDB instance running locally or on a server.</p>
        <pre><code>INFLUXDB_URL=urlToInfluxDBServer
        </code></pre>
        <p>Then you can start the server.  </p>
        <pre><code>npm start
        </code></pre>
        <p>After a few seconds, the server will start and will accept socket connection on <code>port 3000</code>. After a few more seconds, the webpack bundle will finish compiling and the web client will be available at <code>localhost:3000</code></p>
        <h2 id="connectingadatasourcetotheapplication">Connecting a Data Source to the application</h2>
        <ol>
        <li>Create an application (c++, python, etc) that supports Socket.io to act as the network gateway between your sensors and HABnet.</li>
        <li>Create event handlers for socket.io.  </li>
        </ol>
        <pre><code>payloadJSON = {`{
          name: choose a unique name, recognizable name. If you want to retrieve stored data later, you must use it as a UUID to access the API.
          type: 'dataSource',
        }`}
        socket.on('connect') =&gt; socket.emit('join, payloadJSON);
        </code></pre>
        <p>This establishes the handshake which will verfiy the UUID is not taken by another connected client. There will be a response with a name payload, which can be different if that name is already taken by an active client!</p>
        <ol>
        <li>Connect Socket.io Client</li>
        <li>Sending data to HABnet</li>
        </ol>
        <pre><code>socket.emit('sensorData', JSONData);
        </code></pre>
        <p>You must follow the packet formatting guidelines below or your data will be rejected.</p>
        <h3 id="packetformat">Packet Format</h3>
        <p>HABnet handles all data in JSON format. Each packet should be a JSON object with the following structure</p>
        <pre><code>{`{
          dateCreated: dateInUtcMilliseconds,
          payload: {
            namedSensorValue: sensorValue,
            ...
          },
          name: UUID,
        }`}
        </code></pre>
        <h2 id="accessingthehabnetapi">Accessing the HABnet API</h2>
        <p>While HABnet is running, it exposes an API for accessing data stored in the InfluxDB database. All routes use the base domain HABnet is running on.</p>
        <pre><code> /connections.csv
        </code></pre>
        <p>This will pull down a csv file with a list of recent connections to HABnet. This file tracks the name of the connection, the type, and connection/disconnection events with corresponding timestamps.</p>
        <pre><code> /socketData.csv?socketId=:socketID
        </code></pre>
        <p>This endpoint allows the user to download a csv of recent data points generated by a specific client, using its UUID.</p>
        <pre><code> '/socketData/:socketID'
        </code></pre>
        <p>This endpoint return recent data points generated by a specific client in JSON format, using its UUID as a URL parameter.</p>
        <pre><code> '/measurements'
        </code></pre>
        <p>This endpoint returns a JSON file with a list of all recorded UUIDs in the database. It is useful for checking if a UUID is already taken before connecting for the first time.</p>
        <h2 id="acknowledgements">Acknowledgements</h2>
        <p>This project would not have been possible without the support of RIT Space Exploration.
        Special thanks to RIT IGM Faculty, Code van De Mark, the academic advisor for this project.
        Special thanks to Computer Science House for hosting and development resources.</p>
        <h2 id="contributors">Contributors</h2>
        <ul>
        <li>T.J. Tarazevits - Lead Programmer, Backend Engineer, Frontend Engineer</li>
        <li>Alec Herbert - 3D Visualization System Engineer</li>
        </ul>
      </div>
    );
  }
}

export default About;

/*
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

      */
