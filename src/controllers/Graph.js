// const models = require('../models');

// Hosts graph pages
const graphPage = (req, res) => {
  res.render('graph');
};
// Hosts 3D orientation page
const orientationPage = (req, res) => {
  res.render('orientation');
};

const mobileDataPage = (req, res) => {
  res.render('mobileData');
};

const dataGeneratorPage = (req, res) => {
  res.render('dataGenerator');
};

module.exports.graph = graphPage;
module.exports.orientation = orientationPage;
module.exports.mobileData = mobileDataPage;
module.exports.dataGenerator = dataGeneratorPage;
