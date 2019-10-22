const jwt = require('jsonwebtoken');
const config = require('../config');

module.exports = {
  createToken: (data) => {
    return new Promise((resolve, reject) => {
      jwt.sign(data, config.tokenSecret, { expiresIn: '20m' }, (err, token) => {
        if (err) { reject(err); return; }
        resolve(token);
      });
    })
  },
  verifyToken: (token) => {
    return new Promise((resolve, reject) => {
      jwt.verify(token, config.tokenSecret, (err, data) => {
        if (err) { reject(err); return; }
        resolve(data);
      });
    });
  }
};