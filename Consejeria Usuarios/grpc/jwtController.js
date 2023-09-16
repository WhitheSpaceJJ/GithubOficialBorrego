const jwt = require('jsonwebtoken');

/*
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
*/

const verifyToken = async (token, secretKey) => {
  return new Promise((resolve, reject) => {
    jwt.verify(token, secretKey, (err, decoded) => {
      if (err) {
        const message={
          message:true
        };
        reject(message);
      } else {
        const message={
          message:false
        };
        resolve(decoded);
      }
    });
  });
};

module.exports = {
 // generateToken,
  verifyToken
};