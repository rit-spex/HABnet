# HABnet

HABnet is a multi-user web application designed to facilite the collection and visualization of embedded sensor data. There are two primary components included within this application.

## Applications
The primary use case for this project is to support embedded research projects at Rochester Institute of Technology pursured by RIT Space Exploration. The initial proof-of-concept was developed as a hackathon project to support a High Altitude Balloon (HAB) launch by SPEX. This system supports any embedded device that can transmit data via the Internet using websockets.

## Server
The server is an Express application that handles incoming and outgoing websocket connections with Socket.io. Connections are classified into two types: data sources and data listeners. Data listeners are websockets, usually established via the web client, that can connect and subscribe to other data sources. This allows them to receive real-time updates from the data sources. Data sources are the key feature of the application. A data source can be any network device that follows the HABnet protocol. A DS connects to the server using a websocket, requests and is assigned an UUID, and can transmit data to the server. The server rebroadcasts each received packet to any data listener, and also stores that data in an database based on InfluxDB. Data can be monitored in real-time with the web client or retrieved later via the HABnet API.


## Web Client
The server hosts a web application built with React/webpack. This application allows the user to monitor incoming data streams as well as create compelling real-time visualizations of that data.

### Statistics
The statistics tool allows the user to select any connected data source and choose a specific graph type. Multiple graphs from multiple data sources can be added and displayed simultaneously, all updating in real-time.

### Orientation Visualizer
The orientation visualizer is useful for visualizing data from data sources that have orientation data provided by an IMU or other instrument. The application provides a default model of a cubesat created by NASA.

### Avionics Visualizer
This is an example of an extension built upon the HABnet platform. This was used by the RIT SPEX Avionics team for their ImagineRIT demonstration. It utilizes the HABnet data collection system and reused the 3D rendering components for the Orientation Visualizer, but extends them into a minigame coupled with a hardware component.

### Mobile Data Collection
This is a page that leverages modern mobile browser APIs to access the mobile IMU for orientation data, and on supported devices, raw IMU data. It can be used to test the data collection components of the system and works well with the existing visualizations.

### Fake Data Generator
This is a tool for testing the system during development. It is included to provide an easy way to generate consistent, predictable data when a hardware device is not available.

## Setting up the application
To run HABnet locally, you need several things.  
```
git clone https://github.com/RIT-Space-Exploration/HABnet.git  
cd HABnet
npm install
```
Then you must create a .env file in the root directory
At minimum you need an influxDB instance running locally or on a server.
```
INFLUXDB_URL=urlToInfluxDBServer
```
Then you can start the server.  
```
npm start
```
After a few seconds, the server will start and will accept socket connection on `port 3000`. After a few more seconds, the webpack bundle will finish compiling and the web client will be available at `localhost:3000`

## Connecting a Data Source to the application
1. Create an application (c++, python, etc) that supports Socket.io to act as the network gateway between your sensors and HABnet.
2. Create event handlers for socket.io.  
```
payloadJSON = {
  name: choose a unique name, recognizable name. If you want to retrieve stored data later, you must use it as a UUID to access the API.
  type: 'dataSource',
}
socket.on('connect') => socket.emit('join, payloadJSON);
```
This establishes the handshake which will verfiy the UUID is not taken by another connected client. There will be a response with a name payload, which can be different if that name is already taken by an active client!
3. Connect Socket.io Client
4. Sending data to HABnet
```
socket.emit('sensorData', JSONData);
```
You must follow the packet formatting guidelines below or your data will be rejected.

### Packet Format
HABnet handles all data in JSON format. Each packet should be a JSON object with the following structure
```
{
  dateCreated: dateInUtcMilliseconds,
  payload: {
    namedSensorValue: sensorValue,
    ...
  },
  name: UUID,
}
```

## Accessing the HABnet API
While HABnet is running, it exposes an API for accessing data stored in the InfluxDB database. All routes use the base domain HABnet is running on.
```
 /connections.csv
```
This will pull down a csv file with a list of recent connections to HABnet. This file tracks the name of the connection, the type, and connection/disconnection events with corresponding timestamps.

```  
 /socketData.csv?socketId=:socketID
```
This endpoint allows the user to download a csv of recent data points generated by a specific client, using its UUID.

```
 '/socketData/:socketID'
```
This endpoint return recent data points generated by a specific client in JSON format, using its UUID as a URL parameter.

```
 '/measurements'
```
This endpoint returns a JSON file with a list of all recorded UUIDs in the database. It is useful for checking if a UUID is already taken before connecting for the first time.

## Acknowledgements
This project would not have been possible without the support of RIT Space Exploration.
Special thanks to RIT IGM Faculty, Code van De Mark, the academic advisor for this project.
Special thanks to Computer Science House for hosting and development resources.


## Contributors 
* T.J. Tarazevits - Lead Programmer, Backend Engineer, Frontend Engineer
* Alec Herbert - 3D Visualization System Engineer


