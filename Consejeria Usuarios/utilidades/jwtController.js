const secreto = 'osos-carinosos';
const jwt = require('jsonwebtoken');
/**
 *  @description Función que genera un token
 * @param {Object} payload Objeto con la información del usuario
 * @returns {String} token
 */
//Establece una duracion de 8 horas para el token  
const generateToken = async (payload) => {
  return new Promise((resolve, reject) => {
    jwt.sign(payload, secreto, { expiresIn: '8h' }, (err, token) => {
      if (err) {
        reject();
      } else {
        resolve(token);
      }
    });
  });
}; 


/**
 * @description Función que verifica un token
 * @param {String} token Token a verificar
 * @returns {Object} payload
 */
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



//Module exports
module.exports = {
  generateToken,
  verifyToken
};