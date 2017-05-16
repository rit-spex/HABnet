const path = require('path');

const react = (req, res) => {
  res.sendFile(path.join(__dirname, 'dist/index.html'));
  res.end();
};

module.exports.react = react;

