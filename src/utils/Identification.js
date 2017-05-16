const randomString = require('randomstring');
const generateUniqueName = (baseName) => {
  const randomPart = randomString.generate({
    length: 5,
    readable: true
  });

  return `${baseName}_${randomPart}`;
};

module.exports = {
  generateUniqueName
};