const jwt = require('jsonwebtoken');
const accessTokenSecret = 'some secret';

module.exports = {
  createToken: (data) => {
    return new Promise((resolve, reject) => {
      jwt.sign(data, accessTokenSecret, { expiresIn: '1h' }, (err, accessToken) => {
        if (err) { reject(err); return; }
        resolve(accessToken);
      });
    })
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