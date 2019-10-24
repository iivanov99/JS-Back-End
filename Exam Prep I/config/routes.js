const controllers = require('../controllers');
const { auth } = require('../utils');

module.exports = (app) => {
  app.get('/', auth.isLoggedIn, controllers.home.get.index);
  app.get('/search', auth.redirectGuests, controllers.home.get.search); 

  app.get('/course/create', auth.redirectGuests, controllers.course.get.create);
  app.post('/course/create', auth.redirectGuests, controllers.course.post.create);
  app.get('/course/details/:id', auth.redirectGuests, controllers.course.get.details);
  app.get('/course/enroll/:id', auth.redirectGuests, controllers.course.get.enroll);
  app.get('/course/edit/:id', auth.redirectGuests, controllers.course.get.edit);
  app.post('/course/edit/:id', auth.redirectGuests, controllers.course.post.edit);
  app.get('/course/delete/:id', auth.redirectGuests, controllers.course.get.delete);

  app.get('/user/register', auth.redirectUsers, controllers.user.get.register);
  app.post('/user/register', auth.redirectUsers, controllers.user.post.register);
  app.get('/user/login', auth.redirectUsers, controllers.user.get.login);
  app.post('/user/login', auth.redirectUsers, controllers.user.post.login);
  app.get('/user/logout', auth.redirectGuests, controllers.user.get.logout);

  app.get('*', (req, res) => {
    res.send('<h1>404 Page not found!</h1>');
  });
};