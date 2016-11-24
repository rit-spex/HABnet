const controllers = require('./controllers');

const router = (app) => {
  app.get('/statistics', controllers.Graph.graph);
  app.get('/orientation', controllers.Graph.orientation);
  app.get('/hab/', controllers.Homepage.hab);
  app.get('/', controllers.Homepage.index);
  app.get('/sponsors/', controllers.Homepage.sponsors);
  app.get('/cubesat/', controllers.Homepage.cubesat);
  app.get('/spexcast/', controllers.Homepage.spexcast);
  app.get('/mobileData', controllers.Graph.mobileData);
};

module.exports = router;
