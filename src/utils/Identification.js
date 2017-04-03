const randomString = require('randomstring');
const generateUniqueName = (baseName) => {
  const randomPart = randomString.generate({
    length: 1,
    readable: true
  });

  return `${baseName}${randomPart}`;
};

module.exports = {
  generateUniqueName
};