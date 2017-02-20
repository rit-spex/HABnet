const Influx = require('influxdb-nodejs');
const dotenv = require('dotenv');

dotenv.load();

const getInfluxClient = () => {
  const influxClient = new Influx(process.env.INFLUXDB_URL);
  const fieldSchema = {
    connectionSource: 'string',
  };

  influxClient.schema('http', fieldSchema, null);
  influxClient.createDatabase().catch(err => {
    console.error('create database fail err:', err);
  });
  return influxClient;
};

module.exports = {
  getInfluxClient,
};
