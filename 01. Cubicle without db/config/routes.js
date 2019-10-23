const cubeController = require('../controllers/cube-controller');

module.exports = (app) => {
   app.get('/', cubeController.getIndex);
   app.get('/create', cubeController.getCreate);
   app.post('/create', cubeController.postCreate);
   app.get('/about', cubeController.getAbout);
   app.get('/details/:id', cubeController.getDetails);
   app.get('/not-found', cubeController.getNotFound);
};