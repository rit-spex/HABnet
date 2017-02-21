const Influx = require('influxdb-nodejs');
const dotenv = require('dotenv');

dotenv.load();

const getInfluxClient = () => {
  const influxClient = new Influx(`${process.env.INFLUXDB_URL.concat('socket_data')}`);
  const fieldSchema = {
    socketName: 'string',
    data: 'string',
  };

  influxClient.schema('http', fieldSchema, null);
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

const getConnections = (database, series, connectionType = '*') => {
  const influxClient = new Influx(`${process.env.INFLUXDB_URL.concat(database)}`);
  const reader = influxClient.query(series);

  reader.addField(connectionType);
  reader.measurement = 'http';
  return reader.then(data => {
    return data;
  }).catch(err => {
    console.log(err.stack);
  });
};

module.exports = {
  getInfluxClient,
  getStatisticsInfluxClient,
  getConnections,
};
