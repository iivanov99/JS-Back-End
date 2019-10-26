const controllers = require('../controllers');
const { auth } = require('../utils');

module.exports = (app) => {
  app.get('/', auth.isLoggedIn, controllers.home.get.index);
  app.get('/search', auth.isLoggedIn, controllers.home.get.search);

  app.get('/article/all', auth.isLoggedIn, controllers.article.get.allArticles);
  app.get('/article/create', auth.redirectGuests, controllers.article.get.create);
  app.post('/article/create', auth.redirectGuests, controllers.article.post.create);
  app.get('/article/details/:id', auth.isLoggedIn, controllers.article.get.details);
  app.get('/article/edit/:id', auth.redirectGuests, controllers.article.get.edit);
  app.post('/article/edit/:id', auth.redirectGuests, controllers.article.post.edit);
  app.get('/article/delete/:id', auth.redirectGuests, controllers.article.get.delete);

  app.get('/user/register', auth.redirectUsers, controllers.user.get.register);
  app.post('/user/register', auth.redirectUsers, controllers.user.post.register);
  app.get('/user/login', auth.redirectUsers, controllers.user.get.login);
  app.post('/user/login', auth.redirectUsers, controllers.user.post.login);
  app.get('/user/logout', auth.redirectGuests, controllers.user.get.logout);

  app.get('*', (req, res) => {
    res.send('<h1>404 Page not found!</h1>');
  });
};