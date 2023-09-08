const jwt = require('jsonwebtoken');

const generateToken = async (payload, secretKey) => {
  return new Promise((resolve, reject) => {
    jwt.sign(payload, secretKey, (err, token) => {
      if (err) {
        reject(err);
      } else {
        resolve(token);
      }
    });
  });
};

const verifyToken = async (token, secretKey) => {
  return new Promise((resolve, reject) => {
    jwt.verify(token, secretKey, (err, decoded) => {
      if (err) {
        reject(err);
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
