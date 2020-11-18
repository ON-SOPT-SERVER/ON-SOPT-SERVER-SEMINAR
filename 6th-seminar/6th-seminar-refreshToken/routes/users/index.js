const express = require('express');
const router = express.Router();
const userController = require('../../controller/userController');
const authUtil = require('../../middlewares/auth');

router.post('/signup', userController.signup);
router.post('/signin', userController.signin);
router.get('/', authUtil.checkToken, userController.readAll);
router.get('/:id', userController.readOne);

module.exports = router;
