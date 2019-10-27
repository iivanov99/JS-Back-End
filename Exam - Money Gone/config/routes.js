const controllers = require('../controllers');
const { auth } = require('../utils');

module.exports = (app) => {
  app.get('/', auth.isLoggedIn, controllers.home.get.index);
  app.get('/not-found', auth.isLoggedIn, controllers.home.get.notFound);

  app.get('/expense/create', auth.redirectGuests, controllers.expense.get.create);
  app.post('/expense/create', auth.redirectGuests, controllers.expense.post.create);
  app.get('/expense/report/:id', auth.redirectGuests, controllers.expense.get.report);
  app.get('/expense/delete/:id', auth.redirectGuests, controllers.expense.get.delete);

  app.get('/user/register', auth.redirectUsers, controllers.user.get.register);
  app.post('/user/register', auth.redirectUsers, controllers.user.post.register);
  app.get('/user/login', auth.redirectUsers, controllers.user.get.login);
  app.post('/user/login', auth.redirectUsers, controllers.user.post.login);
  app.get('/user/logout', auth.redirectGuests, controllers.user.get.logout);
  app.post('/user/refill/:id', auth.redirectGuests, controllers.user.post.refill);
  app.get('/user/profile/:id', auth.redirectGuests, controllers.user.get.profile);

  app.get('*', (req, res) => res.redirect('/not-found'));
};