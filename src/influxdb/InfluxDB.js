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
  const influxClient = new Influx(`${process.env.INFLUXDB_URL.concat(id)}`);

  influxClient.schema('outbound', null, null);
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

 async function getDatabaseList() {
  const influxClient = new Influx(`${process.env.INFLUXDB_URL.concat('server_statistics')}`);
  return await influxClient.showDatabases();
};

module.exports = {
  getInfluxClient,
  getStatisticsInfluxClient,
  getConnections,
  getDatabaseList,
};
