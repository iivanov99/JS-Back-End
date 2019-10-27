const models = require('../models');
const jwt = require('./jwt');

module.exports = {
  redirectGuests: async (req, res, next) => {
    try {
      const accessToken = req.cookies['auth_cookie'] || '';
      const data = await jwt.verifyToken(accessToken);
      const user = await models.User.findById(data.userId);
      req.user = user;
      next();
    } catch (err) {
      res.redirect('/user/login');
    }
  },
  isLoggedIn: async (req, res, next) => {
    try {
      const accessToken = req.cookies['auth_cookie'] || '';
      const data = await jwt.verifyToken(accessToken);
      const user = await models.User.findById(data.userId);
      req.user = user;
      next();
    } catch (err) {
      next();
    }
  },
  redirectUsers: async (req, res, next) => {
    try {
      const accessToken = req.cookies['auth_cookie'] || '';
      await jwt.verifyToken(accessToken);
      res.redirect('/');
    } catch (err) {
      next();
    }
  }
};