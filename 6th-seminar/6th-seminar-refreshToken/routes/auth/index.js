const express = require('express');
const router = express.Router();
const authController = require('../../controller/authController');
const authUtil = require('../../middlewares/auth');

router.get('/reissue', authController.reIssue);


module.exports = router;
