const models = require('../models');

const graphPage = (req, res) => {
  res.render('graph');
};

const orientationPage = (req, res) => {
  res.render('orientation');
};

module.exports.graph = graphPage;
module.exports.orientation = orientationPage;
