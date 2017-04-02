const { getConnections } = require('../influxdb/InfluxDB');
// Return Influx Data
const connectionStatistics = (req, res) => {
  console.log('client started');
  const database = req.query.database;
  const connectionType = req.query.connectionType;
  const series = req.query.series;
  console.log(`passed in values: database: ${database}, series: ${series}, connectionType: ${connectionType}`);
  getConnections(database, series, connectionType).then(data => {
    console.log(`connections: ${data}`);
    res.status(200).type('text/csv').send(data);
  });
};

module.exports = {
  connectionStatistics,
};
