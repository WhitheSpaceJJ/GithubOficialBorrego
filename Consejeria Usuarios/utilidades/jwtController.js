const secreto = 'osos-carinosos';
const jwt = require('jsonwebtoken');
const generateToken = async (payload) => {
  return new Promise((resolve, reject) => {
    jwt.sign(payload, secreto, (err, token) => {
      if (err) {
        reject();
      } else {
        resolve(token);
      }
    });
  });
};

const verifyToken = async (token) => {
  return new Promise((resolve, reject) => {
    jwt.verify(token, secreto, (err, decoded) => {
      if (err) {
        reject();
      } else {
        resolve(decoded);
      }
    });
  });
};

module.exports = {
  generateToken,
  verifyToken
};