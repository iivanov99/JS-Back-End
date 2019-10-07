const homeController = require('../controllers/home');
const cubeController = require('../controllers/cube');
const accessoryController = require('../controllers/accessory');

module.exports = (app) => {
  app.get('/', homeController.index);
  app.get('/about', homeController.about);
  app.get('/not-found', homeController.notFound);
  app.get('/search', homeController.search);

  app.get('/create', cubeController.createGet);
  app.post('/create', cubeController.createPost);
  app.get('/details/:id', cubeController.details);

  app.get('/create/accessory', accessoryController.createGet);
  app.post('/create/accessory', accessoryController.createPost);
  app.get('/attach/accessory/:id', accessoryController.attachGet);
  app.post('/attach/accessory/:id', accessoryController.attachPost);
};