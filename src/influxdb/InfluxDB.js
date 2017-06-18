const Influx = require('influxdb-nodejs');
const dotenv = require('dotenv');

dotenv.load();

let sourceClient;
let statisticsClient;
const dataClient = new Influx(`${process.env.INFLUXDB_URL.concat('socket_data')}`);


const getInfluxClient = () => {
  const influxClient = new Influx(`${process.env.INFLUXDB_URL.concat('socket_data')}`);

  influxClient.schema('http', null, null);
  influxClient.createDatabase().catch((err) => {
    console.error('create database fail err:', err);
  });
  return influxClient;
};

const getSourceInfluxClient = (id) => {
  if (!sourceClient) {
    sourceClient = new Influx(`${process.env.INFLUXDB_URL.concat('socket_data')}`);
    sourceClient.schema(id, null, null);
    sourceClient.createDatabase().catch((err) => {
      console.error('create database fail err:', err);
    });
    return sourceClient;
  }
  return sourceClient;
};

const getStatisticsInfluxClient = () => {
  if (!statisticsClient) {
    statisticsClient = new Influx(`${process.env.INFLUXDB_URL.concat('server_statistics')}`);
    statisticsClient.schema('http', null, null);
    statisticsClient.createDatabase().catch((err) => {
      console.error('create database fail err:', err);
    });
    return statisticsClient;
  }
  return statisticsClient;
};

const getConnections = (database, series, connectionType) => {
  const influxClient = new Influx(`${process.env.INFLUXDB_URL.concat(database)}`);
  const reader = influxClient.query(series);

  if (connectionType) reader.addField(connectionType);
  reader.measurement = 'http';
  reader.set('format', 'csv');
  return reader.then((data) => {
    return data.http;
  }).catch((err) => {
    console.log(err.stack);
  });
};

const getCSVSentBySocket = (measurement) => {
  const influxClient = new Influx(`${process.env.INFLUXDB_URL.concat('socket_data')}`);
  const reader = influxClient.query(measurement);

  reader.measurement = measurement;
  reader.set('format', 'csv');
  return reader.then((data) => {
    return data[measurement];
  }).catch((err) => {
    console.log(err.stack);
  });
};

const getJSONSentBySocket = (measurement) => {
  const influxClient = new Influx(`${process.env.INFLUXDB_URL.concat('socket_data')}`);
  const reader = influxClient.query(measurement);

  reader.measurement = measurement;
  reader.set('format', 'json');
  return reader.then((data) => {
    return data[measurement];
  }).catch((err) => {
    console.log(err.stack);
  });
};

const getData = (urlParams, queryParams) => {
  const { format } = queryParams;
  const { socketID } = urlParams;
  const reader = dataClient.query(socketID);
  reader.measurement = socketID;
  reader.set('format', format);
  return reader.then((data) => {
    return data[socketID];
  }).catch((err) => {
    console.log(err.stack);
  });
};

async function getMeasurementList() {
  const influxClient = new Influx(`${process.env.INFLUXDB_URL.concat('socket_data')}`);
  return await influxClient.showMeasurements();
};


const getMeasurementNamesJSON = () => {
  const influxClient = new Influx(`${process.env.INFLUXDB_URL.concat('socket_data')}`);
  return influxClient.showMeasurements().then((data) => {
    return data;
  }).catch((err) => {
    console.log(err.stack);
  });
};

module.exports = {
  getInfluxClient,
  getStatisticsInfluxClient,
  getConnections,
  getSourceInfluxClient,
  getMeasurementList,
  getCSVSentBySocket,
  getJSONSentBySocket,
  getMeasurementNamesJSON,
  getData,
};
