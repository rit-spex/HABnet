const controllers = require('./controllers');

const router = (app) => {
  app.get('/statistics', controllers.Graph.graph);
  app.get('/orientation', controllers.Graph.orientation);
  app.get('/', controllers.Graph.graph);
};

module.exports = router;
