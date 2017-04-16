const {
  getConnections,
  getCSVSentBySocket,
  getJSONSentBySocket,
  getMeasurementNamesJSON } = require('../influxdb/InfluxDB');

// Return Influx Data
const connectionStatistics = (req, res) => {
  const database = req.query.database;
  const connectionType = req.query.connectionType;
  const series = req.query.series;
  console.log(`passed in values: database: ${database}, series: ${series}, connectionType: ${connectionType}`);
  getConnections(database, series, connectionType).then((data) => {
    console.log(`connections: ${data}`);
    res.status(200).type('text/csv').send(data);
  });
};

// Return Influx Data
const socketDataCSV = (req, res) => {
  const measurement = req.query.socketID;
  getCSVSentBySocket(measurement).then((data) => {
    res.status(200).type('text/csv').send(data);
  });
};

const socketDataJSON = (req, res) => {
  const measurement = req.params.socketID;
  getJSONSentBySocket(measurement).then((data) => {
    res.status(200).type('application/json').send(data);
  });
};

const measurementNames = (req, res) => {
  getMeasurementNamesJSON().then((data) => {
    res.status(200).type('application/json').send(data);
  });
};



module.exports = {
  connectionStatistics,
  socketDataCSV,
  socketDataJSON,
  measurementNames,
};
