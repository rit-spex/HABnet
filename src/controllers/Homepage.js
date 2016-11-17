const indexPage = (req, res) => {
  res.redirect('http://spex.rit.edu');
};

const hab = (req, res) => {
  res.redirect('http://spex.rit.edu/hab/');
};

const cubesat = (req, res) => {
  res.redirect('http://spex.rit.edu/cubesat/');
};

const spexcast = (req, res) => {
  res.redirect('http://spex.rit.edu/spexcast/');
};

const sponsors = (req, res) => {
  res.redirect('http://spex.rit.edu/sponsors/');
};

module.exports.hab = hab;
module.exports.index = indexPage;
module.exports.cubesat = cubesat;
module.exports.spexcast = spexcast;
module.exports.sponsors = sponsors;
