const Influx = require('influxdb-nodejs');
const dotenv = require('dotenv');

dotenv.load();

const getInfluxClient = () => {
  const influxClient = new Influx(`${process.env.INFLUXDB_URL.concat('socket_data')}`);

  influxClient.schema('http', null, null);
  influxClient.createDatabase().catch(err => {
    console.error('create database fail err:', err);
  });
  return influxClient;
};

const getSourceInfluxClient = (id) => {
  const influxClient = new Influx(`${process.env.INFLUXDB_URL.concat('socket_data')}`);

  influxClient.schema(id, null, null);
  influxClient.createDatabase().catch(err => {
    console.error('create database fail err:', err);
  });
  return influxClient;
};

const getStatisticsInfluxClient = () => {
  const influxClient = new Influx(`${process.env.INFLUXDB_URL.concat('server_statistics')}`);
  const fieldSchema = {
    connectionSource: 'string',
    connected: 'boolean',
  };

  influxClient.schema('http', fieldSchema, null);
  influxClient.createDatabase().catch(err => {
    console.error('create database fail err:', err);
  });
  return influxClient;
};

const getConnections = (database, series, connectionType) => {
  const influxClient = new Influx(`${process.env.INFLUXDB_URL.concat(database)}`);
  const reader = influxClient.query(series);

  if (connectionType) reader.addField(connectionType);
  reader.measurement = 'http';
  reader.set('format', 'csv');
  return reader.then(data => {
    return data.http;
  }).catch(err => {
    console.log(err.stack);
  });
};

 async function getMeasurementList() {
  const influxClient = new Influx(`${process.env.INFLUXDB_URL.concat('socket_data')}`);
  return await influxClient.showMeasurements();
};

module.exports = {
  getInfluxClient,
  getStatisticsInfluxClient,
  getConnections,
  getSourceInfluxClient,
  getMeasurementList,
};
