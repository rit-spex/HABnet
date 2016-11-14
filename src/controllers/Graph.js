// const models = require('../models');

// Hosts graph pages
const graphPage = (req, res) => {
  res.render('graph');
};
// Hosts 3D orientation page
const orientationPage = (req, res) => {
  res.render('orientation');
};

module.exports.graph = graphPage;
module.exports.orientation = orientationPage;
