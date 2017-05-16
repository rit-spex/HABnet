const controllers = require('../controllers');

const router = (app) => {
  app.get('/connections.csv', controllers.InfluxDB.connectionStatistics);
  app.get('/socketData.csv', controllers.InfluxDB.socketDataCSV);
  app.get('/socketData/:socketID', controllers.InfluxDB.socketDataJSON);
  app.get('/measurements', controllers.InfluxDB.measurementNames);
  app.get('/', controllers.Client.react);
};

module.exports = router;
