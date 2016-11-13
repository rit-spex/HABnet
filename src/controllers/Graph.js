const models = require('../models');

const graphPage = (req, res) => {
  res.render('graph');
};

module.exports.graph = graphPage;
