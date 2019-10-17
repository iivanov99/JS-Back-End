const homeController = require('../controllers/home');
const cubeController = require('../controllers/cube');
const userController = require('../controllers/user');
const accessoryController = require('../controllers/accessory');
const { isAuth, isGuest, redirectUser } = require('../utils/auth');

module.exports = (app) => {
  app.get('/', isGuest, homeController.index);
  app.get('/about', isGuest, homeController.about);
  app.get('/not-found', isGuest, homeController.notFound);
  app.get('/search', isGuest, homeController.search);

  app.get('/create', isAuth, cubeController.createGet);
  app.post('/create', isAuth, cubeController.createPost);
  app.get('/details/:id', isGuest, cubeController.details);
  app.get('/edit/:id', isAuth, cubeController.editGet);
  app.post('/edit/:id', isAuth, cubeController.editPost);
  app.get('/delete/:id', isAuth, cubeController.deleteGet);
  app.post('/delete/:id', isAuth, cubeController.deletePost);

  app.get('/create/accessory', isAuth, accessoryController.createGet);
  app.post('/create/accessory', isAuth, accessoryController.createPost);
  app.get('/attach/accessory/:id', isAuth, accessoryController.attachGet);
  app.post('/attach/accessory/:id', isAuth, accessoryController.attachPost);

  app.get('/login', redirectUser, userController.loginGet);
  app.post('/login', redirectUser, userController.loginPost);
  app.get('/register', redirectUser, userController.registerGet);
  app.post('/register', redirectUser, userController.registerPost);
  app.get('/logout', isAuth, userController.logout);

  app.get('*', (req, res) => res.redirect('/not-found'));
};