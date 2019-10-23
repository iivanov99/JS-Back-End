const controllers = require('../controllers');
const { auth } = require('../utils');

module.exports = (app) => {

  app.get('/user/register', auth.redirectUsers, controllers.user.get.register);
  app.post('/user/register', auth.redirectUsers, controllers.user.post.register);
  app.get('/user/login', auth.redirectUsers, controllers.user.get.login);
  app.post('/user/login', auth.redirectUsers, controllers.user.post.login);
  app.get('/user/logout', auth.redirectGuests, controllers.user.get.logout);

  app.get('*', (req, res) => {
    res.send('<h1>404 Page not found!</h1>');
  });
};