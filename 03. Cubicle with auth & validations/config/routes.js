const controllers = require('../controllers');
const { auth } = require('../utils')

module.exports = (app) => {
  app.get('/', auth.isLoggedIn, controllers.home.get.index);
  app.get('/about', auth.isLoggedIn, controllers.home.get.about);
  app.get('/not-found', auth.isLoggedIn, controllers.home.get.notFound);

  app.get('/cube/create', auth.redirectGuests, controllers.cube.get.create);
  app.post('/cube/create', auth.redirectGuests, controllers.cube.post.create);
  app.get('/cube/details/:id', auth.isLoggedIn, controllers.cube.get.details);
  app.get('/cube/edit/:id', auth.redirectGuests, controllers.cube.get.edit);
  app.post('/cube/edit/:id', auth.redirectGuests, controllers.cube.post.edit);
  app.get('/cube/delete/:id', auth.redirectGuests, controllers.cube.get.delete);
  app.post('/cube/delete/:id', auth.redirectGuests, controllers.cube.post.delete);
  
  app.get('/accessory/create', auth.redirectGuests, controllers.accessory.get.create);
  app.post('/accessory/create', auth.redirectGuests, controllers.accessory.post.create);
  app.get('/accessory/attach/:id', auth.redirectGuests, controllers.accessory.get.attach);
  app.post('/accessory/attach/:id', auth.redirectGuests, controllers.accessory.post.attach);

  app.get('/user/register', auth.redirectUsers, controllers.user.get.register);
  app.post('/user/register', auth.redirectUsers, controllers.user.post.register);
  app.get('/user/login', auth.redirectUsers, controllers.user.get.login);
  app.post('/user/login', auth.redirectUsers, controllers.user.post.login);
  app.get('/user/logout', auth.redirectGuests, controllers.user.get.logout);

  app.get('*', (req, res) => {
    res.redirect('/not-found');
  });
};