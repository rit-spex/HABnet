// const models = require('../models');

// Hosts graph pages
const graphPage = (req, res) => {
  res.render('graph', { title: 'Statistics' });
};
// Hosts 3D orientation page
const orientationPage = (req, res) => {
  res.render('orientation', { title: 'Orientation' });
};

const mobileDataPage = (req, res) => {
  res.render('mobileData', { title: 'Mobile Data Collection' });
};

const dataGeneratorPage = (req, res) => {
  res.render('dataGenerator', { title: 'Fake Data Generator' });
};

module.exports.graph = graphPage;
module.exports.orientation = orientationPage;
module.exports.mobileData = mobileDataPage;
module.exports.dataGenerator = dataGeneratorPage;
