const User = require('../models/User');
const BlacklistedToken = require('../models/BlacklistedToken');
const { authCookieName } = require('../app-config');
const jwt = require('./jwt');

const auth = (redirectUnauthenticated = true) => {
  return async (req, res, next) => {
    try {
      const accessToken = req.cookies[authCookieName] || '';
      const [data, blacklistedToken] = await Promise.all([
        jwt.verifyToken(accessToken),
        BlacklistedToken.findOne({ token: accessToken })
      ]);

      if (blacklistedToken) {
        throw new Error('jwt blacklisted');
      }

      const user = await User.findOne({ _id: data.userId });
      req.user = user;
      next();
    } catch (err) {
      if (!redirectUnauthenticated) { next(); return; }

      if (['jwt must be provided', 'jwt malformed', 'jwt blacklisted', 'jwt expired']
        .includes(err.message)) {
        res.redirect('/login');
        return;
      }
    }
  }
};

module.exports = {
  isAuth: auth(),
  isGuest: auth(false),
  redirectUser: async (req, res, next) => {
    const accessToken = req.cookies[authCookieName] || '';

    try {
      const [data, blacklistedToken] = await Promise.all([
        jwt.verifyToken(accessToken),
        BlacklistedToken.findOne({ token: accessToken })
      ]);

      if (blacklistedToken) {
        throw new Error('jwt blacklisted');
      }

      res.redirect('/');
    } catch (err) {
      next();
    }
  }
};