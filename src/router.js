const controllers = require('./controllers');

const router = (app) => {
  app.get('/statistics', controllers.Graph.graph);
  app.get('/orientation', controllers.Graph.orientation);
  app.get('/mobileData', controllers.Graph.mobileData);
  app.get('/dataGenerator', controllers.Graph.dataGenerator);
  // app.get('/connections.csv', controllers.InfluxDB.connectionStatistics);
  app.get('/', controllers.Graph.graph);
};

module.exports = router;
