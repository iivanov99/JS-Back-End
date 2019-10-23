const controllers = require('../controllers');
const router = require('express').Router();
const { auth } = require('../utils');

router.get('/', auth(), controllers.user.get.users);
router.get('/:id', auth(), controllers.user.get.user);
router.post('/', auth(), controllers.user.post.user);
router.put('/:id', auth(true), controllers.user.put.user);
router.delete('/:id', auth(true), controllers.user.delete.user);

module.exports = router;