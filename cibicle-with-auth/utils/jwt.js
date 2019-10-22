const jwt = require('jsonwebtoken');
const { accessTokenSecret } = require('../app-config');

module.exports = {
  createToken: (data) => {
    return new Promise((resolve, reject) => {
      jwt.sign(data, accessTokenSecret, { expiresIn: '20m' }, (err, accessToken) => {
        if (err) { reject(err); return; }
        resolve(accessToken);
      });
    });
  },
  verifyToken: (accessToken) => {
    return new Promise((resolve, reject) => {
      jwt.verify(accessToken, accessTokenSecret, (err, data) => {
        if (err) { reject(err); return; }
        resolve(data);
      });
    });
  }
};