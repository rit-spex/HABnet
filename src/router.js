const controllers = require('./controllers');

const router = (app) => {
  app.get('/', controllers.Graph.graph);
};

module.exports = router;
