const controllers = require('../controllers');
const router = require('express').Router();
const userRouter = require('./user');

router.post('/register', controllers.auth.post.register);
router.post('/login', controllers.auth.post.login);

router.use('/user', userRouter);

module.exports = router;