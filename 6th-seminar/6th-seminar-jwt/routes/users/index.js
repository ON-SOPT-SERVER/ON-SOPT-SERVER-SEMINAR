const express = require('express');
const router = express.Router();
const userController = require('../../controller/userController');
const authUtils = require('../../middlewares/authUtil');

router.post('/signup', userController.signup);
router.post('/signin', userController.signin);
router.get('/', authUtils.checkToken ,userController.readAll);
router.get('/profile', authUtils.checkToken, userController.getProfile);
router.get('/:id', authUtils.checkToken, userController.readOne);

module.exports = router;
